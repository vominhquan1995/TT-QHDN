interface EventItem extends Base {
    id: number;
    name: string;
    title: string;
    shortDescription: string;
    contentHtml: string;
    place: string;
    linkRegister: string;
    imageURL: string;
    registerTime: string;
    time: string;
    //for admin
    classColor: string;
    des: string;
    status: string;
}