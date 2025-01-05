require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database");
const userRoutes = require("./controllers/user.controller")
const productRoutes = require("./controllers/product.controller")


connection();
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.get('/', (req, res)=>{
    res.send('server side is now runinng');
});

app.listen(process.env.Port, ()=>{
    console.log('Connecting to server......');
  console.log(`Server now listening on port ${process.env.Port}`);
  console.log(`Now you can run at: http://localhost:${process.env.Port} and see a message`);
});