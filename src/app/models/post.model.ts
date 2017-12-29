import { PostHelper } from './../modules/blog/helper/post.helper';
import { Observable } from 'rxjs/Observable';

export class Post implements ResponseBody.Post {
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
  public stars: number;

  public coverimgurl: string;
  public isContentFromUrl: boolean;

  private _content: Observable<string>;
  public get renderedContent$(): Observable<string> {
    if (!this._content) {
      if (this.isContentFromUrl) {
        this._content = PostHelper.fetchContent(this.contentUrl).map(res =>
          PostHelper.AfterMarkdown(res)
        );
      } else {
        this._content = Observable.of(PostHelper.AfterMarkdown(this.body));
      }
    }
    return this._content;
  }

  private _summary: string;
  public get renderedSummary(): string {
    if (!this._summary) {
      this._summary = PostHelper.AfterMarkdown(this.summary);
    }
    return this._summary;
  }
  //// Prefer getter instead of setter only when value is needed
  // public renderedSummary = null;
  // private _summary: string;
  // public get summary(): string {
  //   return this._summary;
  // }
  // public set summary(v: string) {
  //   console.log(v);
  //   this._summary = v;
  //   this.renderedSummary = PostHelper.AfterMarkdown(v);
  //   console.log(this.renderedSummary);
  // }

  constructor(post: ResponseBody.Post) {
    this._id = post._id;
    this.title = post.title;
    this.body = post.body;
    this.timestamp = post.timestamp;
    this.contentUrl = post.contentUrl;
    this.summary = post.summary;
    this.comments = post.comments;
    this.tags = post.tags;
    this.sticky = post.sticky;
    this.views = post.views;
    this.coverimgurl = post.coverimgurl;
    this.isContentFromUrl = post.isContentFromUrl;
  }
}
