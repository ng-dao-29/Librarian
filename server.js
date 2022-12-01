const http = require('http');
const fs = require('fs');
const url = require('url');

const UpdateUser = require ("./src/controllers/User.controller/updateUser.controller");
const AuthController = require('./src/controllers/auth.controller');
const Homes = require("./src/controllers/home.controller/showHome.controller");
const UpdatePass = require("./src/controllers/User.controller/editPassword.controller");
const UserManipulation = require('./src/controllers/User.controller/addUser');
const BookController = require('./src/controllers/book.controller/showBook')
const ShowUser = require('./src/controllers/User.controller/ShowUser');

const showUser = new ShowUser()
const bookController = new BookController()
const userController = new UserManipulation();
const showHome = new Homes();
const passWordController = new UpdatePass();
const authController = new AuthController();
const updateUser = new UpdateUser();

const server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url).pathname;
    console.log(urlParse)
    switch (urlParse) {
        case '/login':
            if (req.method === 'GET') {
                authController.showFormLogin(req,res).catch(err => {
                    console.log(err);
                })
            } else {
                authController.login(req,res);
            }
            break;
        case '/user/home.controller':
            showHome.homeUser(req, res)
            break;
        case '/admin/home.controller':
            showHome.homeAdmin(req, res)
            break;
        case '/logout':
            authController.logout(req,res);
            break;
        case '/edit-password':
            if (req.method === 'GET') {
                passWordController.formEditPassword(req, res)
            }
            else {
                passWordController.updatePassword(req, res)
            }
            break;
        case '/show-book':
            if (req.method === 'GET') {
                bookController.showBook(req, res)
            }
            else {
                bookController.searchBook(req, res)
            }
            break;
        case '/edit-information':
            if (req.method === 'GET') {
                updateUser.showFormUpdate(req, res)
            }
            else {
                updateUser.handleUpdate(req, res)
            }
            break;
        case '/add-user':
            if (req.method === 'GET') {
                userController.showFormAdd(req, res)
            }
            else {
                userController.handleAddUser(req, res)
            }
            break;
        case '/delete-book/':
            bookController.deleteBook(req, res);
            break;
        case '/show-user':
            showUser.ShowListUser(req, res)
        default: res.end();
    }
});

server.listen(8000, "localhost" , () => {
    console.log("server listening on 8000");
})