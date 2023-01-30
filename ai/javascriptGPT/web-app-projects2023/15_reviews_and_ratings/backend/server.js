const express = require("express");
const mongoose = require("mongoose");
//const { authenticate } = require("./middlewares/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

//app.use("/users", require("./routes/userRoutes"));
//app.use('/posts', authenticate, require('./routes/postRoutes'));
// app.use('/comments', authenticate, require('./routes/commentRoutes'));

// Connect to MongoDB Atlas or localhost
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    //console.log("Connected to local MongoDB successfully");
  })
  .catch((error) => {
    console.log(error);
});

// Start the Express server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Backend web server listening on port: ${PORT} `);
  //console.log("Backend web server listening for request on port: "+PORT);
});

