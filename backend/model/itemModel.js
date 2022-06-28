const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
      },    
    description: {
      type: String,
      required: [true, 'Please add a Description'],
    },
    likes: {
        type: Number,
        required: true,
      },
    image: {
        type: String,
        required: [true, 'Please select an Image'],
    }          
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Item', itemSchema)