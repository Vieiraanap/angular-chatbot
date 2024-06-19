require('dotenv').config();

// config for OpenAi API
const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// config for Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

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

// config for express server
app.use(express.json());
app.use(cors());

app.post("/chat/openai", async (req, res) => {
  const { previousPrompts } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: previousPrompts,
  });

  const reply = completion.data.choices[0].message;

  console.log(previousPrompts)
  res.json({ reply });
});

app.post("/chat/gemini", async (req, res) => {
  const { currentPrompt, previousPrompts } = req.body;

  const chatSession = model.startChat({
    generationConfig,
    history: previousPrompts,
  });

  // const reply = await chatSession.sendMessage(currentPrompt).response.text();
  const result = await chatSession.sendMessage(currentPrompt);
  const response = await result.response;
  const reply = response.text();

  res.json({ reply });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
