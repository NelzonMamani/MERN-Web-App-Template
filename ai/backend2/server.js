require("dotenv").config();
const express = require("express");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());  
app.use("/users", usersRouter);


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to HOME PAGE",
  });
});


const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`Backend web server listening for request on port: ${PORT}`)
})
