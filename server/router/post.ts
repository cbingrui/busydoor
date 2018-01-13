import { PostsModel, PostModel, StatusModel } from './../models/httpmodel';
import * as express from 'express';
import * as postCtrl from '../controllers/postController';
import { HttpTypeDecorator } from '../utilities/server.helper';

export default app => {
  const apiRoutes = express.Router();
  const postRoutes = express.Router();

  app.use('/api', apiRoutes);
  apiRoutes.use('/posts', postRoutes);

  postRoutes.get('/', postCtrl.getAllPosts);
  postRoutes.get('/page/:skip/:top', (req, res) =>
    HttpTypeDecorator<PostsModel>(req, res, postCtrl.getPagedPostsExtend)
  );
  postRoutes.get('/:id', (req, res) =>
    HttpTypeDecorator<PostModel>(req, res, postCtrl.getPostById)
  );
  postRoutes.post('/post', postCtrl.createPost);
  postRoutes.put('/:id', (req, res) =>
    HttpTypeDecorator<StatusModel>(req, res, postCtrl.updatePost)
  );

  // Should add the router authorization (feature waiting)
  postRoutes.delete('/:id', postCtrl.deletePost);
  postRoutes.delete('/:postId/:commentId', postCtrl.deleteComment);
};
