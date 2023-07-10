const mongoose = require("mongoose");

const dbConnection = mongoose.connect(
  "mongodb+srv://manshisbp:manshi@cluster0.wv6t4ie.mongodb.net/food?retryWrites=true&w=majority"
);

module.exports = {
  dbConnection,
};
