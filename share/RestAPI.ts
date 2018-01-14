export default class RestAPI {
  GET_USER = 'user';
  GET_USER_TYPE = String;
  constructor() {}
}

export enum API {
  GetUser = '/api/user',
  GetPost_ID = '/api/posts/:id',
  GetPost = '/api/posts',
  PostPost = '/api/posts/post',
  GetPosts = 'posts',
  PutUser = 'api/user'
}

// tslint:disable-next-line:no-empty-interface
export interface ApiGetUser extends ResponseBody.UserBody {}
// tslint:disable-next-line:no-empty-interface
export interface ApiGetPostById extends ResponseBody.PostBody {}
// tslint:disable-next-line:no-empty-interface
export interface ApiPostPost extends ResponseBody.PostBody {}
