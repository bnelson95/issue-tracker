import mongoose from 'mongoose'
const { Schema, model } = mongoose

const TaskSchema = new Schema({
  title: String,
  description: String,
  createdBy: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  changedOn: {
    type: Date,
    default: Date.now
  },
  dueOn: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  status: {
    type: String,
    enum: ['notstarted', 'inprogress', 'stopped', 'completed', 'archived'],
    default: 'notstarted'
  },
  group: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  links: [{
    ref: { type: String },
    title: { type: String }
  }]
})

export default model('Task', TaskSchema)
