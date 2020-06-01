const mongoose = require('mongoose');

const Schema = mongoose.Schema
const happyTrackSchema = new Schema({
    date: Number,
    mood: Number,
    reason: String,
}, {collection: 'happyTrack'}) 

module.exports = mongoose.model('happyTrack', happyTrackSchema)