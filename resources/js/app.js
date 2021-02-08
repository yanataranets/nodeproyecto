require('./components/index');
const app = require("@adonisjs/framework/src/Server");
const express = require("express");
const multer = require("multer");

// app.use(express.static(__dirname));
// app.use(multer({dest:"upload"}).single("filedata"));
// app.post("/uploads", function (req, res, next) {
//
//   let filedata = req.file;
//   console.log(filedata);
//   if(!filedata)
//     res.send("Error");
//   else
//     res.send("Done");
// });
// app.listen(3000);
