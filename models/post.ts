import * as mongoose from 'mongoose';

const schema = mongoose.Schema;

const postSchema = new schema({
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

export default mongoose.model('Post', postSchema)