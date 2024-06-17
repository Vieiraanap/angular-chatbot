require('dotenv').config();
const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { previousPrompts } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: previousPrompts,
  });

  const reply = completion.data.choices[0].message;

  console.log(previousPrompts)
  res.json({ reply });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
