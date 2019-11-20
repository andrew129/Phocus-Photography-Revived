const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    name: {
        type: String
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;

//this.setstate likes +1 with each click post to server 