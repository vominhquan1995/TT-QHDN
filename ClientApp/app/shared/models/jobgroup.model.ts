interface JobGroup extends Base{
    name: string;
    description: string;
    shortName: string;
    imageUrl:string;
    jobs:Job[]
}