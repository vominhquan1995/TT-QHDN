import { Role_Name } from "@app/admin/shared/variables";

export const ADMIN_MENU = [
    {
        path: '/admin/dashboard',
        title: 'Trang chủ',
        icon: 'fa-home',
        role: Role_Name.Admin
    },
    {
        path: '/admin/manager-user',
        title: 'Quản lí người dùng',
        icon: 'fa-users',
        role: Role_Name.Admin
    },
    {
        path: '/admin/manager-company',
        title: 'Quản lí doanh nghiệp',
        icon: 'fa-university',
        role: Role_Name.Admin
    },
    {
        path: '/admin/manager-job',
        title: 'Quản lí việc làm',
        icon: 'fa-list',
        role: Role_Name.Admin
    },
    {
        path: '/admin/manager-apply',
        title: 'Quản lí tuyển dụng',
        icon: 'fa-address-card',
        role: Role_Name.Admin
    },
    {
        path: '/admin/manager-event',
        title: 'Quản lí sự kiện',
        icon: 'fa-gift',
        role: Role_Name.Admin
    },
    {
        path: '/admin/manager-job-group',
        title: 'Quản lí nhóm ngành',
        icon: 'fa-wrench',
        role: Role_Name.Admin
    },
    {
        path: '/admin/manager-work-type',
        title: 'Quản lí loại việc làm',
        icon: 'fa-cogs',
        role: Role_Name.Admin
    },
    {
        path: '/admin/manager-slide',
        title: 'Quản lí slide',
        icon: 'fa-clone',
        role: Role_Name.Admin
    },
    {
        path: '/',
        title: 'Trang người dùng',
        icon: 'fa-desktop',
        role: Role_Name.Admin
    }
];