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
                [{text: 'Посмотреть инструкции'}, {text: 'Создать инструкицю'}],
                [{text: 'Поиск инструкции по тексту'}, {text: 'Мои инструкции'}, {text: 'Мои ответы'}],
                [{text: 'Рейтинг пользавателей'}, {text: 'Подписаться на новые инструкции'}]
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
}