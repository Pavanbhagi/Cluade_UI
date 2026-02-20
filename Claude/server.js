import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      stream: true
    });

    res.setHeader("Content-Type", "text/plain");

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(content);
      }
    }

    res.end();
  } catch (err) {
    res.status(500).send("Error generating response");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
