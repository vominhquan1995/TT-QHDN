interface Account {
    guid: string;
    username: string;
    class: string;
    lastname: string;
    firstname: string;
    email: string;
    sex: boolean;
    dateOfBirth: Date;
    phoneNumber: string;
    address: string;
    passwordHashed: string;
    avatar: string;
    roleId: number;
    role: Role;
    createdDate: Date;
    modifiedDate: Date;
}