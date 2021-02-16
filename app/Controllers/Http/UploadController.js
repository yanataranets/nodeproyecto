'use strict'
// const User = require("../../Models/User")
// const {auth} = require("mysql/lib/protocol/Auth")
// const user = await User;
// const auth = require("mysql");
const Upload = use('App/Models/Upload')

// const usernombre = [auth.user.username]
class UploadController {
  // async index({view}){
  //   const uploads = await Upload.all();
  //   // return view.render('upload', {
  //   //   uploads: uploads.toJSON()
  //   // })
  // }
  // async create ({view}){
  //   return view.render('/');
  // }

  async store({request, response}){
    const upload = new Upload();
    upload.usuario_nombre = request.input('usuario_nombre');
    upload.file_nombre = request.input('profilefile');
    upload.save();
    response.redirect('/');
  }
}

module.exports = UploadController
