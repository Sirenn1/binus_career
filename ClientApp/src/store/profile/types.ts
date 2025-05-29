export interface ProfileUser {
  userId: string;
  binusianId: string;
  fullName: string;
  position: string;
  email: string;
  currentRole: string;
  currentRoleDetailId: string;
  rolePermissions: RolePermission[];
  organizationRoles?: OrganizationRole[];
}

export interface OrganizationRole {
  roleId: number;
  roleName: string;
  roleDesc: string;
}

export interface RolePermission {
  permissionId: number;
  permissionName: string;
  permissionDesc: string;
} 