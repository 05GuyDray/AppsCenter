const {isDataValid} = require("./validation.js")
const express = require("express");
var { nanoid } = require("nanoid");

const { getAll, addApp, deleteApp } = require("./queries");

const PORT = 5000;

const server = express();
server.use(express.json());

const cors = require("cors");
server.use(cors());

server.get("/api/app", (req, res) => {
  getAll().then((apps) => {
    res.send(JSON.stringify(apps));
  });
});

server.post("/api/app", (req, res) => {
  const newApp = {
    id: nanoid(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    companyName: req.body.companyName,
    createdAt: Date.now(),
  };
  if(isDataValid(newApp)){
    addApp(newApp).then((answer) => {
      res.send(answer);
    });
  }else{
    console.log("err invalid form data");
    res.send("err invalid form data")
  }
  
});

server.delete("/api/app/:id", (req, res) => {
  const id = req.params.id;
  deleteApp(id).then(() => res.send(true));
});

server.listen(PORT, function (err) {
  if (err) {
    console.log("Error in server setup");
  }
  console.log("Server listening on Port", PORT);
});