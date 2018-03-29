interface Company extends Base {
    name: string;
    jobGroup: string;
    address: string;
    emailCompany: string;
    phoneCompany: string;
    taxCode: string;
    urlLogo: string;
    phoneNumber: string;
    representor: string;
    emailrePresentor: string;
    phonerePresentor: string;
    representorAnother: string;
    description: string;
    isPartner: boolean;
    jobs: Job[]
    accounts: Account[]
}