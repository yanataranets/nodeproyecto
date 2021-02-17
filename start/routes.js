'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Cantidadd = require("@adonisjs/lucid/src/Lucid/Model");
const Route = use('Route')

Route.on('/').render('home').as('home').middleware(['auth'])


Route.get('register', 'Auth/RegisterController.showRegisterForm').middleware([
  'authenticated'
])
Route.post('register', 'Auth/RegisterController.register').as('register')
Route.get('register/confirm/:token', 'Auth/RegisterController.confirmEmail')
Route.get('login', 'Auth/LoginController.showLoginForm').middleware([
  'authenticated'
])
Route.post('login', 'Auth/LoginController.login').as('login')
Route.get('logout', 'Auth/AuthenticatedController.logout')
Route.get('password/reset', 'Auth/PasswordResetController.showLinkRequestForm')
Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
Route.get('password/reset/:token', 'Auth/PasswordResetController.showResetForm')
Route.post('password/reset', 'Auth/PasswordResetController.reset')


//
const Client = require('ssh2').Client;
const connSettings = {
  host: 'access828337811.webspace-data.io',
  port: 22,
  username: 'u100957214',
  password: 'TAFNadmin.001'
};
const remotePathToList = './clickandbuilds/Joomla/Audinetwork/Userdocument';
const conn = new Client();

const Helpers = use('Helpers')
// const rutaVari = null;
let filename = '';
filename = Date.now()+'.pdf';
Route.post('/upload', async ({ request }) => {
  const profileFiles = request.file('profile_file', {
    types: ['pdf'],
    size: '20mb',
    extname: ['jpeg', 'png', 'jpg']
  })

  await profileFiles.move(Helpers.tmpPath('uploads'), {
    name: filename,
    overwrite: false
  })
  if (!profileFiles.moved()) {
    return profileFiles.error()
  }

  conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
      if (err) throw err;
      sftp.readdir(remotePathToList, function (err, list) {
        if (err) throw err;
        const fs = require("fs");
        // Use node filesystem
        // const fileUrl = new URL('tmp/uploads/');
        // const fileToUrl new URL ()
        // var moveFrom = "tmp/uploads/";
        // var moveTo = "./clickandbuilds/Joomla/Audinetwork/Userdocument/1613032382187.pdf";
        //
        // sftp.fastGet(moveFrom, moveTo, {}, function(downloadError){
        //   if(downloadError) throw downloadError;
        //
        //   console.log("done");
        // })
        // const readStream = fs.readFile(
        //   'tmp/uploads/'
        // )
        // const writeStream = fs.writeFile(
        //   './clickandbuilds/Joomla/Audinetwork/Userdocument/',
        // )
        // correcto
        //const readStream = fs.createReadStream("tmp/uploads/1613032382187.pdf");
        //const readStream = fs.createReadStream("C:/Users/Admin/Desktop/adonis-main/tmp/uploads/1613032382187.pdf")
        const readStream = fs.createReadStream(Helpers.tmpPath('uploads')+'/'+filename);
        const writeStream = sftp.createWriteStream("./clickandbuilds/Joomla/Audinetwork/Userdocument/"+filename);
        writeStream.on('close', function () {
          console.log("done");
        });
        writeStream.on('end', function () {
          console.log("connection closed");
          conn.close();
        });
//go
        readStream.pipe(writeStream);

        // const options = Object.assign({}, {
        //   encoding: 'utf-8'
        // }, true)
        // const writeStream = sftp.createWriteStream("./clickandbuilds/Joomla/Audinetwork/Userdocument");
        // const data = writeStream.end(fileStreamContent);
        // writeStream.on('close', function(){
        //   console.log("done");
        //   conn.end();
        // });
      });
    });
  }).connect(connSettings);

  return ('done')
})

//
// conn.on('ready', function() {
//   conn.sftp(function(err, sftp) {
//     if (err) throw err;
//     sftp.readdir(remotePathToList, function (err, list) {
//       if (err) throw err;
//       const fs = require("fs");
//       // Use node filesystem
//       // const fileUrl = new URL('tmp/uploads/');
//       // const fileToUrl new URL ()
//       // var moveFrom = "tmp/uploads/";
//       // var moveTo = "./clickandbuilds/Joomla/Audinetwork/Userdocument/1613032382187.pdf";
//       //
//       // sftp.fastGet(moveFrom, moveTo, {}, function(downloadError){
//       //   if(downloadError) throw downloadError;
//       //
//       //   console.log("done");
//       // })
//       // const readStream = fs.readFile(
//       //   'tmp/uploads/'
//       // )
//       // const writeStream = fs.writeFile(
//       //   './clickandbuilds/Joomla/Audinetwork/Userdocument/',
//       // )
//       // correcto
//       //const readStream = fs.createReadStream("tmp/uploads/1613032382187.pdf");
//       //const readStream = fs.createReadStream("C:/Users/Admin/Desktop/adonis-main/tmp/uploads/1613032382187.pdf")
//       const readStream = fs.createReadStream(Helpers.tmpPath('uploads')+'/'+filename);
//       const writeStream = sftp.createWriteStream("./clickandbuilds/Joomla/Audinetwork/Userdocument/"+filename);
//       writeStream.on('close', function () {
//         console.log("done");
//       });
//       writeStream.on('end', function () {
//         console.log("connection closed");
//         conn.close();
//       });
// //go
//       readStream.pipe(writeStream);
//
//       // const options = Object.assign({}, {
//       //   encoding: 'utf-8'
//       // }, true)
//       // const writeStream = sftp.createWriteStream("./clickandbuilds/Joomla/Audinetwork/Userdocument");
//       // const data = writeStream.end(fileStreamContent);
//       // writeStream.on('close', function(){
//       //   console.log("done");
//       //   conn.end();
//       // });
//     });
//   });
// }).connect(connSettings);



//
// Route.get('/upload', 'UploadController.index')
Route.get('/upload/create', 'UploadController.create')
Route.post('/upload', 'UploadController.store')
Route.get('/upload', 'UploadController.store')
