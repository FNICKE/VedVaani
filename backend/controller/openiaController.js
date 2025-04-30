const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Summary Controller
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }
    console.log("Summary request:", text);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize this:\n${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });
    console.log("Summary response:", completion.choices[0].message.content);
    res.status(200).json(completion.choices[0].message.content);
  } catch (err) {
    console.error("Summary error:", err.message, err.stack);
    res.status(500).json({ message: err.message });
  }
};

// Paragraph Controller
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }
    console.log("Paragraph request:", text);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Write a detailed paragraph about:\n${text}` },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });
    console.log("Paragraph response:", completion.choices[0].message.content);
    res.status(200).json(completion.choices[0].message.content);
  } catch (err) {
    console.error("Paragraph error:", err.message, err.stack);
    res.status(500).json({ message: err.message });
  }
};

// Chatbot Controller
exports.chatbotController = async (req, res) => {
  try {
    console.log("Chatbot request body:", req.body);
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }
    console.log("Calling OpenAI API with text:", text);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Answer like Yoda from Star Wars." },
        { role: "user", content: text },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });
    console.log("Chatbot response:", completion.choices[0].message.content);
    res.status(200).json(completion.choices[0].message.content);
  } catch (err) {
    console.error("Chatbot error:", err.message, err.stack);
    res.status(500).json({ message: err.message });
  }
};

// JS Converter Controller
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }
    console.log("JS Converter request:", text);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Convert these instructions into JavaScript code:\n${text}`,
        },
      ],
      max_tokens: 400,
      temperature: 0.25,
    });
    console.log("JS Converter response:", completion.choices[0].message.content);
    res.status(200).json(completion.choices[0].message.content);
  } catch (err) {
    console.error("JS Converter error:", err.message, err.stack);
    res.status(500).json({ message: err.message });
  }
};

// Sci-Fi Image Controller
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }
    console.log("Sci-Fi Image request:", text);
    const response = await openai.images.generate({
      prompt: `Generate a sci-fi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    console.log("Sci-Fi Image response:", response.data[0].url);
    res.status(200).json(response.data[0].url);
  } catch (err) {
    console.error("Sci-Fi Image error:", err.message, err.stack);
    res.status(500).json({ message: err.message });
  }
};