export class Post {
    public title: string;
    public body: string;
    public timestamp: Date;
    public contentUrl: string;

    private _renderedontented: string;
    public get renderedContent(): string {
        return this.body;
    }

    constructor(title: string, body: string, date: Date, url: string) {
        this.title = title;
        this.body = body;
        this.timestamp = date;
        this.contentUrl = url;
    }

}
