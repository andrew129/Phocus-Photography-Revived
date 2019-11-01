const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  topic: {
    type: Schema.Types.ObjectId, 
    ref: 'Topic'
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;