interface Job extends Base {
    place: string;
    title: string;
    shortDescription: string;
    experience: string;
    position: string;
    benefit: string;
    number: string;
    timePre: string;
    // majorTag: string;
    age: string;
    deadlineApply: Date;
    appliedCount: number;
    viewCount: number;
    isHot:boolean;
    // lowestSalary: number;
    // highestSalary: number;
    salary: string;
    companyId: number;
    company: Company;
    workTypeId: number;
    workType: WorkType;
    jobGroupId: number;
    jobGroup: JobGroup;
    contentURL: string;
    applys: Apply[];
    status: string;
    //for admin
    classColor: string;
    des: string;
    //show 
    // lowestSalaryShow: string;
    // highestSalaryShow: string;
    isShowActivate: boolean;
}