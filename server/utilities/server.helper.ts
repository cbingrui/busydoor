import { ErrorModel } from './../models/httpmodel';
import { Response, Request } from 'express';
import HTTP_STATUS_CODES from '../../share/HttpStatusCodes';
import config from '../config/database';
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
  if (!config.PRODUCTION) {
    console.log(body);
  }

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

export function HttpTypeDecorator<T>(
  req: Request,
  res: Response,
  callaback: (
    _req: Request,
    resolve: (_v: T) => any,
    reject: (e: ErrorModel) => any
  ) => any
) {
  callaback(
    req,
    d => res.status(HTTP_STATUS_CODES.OK).json(d),
    e => res.status(e.code).json(e.errMessage)
  );
}
