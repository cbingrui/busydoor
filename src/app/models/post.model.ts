export class Post {
    public _id: string;
    public title: string;
    public body: string;
    public summary: string;
    public timestamp: Date;
    public contentUrl: string;
    public comments = [];
    public tags: string[];
    public sticky: boolean;
    public views: number;
    private _renderedontented: string;
    public get renderedContent(): string {
        return this.body;
    }

    constructor(id: string, title: string, body: string, date: Date
        , url: string, summary: string, comments, tags: string[], sticky: boolean, views: number) {
        this._id = id;
        this.title = title;
        this.body = body;
        this.timestamp = date;
        this.contentUrl = url;
        this.summary = summary;
        this.comments = comments;
        this.tags = tags;
        this.sticky = sticky;
        this.views = views;
    }

}
