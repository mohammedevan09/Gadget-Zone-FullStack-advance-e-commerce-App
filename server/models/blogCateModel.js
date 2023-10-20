import mongoose from 'mongoose'

const BlogCateSchema = new mongoose.Schema(
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

const BlogCate = mongoose.model('BlogCate', BlogCateSchema)
export default BlogCate
