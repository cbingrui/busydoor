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



// create


// update


// delete