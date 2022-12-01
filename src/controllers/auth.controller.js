const qs = require("qs");
const BaseController = require("./module/base.controller")
const fs = require("fs");

class AuthController extends BaseController {

    logout (req, res) {
        res.writeHead(301, {location: '/login'});
        res.end();
    }

    async showFormLogin(req, res) {
        let data = await this.getTemplate("./views/login.html");
        res.writeHead(200, {"content-type": "text/html"});
        res.end(data)
    }

    login(req, res) {
        if (req.method === 'POST') {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                let dataParse = qs.parse(data);
                console.log(dataParse)
                let sql = `SELECT managesName, password, role, managesID 
                    FROM manages where email = '${dataParse.email}' and password = '${dataParse.pass}'`;

                let users = await this.querySQL(sql);

                console.log(users)
                let urlRedirect = '/login';
                if  (users.length !== 0) {
                    if (users[0].role === 'Admin') {
                        urlRedirect = "/admin/home.controller";
                    } else {
                        urlRedirect = "/user/home.controller";
                    }
                    res.writeHead(301, {Location: urlRedirect});
                    res.end();
                }
                else {
                    // res.writeHead(301, {Location: urlRedirect});
                    // res.end();
                    fs.readFile('./views/login.html', 'utf8', (err, data) => {
                        data = data.replace('<p></p>', '<p style="color: red">thông tin đăng nhập không trính xác</p>');
                        res.writeHead(200, {"content-type": "text/html"});
                        res.end(data);
                    })
                }
            })
        }
    }

    id
}

module.exports = AuthController