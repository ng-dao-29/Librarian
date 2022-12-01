const qs = require("qs");
const BaseController = require("../module/base.controller")

class EditPasswordController extends BaseController {

     async formEditPassword(req, res) {
        let dataform = await this.getTemplate("./views/user/editPassword.html");
        res.writeHead(200, {"content-type": "text/html"});
        res.end(dataform);
    }

    updatePassword(req, res) {
        let data = "";
        req.on("data", chunk => {
            data += chunk;
        })
        req.on("end", async () => {
            data = qs.parse(data);
            console.log(data)
            let sql = `SELECT password,email, role  FROM manages 
            where email = '${data.email}' and password = '${data.oldPassword}'`;
            let user = await this.querySQL(sql);
            console.log(user)
            if (user.length !== 0) {
                let url;
                if (user[0].role === "Admin") {
                    url = "/admin/home.controller"
                }else {
                    url = "/user/home.controller"
                }

                if (data.newpassword === data.confirmPassword) {
                    let sql = `update manages 
                                set password = '${data.confirmPassword}' 
                                where email = '${data.email}'`
                    await this.querySQL(sql)
                    console.log("ok")
                    res.writeHead(301 , {location:url});
                    res.end();
                }
                else {
                    res.writeHead(301,{location: '/edit-password' });
                    res.end();
                }
            }
            else {
                res.writeHead(301, {location: "/edit-password"});
                res.end();
            }

        })
    }


    //  updatePassword(req, res) {
    //     if (req.method === 'POST') {
    //         let data = "";
    //         req.on("data", chunk => {
    //             data += chunk;
    //         })
    //         req.on("end", async () => {
    //             let dataParse = qs.parse(data);
    //             console.log(dataParse);
    //             let sql = `SELECT password,email  FROM book_manager.manages where email = '${dataParse.email}' and password = '${dataParse.oldPassword}'`;
    //             let validAccount = await ControlSql.querySQL(sql);
    //             console.log(validAccount)
    //             if (validAccount.length !== 0) {
    //                 if (dataParse.newpassword === dataParse.confirmPassword) {
    //                     let sql = `update manages set password = '${dataParse.confirmPassword}' where email = '${dataParse.email}'`;
    //                     await ControlSql.querySQL(sql)
    //                     console.log('ok')
    //                     fs.readFile("./views/editPassword.html","utf8", (err, data) => {
    //                         if (err) {
    //                             return console.log(err.message);
    //                         }
    //                         data = data.replace("<h4></h4>","<h4 class =\'formTitle\'>đã thay đổi mật khẩu thành công</h4>");
    //                         console.log(data)
    //                         res.writeHead(200, {"content-type": "text/html"});
    //                         res.end(data);
    //                     })
    //                 }
    //                 else {
    //                     fs.readFile("./views/editPassword.html","utf8", (err, data) => {
    //                         if (err) {
    //                             return console.log(err.message);
    //                         }
    //                         data = data.replace("<h4></h4>", "<h4 style=\'color: red\' class =\'formTitle\'>xác nhận mật khẩu không khớp </h4>")
    //                         res.writeHead(200, {"content-type": "text/html"});
    //                         res.end(data);
    //                     })
    //                 }
    //             }
    //             else {
    //                 fs.readFile("./views/editPassword.html",'utf8',  (err, data) => {
    //                     if (err) {
    //                         return console.log(err.message)
    //                     }
    //                     data = data.replace("<h4></h4>", "<h4 style=\'color: red\' class=\' formTitle\'>thông tin email hoạc password không hợp lệ </h4>");
    //                     res.writeHead(200, {"content-type": "text/html"});
    //                     res.end(data);
    //                 })
    //             }
    //         })
    //     }
    // }
}

module.exports = EditPasswordController