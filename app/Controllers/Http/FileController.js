'use strict'
// const res = require("express");
const request = require("@adonisjs/framework/src/Request");
// const data = request.only(['username'])
const connSettings = {
  host: 'access828337811.webspace-data.io',
  port: 22,
  username: 'u100957214',
  password: 'TAFNadmin.001'
};
let filename = '';
const File = use('App/Models/File')

class FileController {
  async index({view}) {
    const files = await File.all();
    return view.render('file/index', {
      files: files.toJSON()
    });
  }

  async create({view}) {
    return view.render('file/create');
  }

  async store({request, response, auth}) {
    const file = new File();
    file.username = request.input('username');
    file.filename = request.input('filename');
    file.id_user = auth.user.id;
    file.save();

    const Client = require('ssh2').Client;

    const remotePathToList = './clickandbuilds/Joomla/Audinetwork/Userdocument';
    const conn = new Client();

    const Helpers = use('Helpers')

    filename = Date.now() + '.pdf';
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

    conn.on('ready', function () {
      conn.sftp(function (err, sftp) {
        if (err) throw err;
        sftp.readdir(remotePathToList, function (err, list) {
          if (err) throw err;
          const fs = require("fs");
          const readStream = fs.createReadStream(Helpers.tmpPath('uploads') + '/' + filename);
          const writeStream = sftp.createWriteStream("./clickandbuilds/Joomla/Audinetwork/Userdocument/" + filename);
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
    response.redirect('/file');
  }

  async edit({view}) {
    return view.render('file/edit');
  }

  async show({view, params}) {
    const file = await File.find(params.id)
    // return view.render('file/show');
    const Client = require('ssh2').Client;
    const conn = new Client();
    conn.on('ready', function() {
      conn.sftp(function(err, sftp) {
        if (err) throw err;
        const moveFrom = ('./clickandbuilds/Joomla/Audinetwork/Userdocument/' + filename);
        const moveTo = ('./tmp/loads/'+ filename);
        sftp.fastGet(moveFrom, moveTo , {}, function(err){
          if (err) throw err;
          console.log("uploaded");
        });
      });
    }).connect(connSettings);
    return view.render('file/show', {file:file});
  }

}


module.exports = FileController
