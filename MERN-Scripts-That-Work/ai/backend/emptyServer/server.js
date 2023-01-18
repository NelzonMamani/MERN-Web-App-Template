require('dotenv').config()
const express = require('express');
const app = express();


// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(client => {
//     console.log('Connected to MongoDB Atlas!');
// })
// .catch(err => {
//     console.log('Error connecting to MongoDB Atlas!', err);
// })

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
    console.log(`Backend Web Server is listening for requests on port ${PORT}`);
});

 