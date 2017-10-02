import { Post } from './../../../models/post.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
@Injectable()
export class PostService {
  domain = 'http://localhost:3000';

  private messages = [
    'https://raw.githubusercontent.com/cbingrui/busydoor_posts/master/posts/Test%20markdown.md',
    'https://raw.githubusercontent.com/cbingrui/busydoor_posts/master/posts/Horizontal%20tables.md',
    'https://raw.githubusercontent.com/cbingrui/busydoor_posts/master/posts/Highlighting%20Blockquotes.md'
  ];

  constructor(private http: Http) { }
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  public getPostUrl(id: string) {
    return this.http.get(`${this.domain}/api/posts/${id}`).map(res => res.json());
  }

  public getPostUrls() {
    return this.http.get(this.domain + '/api/posts').map(res => res.json());
  }

  public newPost(post) {
    console.log(post);
    return this.http.post(`${this.domain}/api/posts/post`, JSON.stringify(post), this.options).map(res => res.json());
  }
}
