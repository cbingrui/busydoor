declare namespace RequestBody {
  export interface LoginBody {
    email: string;
    password: string;
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
    body: User;
  }
  export interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    token: string;
  }
  export interface Errors {
    errors: { [key: string]: string };
  }
}
