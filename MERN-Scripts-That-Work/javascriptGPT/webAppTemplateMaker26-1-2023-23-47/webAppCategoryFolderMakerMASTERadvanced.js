const fs = require("fs");
const path = require("path");

// Create the main function called cleanCategoryNames
function cleanCategoryNames(folderName, fileName) {
  // Create the main folder
  fs.mkdirSync(folderName);

  // Read the contents of the file
  let fileContent = fs.readFileSync(fileName, "utf8");

  // Split the file content into an array of lines
  let lines = fileContent.split("\n");

  // Loop through the lines
  for (let i = 0; i < lines.length; i++) {
    // Remove any whitespace and non-alphanumeric characters
    let cleanedLine = lines[i].replace(/[^a-zA-Z0-9 ]/g, "");
    // Replacing remaining whitespace with underscores
    cleanedLine = cleanedLine.replace(/\s+/g, "_");
    // apply snake_case naming convention
    cleanedLine = cleanedLine.toLowerCase();
    // Create a folder with the cleaned line name
    let subdirectory = path.join(folderName, cleanedLine);
    fs.mkdirSync(subdirectory);

    //create .env file
    createDotEnv(subdirectory);
    //create .gitignore file
    createDotIgnore(subdirectory);
    //create server.js file
    createServer(subdirectory);
    //create authServer.js file
    createAuthServer(subdirectory);
  }
}

//create .env file function
function createDotEnv(subdirectory) {
  let envContent = `PORT=4000
AUTH_SERVER_PORT=4001
LOCAL_MONGO_URI=mongodb://localhost:27017/myapp
MONGO_URI=mongodb+srv://Admin34:EasyPassword123456@mernapp.lmtcnvm.mongodb.net/testDB
ACCESS_TOKEN_SECRET=myAccessTokenSecret
REFRESH_TOKEN_SECRET=myRefreshTokenSecret
JWT_EXPIRE=3600
JWT_REFRESH_EXPIRE=86400`;
  // Write the .env file
  fs.writeFileSync(path.join(subdirectory, ".env"), envContent);
  console.log(".env file created successfully");
}

//create .gitignore file function
function createDotIgnore(subdirectory) {
  let gitignoreContent = "node_modules";
  // Write the .gitignore file
  fs.writeFileSync(path.join(subdirectory, ".gitignore"), gitignoreContent);
  console.log(".gitignore file created successfully");
}

//create server.js file function
function createServer(subdirectory) {
  let serverContent = `const express = require("express");
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
  console.log(\`Backend web server listening on port: \${PORT} \`);
  //console.log("Backend web server listening for request on port: "+PORT);
});

`;
  // Write the server.js file
  fs.writeFileSync(path.join(subdirectory, "server.js"), serverContent);
  console.log("server.js file created successfully");
}

function createAuthServer(folderName) {
  let authServerContent = `const express = require("express");
const mongoose = require("mongoose");
//const { authenticate } = require("./middlewares/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

//app.use("/users", require("./routes/userRoutes"));
//app.use('/posts', authenticate, require('./routes/postRoutes'));
// app.use('/comments', authenticate, require('./routes/commentRoutes'));


 

app.post('/generate-new-access-token', async (req, res) => {
try {
    // Verify the refresh token
    const { refreshToken } = req.body;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid refresh token'
            });
        }
        
        // Connect to MongoDB
        const uri = process.env.MONGO_URI;
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log("MongoDB connected successfully");
            
            // Find the user in the database and check if the refresh token is still valid
            User.findById(user.userId, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        message: 'User not found'
                    });
                }
                
                if (user.refreshToken !== refreshToken) {
                    return res.status(401).json({
                        message: 'Invalid refresh token'
                    });
                }
                
                // Generate a new access token
                const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE });
                res.json({ accessToken });
            });
        });
    });
} catch (err) {
    console.error(err);
    res.status(500).json({
        message: 'Server error'
    });
}
});





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

// start the server
app.listen(process.env.AUTH_SERVER_PORT, () => {
console.log(\`Auth server started on port \${process.env.AUTH_SERVER_PORT}\`);
});

  `;

  // Write the authServer.js file
  fs.writeFileSync(path.join(folderName, "authServer.js"), authServerContent);
  console.log("authServer.js file created successfully");
}

// Example usage:
const folderName = "web-app-projects";
const fileName = "webAppCategories.txt";
cleanCategoryNames(folderName, fileName);
