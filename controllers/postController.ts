import Post from '../models/post';

// get
export function getAllPosts(req, res, next) {
    Post.find((err, posts) => {
        if (err) {
            res.status(500).json({ err });
        }
        res.status(200).json({ posts });
    });
}

// get by ID
export function getPostById(req, res, next) {
    const id = req.params.id;

    Post.findById(id, (err, post) => {
        if (err) {
            res.status(500).json({ err });
        } else {
            res.status(200).json({ post });
        }
    });
}


// create
export function createPost(req, res, next) {
    const title = req.body.title;
    const body = req.body.body;
    const post = new Post({
        title,
        body
    });

    post.save((err, posts) => {
        if (err) {
            res.status(500).json({ err });
        }
        res.status(201).json({ posts });
    });
}

// update
export function updatePost(req, res, next) {
    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body, (err, post) => {
        if (err) {
            res.status(500).json({ res });
        } else {
            res.status(200).json({ post });
        }
    });

}

// delete
export function deletePost(req, res, next) {
    const id = req.params.id;

    Post.findByIdAndRemove(id, (err, post) => {
        if (err) {
            res.status(500).json({ res });
        } else {
            res.status(200).json({ post });
        }
    });

}
