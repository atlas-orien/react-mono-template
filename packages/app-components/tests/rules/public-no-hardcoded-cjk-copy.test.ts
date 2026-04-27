import { describe, expect, it } from "vitest"
import {
  findPublicSourceFiles,
  findSourceFilesMatching,
  toFiles,
} from "./ast-helpers"

describe("app-components public i18n protocols", () => {
  it("does not embed hardcoded CJK copy in public source files", () => {
    const matches = findSourceFilesMatching(findPublicSourceFiles(), (_, sourceText) =>
      /[\p{Script=Han}]/u.test(sourceText)
    )

    expect(toFiles(matches)).toEqual([])
  })
})
