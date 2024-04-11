<<<<<<< HEAD
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
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id

        if (data === 'user') {  // Доделать проверку логина и пароля
            bot.sendMessage(chatId, 'Введите ваш логин')
            bot.on('message', msg => {
                const text = msg.text
                const chatId = msg.chat.id
                if (text === 'user') {
                    bot.sendMessage(chatId, 'Введите ваш пароль')
                    bot.on('message', msg => {
                        const text = msg.text
                        const chatId = msg.chat.id
                        if (text === '1234') {
                            bot.sendMessage(chatId, 'ок')
                        }
                    })
                }
            })
        } else if (data === 'admin') {bot.sendMessage(chatId, 'admin')}
    })
}

start()
=======
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
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id

        if (data === 'user') {  // Доделать проверку логина и пароля
            bot.sendMessage(chatId, 'Введите ваш логин')
            bot.on('message', msg => {
                const text = msg.text
                const chatId = msg.chat.id
                if (text === 'user') {
                    bot.sendMessage(chatId, 'Введите ваш пароль')
                    bot.on('message', msg => {
                        const text = msg.text
                        const chatId = msg.chat.id
                        if (text === '1234') {
                            bot.sendMessage(chatId, 'ок')
                        }
                    })
                }
            })
        } else if (data === 'admin') {bot.sendMessage(chatId, 'admin')}
    })
}

start()
>>>>>>> 310b43df2042562b83d5eff5ce0ce66adc2b572f
