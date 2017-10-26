export class Post {
    public _id: string;
    public title: string;
    public body: string;
    public summary: string;
    public timestamp: Date;
    public contentUrl: string;

    private _renderedontented: string;
    public get renderedContent(): string {
        return this.body;
    }

    constructor(id: string, title: string, body: string, date: Date, url: string) {
        this._id = id;
        this.title = title;
        this.body = body;
        this.timestamp = date;
        this.contentUrl = url;
    }

}
