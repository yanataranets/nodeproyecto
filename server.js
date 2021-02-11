'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)

// const Client = require('ssh2-sftp-client');
// const config = {
//   host: 'access828337811.webspace-data.io',
//   username: 'u100957214',
//   password: 'TAFNadmin.001'
// };
//local connect corecto

// const express = require('express')
// const serveIndex = require('serve-index')
//
//
// const app = express()
//
// app.use(
//   '/ftp',
//   express.static('public/ftp'),
//   serveIndex('public/ftp', {icons: true})
// )
//
// app.listen(3000, () => console.log('listening port 3000..'))
const Client = require('ssh2').Client;
const connSettings = {
  host: 'access828337811.webspace-data.io',
  port: 22,
  username: 'u100957214',
  password: 'TAFNadmin.001'
};
const remotePathToList = './clickandbuilds/Joomla/Audinetwork/Userdocument';
const conn = new Client();
conn.on('ready', function() {
  conn.sftp(function(err, sftp) {
    if (err) throw err;
    sftp.readdir(remotePathToList, function (err, list) {
      if (err) throw err;
      const fs = require("fs"); // Use node filesystem
      const readStream = fs.createReadStream("tmp/uploads/1613032382187.pdf");
      const writeStream = sftp.createWriteStream("./clickandbuilds/Joomla/Audinetwork/Userdocument/1613032382187.pdf");
      writeStream.on('close', function () {
        console.log("done");
      });
      writeStream.on('end', function () {
        console.log("connection closed");
        conn.close();
      });
//go
      readStream.pipe(writeStream);
    });
  });
  }).connect(connSettings);
