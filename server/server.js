const express = require("express");

const app = express();
//config
require("dotenv").config();
app.use(express.json());
const port = 5000;
//router
const cors = require('cors');
const router = require("./src/routers");

app.use(cors());
app.use("/api/v1/", router);
app.use('/uploads', express.static('uploads'));





app.listen(port, ()=>console.log(`Running on port : ${port}`));
