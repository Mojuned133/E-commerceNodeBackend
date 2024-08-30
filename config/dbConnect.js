const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const dbconnection = mongoose.connect(process.env.MONGOPATH);
    console.log("data base connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
