const TelegramApi = require('node-telegram-bot-api')
const dayjs = require('dayjs')

const TOKEN = '6465619200:AAGOSAYWKH-d-5BsZ6_krifAW4cuz8YM9J4';

const bot = new TelegramApi(TOKEN, { polling: true })

const {firstStep, mainMenu, findQuestionKeyBoard, openOrLike, emptyAnswer, LikeAnswer, editMyQuestion, editMyAnswer, mailingKeyboard, findAnswerKeyBoard} = require('./options.js')
const controller = require('./Controller/controller.js')

bot.on("polling_error", (msg) => console.log(msg));


let next_created_question = 0
let findOfTags_counter = 0
let answer_counter = 0
let edit_q = 0
let newsLetter_counter = false
let mailing_counter = false

let question = {
    title: '',
    body: '',
    main_tags: '',
    user_id: ''
}
let max_lists = 5
let start = 0
let question_id = ''
let answer_id = ''


bot.on('message', (msg) => {
    const name = msg.from.first_name
    const user_id = msg.from.id
    const chat_id = msg.chat.id
    const user_name = msg.from.username
    const text = msg.text
    question.user_id = user_id
    if (text === '/start') bot.sendMessage(chat_id, 'Привет, ты пользователь или администратор?', firstStep)

    // Создание пользователя
    else if (text === 'Я пользователь') {
        if (controller.validateUser(user_id)) {
            controller.createUser(name, user_id, chat_id, user_name)
        }
        bot.sendMessage(chat_id, 'Выберите один из пунктов меню', mainMenu)
    }

    // Создание  инструкции
    else if (text === 'Создать инструкицию') {
        next_created_question++
        bot.sendMessage(chat_id, 'Введите заголовок инструкции')
    }
    else if (next_created_question === 1) {
        next_created_question++
        question.title = text
        bot.sendMessage(chat_id, 'Введите инструкцию')
    }
    else if (next_created_question === 2) {
        next_created_question++
        question.body = text
        bot.sendMessage(chat_id, 'Введите тег для вашей инструкции (без @)')
    }
    else if (next_created_question === 3) {
        next_created_question = 0
        question.main_tags = text.toLowerCase()
        let date = dayjs().format('YYYY-MM-DD')
        controller.createQuestion(question, date).then((res) => {
            let i = 0    
            let inter = setInterval(() => {
                try {
                    bot.sendMessage(res[i].tg_id, `Создана новая инструкция под тегом:  ${text}`)
                    i++
                }
                catch(e) {
                    clearInterval(inter)
                }
            }, 115)
        })
        question = {
            title: '',
            body: '',
            main_tags: '',
            user_id: ''
        }
    }

    // Просмотр инструкций
    else if (text === 'Посмотреть инструкции') {
        bot.sendMessage(chat_id, "Вот лучшие пять инструкций", findQuestionKeyBoard) 
        getQuestion(chat_id)
    }
    else if (text === 'Показать ещё') {
        max_lists += 5
        start += 5
        getQuestion(chat_id, max_lists, start)
    }
    else if (text === 'Главное меню') {
        max_lists = 5
        start = 0
        bot.sendMessage(chat_id, 'Выберите один из пунктов меню', mainMenu)
    }
    
    // Поиск инструкции по тегу
    else if (text === 'Поиск инструкции по тегу') {
        bot.sendMessage(chat_id, 'Введите тег инструкции, которую ищете')
        findOfTags_counter++
    }
    else if (findOfTags_counter === 1) {
        findOfTags_counter = 0
        getQuestionOfTags(chat_id, text)
    }

    // Написать ответ
    else if (text === 'Написать ответ') {
        bot.sendMessage(chat_id, 'Введите ваш ответ')
        answer_counter++
    }
    else if (answer_counter === 1) {
        answer_counter = 0
        controller.createAnswer(text, user_id, question_id).then((res) => {
            bot.sendMessage(res?.chat_id, `Новый ответ на инструкцию номер:  ${question_id}`)
            bot.sendMessage(chat_id, 'Ответ успешно создан')
        })
    }

    // рейтинг пользователей
    else if (text === 'Рейтинг пользавателей') {
        bot.sendMessage(chat_id, 'Топ лучших пользователей: ', findQuestionKeyBoard)
        getSortedRating(chat_id, max_lists, start)
    }

    // Мои инструкции
    else if (text === 'Мои инструкции') {
        bot.sendMessage(chat_id, `Первые пять ваших инструкций`, findQuestionKeyBoard)
        getMyQuestions(chat_id, user_id, max_lists, start)
    }

    // редактирование инструкций
    else if (edit_q === 1) {
        edit_q = 0
        controller.editTitel(text, user_id, question_id).then(res => {
            if (res) {
                bot.sendMessage(chat_id, 'Заголовок изменён')
            } else {
                bot.sendMessage(chat_id, 'Ошибка, попробуйте ещё раз')
            }
        })
    }
    else if (edit_q === 2) {
        edit_q = 0
        controller.editBody(text, user_id, question_id).then(res => {
            if (res) {
                bot.sendMessage(chat_id, 'Инструкция изменена')
            } else {
                bot.sendMessage(chat_id, 'Ошибка, попробуйте ещё раз')
            }
        })
    }
    else if (edit_q === 3) {
        edit_q = 0
        controller.editTags(text, user_id, question_id).then(res => {
            if (res) {
                bot.sendMessage(chat_id, 'Тег изменён')
            } else {
                bot.sendMessage(chat_id, 'Ошибка, попробуйте ещё раз')
            }
        })
    }

    // Мои ответы
    else if (text === 'Мои ответы') {
        bot.sendMessage(chat_id, `Первые пять ваших ответов`, findAnswerKeyBoard)
        getMyAnswer(chat_id, user_id, max_lists, start)
    }
    else if (text === 'Показать ещё ответов') {
        start += 5
        max_lists += 5
        getMyAnswer(chat_id, user_id, max_lists, start)
    }
    else if (edit_q === 4) {
        edit_q = 0
        controller.editAnswer(text, answer_id).then(res => {
            if (res) {
                bot.sendMessage(chat_id, 'Ответ изменён')
            } else {
                bot.sendMessage(chat_id, 'Ошибка, попробуйте ещё раз')
            }
        })
    }

    // рассылки
    else if (text === 'Подписаться на рассылки') {
        bot.sendMessage(chat_id, 'Выберите типы рассылки:', { reply_markup: mailingKeyboard.reply_markup })
    }
})

bot.on('callback_query', (data) => {
    const user_id = data.from.id
    const text = data?.message.text.slice(12).split('\n')
    const title = text[2]
    question_id = text[1]?.slice(16)
    const chat_id = data.message.chat.id
    const author_id = text[0]
    const message_id = data.id
    const body_answer = data?.message.text.split('\n')[2]

    // Поставить лайк на инструкцию
    if (data.data === 'like_question') {
        bot.answerCallbackQuery(message_id, {text: 'Вы поставили лайк!'}).then(() => {
            controller.setLikeToQuestion(author_id, title)
        })
    }

    // Поставить лайк на ответ
    if (data.data === 'like_answer') {
        bot.answerCallbackQuery(message_id, {text: 'Вы поставили лайк!'}).then(() => {
            controller.setLikeAnswer(author_id, question_id, body_answer)
        })
    }

    // ОТВЕТЫ 
    else if (data.data === 'open_question') {
        bot.answerCallbackQuery(message_id).then(() => {
            getAllAnswer(question_id, chat_id)
        })
    }

    // редактирование инструкций
    else if (data.data === 'edit_title') {
        bot.answerCallbackQuery(message_id).then(() => {
            edit_q = 1
            bot.sendMessage(chat_id, 'Введите новый заголовок')
        })
    }
    else if (data.data === 'edit_body') {
        bot.answerCallbackQuery(message_id).then(() => {
            edit_q = 2
            bot.sendMessage(chat_id, 'Введите новую инструкцию')
        })
    }
    else if (data.data === 'edit_tags') {
        bot.answerCallbackQuery(message_id).then(() => {
            edit_q = 3
            bot.sendMessage(chat_id, 'Введите новый тег')
        })
    }

    // редактирование ответа
    else if (data.data === 'edit_answer') {
        bot.answerCallbackQuery(message_id).then(() => {
            edit_q = 4
            answer_id = text[2].slice(12)
            bot.sendMessage(chat_id, 'Введите новый ответ')
        })
    }

    // рассылки
    else if (data.data === 'newsLetter') {
        controller.getMailingStatus(user_id).then(res => {
            if (!(res[0].newsletter)) {
                bot.answerCallbackQuery(message_id, {text: 'Подписка активирована'}).then(() => {
                    controller.updateNewsLetter(user_id, !(res[0].newsletter))
                })
            } else {
                bot.answerCallbackQuery(message_id, {text: 'Подписка отключена'}).then(() => {
                    controller.updateNewsLetter(user_id, !(res[0].newsletter))
                })
            }
        })
    }
    else if (data.data === 'reply_mailing') {
        controller.getMailingStatus(user_id).then(res => {
            if (!(res[0].reply_mailing)) {
                bot.answerCallbackQuery(message_id, {text: 'Подписка активирована'}).then(() => {
                    controller.updateReplyMailing(user_id, !(res[0].reply_mailing))
                })
            } else {
                bot.answerCallbackQuery(message_id, {text: 'Подписка отключена'}).then(() => {
                    controller.updateReplyMailing(user_id, !(res[0].reply_mailing))
                })
            }
        })
    }
})


async function getQuestion(chat_id, max_lists = 5, start = 0) {
    await controller.findAllQuestion().then(res => {
        let list_question = res.sort((a, b) => b.likes - a.likes)
        list_question = list_question.slice(start, max_lists)
        let i = 0    
        let inter = setInterval(() => {
            try {
                if ((i + start) < max_lists) {
                    bot.sendMessage(chat_id, `ID автора:  <a href="tg://user?id=${list_question[i].author_id}">${list_question[i].author_id}</a>\nID инструкции:  ${list_question[i].id}\n${list_question[i].title}\n${list_question[i].body}\nСоздан:  ${dayjs(list_question[i].created_date).format('YYYY/MM/DD')}\nТег:  ${list_question[i].main_tags}\nКол-во лайков:  ${list_question[i].likes}`, {parse_mode: 'HTML', reply_markup: openOrLike.reply_markup})
                    i++
                }
            }
            catch(e) {
                clearInterval(inter)
                bot.sendMessage(chat_id, 'Больше нечего показывать')
            }
        }, 115)
    })
}

async function getQuestionOfTags(chat_id, text) {
    let res = await controller.findQuestionOfTags(text).then(res => {
        let i = 0
        let inter = setInterval(() => {
            try {
                bot.sendMessage(chat_id, `ID автора:  <a href="tg://user?id=${res[i].author_id}">${res[i].author_id}</a>\nID инструкции:  ${res[i].id}\n${res[i].title}\n${res[i].body}\nСоздан:  ${dayjs(res[i].created_date).format('YYYY/MM/DD')}\nТег:  ${res[i].main_tags}`, {parse_mode: 'HTML', reply_markup: openOrLike.reply_markup})
                i++
            }
            catch(e) {
                clearInterval(inter)
                bot.sendMessage(chat_id, 'Инструкции закончились')
            }
        }, 115)

    })
}

async function getAllAnswer(question_id, chat_id, max_lists, start) {
    controller.findAnswer(question_id).then(ans => {
        if (!ans) {
            bot.sendMessage(chat_id, `На эту инструкцию ещё нет ответов`, emptyAnswer)
        } else {
            ans = ans.sort((a, b) => b.likes - a.likes)
            ans = ans.slice(start, max_lists)
            let i = 0
            let inter = setInterval(() => {
            try {
                bot.sendMessage(chat_id, `ID автора:  <a href="tg://user?id=${ans[i].author_id}">${ans[i].author_id}</a>\nID инструкции:  ${question_id}\n${ans[i].body}\nКол-во лайков:  ${ans[i].likes}`, {parse_mode: 'HTML', reply_markup: LikeAnswer.reply_markup})
                i++
            }
            catch(e) {
                clearInterval(inter)
                bot.sendMessage(chat_id, 'Ответы закончились', emptyAnswer)
            }
        }, 115)
        }
    })
}

async function getSortedRating(chat_id, max_lists = 5, start = 0) {
    controller.getRatingUsers().then(res => {
        res = res.sort((a, b) => b.likes - a.likes)
        res = res.slice(start, max_lists)
        let i = 0
        let inter = setInterval(() => {
        try {
                if ((i + start) < max_lists) {
                bot.sendMessage(chat_id, `Имя автора:  ${res[i].name}\nID автора:  <a href="tg://user?id=${res[i].tg_id}">${res[i].tg_id}</a>\nРейтинг:  ${res[i].rating}`, {parse_mode: 'HTML'})
                i++
            }
        }
        catch(e) {
            clearInterval(inter)
            bot.sendMessage(chat_id, 'Ответы закончились', findQuestionKeyBoard)
            }
        }, 115)
    })
}

async function getMyQuestions(chat_id, user_id, max_lists = 5, start = 0) {
    controller.getAllMyQuestions(user_id).then(res => {
        res = res.sort((a, b) => b.likes - a.likes)
        res = res.slice(start, max_lists)
        let i = 0
        let inter = setInterval(() => {
        try {
            if ((i + start) < max_lists) {
                bot.sendMessage(chat_id, `ID автора:  <a href="tg://user?id=${res[i].author_id}">${res[i].author_id}</a>\nID инструкции:  ${res[i].id}\n${res[i].title}\n${res[i].body}\nСоздан:  ${dayjs(res[i].created_date).format('YYYY/MM/DD')}\nТег:  ${res[i].main_tags}`, {parse_mode: 'HTML', reply_markup: editMyQuestion.reply_markup})
                i++
            }
        }
        catch(e) {
            clearInterval(inter)
            bot.sendMessage(chat_id, 'Инструкции закончились ', findQuestionKeyBoard)
            }
        }, 115)
    })
}

async function getMyAnswer(chat_id, user_id, max_lists = 5, start = 0) {
    controller.getAllMyAnswer(user_id).then(ans => {
        ans = ans.slice(start, max_lists)
        let i = 0
        let inter = setInterval(() => {
            try {
                if ((i + start) < max_lists) {
                    bot.sendMessage(chat_id, `ID автора:  <a href="tg://user?id=${ans[i].author_id}">${ans[i].author_id}</a>\nID инструкции:  ${ans[i].question_id}\nID ответа:  ${ans[i].id}\n${ans[i].body}\nКол-во лайков:  ${ans[i].likes}`, {parse_mode: 'HTML', reply_markup: editMyAnswer.reply_markup})
                    i++
                }   
            }
            catch(e) {
                clearInterval(inter)
                bot.sendMessage(chat_id, 'Ответы закончились', findQuestionKeyBoard)
            }
        }, 115)
    })
}