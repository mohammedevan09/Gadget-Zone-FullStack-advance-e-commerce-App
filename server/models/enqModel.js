import mongoose from 'mongoose'

const EnqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Submitted',
    enum: ['Submitted', 'Contacted', 'In Progress', 'Resolved'],
  },
})

const Enquiry = mongoose.model('Enquiry', EnqSchema)
export default Enquiry
