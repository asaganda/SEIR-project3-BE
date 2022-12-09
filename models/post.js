const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
    owner: {type: String, required:true},
    category: [String],
    image: String,
    body: String,
    comments:[
        {
            user: String,
            text: String
        }
    ],
    likes:[String]
});

const Post =mongoose.model('Post', postSchema);
module.exports = Post;