import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String
  }
})

export default mongoose.model('item', ItemSchema)
