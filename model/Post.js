const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
  title: String,
  short_description: String,
  description: String,
  url_key: String,
  view_count: {
    type: Number,
    default: 0
  },
  like_count: {
    type: Number,
    default: 0
  },
  publish_date: Date,
  created_at: {
    type: Date,
    default: Date.now()
  },
  is_publish: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Post', postSchema)
