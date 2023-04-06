import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Configuration, OpenAIApi } from "openai";

export default class ChatbotController {
  public async sendMessage({ request, response }: HttpContextContract) {
    const userMessage = request.input("message");

    if (!userMessage) {
      return response.status(400).send({ message: "Message is required." });
    }
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const chatGptResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      });

      const chatbotMessage =
        chatGptResponse.data?.choices[0]?.message ?? "Failed response.";
      return response.status(200).send({ message: chatbotMessage });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .send({ message: "Failed to fetch response from ChatGPT API." });
    }
  }
}
