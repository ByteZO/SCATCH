const mongoose = require("mongoose");

try {
  const dbConnect = mongoose.connect(
    "mongodb+srv://miniprojectUser:mini2551@cluster0.t3mxm.mongodb.net/SCATCH"
  );
  console.log("Connect", dbConnect);
} catch (error) {
  console.log(error);
}

module.exports = mongoose.connection;
