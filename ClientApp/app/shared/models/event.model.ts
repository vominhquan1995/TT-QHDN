interface EventItem extends Base {
    id: number;
    name: string;
    title: string;
    shortDescription: string;
    contentHtml: string;
    place: string;
    linkRegister: string;
    imageURL: string;
    startTime: string;
    endTime: string;
    //for admin
    classColor: string;
    des: string;
}