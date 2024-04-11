<<<<<<< HEAD
module.exports = {
    userOrAdminOpt: { 
        reply_markup: JSON.stringify({ 
            inline_keyboard: [ 
            [{ text: 'Я пользователь', callback_data: 'user' }], 
            [{ text: 'Я администратор', callback_data: 'admin' }],  
            ] 
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
=======
module.exports = {
    userOrAdminOpt: { 
        reply_markup: JSON.stringify({ 
            inline_keyboard: [ 
            [{ text: 'Я пользователь', callback_data: 'user' }], 
            [{ text: 'Я администратор', callback_data: 'admin' }],  
            ] 
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
>>>>>>> 310b43df2042562b83d5eff5ce0ce66adc2b572f
