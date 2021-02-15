'use strict'
const Upload = use('App/Models/Upload')

class UploadController {
  async index({view}){
    const uploads = await Upload.all();
    // return view.render('upload', {
    //   uploads: upload.toJSON()
    // })
  }
  async create ({view}){
    return view.render('upload');
  }

  async store({request, response}){
    const upload = new Upload();
    upload.usuario_nombre = request.input('username');
    upload.file_nombre = request.input('profile_file');
    upload.save();
    response.redirect('/');
  }
}

module.exports = UploadController
