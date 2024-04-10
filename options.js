module.exports = {
    userOrAdminOpt: { 
        reply_markup: JSON.stringify({ 
            inline_keyboard: [ 
            [{ text: 'Я пользователь', callback_data: 'user' }], 
            [{ text: 'Я администратор', callback_data: 'admin' }],  
            ] 
        }) 
    },
}
