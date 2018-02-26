export const NAV_MENU = [
    {
        link: "/", text: "trang chủ"
    }, {
        link: "/about", text: "giới thiệu"
    }, {
        link: "/jobs/list/internship", text: "thực tập"
    }, {
        link: "/jobs/list", text: "việc làm"
    },
    {
        link: "/company", text: "doanh nghiệp"
    },
    {
        link: "/events", text: "sự kiện"
    },
    //  {
    //     link: "/skills", text: "kĩ năng"
    // },
    {
        link: "/contact", text: "liên hệ"
    }
]
export const Role_Name = {
    Admin: "Admin",
    DoanhNghiep: "Company",
    SinhVien: "Student"
}
export const SETTING_MENUS = [
    {
        link: ".", text: "Tài khoản", role: Role_Name.SinhVien
    },
    {
        link: ".", text: "Tài khoản", role: Role_Name.DoanhNghiep
    },
    {
        link: "jobs", text: "Công việc", role: Role_Name.SinhVien
    },
]
export class UrlVariable {
    public static readonly URL_LOGIN = 'api/login'
}
export const STATUS_CODE = {
    Bad_Request: 400,
    Unauthorized: 401,
    Forbidden: 403,
    Not_Found: 404,
    Server_Error: 500,
    Bad_Gateway: 502
}
export const STATUS = {
    ACTIVE: "active",
    SPENDING: "spending"
}
export const URL_DEFAULT = {
    IMAGE_DEFAULT: "http://keithmackay.com/images/picture.jpg"
}
export const Status_Apply = {
    Waiting: "waiting",
    Seen: "seen",
    Interview: "interview",
    Passed: "passed",
    Failed: "failed"
}
