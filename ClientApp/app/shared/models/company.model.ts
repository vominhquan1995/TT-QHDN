interface Company extends Base{
    name: string;
    shortName: string;
    address: string;
    email:string;
    taxCode:string;
    phoneNumber: string;
    website: string;
    scales: string;
    urlLogo: string;
    representor: string;
    description: string;
    isPartner:boolean;
    jobs:Job[]
    accounts:Account[]
}