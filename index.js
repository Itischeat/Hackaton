const TelegramApi = require('node-telegram-bot-api')
const dayjs = require('dayjs')

const TOKEN = '6465619200:AAGOSAYWKH-d-5BsZ6_krifAW4cuz8YM9J4';

const bot = new TelegramApi(TOKEN, { polling: true })

const {firstStep, mainMenu} = require('./options.js')
const controller = require('./Controller/controller.js')

bot.on("polling_error", (msg) => console.log(msg));


let next = 0
let question = {
    title: '',
    body: '',
    main_tags: '',
    user_id: ''
}
bot.on('message', (msg) => {
    const name = msg.from.first_name
    const user_id = msg.from.id
    const chat_id = msg.chat.id
    const text = msg.text
    question.user_id = user_id
    if (text === '/start') bot.sendMessage(chat_id, 'Привет, ты пользователь или администратор?', firstStep)
    else if (text === 'Я пользователь') {
        if (!(controller.validateUser(user_id))) {
            controller.createUser(name, user_id, chat_id)
        }
        bot.sendMessage(chat_id, 'Выберите один из пунктов меню', mainMenu)
    }
    else if (text === 'Создать инструкицю') {
        next++
        bot.sendMessage(chat_id, 'Введите заголовок инструкции')
    }
    else if (next === 1) {
        next++
        question.title = text
        bot.sendMessage(chat_id, 'Введите инструкцию')
    }
    else if (next === 2) {
        next++
        question.body = text
        bot.sendMessage(chat_id, 'Введите тег для вашей инструкции (без @)')
    }
    else if (next === 3) {
        next = 0
        question.main_tags = text 
        let date = +dayjs()
        if (!controller.createQuestion(question, date)) {
            bot.sendMessage(chat_id, 'Инструкция успешно создана')
        } else {
            bot.sendMessage(chat_id, 'Инстуркиця не создана, попробуйте снова')
        }
        question = {
            title: '',
            body: '',
            main_tags: '',
            user_id: ''
        }
    }
})