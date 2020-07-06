const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

mongoose.connection.on("error", (error) => {
  console.log("Error in mongoose connection", error);
});

process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
