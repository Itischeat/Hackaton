const db = require('../db.js')

class Controller {
    async createUser(name, tg_id, chat_id) {
        try {
            await db.query(`Insert into users (name, tg_id, chat_id) values ('${name}', ${tg_id}, ${chat_id})`)
        }
        catch(e) {
            console.log(e)
        }
    }
    async validateUser(user_id) {
        try {
            let validValue = await db.query(`select EXISTS
            (SELECT tg_id FROM users WHERE ${user_id} = tg_id);`)
            return validValue
        }
        catch(e) {
            console.log(e)
        }
    }
    async createQuestion(obj, timestamp) { // TODO: Не работает проверка готовности создания инструкции
        try {
            await db.query(`INSERT into question (title, body, created_date, main_tags, author_id) values ('${obj.title}', '${obj.body}', '${timestamp}', '${obj.main_tags}', ${obj.user_id})`)
            return true
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    async findAllQuestion() {
        try {
            let qst = await db.query(`select * from question`)
            return qst
        }
        catch(e) {
            console.log(e)
        }
    }
}

module.exports = new Controller()