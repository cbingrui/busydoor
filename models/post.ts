import * as mongoose from 'mongoose';

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
    }
});

export default mongoose.model('Post', postSchema);
