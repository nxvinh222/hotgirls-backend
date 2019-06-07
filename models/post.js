const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;

const commentModel = new Schema(
    {
      createdBy: { type: Schema.Types.ObjectId, ref: "user", required: true },
      content: { type: String, required: true }
    },
    { timestamps: { createdAt: "createdAt" } }
  );

const PostSchema = new Schema({
    author: {
        type: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    date: Date,
    post: String,
    view: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    comment: { type: [commentModel], default: [] }
},{
    timestamps: true
})

module.exports = mongoose.model("post", PostSchema);