import * as express from 'express';
import * as postCtrl from '../controllers/postController';

export default app => {
  const apiRoutes = express.Router();
  const postRoutes = express.Router();

  app.use('/api', apiRoutes);
  apiRoutes.use('/posts', postRoutes);

  postRoutes.get('/', postCtrl.getAllPosts);
  postRoutes.get('/page/:skip/:top', postCtrl.getPagedPosts);
  postRoutes.get('/:id', postCtrl.getPostById);
  postRoutes.post('/post', postCtrl.createPost);
  postRoutes.put('/:id', postCtrl.updatePost);

  // Should add the router authorization (feature waiting)
  postRoutes.delete('/:id', postCtrl.deletePost);
  postRoutes.delete('/:postId/:commentId', postCtrl.deleteComment);
};
