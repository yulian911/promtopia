import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery')

  if (isConnected) {
    console.log('MongoDB is already conected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log('MongoDB is conected')
  } catch (error) {
    console.log(error)
  }
}
