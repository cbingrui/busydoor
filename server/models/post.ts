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
  },
  tags: {
    type: [String],
    default: [],
    required: false
  },
  sticky: {
    type: Boolean,
    default: false,
    required: false
  },
  views: {
    type: Number,
    default: 0,
    required: false
  },
  coverimgurl: {
    type: String,
    default: '',
    required: false
  },
  isContentFromUrl: {
    type: Boolean,
    default: false,
    required: false
  }
});
export interface IPost extends ResponseBody.PostWithoutID, mongoose.Document {}
export default mongoose.model<IPost>('Post', postSchema);
