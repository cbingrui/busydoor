declare namespace ResponseBody {
  export interface BodyReturn {
    err: any;
    post: any;
    posts: Array<any>;
    postCount: number;
  }
  export interface Result {
    error: boolean;
    message: string;
  }

  export interface LoginBody {
    token: string;
    user: User;
    success: boolean;
  }

  export interface RegisterBody {
    username: string;
    email: string;
    password: string;
  }
  export interface UserBody {
    _id: string;
    user: User;
    errors: Errors;
  }
  export interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    success: boolean;
  }
  export interface Errors {
    errors: { [key: string]: string };
  }
}
