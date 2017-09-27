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
        required: ''
    }
});

export default mongoose.model('Post', postSchema);
