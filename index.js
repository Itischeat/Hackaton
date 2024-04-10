const TelegramApi = require('node-telegram-bot-api')

const TOKEN = '6552942534:AAHiiRYh6KDbdn1jnVAzxRyWjisDSzxQCKo' //process.env.TOKEN;

const bot = new TelegramApi(TOKEN, { polling: true })

const {userOrAdminOpt} = require('./options.js')

const start = () => {

    bot.on('message', msg => {

        const text = msg.text
        const chatId = msg.chat.id
        
        if (text === '/start') {
            bot.sendMessage(chatId, 'Привет. Ты пользователь или администратор?', userOrAdminOpt)
        }
        if (text === 'Я пользователь') {
            return bot.sendMessage('ок')
        }
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id

        if (data === 'user') {
            bot.sendMessage(chatId, 'Введите ваш логин')
        } else if (data === 'admin') {bot.sendMessage(chatId, 'admin')}
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id

        if (data === 'user') {
            bot.sendMessage(chatId, 'Введите ваш пароль')
                bot.on('message', msg => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '1234') {
            bot.sendMessage(chatId, '...')
        }
    })
        } else { bot.sendMessage(chatId, 'Пользователь не найден')} //TODO
    })
}

start()
