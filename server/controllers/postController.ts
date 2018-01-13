import {
  PostsModel,
  ErrorModel,
  PostModel,
  StatusModel
} from './../models/httpmodel';
import { IPost } from './../models/post';
import Post from '../models/post';
import { ObjectID } from 'mongodb';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import {
  ConsoleError,
  SendExtend,
  ResponseExtend,
  ResponseError
} from '../utilities/server.helper';
import HTTP_STATUS_CODES from '../../share/HttpStatusCodes';
// get
export function getAllPosts(req, res, next) {
  Post.find((err, posts) => {
    SendExtend<ResponseBody.PostsBody>(res, err, {
      posts,
      postCount: posts.length
    });
  });
}

export function getPagedPostsExtend(
  req: Request,
  resolve: (v: PostsModel) => any,
  reject: (e: ErrorModel) => any
) {
  const topVal = req.params.top,
    skipVal = req.params.skip,
    top = isNaN(topVal) ? 10 : +topVal,
    skip = isNaN(skipVal) ? 0 : +skipVal;

  Post.count((err, postCount) => {
    // // The below query would omit the item without any comment
    // db.getCollection('posts').aggregate(
    //     {
    //         $unwind: {
    //             path: "$comments"
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: '$_id',
    //             count: { $sum: 1 }
    //         }
    //     }
    // )

    Post.find(
      {},
      {
        'comments._id': 0,
        'comments.posted': 0,
        'comments.text': 0,
        'comments.userid': 0,
        'comments.username': 0
      }
    )
      .sort({ sticky: 'desc', timestamp: 'desc' })
      .skip(skip)
      .limit(top)
      .exec((errInner, posts) => {
        if (errInner) {
          reject({
            code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            errMessage: errInner
          });
        } else if (posts) {
          resolve({ posts, postCount });
        } else {
          reject({
            code: HTTP_STATUS_CODES.NO_CONTENT,
            errMessage: `Cannot find any post range from ${skip} to ${top}`
          });
        }
      });
  });
}
// get by ID
export function getPostById(
  req: Request,
  resolve: (v: PostModel) => any,
  reject: (e: ErrorModel) => any
) {
  const id = req.params.id;
  hitPost(id);
  Post.findById(id, (err, post) => {
    if (err) {
      if (err instanceof mongoose.CastError) {
        reject({
          code: HTTP_STATUS_CODES.NO_CONTENT,
          errMessage: `Cannot find post by id ${id}`
        });
      } else {
        console.error('err:\n', err);
        reject({
          code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          errMessage: err
        });
      }
    } else if (post) {
      resolve({ post });
    } else {
    }
  });
}

function hitPost(id: string) {
  const v = Post.findByIdAndUpdate(id, { $inc: { views: 1 } }, err => {
    if (err) {
      ConsoleError(err);
    }
  });
}

// create
export function createPost(req: { body: ResponseBody.Post }, res, next) {
  req.body.timestamp = new Date();

  const post = new Post(req.body);

  post.save((err, newpost) => {
    SendExtend<ResponseBody.PostBody>(res, err, { post: newpost });
  });
}
function preCheckIdExist(
  ids: [string],
  reject: (e: ErrorModel) => any,
  message: string
): boolean {
  if (ids.some(id => id === '' || id === undefined)) {
    reject({
      code: HTTP_STATUS_CODES.PRECONDITION_FAILED,
      errMessage: message
    });
    return false;
  }
  return true;
}
// update
export function updatePost(
  req: Request,
  resolve: (v: StatusModel) => any,
  reject: (e: ErrorModel) => any
) {
  const id = req.params.id;
  if (!preCheckIdExist([id], reject, 'route parameter [id] must be provided')) {
    return;
  }
  Post.findByIdAndUpdate(id, req.body, (err, post) => {
    if (err) {
      if (err instanceof mongoose.CastError) {
        reject({
          code: HTTP_STATUS_CODES.PRECONDITION_FAILED,
          errMessage: `Update post failed becuase cannot find post by id:${id}`
        });
      } else {
        reject({
          code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          errMessage: err
        });
      }
    } else if (post) {
      resolve({
        code: HTTP_STATUS_CODES.RESET_CONTENT
      });
    }
  });
}

// delete
export function deletePost(req, res: Response, next) {
  const id = req.params.id;
  // if (!preCheckIdExist([id], res, 'route parameter [id] must be provided')) {
  //   return;
  // }

  Post.findByIdAndRemove(id, (err, post) => {
    if (err) {
      ResponseError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, err);
    } else if (post) {
      ResponseExtend<ResponseBody.PostBody>(res, {
        code: HTTP_STATUS_CODES.NO_CONTENT
      });
    } else {
      ResponseError(
        res,
        HTTP_STATUS_CODES.PRECONDITION_FAILED,
        `Delete post failed becuase cannot find post by id:${id}`
      );
    }
  });
}

export function deleteComment(req, res) {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  if (
    !preCheckIdExist(
      [postId, commentId],
      res,
      'route parameter [postId] and [commentId] must be provided'
    )
  ) {
    return;
  }

  Post.findByIdAndUpdate(
    postId,
    { $pull: { comments: { _id: commentId } } },
    (err, post) => {
      if (err) {
        ResponseError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, err);
      } else if (post) {
        ResponseExtend<ResponseBody.PostBody>(res, {
          code: HTTP_STATUS_CODES.RESET_CONTENT
        });
      } else {
        ResponseError(
          res,
          HTTP_STATUS_CODES.PRECONDITION_FAILED,
          `Delete post comment failed because cannot find post by postId:${postId} and commentId:${commentId}`
        );
      }
    }
  );
}
