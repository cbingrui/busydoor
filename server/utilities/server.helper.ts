import { Response } from 'express';
import HTTP_STATUS_CODES from './HttpStatusCodes';
// export function JsonT<T extends ResponseBody.Error>(
//   res: Response,
//   code: HTTP_STATUS_CODES,
//   body: T
// ) {
//   if (code === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
//     ConsoleError(body.code, body.errMessage);
//   }
//   res.status(500).json(body);
// }

export function SendExtend<T extends ResponseBody.Error>(
  res: Response,
  errMessage: string,
  body: T
) {
  if (errMessage) {
    ResponseError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, errMessage);
  } else {
    ResponseExtend<T>(res, body);
  }
}

export function ResponseExtend<T extends ResponseBody.Error>(
  res: Response,
  body: T
) {
  console.log(body);

  // RESTful API would not include any 3** http status codes.
  // Redirection behavior would be controlled by angular.
  if (
    body.code === HTTP_STATUS_CODES.NO_CONTENT ||
    body.code === HTTP_STATUS_CODES.RESET_CONTENT
  ) {
    res.status(body.code).send();
  } else {
    res.status(body.code ? body.code : HTTP_STATUS_CODES.OK).json(body);
  }
}

export function ResponseError(
  res: Response,
  errCode: HTTP_STATUS_CODES,
  errMessage: string
) {
  ResponseExtend<ResponseBody.Error>(res, {
    code: errCode,
    errMessage
  });
}

export function ConsoleError(...args) {
  console.error(args);
}

export function Posthandler(err: string) {
  console.error(err);
}
