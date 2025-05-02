const dotenv = require("dotenv");
const OpenAI = require("openai");
const winston = require("winston"); // For better logging

// Load environment variables
dotenv.config();

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(),
  ],
});

// Helper function to sanitize and validate input
const sanitizeInput = (text) => {
  if (typeof text !== "string") return null;
  const trimmed = text.trim();
  return trimmed.length > 0 && trimmed.length <= 1000 ? trimmed : null; // Limit input size
};

// Helper function to handle OpenAI API errors
const handleOpenAIError = (err, context) => {
  logger.error(`${context} error: ${err.message}`, { stack: err.stack });
  if (err.response) {
    switch (err.response.status) {
      case 401:
        return { status: 401, message: "Invalid OpenAI API key" };
      case 429:
        return { status: 429, message: "Rate limit exceeded, please try again later" };
      case 400:
        return { status: 400, message: "Invalid request to OpenAI API" };
      default:
        return { status: 500, message: "OpenAI API error" };
    }
  }
  return { status: 500, message: err.message || "Internal server error" };
};

// Consistent response format
const sendResponse = (res, status, data, message = null) => {
  res.status(status).json({ success: status < 400, data, message });
};

// Summary Controller
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) {
      return sendResponse(res, 400, null, "Valid text field is required (max 1000 characters)");
    }
    logger.info("Summary request", { text: sanitizedText });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize this:\n${sanitizedText}` }],
      max_tokens: 500,
      temperature: 0.5,
    });
    const result = completion.choices[0].message.content;
    logger.info("Summary response", { result });
    sendResponse(res, 200, result);
  } catch (err) {
    const { status, message } = handleOpenAIError(err, "Summary");
    sendResponse(res, status, null, message);
  }
};

// Paragraph Controller
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) {
      return sendResponse(res, 400, null, "Valid text field is required (max 1000 characters)");
    }
    logger.info("Paragraph request", { text: sanitizedText });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Write a detailed paragraph about:\n${sanitizedText}` },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });
    const result = completion.choices[0].message.content;
    logger.info("Paragraph response", { result });
    sendResponse(res, 200, result);
  } catch (err) {
    const { status, message } = handleOpenAIError(err, "Paragraph");
    sendResponse(res, status, null, message);
  }
};

// Chatbot Controller
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) {
      return sendResponse(res, 400, null, "Valid text field is required (max 1000 characters)");
    }
    logger.info("Chatbot request", { text: sanitizedText });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Answer like Yoda from Star Wars." },
        { role: "user", content: sanitizedText },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });
    const result = completion.choices[0].message.content;
    logger.info("Chatbot response", { result });
    sendResponse(res, 200, result);
  } catch (err) {
    const { status, message } = handleOpenAIError(err, "Chatbot");
    sendResponse(res, status, null, message);
  }
};

// JS Converter Controller
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) {
      return sendResponse(res, 400, null, "Valid text field is required (max 1000 characters)");
    }
    logger.info("JS Converter request", { text: sanitizedText });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Convert these instructions into JavaScript code:\n${sanitizedText}`,
        },
      ],
      max_tokens: 400,
      temperature: 0.25,
    });
    const result = completion.choices[0].message.content;
    logger.info("JS Converter response", { result });
    sendResponse(res, 200, result);
  } catch (err) {
    const { status, message } = handleOpenAIError(err, "JS Converter");
    sendResponse(res, status, null, message);
  }
};

// Sci-Fi Image Controller
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) {
      return sendResponse(res, 400, null, "Valid text field is required (max 1000 characters)");
    }
    logger.info("Sci-Fi Image request", { text: sanitizedText });
    const response = await openai.images.generate({
      prompt: `Generate a sci-fi image of ${sanitizedText}`,
      n: 1,
      size: "512x512",
    });
    const result = response.data[0].url;
    logger.info("Sci-Fi Image response", { result });
    sendResponse(res, 200, result);
  } catch (err) {
    const { status, message } = handleOpenAIError(err, "Sci-Fi Image");
    sendResponse(res, status, null, message);
  }
};