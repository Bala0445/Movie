import mongoose from 'mongoose'


const CommentSchema = new mongoose.Schema({
movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
username: String,
text: String,
likes: { type: Number, default: 0 },
likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })


export default mongoose.model('Comment', CommentSchema)