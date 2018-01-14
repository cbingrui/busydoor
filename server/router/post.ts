import { API, ApiGetPostById, ApiPostPost } from './../../share/RestAPI';
import { PostsModel, PostModel, StatusModel } from './../models/httpmodel';
import * as express from 'express';
import * as postCtrl from '../controllers/postController';
import { HttpTypeDecorator } from '../utilities/server.helper';

export default app => {
  const postRoutes = express.Router();

  app.use(postRoutes);

  postRoutes.get('/api/posts', (req, res) =>
    HttpTypeDecorator<PostsModel>(req, res, postCtrl.getAllPosts)
  );

  postRoutes.get('/api/posts/page/:skip/:top', (req, res) =>
    HttpTypeDecorator<PostsModel>(req, res, postCtrl.getPagedPostsExtend)
  );

  postRoutes.get(API.GetPost_ID, (req, res) =>
    HttpTypeDecorator<ApiGetPostById>(req, res, postCtrl.getPostById)
  );
  postRoutes.post(API.PostPost, (req, res) =>
    HttpTypeDecorator<ApiPostPost>(req, res, postCtrl.createPost)
  );

  postRoutes.put('/api/posts/:id', (req, res) =>
    HttpTypeDecorator<StatusModel>(req, res, postCtrl.updatePost)
  );

  // Should add the router authorization (feature waiting)
  postRoutes.delete('/api/posts/:id', (req, res) =>
    HttpTypeDecorator<StatusModel>(req, res, postCtrl.deletePost)
  );

  postRoutes.delete('/api/posts/:postId/:commentId', (req, res) =>
    HttpTypeDecorator<StatusModel>(req, res, postCtrl.deleteComment)
  );
};
