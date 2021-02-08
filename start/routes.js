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
const Helpers = use('Helpers')

Route.post('upload', async ({ request }) => {
  const profileFiles = request.file('profile_files', {
    types: ['pdf'],
    size: '20mb'
  })

  await profileFiles.moveAll(Helpers.tmpPath('uploads'), (file) => {
    return {
      name: ''
    }
  })

  if (!profileFiles.movedAll()) {
    return profileFiles.errors()
  }
  return ('/')
})
