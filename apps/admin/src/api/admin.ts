import { request } from "@workspace/services/api/base"

export type AdminUserStatus = "enabled" | "disabled"
export type AppUserStatus = "enabled" | "disabled"

export interface AdminUserResponse {
  display_id?: string
  user_id: string
  display_name?: string
  remark?: string | null
  status: AdminUserStatus
  admin_roles?: RoleResponse[]
  roles?: RoleResponse[]
}

export interface AppUserResponse {
  display_id?: string
  user_id: string
  display_name?: string
  remark?: string | null
  status: AppUserStatus
  roles: RoleResponse[]
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  page_size: number
  total: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}

export interface CreateAdminUserRequest {
  identifier: string
  remark?: string | null
}

export interface UpdateAdminUserRequest {
  remark?: string | null
  status: AdminUserStatus
}

export interface UpdateAppUserRequest {
  remark?: string | null
  status: AppUserStatus
}

export interface RoleResponse {
  id: number
  name: string
  code: string
}

export interface CreateRoleRequest {
  name: string
  code: string
}

export type PermissionKind = "group" | "action"

export interface MenuResponse {
  id: number
  name: string
  parent_id: number | null
  permission_code: string | null
}

export interface CreateMenuRequest {
  name: string
  parent_id?: number | null
  permission_code?: string | null
}

export interface UserRoleOptionResponse {
  id: number
  name: string
  code: string
  checked: boolean
}

export type AppUserRoleOptionResponse = UserRoleOptionResponse

export interface UpdateRolePermissionsRequest {
  permission_ids: number[]
}

export interface UpdateUserRolesRequest {
  role_ids: number[]
}

export interface RolePermissionTreeNode {
  id: number
  name: string
  kind: PermissionKind
  checked: boolean
  children: RolePermissionTreeNode[]
}

export interface CurrentUserPermissionsResponse {
  user_id: string
  role_codes: string[]
  permission_codes: string[]
}

export type CurrentAppUserPermissionsResponse = CurrentUserPermissionsResponse

export interface CurrentUserMenuNode {
  id: number
  name: string
  parent_id: number | null
  permission_code: string | null
  children: CurrentUserMenuNode[]
}

export const createAdminUserApi = async (
  body: CreateAdminUserRequest
): Promise<AdminUserResponse> => {
  return request<CreateAdminUserRequest, AdminUserResponse>({
    method: "POST",
    url: "/api/admin/account/admin-users",
    body,
  })
}

export const listAdminUsersApi = async (): Promise<AdminUserResponse[]> => {
  return request<undefined, AdminUserResponse[]>({
    method: "GET",
    url: "/api/admin/account/admin-users",
  })
}

export const updateAdminUserApi = async (
  userId: string,
  body: UpdateAdminUserRequest
): Promise<AdminUserResponse> => {
  return request<UpdateAdminUserRequest, AdminUserResponse>({
    method: "PATCH",
    url: `/api/admin/account/admin-users/${encodeURIComponent(userId)}`,
    body,
  })
}

export const deleteAdminUserApi = async (userId: string): Promise<void> => {
  return request<undefined, void>({
    method: "DELETE",
    url: `/api/admin/account/admin-users/${encodeURIComponent(userId)}`,
  })
}

export interface ListAppUsersRequest {
  page?: number
  page_size?: number
  keyword?: string
  status?: AppUserStatus
  created_at_from?: string
  created_at_to?: string
  updated_at_from?: string
  updated_at_to?: string
}

export const listAppUsersApi = async (
  params: ListAppUsersRequest = {}
): Promise<PaginatedResponse<AppUserResponse>> => {
  return request<ListAppUsersRequest, PaginatedResponse<AppUserResponse>>({
    method: "GET",
    url: "/api/admin/account/app-users",
    body: params,
  })
}

export const updateAppUserApi = async (
  userId: string,
  body: UpdateAppUserRequest
): Promise<AppUserResponse> => {
  return request<UpdateAppUserRequest, AppUserResponse>({
    method: "PATCH",
    url: `/api/admin/account/app-users/${encodeURIComponent(userId)}`,
    body,
  })
}

export const deleteAppUserApi = async (userId: string): Promise<void> => {
  return request<undefined, void>({
    method: "DELETE",
    url: `/api/admin/account/app-users/${encodeURIComponent(userId)}`,
  })
}

export const createRoleApi = async (
  body: CreateRoleRequest
): Promise<RoleResponse> => {
  return request<CreateRoleRequest, RoleResponse>({
    method: "POST",
    url: "/api/admin/access/roles",
    body,
  })
}

export const listRolesApi = async (): Promise<RoleResponse[]> => {
  return request<undefined, RoleResponse[]>({
    method: "GET",
    url: "/api/admin/access/roles",
  })
}

export const deleteRoleApi = async (roleId: number): Promise<void> => {
  return request<undefined, void>({
    method: "DELETE",
    url: `/api/admin/access/roles/${encodeURIComponent(String(roleId))}`,
  })
}

export const createAppRoleApi = async (
  body: CreateRoleRequest
): Promise<RoleResponse> => {
  return request<CreateRoleRequest, RoleResponse>({
    method: "POST",
    url: "/api/admin/access/app-roles",
    body,
  })
}

export const listAppRolesApi = async (): Promise<RoleResponse[]> => {
  return request<undefined, RoleResponse[]>({
    method: "GET",
    url: "/api/admin/access/app-roles",
  })
}

export const deleteAppRoleApi = async (roleId: number): Promise<void> => {
  return request<undefined, void>({
    method: "DELETE",
    url: `/api/admin/access/app-roles/${encodeURIComponent(String(roleId))}`,
  })
}

export const createMenuApi = async (
  body: CreateMenuRequest
): Promise<MenuResponse> => {
  return request<CreateMenuRequest, MenuResponse>({
    method: "POST",
    url: "/api/admin/access/menus",
    body,
  })
}

export const listMenusApi = async (): Promise<MenuResponse[]> => {
  return request<undefined, MenuResponse[]>({
    method: "GET",
    url: "/api/admin/access/menus",
  })
}

export const listUserRolesApi = async (
  userId: string
): Promise<UserRoleOptionResponse[]> => {
  return request<undefined, UserRoleOptionResponse[]>({
    method: "GET",
    url: `/api/admin/account/admin-users/${encodeURIComponent(userId)}/roles`,
  })
}

export const updateUserRolesApi = async (
  userId: string,
  body: UpdateUserRolesRequest
): Promise<UserRoleOptionResponse[]> => {
  return request<UpdateUserRolesRequest, UserRoleOptionResponse[]>({
    method: "PUT",
    url: `/api/admin/account/admin-users/${encodeURIComponent(userId)}/roles`,
    body,
  })
}

export const listAppUserRolesApi = async (
  userId: string
): Promise<AppUserRoleOptionResponse[]> => {
  return request<undefined, AppUserRoleOptionResponse[]>({
    method: "GET",
    url: `/api/admin/account/app-users/${encodeURIComponent(userId)}/roles`,
  })
}

export const updateAppUserRolesApi = async (
  userId: string,
  body: UpdateUserRolesRequest
): Promise<AppUserRoleOptionResponse[]> => {
  return request<UpdateUserRolesRequest, AppUserRoleOptionResponse[]>({
    method: "PUT",
    url: `/api/admin/account/app-users/${encodeURIComponent(userId)}/roles`,
    body,
  })
}

export const listRolePermissionsApi = async (
  roleId: number
): Promise<RolePermissionTreeNode[]> => {
  return request<undefined, RolePermissionTreeNode[]>({
    method: "GET",
    url: `/api/admin/access/roles/${encodeURIComponent(String(roleId))}/permissions`,
  })
}

export const updateRolePermissionsApi = async (
  roleId: number,
  body: UpdateRolePermissionsRequest
): Promise<RolePermissionTreeNode[]> => {
  return request<UpdateRolePermissionsRequest, RolePermissionTreeNode[]>({
    method: "PUT",
    url: `/api/admin/access/roles/${encodeURIComponent(String(roleId))}/permissions`,
    body,
  })
}

export const listAppRolePermissionsApi = async (
  roleId: number
): Promise<RolePermissionTreeNode[]> => {
  return request<undefined, RolePermissionTreeNode[]>({
    method: "GET",
    url: `/api/admin/access/app-roles/${encodeURIComponent(String(roleId))}/permissions`,
  })
}

export const updateAppRolePermissionsApi = async (
  roleId: number,
  body: UpdateRolePermissionsRequest
): Promise<RolePermissionTreeNode[]> => {
  return request<UpdateRolePermissionsRequest, RolePermissionTreeNode[]>({
    method: "PUT",
    url: `/api/admin/access/app-roles/${encodeURIComponent(String(roleId))}/permissions`,
    body,
  })
}

export const getCurrentUserPermissionsApi =
  async (): Promise<CurrentUserPermissionsResponse> => {
    return request<undefined, CurrentUserPermissionsResponse>({
      method: "GET",
      url: "/api/admin/me/permissions",
    })
  }

export const getCurrentUserMenusApi = async (): Promise<
  CurrentUserMenuNode[]
> => {
  return request<undefined, CurrentUserMenuNode[]>({
    method: "GET",
    url: "/api/admin/me/menus",
  })
}

export const getCurrentAppUserPermissionsApi =
  async (): Promise<CurrentAppUserPermissionsResponse> => {
    return request<undefined, CurrentAppUserPermissionsResponse>({
      method: "GET",
      url: "/api/app/me/permissions",
    })
  }
