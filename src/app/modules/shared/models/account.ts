export class AccountModel {
  public static registerUrl = 'register';
  public static loginUrl = 'login';
  public static registerName = 'Sign up';
  public static loginName = 'Sign in';
  public static resetpasswordUrl = 'resetpassword';
  public static resetpasswordName = 'Reset Password';
  public static findpasswordUrl = 'findpassword';
  public static findpasswordName = 'send email';
}
// tslint:disable-next-line:no-empty-interface
export interface RegisterModel extends ResponseBody.RegisterBody {}
