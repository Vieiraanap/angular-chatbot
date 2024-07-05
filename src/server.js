// configuração servidor express
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000 | process.env.PORT;
app.use(express.json());
app.use(cors());

// configuração para consumo da OpenAI API
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// enpoint para consumo da OpenAI API
app.post("/chat/openai", async (req, res) => {
  const { messages } = req.body;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  const reply = completion.data.choices[0].message;
  res.json({ reply });
});

// configuração para consumo da Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// enpoint para consumo da Gemini API
app.post("/chat/gemini", async (req, res) => {
  const { message, messages } = req.body;
  const chatSession = model.startChat({
    generationConfig,
    history: messages,
  });
  const result = await chatSession.sendMessage(message);
  const reply = result.response.text();
  res.json({ reply });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
