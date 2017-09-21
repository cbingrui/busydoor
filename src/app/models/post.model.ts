export class Post {
    public title: string;
    public body: string;
    public date: Date;
    public url: string;
    constructor(title: string, body: string, date: Date, url: string) {
        this.title = title;
        this.body = body;
        this.date = date;
        this.url = url;
    }
}
