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
export function getAllPosts(
  req: Request,
  resolve: (v: PostsModel) => any,
  reject: (e: ErrorModel) => any
) {
  Post.find((err, posts) => {
    if (err) {
      reject(new ErrorModel(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, err));
    } else {
      resolve({ posts, postCount: posts.length });
    }
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
      console.error('err:\n', err);
      reject({
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errMessage: err
      });
    } else if (post) {
      resolve({ post });
    } else {
      reject({
        code: HTTP_STATUS_CODES.NO_CONTENT,
        errMessage: `Cannot find post by id ${id}`
      });
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
export function createPost(
  req: { body: ResponseBody.Post },
  resolve: (v: PostModel) => any,
  reject: (e: ErrorModel) => any
) {
  req.body.timestamp = new Date();

  const post = new Post(req.body);

  post.save((err, newpost) => {
    if (err) {
      reject(new ErrorModel(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, err));
    }
    resolve({ post: newpost });
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
      reject({
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errMessage: err
      });
    } else if (post) {
      resolve({
        code: HTTP_STATUS_CODES.RESET_CONTENT
      });
    } else {
      reject({
        code: HTTP_STATUS_CODES.PRECONDITION_FAILED,
        errMessage: `Update post failed becuase cannot find post by id:${id}`
      });
    }
  });
}

// delete
export function deletePost(
  req: Request,
  resolve: (v: StatusModel) => any,
  reject: (e: ErrorModel) => any
) {
  const id = req.params.id;

  if (!preCheckIdExist([id], reject, 'route parameter [id] must be provided')) {
    return;
  }

  Post.findByIdAndRemove(id, (err, post) => {
    if (err) {
      reject({
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errMessage: err
      });
    } else if (post) {
      resolve({ code: HTTP_STATUS_CODES.NO_CONTENT });
    } else {
      reject({
        code: HTTP_STATUS_CODES.PRECONDITION_FAILED,
        errMessage: `Delete post failed becuase cannot find post by id:${id}`
      });
    }
  });
}

export function deleteComment(
  req: Request,
  resolve: (v: StatusModel) => any,
  reject: (e: ErrorModel) => any
) {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  if (
    !preCheckIdExist(
      [postId, commentId],
      reject,
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
        reject(new ErrorModel(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, err));
      } else if (post) {
        resolve({
          code: HTTP_STATUS_CODES.RESET_CONTENT
        });
      } else {
        reject(
          new ErrorModel(
            HTTP_STATUS_CODES.PRECONDITION_FAILED,
            `Delete post comment failed because cannot find post by postId:${postId} and commentId:${commentId}`
          )
        );
      }
    }
  );
}
