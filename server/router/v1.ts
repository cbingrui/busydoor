import * as express from 'express';
import { getAllPosts, createPost, updatePost, deletePost, getPostById } from '../controllers/postController';



export default (app) => {
    const apiRoutes = express.Router();
    const postRoutes = express.Router();

    app.use('/api', apiRoutes);
    apiRoutes.use('/posts', postRoutes);

    postRoutes.get('/', getAllPosts);
    postRoutes.get('/:id', getPostById);
    postRoutes.post('/post', createPost);
    postRoutes.put('/:id', updatePost);
    postRoutes.delete('/:id', deletePost);

};
