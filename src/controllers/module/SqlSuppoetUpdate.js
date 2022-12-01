const BaseController = require("./base.controller");

class SuppotUpdate extends BaseController {

    async updateName (name,id) {
        let update = `update manages set managesName = '${name}' where managesID = ${id}`
        await this.querySQL(update)
    }

    async updateBrithday (birthday,id) {
        let update = `update manages set birthday = '${birthday}' where managesID = ${id}`
        await this.querySQL(update)
    }

    async updatePhone (phone,id) {
        let update = `update manages set Phone = ${phone} where managesID = ${id}`;
        await this.querySQL(update)
        }
}

module.exports = SuppotUpdate;