const TelegramApi = require('node-telegram-bot-api')

const TOKEN = process.env.TOKEN;

const bot = new TelegramApi(TOKEN, { polling: true })

