import mongoose from 'mongoose'

const dbConnect = () => {
  try {
    mongoose.set('strictQuery', true)
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log('connected'))
  } catch (error) {
    console.log(error, 'Disconnected database')
  }
}

export default dbConnect
