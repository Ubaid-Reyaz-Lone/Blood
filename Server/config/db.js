const mongoose = require("mongoose");

const colors = require("colors");
const connectDB = async () => {
  try {
    // await moongose.connect(process.env.MONGO_URL)

    //   await  mongoose.connect(process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL);

    console.log(`Connected MongoDB successfully `);
  } catch (e) {
    console.log(`MongoDB Error ${e} `.bgMagenta.white);
  }
};

module.exports = connectDB;
