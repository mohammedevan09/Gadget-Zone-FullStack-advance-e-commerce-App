import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
      maxlength: 90,
    },
    image: {
      public_id: String,
      url: String,
      asset_id: String,
    },
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model('Category', CategorySchema)
export default Category
