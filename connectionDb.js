import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log(process.env.MONGODB_TOKEN);
    await mongoose.connect(process.env.MONGODB_TOKEN);
    // console.log(process.env.MONGODB_TOKEN);
    console.log("MongoDB connected!");
  } catch (error) {
    throw error;
  }
};
const ifDisconnect = async () => {
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });
};
export  { connect, ifDisconnect };
