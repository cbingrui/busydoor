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
export function getPagedPosts(req, res, next) {
    console.log('*** getPagedPosts');
    const topVal = req.params.top,
        skipVal = req.params.skip,
        top = (isNaN(topVal)) ? 10 : +topVal,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;

    Post.count((err, postCount) => {
        console.log(`Skip: ${skip} Top: ${top}`);
        console.log(`Posts count: ${postCount}`);

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

        Post.find({}
            , {
                'comments._id': 0
                , 'comments.posted': 0
                , 'comments.text': 0
                , 'comments.userid': 0
                , 'comments.username': 0
            })
            .sort({ lastName: 1 })
            .skip(skip)
            .limit(top)
            .exec((errInner, posts) => {
                if (errInner) {
                    const strErr = `*** getPagedPosts error: ${errInner}`;
                    console.log(strErr);
                    res.json({ err: strErr });
                } else {
                    res.json({ posts, postCount });
                }
            });

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
    const title = req.body.title || '';
    const body = req.body.body || '';
    const contentUrl = req.body.contentUrl || '';
    const summary = req.body.summary || '';
    const post = new Post({
        title,
        body,
        contentUrl,
        summary,
        timestamp: new Date()
    });

    post.save((err, newpost) => {
        if (err) {
            res.status(201).json({ 'err': err });
        } else {
            res.status(201).json({ post: newpost });
        }
    });
}

// update
export function updatePost(req, res, next) {
    const id = req.params.id;
    if (id === '' || id === undefined) {
        console.error('updatePost cannot be with empty id.');
        return;
    }
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
