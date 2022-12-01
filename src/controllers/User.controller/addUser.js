const BaseController = require('../module/base.controller')
const qs = require("qs");
const fs = require("fs");

class AddUser extends BaseController{
    async showFormAdd(req, res) {
        let form = await this.getTemplate('./views/user/addUser.html');
        res.writeHead(200, {"content-type": "text/html"});
        res.end(form)
    }

    async handleAddUser(req, res) {
        let data = "";
        req.on('data', chunk => {
            data += chunk});
        req.on('end', async () => {
            console.log(data)
            let dataForm = qs.parse(data)
            let checkEmai = `SELECT email from manages where email = '${dataForm.email}'`
            let email = await this.querySQL(checkEmai);
            console.log(email)
            if (email.length === 0) {
                let sql = `insert into manages(managesName,birthday,email,password,Phone)
            values  ('${dataForm.name}','${dataForm.birthday}','${dataForm.email}','${dataForm.pass}','${dataForm.phone}')`
                console.log(dataForm)
                this.querySQL(sql)
                res.writeHead(301 , {location: '/admin/home.controller'});
                res.end()
            }
            else {
                fs.readFile('./views/user/addUser.html','utf8', (err, data) => {
                    data = data.replace('<p></p>','<p style="color: red"> tài khoản (email) đã tồn tại</p>');
                    res.writeHead(200, {"Content-Type":"text/html"});
                    res.end(data);
                })
            }

        })
    }
}
module.exports = AddUser