import mongoose from "mongoose";

const database = async () => {
  try {
    const url = process.env.DATABASE_URL;
    await mongoose.connect(url);
    console.log("connected to database");
  } catch (error) {
    console.log(error.message);
  }
};

export default database;
