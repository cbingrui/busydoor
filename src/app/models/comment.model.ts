export default class Comment implements ResponseBody.Comment {
  _id: string;
  posted: Date;
  text: string;
  username: string;
  userid: string;

  constructor(comment: ResponseBody.Comment) {
    this.posted = comment.posted;
    this.text = comment.text;
    this.username = comment.username;
    this.userid = comment.userid;
  }
}
