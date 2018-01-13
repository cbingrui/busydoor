import Post from '../models/post';
import usermodel from './../models/user';

import {
  ResponseError,
  ResponseExtend,
  SendExtend
} from '../utilities/server.helper';
import HTTP_STATUS_CODES from '../../share/HttpStatusCodes';

abstract class BaseCtrl {
  // Get all
  getAll = (req, res) => {
    usermodel.find({}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  };

  // Count all
  count = (req, res) => {
    usermodel.count((err, count) => {
      if (err) {
        return console.error(err);
      }
      res.json(count);
    });
  };

  // Insert
  insert = (req: RequestBody.UserBody, res) => {
    usermodel
      .findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }]
      })
      .exec((error, user) => {
        if (error) {
          ResponseError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, error);
        } else if (user) {
          ResponseError(
            res,
            HTTP_STATUS_CODES.PRECONDITION_FAILED,
            'Cannot create user because username or email are existed.'
          );
        } else {
          const obj = new usermodel(req.body);
          obj.save((err, item) => {
            SendExtend<ResponseBody.UserBody>(res, err, {
              user: item
            });
          });
        }
      });
  };

  // Get by id
  get = (req, res) => {
    this.getById(req, res, req.params.id);
  };

  getById = (req, res, id: string) => {
    usermodel.findOne({ _id: id }, (err, obj) => {
      if (err) {
        return console.error(err);
      }
      res.json(obj);
    });
  };

  emailExist = (req, res, email) => {
    this.valueExist(res, 'email', req.params.email);
  };

  valueExist = (res, field: string, value: string) => {
    usermodel.findOne({ [field]: value }, (err, user) => {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: 'Error processing request ' + err });
      }

      if (user) {
        return res.status(201).json({
          success: false,
          message: `${field} already exists.'`
        });
      } else {
        return res.status(200).json({
          success: true
        });
      }
    });
  };

  usernameExist = (req, res, username) => {
    this.valueExist(res, 'username', req.params.username);
  };
  // Update by id
  update = (req, res) => {
    usermodel.findOneAndUpdate({ _id: req.params.id }, req.body, err => {
      if (err) {
        return console.error(err);
      }
      res.sendStatus(200);
    });
  };

  // Delete by id
  delete = (req, res) => {
    usermodel.findOneAndRemove({ _id: req.params.id }, err => {
      if (err) {
        return console.error(err);
      }
      res.sendStatus(200);
    });
  };

  getComments = (req, res) => {
    const postId = req.params.id;
    Post.findOne({ _id: postId }, { comments: 1, _id: 0 }, (err, post) => {
      if (err) {
        ResponseError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, err);
      } else if (post) {
        ResponseExtend<ResponseBody.CommentsBody>(res, {
          code: HTTP_STATUS_CODES.OK,
          comments: post.comments
        });
      } else {
        ResponseError(
          res,
          HTTP_STATUS_CODES.PRECONDITION_FAILED,
          `Get comment failed becuase cannot find its post by id:${postId}`
        );
      }
    });
  };

  addComment = (req, res) => {
    const postId = req.params.id;
    const comment = {
      text: req.body.text,
      posted: Date.now(),
      username: req.body.username,
      userid: req.body.userid
    };
    Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true },
      (err, post) => {
        if (err) {
          ResponseError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, err);
        } else if (post) {
          ResponseExtend<ResponseBody.CommentBody>(res, {
            code: HTTP_STATUS_CODES.OK,
            comment: post.comments.pop()
          });
        } else {
          ResponseError(
            res,
            HTTP_STATUS_CODES.PRECONDITION_FAILED,
            `Add comment failed becuase cannot find post by id:${postId}`
          );
        }
      }
    );
  };
}

export default BaseCtrl;
