'use strict'

const Upload = use('App/Models/Upload')

class UploadController {
  async index({view}){
    const uploads = await Upload.all();
    return view.render('', {
      uploads: uploads.toJSON()
    })
  }
  async create ({view}){
    return view.render('/');
  }

  async store({request, response}){
    const upload = new Upload();

    console.log(request.input('usuario_nombre'));

    upload.usuario_nombre = request.input('usuario_nombre');
    upload.file_nombre = request.input('file_nombre');
    upload.save();
    response.redirect('/');
  }
}

module.exports = UploadController
