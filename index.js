const express = require('express');

const http = require("http");
const userRouter =require('./routes/userRoutes')
// Create an instance of Express app
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/user",userRouter)

const server = http.createServer(app);
// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
module.exports = app;