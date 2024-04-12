module.exports = {
    userOrAdminOpt: { 
        reply_markup: JSON.stringify({ 
            inline_keyboard: [ 
            [{ text: 'Я пользователь', callback_data: 'user' }], 
            [{ text: 'Я администратор', callback_data: 'admin' }],  
            ] 
        }) 
    },
    firstStep: {
        reply_markup: JSON.stringify({
            "keyboard": [
                [{text: 'Я пользователь'}, {text: 'Я администратор'}]
            ],
            resize_keyboard: true,
        })
    },
    categoriesOpt: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Шестерни', callback_data: 'gears'}],
                [{text: 'Двигатели', callback_data: 'engines'}],
                [{text: 'Колёса', callback_data: 'wheels'}],
            ]
        })
    }
}