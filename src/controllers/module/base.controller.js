const fs = require("fs");
const connection = require("../../database/database.model");

class BaseController {

     getTemplate(pathFile) {
        return new Promise((resolve, reject) => {
            fs.readFile(pathFile, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    querySQL(sql){
         return new Promise((resolve, reject) => {
             connection.query(sql, (err, data) => {
                 if (err) {
                     reject(err)
                 }
                 resolve(data)
             })
         })
    }

    async listHtml (sql) {

        let data = await this.querySQL(sql);
        console.log(data)
        let list = '';
        data.forEach((value) => {
            list += `<div class="card" style="width: 18rem;">`
            list += `<img src="${value.pictures}" class="card-img-top" alt="hình ảnh bị lỗi" style="width: 250px; height: 350px">`
            list += `<div class="card-body">`
            list += `<h5 class="card-title">${value.BookName}</h5>`
            list += `<p class="card-text">thể loại: ${value.Category} </p>`
            list += `<p class="card-text">tác giả: ${value.publishing_company}</p>`
            list += `<p class="card-text">tình trạng: ${value.status}</p>`
            list += `<p class="card-text">mô tả: ${value.short_description}</p>`
            list += `<a href="#" class="btn btn-primary">Cập Nhật</a>`
            list += `<a href="/delete-book/?${value.BookID}" class="btn btn-danger">Xóa</a>`
            list += `</div>`
            list += `</div>`
        })

        return list
    }

}
module.exports = BaseController;