import path from "node:path"
import { describe, expect, it } from "vitest"
import ts from "typescript"
import {
  appName,
  fileExists,
  findImportFindings,
  findPageDirectories,
  findSourceFiles,
  getImportSpecifier,
  isDirectory,
  readSourceFile,
  toAppRelativePath,
} from "./ast-helpers"

const maxLinesByRole = {
  component: 260,
  pageHook: 220,
  default: 320,
} as const

const forbiddenComponentValueImports = new Set([
  "@tanstack/react-query",
  "@/api",
])
const forbiddenPageHookValueImports = new Set([
  "@tanstack/react-query",
  "@/api",
])
const complexPageNamePattern =
  /(^|[-_])(agent|chat|workbench|editor|builder|flow|console|canvas)([-_]|$)/i
const complexRuntimePattern =
  /\b(stream|runtime|websocket|eventsource|messagechunk|commandresult|toolcall)\b/i
const componentImplementationNamePattern =
  /(normalize|merge|dedupe|parse|reduce|build.*viewmodel|to.*viewmodel|map.*event|map.*message|runtime|stream)/i

const oversizedGuidance =
  "AI fix: split this page module. Put API/query/stream entry in <page>-data.ts, pure event/runtime/message transforms in domain/, component props mapping in view-model/, and keep components presentational."
const componentImportGuidance =
  "AI fix: move API/query wiring out of this component. Components should receive prepared props; put requests/subscriptions in <page>-data.ts and pass results through use-<page>-page.ts."
const pageHookImportGuidance =
  "AI fix: page hooks should orchestrate only. Move direct API/query imports to <page>-data.ts, then have use-<page>-page.ts consume that data hook and compose view-model props."
const componentStateGuidance =
  "AI fix: move reducer/heavy derived state out of this component. Put pure state transitions in domain/, view model mapping in view-model/, and keep the TSX file focused on rendering props."
const componentRuntimeGuidance =
  "AI fix: do not parse/merge/reduce stream, event, message, or runtime state in components. Move that conversion to domain/ and expose render-ready props from view-model/."
const complexStructureGuidance =
  "AI fix: complex interaction pages must include use-<page>-page.ts, <page>-data.ts or .tsx, domain/, view-model/, and components/ so stream/event/runtime work has a clear landing zone."

function getPageSourceFiles() {
  return findPageDirectories().flatMap((page) => findSourceFiles(page.dir))
}

function getModuleRole(file: string) {
  const normalized = file.split(path.sep).join("/")
  const fileName = path.basename(file)

  if (normalized.includes("/components/") || normalized.includes("/dialogs/")) {
    return "component"
  }

  if (/^use-[a-z0-9-]+-page\.ts$/.test(fileName)) {
    return "pageHook"
  }

  return "default"
}

function getMaxLines(file: string) {
  return maxLinesByRole[getModuleRole(file)]
}

function isTypeOnlyImport(node: ts.ImportDeclaration) {
  return node.importClause?.isTypeOnly === true
}

function isComponentSourceFile(file: string) {
  const normalized = file.split(path.sep).join("/")

  return file.endsWith(".tsx") && normalized.includes("/components/")
}

function isPageHookFile(file: string) {
  return /^use-[a-z0-9-]+-page\.ts$/.test(path.basename(file))
}

function isComponentFileWithImplementationState(file: string) {
  const { sourceFile } = readSourceFile(file)
  let hasReducer = false
  let hasComplexHookCount = 0

  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "useReducer"
    ) {
      hasReducer = true
    }

    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      (node.expression.text === "useMemo" || node.expression.text === "useEffect")
    ) {
      hasComplexHookCount += 1
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return hasReducer || hasComplexHookCount > 3
}

function hasRuntimeConversionImplementation(file: string) {
  const { sourceFile } = readSourceFile(file)
  let hasRuntimeConversion = false

  function checkName(name: ts.Node | undefined) {
    if (!name) {
      return
    }

    const text = name.getText(sourceFile)

    if (componentImplementationNamePattern.test(text)) {
      hasRuntimeConversion = true
    }
  }

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
      checkName(node.name)
    }

    if (
      ts.isVariableDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node) ||
      ts.isMethodDeclaration(node)
    ) {
      checkName(node.name)
    }

    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "reduce"
    ) {
      hasRuntimeConversion = true
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return hasRuntimeConversion
}

function hasComplexRuntimeSignal(pageFiles: string[]) {
  return pageFiles.some((file) => {
    const { sourceText } = readSourceFile(file)

    return complexRuntimePattern.test(sourceText)
  })
}

function isComplexInteractionPage(page: { dir: string }) {
  const pageName = path.basename(page.dir)

  if (complexPageNamePattern.test(pageName)) {
    return true
  }

  return hasComplexRuntimeSignal(findSourceFiles(page.dir))
}

function getDataFile(pageDir: string) {
  const pageName = path.basename(pageDir)
  const candidates = [
    path.join(pageDir, `${pageName}-data.ts`),
    path.join(pageDir, `${pageName}-data.tsx`),
  ]

  return candidates.find(fileExists) ?? null
}

function getPageHookFile(pageDir: string) {
  const pageName = path.basename(pageDir)
  const hookFile = path.join(pageDir, `use-${pageName}-page.ts`)

  return fileExists(hookFile) ? hookFile : null
}

function formatImportAdvice(
  findings: ReturnType<typeof findImportFindings>,
  guidance: string
) {
  return findings
    .map((finding) => `${finding.file}:${finding.line}. ${guidance}`)
    .sort()
}

describe(`${appName} page module boundaries`, () => {
  it("keeps page modules small enough to preserve reviewable boundaries", () => {
    const oversized = getPageSourceFiles()
      .map((file) => {
        const { sourceText } = readSourceFile(file)

        return {
          file,
          lines: sourceText.split(/\r?\n/).length,
          maxLines: getMaxLines(file),
        }
      })
      .filter((entry) => entry.lines > entry.maxLines)
      .map(
        (entry) =>
          `${toAppRelativePath(entry.file)}:${entry.lines} > ${entry.maxLines}. ${oversizedGuidance}`
      )
      .sort()

    expect(oversized).toEqual([])
  })

  it("keeps presentational page components away from API and query wiring", () => {
    const findings = findImportFindings(
      getPageSourceFiles().filter(isComponentSourceFile),
      (node) => {
        if (isTypeOnlyImport(node)) {
          return false
        }

        return forbiddenComponentValueImports.has(getImportSpecifier(node))
      }
    )

    expect(formatImportAdvice(findings, componentImportGuidance)).toEqual([])
  })

  it("keeps page hooks away from direct API and query wiring", () => {
    const findings = findImportFindings(
      getPageSourceFiles().filter(isPageHookFile),
      (node) => {
        if (isTypeOnlyImport(node)) {
          return false
        }

        return forbiddenPageHookValueImports.has(getImportSpecifier(node))
      }
    )

    expect(formatImportAdvice(findings, pageHookImportGuidance)).toEqual([])
  })

  it("keeps complex reducer and heavy derived state out of page components", () => {
    const mixedComponents = getPageSourceFiles()
      .filter(isComponentSourceFile)
      .filter(isComponentFileWithImplementationState)
      .map((file) => `${toAppRelativePath(file)}. ${componentStateGuidance}`)
      .sort()

    expect(mixedComponents).toEqual([])
  })

  it("keeps runtime and message conversion out of page components", () => {
    const mixedComponents = getPageSourceFiles()
      .filter(isComponentSourceFile)
      .filter(hasRuntimeConversionImplementation)
      .map((file) => `${toAppRelativePath(file)}. ${componentRuntimeGuidance}`)
      .sort()

    expect(mixedComponents).toEqual([])
  })

  it("keeps complex interaction pages on the required data/domain/view-model/components skeleton", () => {
    const missingStructure = findPageDirectories()
      .filter(isComplexInteractionPage)
      .flatMap((page) => {
        const missing = [
          getPageHookFile(page.dir) ? null : `use-${path.basename(page.dir)}-page.ts`,
          getDataFile(page.dir) ? null : `${path.basename(page.dir)}-data.ts`,
          isDirectory(path.join(page.dir, "domain")) ? null : "domain/",
          isDirectory(path.join(page.dir, "view-model")) ? null : "view-model/",
          isDirectory(path.join(page.dir, "components")) ? null : "components/",
        ].filter((entry): entry is string => Boolean(entry))

        return missing.length
          ? [
              `${page.name}: missing ${missing.join(", ")}. ${complexStructureGuidance}`,
            ]
          : []
      })
      .sort()

    expect(missingStructure).toEqual([])
  })
})
