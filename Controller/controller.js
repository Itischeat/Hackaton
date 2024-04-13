const db = require('../db.js')

class Controller {
    async createUser(name, tg_id, chat_id, user_name) {
        try {
            await db.query(`Insert into users (name, user_name, tg_id, chat_id) values ('${name}', '${user_name}', ${tg_id}, ${chat_id})`)
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
            await db.query(`Update users SET rating = rating + 1 WHERE tg_id = ${obj.user_id}`)
            let res = await db.query('select tg_id from users where reply_mailing = true')
            return res.rows
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    async findAllQuestion() {
        try {
            let qst = await db.query(`select * from question`)
            return qst.rows
        }
        catch(e) {
            console.log(e)
        }
    }
    async findQuestionOfTags(text) {
        try {
            let res = await db.query(`select * from question where main_tags = '${text.toLowerCase()}'`)
            return res.rows
        }
        catch(e) {
            console.log(e)
        }
    }
    async setLikeToQuestion(author_id, title) {
        try {
            await db.query(`UPDATE question SET likes = likes + 1 where author_id = ${author_id} and title = '${title}'`)
        }
        catch(e) {
            console.log(e)
        }
    }


    async findAnswer(question_id) {
        try {
            let res = await db.query(`select * from answer WHERE question_id = ${question_id}`)
            if (res.rowCount === 0) {
                return false
            }
            return res.rows
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    async createAnswer(body, author_id, question_id) {
        try {
            await db.query(`Insert into answer (body, author_id, question_id) values ('${body}', ${author_id}, ${question_id})`)
            await db.query(`Update users SET rating = rating + 1 WHERE tg_id = ${author_id}`)
            let res = await db.query(`select chat_id from users where newsletter = true and tg_id = (select author_id from question where id = ${question_id})`)
            return res.rows[0]
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    async setLikeAnswer(author_id, question_id, body) {
        try {
            await db.query(`Update answer SET likes = likes + 1 WHERE author_id = ${author_id} and question_id = ${question_id} and body = '${body}'`)
        }
        catch(e) {
            console.log(e)
        }
    }


    async getRatingUsers() {
        try {    
            let res = await db.query(`select * from users`)
            return res.rows
        }
        catch(e) {
            console.log(e)
        }
    }


    async getAllMyQuestions(author_id) {
        try {    
            let res = await db.query(`select * from question where author_id = ${author_id}`)
            return res.rows
        }
        catch(e) {
            console.log(e)
        }
    }
    async editTitel(newTitel, author_id, question_id) {
        try {    
            await db.query(`Update question Set title = '${newTitel}' where author_id = ${author_id} and id = ${question_id}`)
            return true
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    async editBody(newBody, author_id, question_id) {
        try {    
            await db.query(`Update question Set body = '${newBody}' where author_id = ${author_id} and id = ${question_id}`)
            return true
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    async editTags(newTags, author_id, question_id) {
        try {    
            await db.query(`Update question Set main_tags = '${newTags}' where author_id = ${author_id} and id = ${question_id}`)
            return true
        }
        catch(e) {
            console.log(e)
            return false
        }
    }


    async getAllMyAnswer(author_id) {
        try {    
            let res = await db.query(`select * from answer where author_id = ${author_id}`)
            return res.rows
        }
        catch(e) {
            console.log(e)
        }
    }
    async editAnswer(newAnswer, id) {
        try {    
            await db.query(`Update answer Set body = '${newAnswer}' where id = ${id}`)
            return true
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    

    async getMailingStatus(tg_id) {
        try {    
            let res = await db.query(`select newsletter, reply_mailing from users where tg_id = ${tg_id}`)
            return res.rows
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    async updateNewsLetter(tg_id, status) {
        try {    
            await db.query(`update users SET newsletter = ${status} where tg_id = ${tg_id}`)
            return true
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
    async updateReplyMailing(tg_id, status) {
        try {    
            await db.query(`update users SET reply_mailing = ${status} where tg_id = ${tg_id}`)
            return true
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
}

module.exports = new Controller()