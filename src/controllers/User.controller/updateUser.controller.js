
const SuppotUpdate = require("../module/SqlSuppoetUpdate");
const fs = require("fs");
const qs = require("qs");

class UpdateUserController extends SuppotUpdate{

    async showFormUpdate(req, res) {
        let dataForm = await this.getTemplate("./views/user/updateUse.html");
        res.writeHead(200, {"content-type": "text/html"});
        res.end(dataForm);
    }

    handleUpdate(req, res) {
        let data = "";
        req.on('data', chunk => {
            data += chunk});
        req.on("end", async () => {
            let dataForm = qs.parse(data)
            console.log(dataForm);
            let sql = `SELECT password,email, role, managesID FROM manages 
            where email = '${dataForm.email}' and password = '${dataForm.pass}'`
            let user = await this.querySQL(sql);
            console.log(user);
            if (user.length !== 0) {
                let id = user[0].managesID
                let urlHome = ''
                if (user[0].role === "Admin") {
                    urlHome = "/admin/home.controller"
                }else {
                    urlHome = "/user/home.controller"
                }
                // let sql = `UPDATE manages
                // SET managesName = '${dataForm.name}',
                // birthday = '${dataForm.birthday}',
                // Phone = '${dataForm.phone}'
                // WHERE managesID = '${user[0].managesID}'`
                // await this.querySQL(sql)

                if (dataForm.name !== "") {
                    await this.updateName(`${dataForm.name}`, id)
                }
                if (dataForm.birthday !== "") {
                    await this.updateBrithday(dataForm.birthday, id)
                }
                if (dataForm.phone !== "") {
                    await this.updatePhone(dataForm.phone, id)
                }

                res.writeHead(301, {location: urlHome})
                res.end();

            }
            else {
                // res.writeHead(301, {location: '/edit-information' })
                // res.end()
                fs.readFile('./views/user/updateUse.html','utf8', (err, data) => {
                    data = data.replace('<p></p>','<p style="color: red">thông tin xác thực không trính xác</p>');
                    res.writeHead(200, {"content-type": "text/html"});
                    res.end(data);
                })
            }
        });
    }

    // handleUpdate (req, res) {
    //     let id;
    //         let data = "";
    //         req.on("data", chunk => {
    //             data += chunk });
    //         req.on("end", async () => {
    //             let dataForm = qs.parse(data);
    //             console.log(dataForm.email);
    //             let validAccount =  await Sql.checkcAcount(dataForm.email,dataForm.pass);
    //             console.log(validAccount)
    //             id = validAccount[0].managesID
    //             console.log(id)
    //             if (validAccount[0] !== 0) {
    //                 if (dataForm.name !== "") {
    //                     Sql.updateName(`${dataForm.name}`, id)
    //                 }
    //                 if (dataForm.birthday !== "") {
    //                     Sql.updateBrithday(dataForm.birthday, id)
    //                 }
    //                 if (dataForm.phone !== "") {
    //                     Sql.updatePhone(dataForm.phone, id)
    //                 }
    //
    //             }
    //             else {
    //                 fs.readFile('./views/updateUse.html','utf8', (err, data) => {
    //                     data = data.replace('<p></p>','<p style="color: red">thông tin xác thực không chính xác</p>');
    //                     res.writeHead(200, {"content-type": "text/html"});
    //                     res.end(data);
    //                 })
    //
    //             }
    //         })
    // }

}

module.exports = UpdateUserController