module.exports = {
    firstStep: {
        reply_markup: JSON.stringify({
            "keyboard": [
                [{text: 'Я пользователь'}, {text: 'Я администратор'}]
            ],
            resize_keyboard: true,
        })
    },
    mainMenu: {
        reply_markup: JSON.stringify({
            "keyboard": [
                [{text: 'Посмотреть инструкции'}, {text: 'Создать инструкицию'}],
                [{text: 'Поиск инструкции по тегу'}, {text: 'Мои инструкции'}, {text: 'Мои ответы'}],
                [{text: 'Рейтинг пользавателей'}, {text: 'Подписаться на рассылки'}]
            ],
            resize_keyboard: true,
        })
    },
    findQuestionKeyBoard: {
        reply_markup: JSON.stringify({
            "keyboard": [
                [{text: 'Главное меню'}, {text: 'Показать ещё'}]
            ],
            resize_keyboard: true,
        })
    },
    findAnswerKeyBoard: {
        reply_markup: JSON.stringify({
            "keyboard": [
                [{text: 'Главное меню'}, {text: 'Показать ещё ответов'}]
            ],
            resize_keyboard: true,
        })
    },
    openOrLike: {
        reply_markup: JSON.stringify({
            "inline_keyboard": [
                [{text: 'Посмотреть ответы', callback_data: 'open_question'}, {text: 'Поставить лайк', callback_data: 'like_question'}]
            ],
            resize_keyboard: true,
        })
    },
    emptyAnswer: {
        reply_markup: JSON.stringify({
            "keyboard": [
                [{text: 'Написать ответ'}, {text: 'Главное меню'}]
            ],
            resize_keyboard: true,
        })
    },
    LikeAnswer: {
        reply_markup: JSON.stringify({
            "inline_keyboard": [
                [{text: 'Поставить лайк', callback_data: 'like_answer'}]
            ],
            resize_keyboard: true,
        })
    },
    editMyQuestion: {
        reply_markup: JSON.stringify({
            "inline_keyboard": [
                [{text: 'Изменить заголовок', callback_data: 'edit_title'}, {text: 'Изменить инструкцию', callback_data: 'edit_body'}],
                [{text: 'Изменить тег', callback_data: 'edit_tags'}]
            ],
            resize_keyboard: true,
        })
    },
    editMyAnswer: {
        reply_markup: JSON.stringify({
            "inline_keyboard": [
                [{text: 'Изменить ответ', callback_data: 'edit_answer'}],
            ],
            resize_keyboard: true,
        })
    },
    mailingKeyboard: {
        reply_markup: JSON.stringify({
            "inline_keyboard": [
                [{text: 'Подписаться на новые ответы', callback_data: 'newsLetter'}], 
                [{text: 'Подписаться на новые инструкции', callback_data: 'reply_mailing'}]
            ],
            resize_keyboard: true,
        })
    },
}