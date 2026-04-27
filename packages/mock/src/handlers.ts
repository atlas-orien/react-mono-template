import { http, HttpResponse } from "msw"

interface MockUserState {
  id: string
  displayUserId: string
  username: string
  displayName: string
  email: string
  avatar: string
  emailVerified: boolean
  disabled: boolean
  roleCodes: string[]
  menuPermissionCodes: string[]
  permissionCodes: string[]
}

interface MockFileRecord {
  key: string
  kind: "avatar" | "image" | "document"
}

interface MockTableUser {
  id: string
  name: string
  role: "Admin" | "Editor" | "Viewer"
  status: "Active" | "Paused"
  region: string
}

const authTokens = {
  accessToken: "test-access-token",
  refreshToken: "test-refresh-token",
}

let currentUser: MockUserState = {
  id: "1b1f4e1d-5b4f-4d25-ae07-520f587f8d13",
  displayUserId: "u_mock_1001",
  username: "tester",
  displayName: "Tester",
  email: "tester@example.com",
  avatar: "",
  emailVerified: true,
  disabled: false,
  roleCodes: ["super_admin"],
  menuPermissionCodes: ["admin:user", "admin:access"],
  permissionCodes: [
    "admin:user",
    "admin:user:list",
    "admin:user:create",
    "admin:user_role:list",
    "admin:user_role:assign",
    "admin:access",
    "admin:role:list",
    "admin:permission:list",
    "admin:role_permission:grant",
  ],
}

const menuTree = [
  {
    id: 1,
    name: "用户管理",
    path: "/users",
    parent_id: null,
    permission_code: "admin:user",
    children: [],
  },
  {
    id: 2,
    name: "权限管理",
    path: "/access",
    parent_id: null,
    permission_code: "admin:access",
    children: [],
  },
]

const uploadedFiles = new Map<string, MockFileRecord>()
const tableUsers: MockTableUser[] = [
  { id: "u-001", name: "Alice Chen", role: "Admin", status: "Active", region: "Shanghai" },
  { id: "u-002", name: "Brian Sun", role: "Editor", status: "Paused", region: "Beijing" },
  { id: "u-003", name: "Cindy Zhou", role: "Viewer", status: "Active", region: "Shenzhen" },
  { id: "u-004", name: "David Lin", role: "Editor", status: "Active", region: "Hangzhou" },
  { id: "u-005", name: "Eva Wang", role: "Viewer", status: "Paused", region: "Guangzhou" },
  { id: "u-006", name: "Frank He", role: "Admin", status: "Active", region: "Suzhou" },
  { id: "u-007", name: "Grace Xu", role: "Editor", status: "Active", region: "Nanjing" },
  { id: "u-008", name: "Henry Qian", role: "Viewer", status: "Paused", region: "Chengdu" },
  { id: "u-009", name: "Ivy Luo", role: "Admin", status: "Active", region: "Wuhan" },
  { id: "u-010", name: "Jason Yu", role: "Viewer", status: "Active", region: "Xiamen" },
  { id: "u-011", name: "Kelly Tang", role: "Editor", status: "Paused", region: "Tianjin" },
  { id: "u-012", name: "Leo Fang", role: "Viewer", status: "Active", region: "Ningbo" },
]

function success<T>(data: T) {
  return HttpResponse.json({
    code: 0,
    message: "ok",
    data,
  })
}

function createSignedUpload(
  kind: MockFileRecord["kind"],
  ext = "bin"
): {
  method: "PUT"
  upload_url: string
  key: string
  headers: {
    authorization: string
    "x-amz-date": string
    "x-amz-content-sha256": string
  }
} {
  const safeExt = ext.replace(/^\./, "") || "bin"
  const key = `${kind}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`

  uploadedFiles.set(key, { key, kind })

  return {
    method: "PUT",
    upload_url: `https://mock-storage.local/upload/${encodeURIComponent(key)}`,
    key,
    headers: {
      authorization: "MOCK_AUTH",
      "x-amz-date": "20260101T000000Z",
      "x-amz-content-sha256": "MOCK_SHA256",
    },
  }
}

export const handlers = [
  http.get("*/api/users", async ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get("page") ?? "1")
    const pageSize = Number(url.searchParams.get("pageSize") ?? "10")
    const safePage = Number.isFinite(page) && page > 0 ? page : 1
    const safePageSize =
      Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10
    const start = (safePage - 1) * safePageSize

    await new Promise((resolve) => setTimeout(resolve, 500))

    return success({
      items: tableUsers.slice(start, start + safePageSize),
      total: tableUsers.length,
    })
  }),

  http.post("*/auth/session/login", async ({ request }) => {
    const body = (await request.json().catch(() => null)) as {
      identifier?: string
    } | null
    const identifier = body?.identifier?.trim().toLowerCase() ?? ""

    if (identifier.includes("access")) {
      currentUser.roleCodes = ["security_admin"]
      currentUser.menuPermissionCodes = ["admin:access"]
      currentUser.permissionCodes = [
        "admin:access",
        "admin:role:list",
        "admin:permission:list",
        "admin:role_permission:grant",
      ]
    } else if (identifier.includes("user")) {
      currentUser.roleCodes = ["ops_admin"]
      currentUser.menuPermissionCodes = ["admin:user"]
      currentUser.permissionCodes = [
        "admin:user",
        "admin:user:list",
        "admin:user:create",
        "admin:user_role:list",
        "admin:user_role:assign",
      ]
    } else {
      currentUser.roleCodes = ["super_admin"]
      currentUser.menuPermissionCodes = ["admin:user", "admin:access"]
      currentUser.permissionCodes = [
        "admin:user",
        "admin:user:list",
        "admin:user:create",
        "admin:user_role:list",
        "admin:user_role:assign",
        "admin:access",
        "admin:role:list",
        "admin:permission:list",
        "admin:role_permission:grant",
      ]
    }

    return success(authTokens)
  }),

  http.post("*/auth/session/register", async ({ request }) => {
    const body = (await request.json().catch(() => null)) as {
      username?: string
      display_name?: string
      email?: string
    } | null

    currentUser = {
      ...currentUser,
      username: body?.username?.trim() || currentUser.username,
      displayName:
        body?.display_name?.trim() ||
        body?.username?.trim() ||
        currentUser.displayName,
      email: body?.email?.trim() || currentUser.email,
    }

    return success(null)
  }),

  http.post("*/auth/session/refresh_token", async () => {
    return success({
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
    })
  }),

  http.get("*/auth/user/me", async () => {
    return success({
      id: currentUser.id,
      display_user_id: currentUser.displayUserId,
      username: currentUser.username,
      display_name: currentUser.displayName,
      avatar: currentUser.avatar,
      email: currentUser.email,
      email_verified: currentUser.emailVerified,
      disabled: currentUser.disabled,
    })
  }),

  http.post("*/api/app/register", async ({ request }) => {
    const body = (await request.json().catch(() => null)) as {
      userId?: string
      displayId?: string
      displayName?: string
      remark?: string | null
    } | null

    return success({
      userId: body?.userId ?? currentUser.id,
      displayId: body?.displayId ?? currentUser.displayUserId,
      displayName: body?.displayName ?? currentUser.displayName,
      remark: body?.remark ?? null,
      status: "enabled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      roles: [{ id: 1, name: "Free", code: "free" }],
    })
  }),

  http.get("*/api/admin/me/menus", async () => {
    return success(
      menuTree.filter((item) =>
        currentUser.menuPermissionCodes.includes(item.permission_code)
      )
    )
  }),

  http.get("*/api/admin/me/permissions", async () => {
    return success({
      user_id: currentUser.id,
      role_codes: currentUser.roleCodes,
      permission_codes: currentUser.permissionCodes,
    })
  }),

  http.put("*/auth/user/profile", async ({ request }) => {
    const body = (await request.json()) as {
      display_name?: string | null
      avatar?: string | null
    }

    if (typeof body.display_name === "string") {
      currentUser.displayName = body.display_name
    }

    if (typeof body.avatar === "string") {
      currentUser.avatar = body.avatar
    }

    return success(null)
  }),

  http.put("*/auth/user/email", async ({ request }) => {
    const body = (await request.json()) as {
      email?: string | null
    }

    currentUser.email = body.email ?? ""
    currentUser.emailVerified = false

    return success(null)
  }),

  http.put("*/auth/user/password", async () => {
    return success(null)
  }),

  http.post("*/auth/user/email/verify", async () => {
    currentUser.emailVerified = true
    return success(null)
  }),

  http.get("*/file/sign/upload/avatar", async () => {
    return success(createSignedUpload("avatar", "png"))
  }),

  http.get("*/file/sign/upload/image", async ({ request }) => {
    const url = new URL(request.url)
    const ext = url.searchParams.get("ext") ?? "png"

    return success(createSignedUpload("image", ext))
  }),

  http.get("*/file/sign/upload/document", async ({ request }) => {
    const url = new URL(request.url)
    const ext = url.searchParams.get("ext") ?? "pdf"

    return success(createSignedUpload("document", ext))
  }),

  http.get("*/file/sign/access", async ({ request }) => {
    const url = new URL(request.url)
    const key = url.searchParams.get("key") ?? ""

    return success({
      method: "GET",
      download_url: `https://mock-storage.local/download/${encodeURIComponent(key)}`,
      key,
    })
  }),

  http.get("*/file/sign/delete", async ({ request }) => {
    const url = new URL(request.url)
    const key = url.searchParams.get("key") ?? ""

    return success({
      method: "DELETE",
      delete_url: `https://mock-storage.local/delete/${encodeURIComponent(key)}`,
      key,
      headers: {
        authorization: "MOCK_AUTH",
        "x-amz-date": "20260101T000000Z",
        "x-amz-content-sha256": "MOCK_SHA256",
      },
    })
  }),

  http.put("https://mock-storage.local/upload/:key", async () => {
    return new HttpResponse(null, { status: 200 })
  }),

  http.delete("https://mock-storage.local/delete/:key", async ({ params }) => {
    const key = decodeURIComponent(String(params.key ?? ""))
    uploadedFiles.delete(key)

    return new HttpResponse(null, { status: 200 })
  }),

  http.get("https://mock-storage.local/download/:key", async ({ params }) => {
    const key = decodeURIComponent(String(params.key ?? ""))
    const record = uploadedFiles.get(key)

    if (!record) {
      return new HttpResponse("Not Found", { status: 404 })
    }

    return HttpResponse.json({
      key: record.key,
      kind: record.kind,
      message: "mock download resource",
    })
  }),
]
