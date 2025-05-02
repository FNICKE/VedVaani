# 🌟 VedVaani - AI Productivity Suite 🚀

![🖼️ UI Preview](./frontend/Screenshot%202025-05-02%20213103.png)

> ✨ Unlock the Power of AI — Summarize, Generate, Chat, Convert, and Imagine with Ease!

VedVaani is a sleek, responsive, and feature-rich AI web application built with **React** and **Material-UI**. It offers a unified platform for text summarization, paragraph generation, AI chatbot conversations, JS code conversion, and sci-fi image generation — all in a smooth, user-friendly interface.

---

## 🧰 Features

🔹 **Text Summary** – Compress lengthy content into short, meaningful summaries.  
🔹 **Paragraph Generator** – Let AI help you generate thoughtful and contextual paragraphs.  
🔹 **🤖 Chatbot** – Talk with AI for real-time assistance and conversation.  
🔹 **💻 JS Converter** – Transform and understand JavaScript code effortlessly.  
🔹 **🪐 Sci-Fi Image Generator** – Create stunning sci-fi themed images using AI prompts.

---

## 📸 Preview

Responsive layout built with Material UI components. Here's a sneak peek of the interface:

![Interface Screenshot](./frontend/Screenshot%202025-05-02%20213103.png)

---

## 📁 Project Structure

```

vedvaani/
├── frontend/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Feature pages (ChatBot, Summary, etc.)
│   ├── assets/              # Images and icons
│   ├── App.js               # App routing and layout
│   └── index.js             # App entry point
└── backend/ (optional)      # API routes and OpenAI integration

````

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vedvaani.git
   cd vedvaani/frontend
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the app**

   ```bash
   npm start
   ```

✅ Make sure your backend server (Node.js + OpenAI API) is also running on `localhost:3001` or your specified port.

---

## 🛠️ Tech Stack

* ⚛️ **Frontend**: React, Material-UI (MUI), Axios, React Router
* 🧠 **AI Backend**: Node.js, OpenAI API
* 🌐 **Deployment**: (Add if hosted on Vercel / Netlify / Render)

---

## ❗ API Note

Ensure the backend endpoint `/api/v1/openai/chatbot` is running and accessible. If you see `404` errors, check:

* The backend server is running
* The route `/chatbot` is defined under `/api/v1/openai`
* CORS is properly configured

---

## 📜 License

📝 Licensed under the **MIT License**.

---


## 💡 Future Enhancements

* 🌍 Deploy on the cloud (Vercel / Netlify)
* 🔒 Add user authentication
* 📊 Track AI usage stats
* 🎨 Dark mode support

---

> 🎯 “AI is not the future — it’s the present. Build with it.”

```

