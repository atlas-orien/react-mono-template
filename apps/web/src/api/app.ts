import { request } from "@workspace/services/api/base"

export type AppUserStatus = "enabled" | "disabled"

export interface AppRoleResponse {
  id: number
  name: string
  code: string
  createdAt?: string
  updatedAt?: string
}

export interface AppUserResponse {
  userId: string
  displayId: string
  displayName: string
  remark?: string | null
  status: AppUserStatus
  createdAt?: string
  updatedAt?: string
  roles: AppRoleResponse[]
}

export interface RegisterAppUserRequest {
  userId: string
  displayId: string
  displayName: string
  remark?: string | null
}

export interface CurrentAppUserPermissionsResponse {
  userId: string
  roleCodes: string[]
  permissionCodes: string[]
}

export const registerAppUserApi = async (
  body: RegisterAppUserRequest
): Promise<AppUserResponse> => {
  return request<RegisterAppUserRequest, AppUserResponse>({
    method: "POST",
    url: "/api/app/register",
    body,
  })
}

export const getCurrentAppUserPermissionsApi =
  async (): Promise<CurrentAppUserPermissionsResponse> => {
    return request<undefined, CurrentAppUserPermissionsResponse>({
      method: "GET",
      url: "/api/app/me/permissions",
    })
  }
