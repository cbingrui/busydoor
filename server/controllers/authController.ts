import { ApiGetUser } from './../../share/RestAPI';
import { ErrorModel } from './../models/httpmodel';
import * as jwt from 'jsonwebtoken';
import usermodel, { IUser } from './../models/user';
import BaseCtrl from './base';
import config from '../config/database';
import * as nodemailer from 'nodemailer';
import resetEmailTo from '../utilities/resetEmail';
import * as async from 'async';
import * as crypto from 'crypto';
import HttpStatusCodes from '../../share/HttpStatusCodes';
import { Request } from 'express';
export default class AuthCtrl extends BaseCtrl {
  login(req: { body: RequestBody.LoginBody }, res) {
    usermodel.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.send(204);
      }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) {
          return res.sendStatus(403);
        }
        const token = jwt.sign({ user }, config.SECRET_TOKEN, {
          expiresIn: '24h'
        });
        res.status(200).json({ token, user });
      });
    });
  }

  authenticate(req, res, next) {
    // check header or url parameters or post parameters for token
    const token =
      req.body.token || req.query.token || req.headers['authorization'];
    res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');

    if (token) {
      jwt.verify(token, config.SECRET_TOKEN, function(err, userDecoded) {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'Authenticate token expired, please login again.',
            errcode: 'exp-token'
          });
        } else {
          req.user = userDecoded.user;
          next();
        }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Fatal error, Authenticate token not available.',
        errcode: 'no-token'
      });
    }
  }

  getWithToken(
    req: Request & { user: IUser },
    resolve: (v: ApiGetUser) => any,
    reject: (e: ErrorModel) => any
  ) {
    usermodel.findById(req.user._id, (err, obj) => {
      if (err) {
        reject(new ErrorModel(HttpStatusCodes.INTERNAL_SERVER_ERROR, err));
      } else {
        resolve({ user: obj });
      }
    });
  }

  emailPasswordReset(req, res) {
    async.waterfall(
      [
        function(done) {
          usermodel
            .findOne({
              email: req.params.email
            })
            .exec(function(err, user) {
              if (user) {
                done(err, user);
              } else {
                done('User not found.');
              }
            });
        },
        function(user, done) {
          crypto.randomBytes(20, function(err, buffer) {
            const token = buffer.toString('hex');
            done(err, user, token);
          });
        },
        function(user, token, done) {
          usermodel
            .findByIdAndUpdate(
              { _id: user._id },
              {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 3600000 * 24 // 24 hours
              },
              { upsert: true, new: true }
            )
            .exec(function(err, new_user) {
              done(err, token, new_user);
            });
        },
        (token, user, done) => {
          const url = `http://${
            config.WEB_HOST
          }/account/resetpassword?token=${token}`;
          resetEmailTo(user.email, url, (err, info) => {
            if (!err) {
              return res.json({
                message: 'Kindly check your email for further instructions'
              });
            } else {
              return done(err);
            }
          });
        }
      ],
      function(err) {
        return res.status(422).json({ message: err });
      }
    );
  }

  checkResetExpired(req, res) {
    usermodel
      .findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      })
      .exec((err, user) => {
        if (!user) {
          res
            .status(201)
            .send({ error: true, message: 'token invalid or expired!' });
        }
      });
  }

  updatePassword(req, res) {
    usermodel
      .findOne({
        resetPasswordToken: req.body.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      })
      .exec((err, user) => {
        if (err) {
          res.status(422).send({ success: false, message: err });
        } else if (!user) {
          res
            .status(422)
            .send({ success: false, message: 'token invalid orexpired!' });
        } else {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          user.password = req.body.password;
          user.save().then(errSave => {
            res
              .status(200)
              .send({ message: 'Password is reset successfully!' });
          });
        }
      });
  }
}
