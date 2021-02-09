require('./components/index');
const app = require("@adonisjs/framework/src/Server");
const express = require('express')(),
  multer = require('multer'),
  upload = multer({dest:'/tmp/uploads'});

// app.get('/', (req, res)=>{
//   res.sendFile('home', {root: __dirname})
// })
// app.post('/upload', upload.single('profile_file'), (req, res)=>{
//   console.log(req.file)
//   res.send('correcto')
// } )
// app.listen(3000, () => console.log('SERVIDOR FUNCIONANDO'))

app.use(express.static(__dirname));
app.use(multer({dest:"upload"}).single("filedata"));
app.post("/uploads", function (req, res, next) {

  let filedata = req.file;
  console.log(filedata);
  if(!filedata)
    res.send("Error");
  else
    res.send("Done");
});
app.listen(3000);
