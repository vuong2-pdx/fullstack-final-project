//Connect to MongoDB w/ Mongoose
const mongoose = require("mongoose");
MONGO_URI =
  "mongodb+srv://vpetrova:fullstack@watchlist.gspsubg.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    //If you want to save the URI into .env file uncomment the following:
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1); //exit the process w/ failure
  }
};

module.exports = connectDB;
