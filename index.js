require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');


// Получаем токен из .env
const token = process.env.TELEGRAM_BOT_TOKEN;


// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });


const commands = [

    {

        command: "start",
        description: "Перезапустить бота"

    }

]

bot.setMyCommands(commands);

bot.on('text', async msg => {

    try {

        if (msg.text.startsWith('/start')) {

            await bot.sendMessage(msg.chat.id, `Привет, ${msg.from.first_name}! Я нахожусь на стадии разработки и скоро добавлю новые функции.`, {

                reply_markup: {

                    keyboard: [

                        ['Получить конфигурацию', 'Тарифы', 'Установка'],
                        ['Пользовательское соглашение', 'Помощь']

                    ],

                    resize_keyboard: true

                }

            })

        }

        else if (msg.text == 'Получить конфигурацию') {

            await bot.sendMessage(msg.chat.id, `Скоро я начну выпускать конфигурационные файлы для установки`);

        }

        else if (msg.text == 'Тарифы') {

            const stream = fs.createReadStream('image/tarif.jpeg');
            await bot.sendPhoto(msg.chat.id, stream, {
                caption: 'Выберете один из планов:'
            });

        }

        else if (msg.text == 'Установка') {

            await bot.sendMessage(msg.chat.id, `Скоро я начну выпускать конфигурационные файлы для установки`);

        }

        else if (msg.text == 'Пользовательское соглашение') {

            await bot.sendMessage(msg.chat.id, `Важный документ, который нужно прочесть перед тем как использовать VPN. Пока его нет, но он скоро появится`);

        }

        else if (msg.text == 'Помощь') {

            await bot.sendMessage(msg.chat.id, `Раздел помощи. Скоро здесь появятся дополнительные функции`);

        }

        else if (msg.text == '/support') {

            await bot.sendMessage(msg.chat.id, `Если есть вопросы, напишите @danya_ta_ta`);

        }
        else if (msg.text == '/help') {

            await bot.sendMessage(msg.chat.id, `Раздел помощи. Скоро здесь появятся дополнительные функции`);

        }

        else {

            await bot.sendMessage(msg.chat.id, `Пожалуйста, выберете команду`);

        }

    }
    catch (error) {

        console.log(error);

    }

})



// Запускаем бота
bot.on('polling_error', console.log);
