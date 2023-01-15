require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json()); // to access req and res objects
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to HOME PAGE",
  });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 4001;

    app.listen(PORT, () => {
      console.log(
        `connected to DB and backend express web server running on port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

// const PORT = process.env.PORT || 4001

// app.listen(PORT, () => {
//     console.log(`Backend web server listening for request on port: ${PORT}`)
// })
