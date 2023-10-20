import mongoose from 'mongoose'

const ColorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

const Color = mongoose.model('Color', ColorSchema)
export default Color
