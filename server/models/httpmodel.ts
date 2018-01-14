// tslint:disable-next-line:no-empty-interface
export interface PostsModel extends ResponseBody.PostsBody {}
// tslint:disable-next-line:no-empty-interface
export interface PostModel extends ResponseBody.PostBody {}
// tslint:disable-next-line:no-empty-interface
export class ErrorModel implements ResponseBody.Error {
  errMessage: string;
  code: number;
  constructor(code: number, errMessage: string) {
    this.errMessage = errMessage;
    this.code = code;
  }
}

// tslint:disable-next-line:no-empty-interface
export interface StatusModel extends ResponseBody.Status {}
