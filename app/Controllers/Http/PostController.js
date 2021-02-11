'use strict';

const CloudinaryService = require("cloudinary");
const Post = use('App/Models/Post');


class PostController {

  async index( {view}) {
    const posts = await Post.all();
    return view.render('index', {posts: posts.toJSON()})
  }
  async create( {request, response}) {
    const {title, body} = request.all();
    const file = request.file('file');
    try {
      const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(file.tmpPath, {folder: 'uploads'});
      let post = new Post();
      post.title = title;
      post.body = body;
      post.file_url = cloudinaryResponse.secure_url;
      await post.save();

      return response.redirect('back');
    } catch (e) {

      return  ('home')
    }
  }
}

module.exports = PostController;
