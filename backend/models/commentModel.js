const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Comment text is reuired"],
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{timestamps: true}
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;