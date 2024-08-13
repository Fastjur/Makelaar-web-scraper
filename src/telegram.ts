import TelegramBot from "node-telegram-bot-api";
import { IHuis } from "./Huis";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set");
}

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log(msg.from?.id, msg);

  if (msg.text === "/start") {
    await bot.sendMessage(chatId, "Welcome to the house bot!");
    return;
  }

  if (msg.text === "/stop") {
    await bot.sendMessage(chatId, "Goodbye!");
    return;
  }

  await bot.sendMessage(chatId, "Received your message");
});

export interface IMessenger {
  sendNewHouses(houses: IHuis[]): Promise<void>;
}

export class TelegramMessenger implements IMessenger {
  readonly chatIds: string[];

  constructor(chatIds: string[]) {
    this.chatIds = chatIds;
  }

  async sendNewHouses(houses: IHuis[]): Promise<void> {
    for (const house of houses) {
      const houseFormatted = house.formatForTelegram();
      const message = `🚨 <b>Nieuw huis gevonden!</b> 🚨\n\n<blockquote>Gegevens van het huis:\n${houseFormatted}</blockquote>`;
      for (const chatId of this.chatIds) {
        await bot.sendMessage(chatId, message, {
          parse_mode: "HTML",
        });
      }
    }
  }
}
