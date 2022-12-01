const AuthController = require("../auth.controller");
class ShowHome extends AuthController {
    async homeUser (req, res) {
        let data = await  this.getTemplate("./views/home/userHome.html");
        res.writeHead(200, {"content-type":"text/html"});
        res.end(data);
    }

    async homeAdmin (req, res) {
        let data = await this.getTemplate('./views/home/adminHome.html');
        res.writeHead(200, {"content-type":"text/html"});
        res.end(data);
    }
}
module.exports = ShowHome