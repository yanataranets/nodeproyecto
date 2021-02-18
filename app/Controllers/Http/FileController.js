'use strict'

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

  async store({request, response}) {
    const file = new File();
    file.username = request.input('username');
    file.filename = request.input('filename');
    file.save();

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
    let filename = '';
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

  async show({view}) {
    return view.render('file/show');
  }
}


module.exports = FileController
