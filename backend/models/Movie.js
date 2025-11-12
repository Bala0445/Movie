import mongoose from 'mongoose'


const MovieSchema = new mongoose.Schema({
title: { type: String, required: true },
description: { type: String },
videoUrl: { type: String, required: true },
thumbnail: { type: String },
createdAt: { type: Date, default: Date.now }
})


export default mongoose.model('Movie', MovieSchema)