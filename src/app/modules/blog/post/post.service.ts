import { API } from './../../../../../share/RestAPI';
import { ResponseError } from './../../shared/models/httpclient.model';
import { JwtService } from './../../shared/services/jwt.service';
import { environment } from './../../../../environments/environment';
import { Post } from './../../../models/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {
  domain = environment.backendApiUrl;

  constructor(private http: HttpClient, private jwtService: JwtService) {}
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    charset: 'UTF-8'
  });

  get options() {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if (this.jwtService.getToken()) {
      headersConfig['authorization'] = this.jwtService.getToken();
    }

    const options = { headers: new HttpHeaders(headersConfig) };
    return options;
  }

  public getPostUrl(id: string) {
    return this.http.get<ResponseBody.PostBody>(
      `${this.domain}${API.GetPost}/${id}`
    );
  }

  public getPostUrls(page: number, pageSize: number) {
    return this.http.get<ResponseBody.PostsBody>(
      `${this.domain}/api/posts/page/${page}/${pageSize}`
    );
  }

  public newPost(post) {
    return this.http.post<ResponseBody.PostBody>(
      `${this.domain}${API.PostPost}`,
      post,
      this.options
    );
  }
  public updatePost(post) {
    return this.http.put<ResponseError>(
      `${this.domain}/api/posts/${post._id}`,
      post,
      this.options
    );
  }
  public fetchContent(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }

  public delete(postId: string) {
    return this.http.delete<ResponseError>(
      `${this.domain}/api/posts/${postId}`,
      this.options
    );
  }
  public deleteComment(postId: string, commentId: string) {
    return this.http.delete<ResponseError>(
      `${this.domain}/api/posts/${postId}/${commentId}`,
      this.options
    );
  }
}
