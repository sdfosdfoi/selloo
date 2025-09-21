import express from "express";
import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8356139072:AAFhiu7mSCb431Ewa8-vnwIPVsLW9l46TyA";
const bot = new TelegramBot(TOKEN, { polling: false });

const app = express();
app.use(express.json());

// /start команда
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const text = `
<b>Привет! 👋 Добро пожаловать в Labubu!</b>

Ты попал в мир Лабубу — виртуального питомца! 🐾

<b>Что делать:</b>
• Открывай сундуки 🧰
• Корми и играй с питомцем 🎮
• Приглашай друзей 🤝
• Получай награды 🏆
• Будь самым крутым в школе 😎
`;
  const options = {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Играть ▶️", url: "https://labubub-4mj5.vercel.app" }],
        [{ text: "Сундуки 🧰", callback_data: "chests" }],
        [{ text: "Пригласить друзей 🤝", callback_data: "invite" }]
      ]
    }
  };
  bot.sendMessage(chatId, text, options);
});

// обработка кнопок
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  if (query.data === "chests") {
    bot.sendMessage(chatId, "🧰 Вы открыли сундук! Что там?");
  } else if (query.data === "invite") {
    bot.sendMessage(chatId, "🤝 Пригласи друзей по ссылке: https://labubub-4mj5.vercel.app");
  }
  bot.answerCallbackQuery(query.id);
});

// webhook endpoint (Vercel)
app.post(`/api/server`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

export default app;
