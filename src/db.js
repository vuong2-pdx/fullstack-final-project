// Viktoriya Petrova @ViktoriyaPetrova
// Module export that connects to Mongoose databse

//Connect to MongoDB w/ Mongoose
const mongoose = require("mongoose");
MONGO_URI =
  "mongodb+srv://vpetrova:fullstack@watchlist.gspsubg.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1); //exit the process w/ failure
  }
};

module.exports = connectDB;
