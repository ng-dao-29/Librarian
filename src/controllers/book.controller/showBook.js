const AuthController = require("../auth.controller");
const fs = require("fs");
const qs = require("qs");
const url = require("url");

class BookController extends AuthController {

   async showBook(req,res) {
        let sql = `select * from books`;
        let dataBook = await this.querySQL(sql);
       console.log(dataBook)
        let list = '';
        dataBook.forEach((book,ibdex) => {
            list += `<div class="card" style="width: 18rem;">`
            list += `<img src="${book.pictures}" class="card-img-top" alt="hình ảnh bị lỗi" style="width: 250px; height: 350px">`
            list += `<div class="card-body">`
            list += `<h5 class="card-title">${book.BookName}</h5>`
            list += `<p class="card-text">thể loại: ${book.Category} </p>`
            list += `<p class="card-text">tác giả: ${book.publishing_company}</p>`
            list += `<p class="card-text">tình trạng: ${book.status}</p>`
            list += `<p class="card-text">mô tả: ${book.short_description}</p>`
            list += `<a href="#" class="btn btn-primary">Cập Nhật</a>`
            list += `<a href="/delete-book/?${book.BookID}" class="btn btn-danger">Xóa</a>`
            list += `</div>`
            list += `</div>`
        })

         fs.readFile('./views/book/showBook.html','utf8', (err, data) => {
            let listBook = data.replace("{list}",list);
            res.writeHead(200, {'Content-type':"text/html"});
            res.end(listBook);
        })
    }


    searchBook(req, res) {
       let data = '';
       req.on('data', chunk => {
           data += chunk;
       })
       req.on('end',async () => {
           data = qs.parse(data)
           console.log(data.search)
           let sql = `select * from books where 
                    BookName = '${data.search}' or
                     Category = '${data.search}' or 
                     publishing_company = '${data.search}'`
           let list = await this.listHtml(sql)
           fs.readFile('./views/book/showBook.html','utf8', (err, data) => {
               let listBook = data.replace("{list}",list);
               res.writeHead(200, {'Content-type':"text/html"});
               res.end(listBook);
           })
       })
    }
//
    deleteBook(req, res) {
        let idBook = url.parse(req.url).query;
        let sql = `DELETE FROM books WHERE BookID = '${idBook}'`;
        this.querySQL(sql).then(r => {r.message});
        res.writeHead(301, {location: '/show-book'});
        res.end();
    }
}
module.exports = BookController;