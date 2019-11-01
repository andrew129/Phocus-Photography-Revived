const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  comments: [{
    type: Schema.Types.ObjectId, 
    ref: 'Comment'
  }]
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;