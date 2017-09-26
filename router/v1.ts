import { Post } from './../src/app/models/post.model';
import { Router } from '@angular/router';
import * as express from 'express';
import { getAllPosts, createPost } from "../controllers/postController";



export default (app) => {
    const apiRoutes = express.Router();
    const postRoutes = express.Router();

    app.use('/api', apiRoutes);
    apiRoutes.use('/posts', postRoutes);

    postRoutes.get('/', getAllPosts);


}