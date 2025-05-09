import { ApprovalRequestAlumniPage } from '../pages/alumni_association/ApprovalRequest';
import { EditAlumniAssociation } from '../pages/alumni_association/EditAlumniAssociation';
import { InputAlumniAssociation } from '../pages/alumni_association/InputAlumniAssociation';
import { ReportIkatanAlumni } from '../pages/alumni_association/ReportAlumniAssociation';
import { Approval as AlumniUpdateApproval } from '../pages/alumni-update/Approval';
import { Edit as AlumniUpdateEdit } from '../pages/alumni-update/Edit';
import { EditUsingImport as AlumniUpdateImport } from '../pages/alumni-update/Import';
import { Index as AlumniUpdateIndex } from '../pages/alumni-update/Index';
import { FindAlumniData } from '../pages/AlumniData/FindAlumniData';
import { FindAlumniDetail } from '../pages/AlumniData/FindAlumniDetail';
import Dashboard from '../pages/dashboard/Dashboard';
import { DetailDashboardByCompany } from '../pages/dashboard/DashboardByCompany';
import { DetailDashboardByDegree } from '../pages/dashboard/DashboardByDegree';
import { DetailDashboardByDomicile } from '../pages/dashboard/DashboardbyDomicile';
import { DetailDashboardByJob } from '../pages/dashboard/DashboardbyJob';
import { DetailDashboardByUpdatedData } from '../pages/dashboard/DashboardByUpdatedData';
import { DataBlastPage } from '../pages/data_blasts/DataBlast';
import { AddEndowment } from '../pages/Endowment/AddEndowment';
import { ApprovalEndowment } from '../pages/Endowment/ApprovalEndowment';
import { EditEndowment } from '../pages/Endowment/EditEndowment';
import { ImportEndowment } from '../pages/Endowment/ImportEndowment';
import { ViewEndowment } from '../pages/Endowment/ViewEndowment';
import { AddEngagement } from '../pages/Engagement/AddEngagement';
import { ApprovalEngagement } from '../pages/Engagement/ApprovalEngagement';
import { EditEngagement } from '../pages/Engagement/EditEngagement';
import { ImportEngagement } from '../pages/Engagement/ImportEngagement';
import { ViewEngagement } from '../pages/Engagement/ViewEngagement';
import { Error404 } from '../pages/Error/Error404';
import EditProminent from '../pages/prominent/EditProminent';
import ImportProminent from '../pages/prominent/ImportProminent';
import InputProminent from '../pages/prominent/InputProminent';
import ListProminent from '../pages/prominent/ListProminent';
import { AddRole } from '../pages/UserManagement/AddRole';
import { AddSelectUser } from '../pages/UserManagement/AddSelectUser';
import { AddUser } from '../pages/UserManagement/AddUser';
import { EditRole } from '../pages/UserManagement/EditRole';
import { EditUser } from '../pages/UserManagement/EditUser';
import { ViewRole } from '../pages/UserManagement/ViewRole';
import { ViewRolePermissions } from '../pages/UserManagement/ViewRolePermissions';
import { ViewUser } from '../pages/UserManagement/ViewUser';
import { ViewUserRoles } from '../pages/UserManagement/ViewUserRoles';
import { Route } from '../types/route';
import { ApprovalRequest } from '../pages/AlumniData/ApprovalRequest';
import { ApprovalRequestDetail } from '../pages/AlumniData/ApprovalRequestDetail';
import { ApprovalRequestProminentData } from "../pages/approval_prominent/approval_request/Index";
import { DetailProminent } from "../pages/approval_prominent/detail_prominent/DetailProminent";

export const protectedRoutes: Route[] = [
  // {
  //   key: 'router-dashboard',
  //   title: 'Component',
  //   description: 'Component',
  //   component: ComponentPage,
  //   path: '/Component',
  //   isEnabled: true,
  //   appendDivider: true,
  // },
  // {
  //   key: 'view-dashboard',
  //   title: 'Dashboard',
  //   description: 'Dashboard',
  //   component: HomePage,
  //   path: '/',
  //   isEnabled: true,
  //   appendDivider: true,
  // },
  {
    key: "view-dashboard",
    title: "Dashboard",
    description: "Dashboard",
    component: Dashboard,
    path: "/",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-dashboard',
    title: 'Alumni Data by Degree',
    description: 'Filter Alumni Data',
    component: DetailDashboardByDegree,
    path: '/dashboard/degree',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-dashboard',
    title: 'Alumni Data by Job',
    description: 'Filter Alumni Data',
    component: DetailDashboardByJob,
    path: '/dashboard/job',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-dashboard',
    title: 'Alumni Data by Job',
    description: 'Filter Alumni Data',
    component: DetailDashboardByCompany,
    path: '/dashboard/company',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-dashboard',
    title: 'Alumni Data by Domicile',
    description: 'Filter Alumni Data',
    component: DetailDashboardByDomicile,
    path: '/dashboard/domicile',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-dashboard',
    title: 'Alumni Data',
    description: 'Filter Alumni Data',
    component: DetailDashboardByUpdatedData,
    path: '/dashboard/updated-data',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-data-blast',
    title: 'Data Blast',
    description: 'Data Blast',
    component: DataBlastPage,
    path: "/data-blasts",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "view-user",
    title: "List User",
    description: "List User",
    component: ViewUser,
    path: '/list-user',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-user',
    title: 'Mapping Role: ',
    description: 'List User',
    component: ViewUserRoles,
    path: '/view-user-role/:userId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'add-user',
    title: 'Add User',
    description: 'Add User',
    component: AddUser,
    path: '/add-user',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'edit-user',
    title: 'Edit User',
    description: 'Edit User',
    component: EditUser,
    path: '/edit-user/:trUserRoleDetailId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'add-user',
    title: 'Add User',
    description: 'Add Selected User',
    component: AddSelectUser,
    path: '/add-user/:binusianId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-role',
    title: 'View Roles',
    description: 'View Roles',
    component: ViewRole,
    path: '/view-role',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'add-role',
    title: 'Add Role',
    description: 'Add Role',
    component: AddRole,
    path: '/add-role',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'edit-role',
    title: 'Edit Role',
    description: 'Edit Role',
    component: EditRole,
    path: '/edit-role/:roleId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'assign-role-permission',
    title: 'Role Permissions',
    description: 'Role Permissions',
    component: ViewRolePermissions,
    path: '/role-permission/:roleId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-dashboard',
    title: 'Dashboard',
    description: 'Dashboard',
    component: Dashboard,
    path: '/',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "view-engagement",
    title: "View Engagement",
    description: "Engagement",
    component: ViewEngagement,
    path: "/engagement/view",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "add-engagement",
    title: "Add Engagement",
    description: "Import Engagement",
    component: ImportEngagement,
    path: "/Engagement/Import",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "add-engagement",
    title: "Add Engagement",
    description: "Add Engagement",
    component: AddEngagement,
    path: "/Engagement/Add",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "edit-engagement",
    title: "Edit Engagement",
    description: "Edit Engagement",
    component: EditEngagement,
    path: "/Engagement/Edit/:id",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "view-approval-engagement",
    title: "Approval Request Engagement Data",
    description: "Approval Engagement",
    component: ApprovalEngagement,
    path: "/engagement/approval",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "view-endowment",
    title: "View Endowment",
    description: "Endowment",
    component: ViewEndowment,
    path: "/endowment/view",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "add-endowment",
    title: "Add Endowment",
    description: "Import Endowment",
    component: ImportEndowment,
    path: "/Endowment/Import",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "add-endowment",
    title: "Add Endowment",
    description: "Add Endowment",
    component: AddEndowment,
    path: "/Endowment/Add",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "edit-endowment",
    title: "Edit Endowment",
    description: "Edit Endowment",
    component: EditEndowment,
    path: "/Endowment/Edit/:id",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "view-approval-endowment",
    title: "Approval Request Endowment Data",
    description: "Approval Endowment",
    component: ApprovalEndowment,
    path: "/endowment/approval",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "update-data",
    title: "Update Alumni Data",
    description: "Index data for alumni",
    component: AlumniUpdateIndex,
    path: "alumni",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'update-data',
    title: 'Update Alumni Data',
    description: 'Index data for alumni',
    component: AlumniUpdateIndex,
    path: 'update-alumni/list',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-update-data',
    title: 'Update Alumni Data',
    description: 'Update data for alumni',
    component: AlumniUpdateEdit,
    path: 'update-alumni/:alumniId/edit',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-update-data',
    title: 'Update Alumni Data',
    description: 'Update data for alumni',
    component: AlumniUpdateImport,
    path: 'update-alumni/import',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-approval-update-data',
    title: 'Approval Update Data',
    description: 'Index approval data for alumni',
    component: AlumniUpdateApproval,
    path: 'update-alumni/approval',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-find-alumni',
    title: 'Find Alumni Data',
    description: 'Find Alumni Data',
    component: FindAlumniData,
    path: '/find-alumni',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-find-alumni',
    title: 'Find Alumni Detail',
    description: 'Find Alumni Data',
    component: FindAlumniDetail,
    path: '/find-alumni/:alumniId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'add-prominent',
    title: 'Input Prominent',
    description: 'Input Prominent',
    component: InputProminent,
    path: '/prominent/add',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-prominent',
    title: 'List Prominent',
    description: 'List Prominent',
    component: ListProminent,
    path: '/prominent/view',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'edit-prominent',
    title: 'Edit Prominent',
    description: 'Edit Prominent',
    component: EditProminent,
    path: '/prominent/edit/:prominentId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'add-prominent',
    title: 'Import Prominent',
    description: 'Import Prominent',
    component: ImportProminent,
    path: '/prominent/import',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-approval-alumni-association',
    title: 'Request Approval Alumni Association',
    description: 'Request Approval Alumni Association',
    component: ApprovalRequestAlumniPage,
    path: '/alumni/association/approval',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'add-alumni-association',
    title: 'Add Alumni Association',
    description: 'Add Alumni Association',
    component: InputAlumniAssociation,
    path: '/alumni/association/add',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'edit-alumni-association',
    title: 'Edit Alumni Association',
    description: 'Edit Alumni Association',
    component: EditAlumniAssociation,
    path: '/alumni/association/edit/:mappingLeaderId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-report-alumni-association',
    title: 'Report Alumni Association',
    description: 'Report Alumni Association',
    component: ReportIkatanAlumni,
    path: '/alumni/association/report',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: '',
    title: '',
    description: 'error404',
    component: Error404,
    path: '/*',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-approval-request-data',
    title: 'Approval Request Data',
    description: 'Approval Request Data',
    component: ApprovalRequest,
    path: '/approval-request',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: 'view-approval-request-data',
    title: 'Approval Request Detail',
    description: 'Approval Request Detail',
    component: ApprovalRequestDetail,
    path: '/approval-request/:approvalId',
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "view-approval-prominent",
    title: "Approval Request Prominent Data",
    description: "Approval Request Prominent Data",
    component: ApprovalRequestProminentData,
    path: "/prominent/approval",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "approval-prominent-data",
    title: "Approval Request Prominent Data",
    description: "Approval Request Prominent Data",
    component: ApprovalRequestProminentData,
    path: "/prominent/approval",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "view-approval-prominent",
    title: "Approval Request Prominent Data",
    description: "Approval Request Prominent Data",
    component: DetailProminent,
    path: "/prominent/approval/:id",
    isEnabled: true,
    appendDivider: true,
  },
];
