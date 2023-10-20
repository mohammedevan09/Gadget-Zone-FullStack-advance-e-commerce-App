import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
      },
    ],
    subtotal: { type: Number, require: true },
    total: { type: Number, require: true },
    shipping: { type: Object, require: true },
    delivery_status: { type: String, default: 'pending' },
    payment_status: { type: String, require: true },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
