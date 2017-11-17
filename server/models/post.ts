import * as mongoose from 'mongoose';

const comment = new mongoose.Schema({
    posted: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    }
});
const postSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        required: true
    },
    body: {
        type: String,
        default: '',
        required: false
    },
    contentUrl: {
        type: String,
        default: '',
        required: false
    },
    description: {
        type: String,
        default: '',
        required: false
    },
    summary: {
        type: String,
        default: '',
        required: false
    },
    comments: {
        type: [comment]
    }
});

export default mongoose.model('Post', postSchema);
