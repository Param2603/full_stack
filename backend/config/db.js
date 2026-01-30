import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database is Connected")
}

export default connectDB