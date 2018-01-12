declare namespace ResponseBody {
  export interface Error extends Status {
    errMessage?: string;
  }

  export interface Status {
    code?: number;
  }

  export interface PostBody extends Error {
    post?: Post;
  }

  export interface PostsBody extends Error {
    posts?: Post[];
    postCount: number;
  }

  export interface Post extends PostWithoutID {
    _id: string;
  }

  export interface PostWithoutID {
    // _id: string;
    title: string;
    timestamp: Date;
    contentUrl: string;
    comments: Comment[];
    tags: string[];
    sticky: boolean;
    views: number;
    stars: number;
    coverimgurl: string;
    isContentFromUrl: boolean;
    summary: string;
    body: string;
  }

  export interface UsertWithoutID {
    // _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
  }

  export interface User extends UsertWithoutID {
    _id: string;
  }

  export interface UserBody extends Error {
    user: User;
  }

  export interface CommentBody extends Error {
    comment: Comment;
  }

  export interface CommentsBody extends Error {
    comments: Comment[];
  }

  export interface Comment {
    _id: string;
    posted: Date;
    text: string;
    username: string;
    userid: string;
  }

  export interface LoginBody {
    token: string;
    user: User;
    errMessage: string;
  }

  export interface RegisterBody {
    username: string;
    email: string;
    password: string;
  }
}
