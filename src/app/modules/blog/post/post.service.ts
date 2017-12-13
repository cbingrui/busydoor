import { environment } from './../../../../environments/environment';
import { Post } from './../../../models/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface BodyReturn {
  err: any;
  post: any;
  posts: Array<any>;
  postCount: number;
}
@Injectable()
export class PostService {
  domain = environment.backendApiUrl;

  constructor(private http:
    HttpClient) { }
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = { headers: this.headers };

  public getPostUrl(id: string) {
    return this.http.get<BodyReturn>(`${this.domain}/api/posts/${id}`);
  }

  public getPostUrls(page: number, pageSize: number) {
    return this.http.get<BodyReturn>(`${this.domain}/api/posts/page/${page}/${pageSize}`);
  }

  public newPost(post) {
    return this.http.post<BodyReturn>(`${this.domain}/api/posts/post`, post, this.options);
  }
  public updatePost(post) {
    return this.http.put<BodyReturn>(`${this.domain}/api/posts/${post._id}`, post, this.options);
  }
  public fetchContent(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }

  public delete(postId: string) {
    return this.http.delete<BodyReturn>(`${this.domain}/api/posts/${postId}`, this.options);
  }
}
