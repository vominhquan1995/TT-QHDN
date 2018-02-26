interface Account {
    id: any;
    guid: string;
    username: string;
    class: string;
    fullName: string;
    mssv: string;
    department: string;
    email: string;
    sex: boolean;
    dateOfBirth: Date;
    phoneNumber: string;
    address: string;
    passwordHashed: string;
    avatar: string;
    roleId: number;
    role: Role;
    companyId: number;
    company: Company;
    isActivated: boolean;
    createdDate: Date;
    modifiedDate: Date;
    applys: Apply[];
    cv: CV;
}