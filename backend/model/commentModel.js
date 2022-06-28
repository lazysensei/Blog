const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {    
    description: {
      type: String,
      required: [true, 'Please add a Description'],
    },
    likes: {
        type: Number,
        required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },              
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comment', commentSchema)