import { request } from "@workspace/services/api/base"

export type AdminUserStatus = "enabled" | "disabled"

export interface AdminUserResponse {
  display_id?: string
  user_id: string
  display_name?: string
  remark?: string | null
  status: AdminUserStatus
  roles: RoleResponse[]
}

export interface CreateAdminUserRequest {
  identifier: string
  remark?: string | null
}

export interface UpdateAdminUserRequest {
  remark?: string | null
  status: AdminUserStatus
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

export interface AssignUserRoleRequest {
  user_id: string
  role_id: number
}

export interface UserRoleResponse {
  user_id: string
  role_id: number
}

export interface UpdateRolePermissionsRequest {
  permission_ids: number[]
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
    url: "/api/admin/admin-users",
    body,
  })
}

export const listAdminUsersApi = async (): Promise<AdminUserResponse[]> => {
  return request<undefined, AdminUserResponse[]>({
    method: "GET",
    url: "/api/admin/admin-users",
  })
}

export const updateAdminUserApi = async (
  userId: string,
  body: UpdateAdminUserRequest
): Promise<AdminUserResponse> => {
  return request<UpdateAdminUserRequest, AdminUserResponse>({
    method: "PATCH",
    url: `/api/admin/admin-users/${encodeURIComponent(userId)}`,
    body,
  })
}

export const deleteAdminUserApi = async (userId: string): Promise<void> => {
  return request<undefined, void>({
    method: "DELETE",
    url: `/api/admin/admin-users/${encodeURIComponent(userId)}`,
  })
}

export const createRoleApi = async (
  body: CreateRoleRequest
): Promise<RoleResponse> => {
  return request<CreateRoleRequest, RoleResponse>({
    method: "POST",
    url: "/api/admin/roles",
    body,
  })
}

export const listRolesApi = async (): Promise<RoleResponse[]> => {
  return request<undefined, RoleResponse[]>({
    method: "GET",
    url: "/api/admin/roles",
  })
}

export const deleteRoleApi = async (roleId: number): Promise<void> => {
  return request<undefined, void>({
    method: "DELETE",
    url: `/api/admin/roles/${encodeURIComponent(String(roleId))}`,
  })
}

export const createMenuApi = async (
  body: CreateMenuRequest
): Promise<MenuResponse> => {
  return request<CreateMenuRequest, MenuResponse>({
    method: "POST",
    url: "/api/admin/menus",
    body,
  })
}

export const listMenusApi = async (): Promise<MenuResponse[]> => {
  return request<undefined, MenuResponse[]>({
    method: "GET",
    url: "/api/admin/menus",
  })
}

export const assignUserRoleApi = async (
  body: AssignUserRoleRequest
): Promise<UserRoleResponse> => {
  return request<AssignUserRoleRequest, UserRoleResponse>({
    method: "POST",
    url: "/api/admin/user-roles",
    body,
  })
}

export const listUserRolesApi = async (
  userId: string
): Promise<RoleResponse[]> => {
  return request<undefined, RoleResponse[]>({
    method: "GET",
    url: `/api/admin/users/${userId}/roles`,
  })
}

export const listRolePermissionsApi = async (
  roleId: number
): Promise<RolePermissionTreeNode[]> => {
  return request<undefined, RolePermissionTreeNode[]>({
    method: "GET",
    url: `/api/admin/roles/${encodeURIComponent(String(roleId))}/permissions`,
  })
}

export const updateRolePermissionsApi = async (
  roleId: number,
  body: UpdateRolePermissionsRequest
): Promise<RolePermissionTreeNode[]> => {
  return request<UpdateRolePermissionsRequest, RolePermissionTreeNode[]>({
    method: "PUT",
    url: `/api/admin/roles/${encodeURIComponent(String(roleId))}/permissions`,
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

export const getCurrentUserMenusApi = async (): Promise<CurrentUserMenuNode[]> => {
  return request<undefined, CurrentUserMenuNode[]>({
    method: "GET",
    url: "/api/admin/me/menus",
  })
}
