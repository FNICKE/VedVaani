# 🌟 VedVaani - AI Productivity Suite 🚀

![🖼️ UI Preview](./frontend/Screenshot%202025-05-02%20213103.png)

> ✨ **Empower Your Workflow with AI** — Summarize, Generate, Chat, Code, Imagine, and More in One Seamless Platform!

**VedVaani** is a modern, responsive, and feature-packed AI-powered web application built with the **MERN stack** and styled with **Material-UI**. It combines text summarization, content generation, interactive chatbot capabilities, JavaScript code conversion, sci-fi image generation, and new cutting-edge features like real-time collaboration, voice input, and AI-driven analytics. Designed for productivity enthusiasts, developers, and creatives, VedVaani offers an intuitive interface to harness AI’s potential.

---

## 🎉 Features

🔹 **🧾 Text Summarizer** – Condense lengthy articles or documents into concise, meaningful summaries.  
🔹 **📝 Paragraph Generator** – Generate coherent, context-aware paragraphs for blogs, essays, or reports.  
🔹 **🤖 AI Chatbot** – Engage in real-time conversations with an AI assistant powered by OpenAI’s GPT models.  
🔹 **💻 JS Code Converter** – Transform JavaScript code (e.g., ES5 to ES6) or generate code snippets from natural language prompts.  
🔹 **🪐 Sci-Fi Image Generator** – Create stunning sci-fi visuals using OpenAI’s DALL·E or Stable Diffusion APIs.  


---

## 📸 Preview

Experience a responsive, Material-UI-powered interface optimized for desktop and mobile:

![Interface Screenshot](./frontend/Screenshot%202025-05-02%20213103.png)

---

## 📁 Project Structure

```
vedvaani/
├── frontend/                        # React frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components (e.g., ChatBox, SummaryCard)
│   │   ├── pages/               # Feature pages (Home, ChatBot, Summarizer, etc.)
│   │   ├── assets/              # Images, icons, and static files
│   │   ├── context/             # React Context for state management (e.g., theme, auth)
│   │   ├── App.js               # App routing and layout
│   │   └── index.js             # App entry point
├── backend/                         # Node.js/Express backend
│   ├── routes/                  # API routes (e.g., /api/v1/openai/chatbot)
│   ├── controllers/             # Request handlers for AI features
│   ├── models/                  # MongoDB schemas (e.g., User, Analytics)
│   ├── config/                  # Environment variables and OpenAI API setup
│   └── server.js                # Express server entry point
├── .env                         # Environment variables (e.g., OPENAI_API_KEY)
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to set up **VedVaani** locally:

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **OpenAI API Key** (sign up at [platform.openai.com](https://platform.openai.com))[](https://platform.openai.com/docs/guides/production-best-practices)
- Git installed

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/vedvaani.git
   cd vedvaani
   ```

2. **Set Up the Backend**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     npm install
     ```
   - Create a `.env` file in `backend/` with:
     ```
     PORT=3001
     MONGODB_URI=mongodb://localhost:27017/vedvaani
     OPENAI_API_KEY=your_openai_api_key
     JWT_SECRET=your_jwt_secret
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Set Up the Frontend**:
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     npm install
     ```
   - Create a `.env` file in `frontend/` with:
     ```
     REACT_APP_API_URL=http://localhost:3001/api/v1
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

4. **Access the App**:
   - Open `http://localhost:3000` in your browser.
   - Ensure the backend is running on `http://localhost:3001`.

---

## 🛠️ Tech Stack

### Frontend
- **⚛️ React**: Component-based UI library for dynamic interfaces.
- **🎨 Material-UI (MUI)**: Pre-built, customizable components for a polished look and feel.[](https://mui.com/)
- **🌐 React Router**: Handles client-side routing for seamless navigation.
- **📡 Axios**: Makes HTTP requests to the backend API.
- **🗣️ Web Speech API**: Enables voice input for chatbot and text fields.
- **🗄️ Redux Toolkit** (optional): Manages global state for complex features like collaboration.
- **📈 Chart.js**: Visualizes AI usage analytics in the dashboard.

### Backend
- **🟢 Node.js**: Runtime for the server-side application.
- **🚀 Express.js**: Web framework for building RESTful APIs.
- **🍃 MongoDB**: NoSQL database for storing user data, analytics, and session history.
- **🧠 OpenAI API**: Powers text summarization, generation, chatbot, and image creation.[](https://platform.openai.com/docs/guides/production-best-practices)
- **🔒 JWT**: Secures API endpoints with user authentication.
- **📡 Socket.IO**: Enables real-time collaboration and live chat features.
- **📄 Multer**: Handles file uploads for image generation inputs.

### Deployment
- **🌍 Vercel**: Frontend deployment for fast, scalable hosting.
- **☁️ Render**: Backend deployment with MongoDB integration.
- **🔧 GitHub Actions**: CI/CD pipeline for automated testing and deployment.

---

## ❗ API Notes

- **Backend Endpoint**: Ensure `/api/v1/openai/chatbot` and other routes are accessible.
- **CORS Configuration**: The backend includes CORS middleware to allow requests from `http://localhost:3000`.
- **Error Handling**:
  - **404 Errors**: Verify the route exists in `backend/routes/`.
  - **401 Errors**: Check the `OPENAI_API_KEY` in `.env`.
  - **500 Errors**: Ensure MongoDB is running and connected.

Example API call (chatbot):
```javascript
axios.post('http://localhost:3001/api/v1/openai/chatbot', {
  prompt: 'Hello, how can you assist me today?'
}).then(response => console.log(response.data));
```

---

## 🔍 Upcomming Cool Features

1. **🎙️ Voice-Enabled Chatbot**:
   - Use the Web Speech API to enable voice input and output for the chatbot.
   - Users can speak their queries and hear AI responses, enhancing accessibility.[](https://coaxsoft.com/blog/react-native-development-tools)

2. **🤝 Real-Time Collaboration**:
   - Integrated **Socket.IO** for live text and code editing.
   - Teams can work on summaries, paragraphs, or JS code together, with real-time updates.

3. **📊 AI Usage Dashboard**:
   - A MongoDB-backed dashboard tracks API usage (e.g., number of summaries, chatbot messages).
   - Visualized with **Chart.js** for insights into user behavior.

4. **🌙 Dark Mode & Theme Customization**:
   - Toggle between light, dark, and custom themes using Material-UI’s theme provider.
   - Persists user preferences in MongoDB.

5. **🔄 Offline Support**:
   - Uses **service workers** to cache recent AI responses, allowing limited functionality offline.
   - Ideal for users with unstable internet connections.

6. **🔒 User Authentication**:
   - Implemented JWT-based authentication for secure access.
   - Users can save their work (e.g., summaries, generated images) to their accounts.

7. **🧠 Advanced AI Models**:
   - Supports **GPT-4o** for improved chatbot and text generation.[](https://www.robinwieruch.de/react-ai-chat/)
   - Integrates **DALL·E 3** for higher-quality sci-fi image generation.[](https://aimlapi.com/academy-articles/building-an-ai-sticker-maker-platform-with-ai-ml-api-next-js-react-and-tailwind-css-using-openai-gpt-4o-and-dall-e-3-models)

8. **📱 PWA Support**:
   - Progressive Web App features allow installation on mobile devices.
   - Offline caching and push notifications for new AI features.

---

## 🛠️ Development Workflow

- **Linting & Formatting**: ESLint and Prettier for code consistency.
- **Testing**:
  - **Frontend**: Jest and React Testing Library for component tests.
  - **Backend**: Mocha and Chai for API endpoint tests.
- **CI/CD**: GitHub Actions for automated testing and deployment to Vercel/Render.

---

## 🌍 Deployment

1. **Frontend (Vercel)**:
   - Push the `frontend/` folder to a GitHub repository.
   - Connect to Vercel, set `REACT_APP_API_URL` in environment variables.
   - Deploy with `vercel --prod`.

2. **Backend (Render)**:
   - Push the `backend/` folder to a separate repository.
   - Configure MongoDB Atlas and environment variables on Render.
   - Deploy with Render’s Node.js service.

---

## 📜 License

📝 Licensed under the **MIT License**. Feel free to fork, modify, and share!

---

## 💡 Future Enhancements

- **🌐 Multilingual Support**: Add translation features for non-English inputs using OpenAI’s models.
- **🤖 Custom AI Assistants**: Allow users to create tailored chatbot personas.
- **📤 Export Options**: Save summaries or images as PDF/PNG files.
- **⚡ Performance Optimization**: Implement server-side rendering (Next.js) for faster load times.
- **🔗 API Integrations**: Add support for other AI providers (e.g., Anthropic, Google Gemini).[](https://github.com/vercel/ai)

---

## 🙌 Contributing

We welcome contributions! To get started:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📬 Contact

- **GitHub**: [yourusername](https://github.com/yourusername)
- **Email**: rathodsachin0766@gmail.com
- **Discord**: Join our community [VedVaani Discord](#)

---

> 🎯 “AI is your co-pilot — let VedVaani steer your productivity to new heights!”

---

### **Frontend and Backend Details**

#### **Frontend**
- **React**: Powers the dynamic, component-based UI. Components like `ChatBox`, `SummaryCard`, and `ImageGenerator` are reusable and modular.
- **Material-UI**: Provides a consistent design system with components like `TextField`, `Button`, and `ThemeProvider` for theming.[](https://mui.com/)
- **Axios**: Handles API requests to the backend for all AI features.
- **React Router**: Manages navigation between pages (e.g., `/chatbot`, `/summarizer`).
- **Web Speech API**: Adds voice input/output, making the app accessible.[](https://coaxsoft.com/blog/react-native-development-tools)
- **Chart.js**: Renders interactive charts in the AI usage dashboard.
- **PWA**: Enabled via `workbox` for offline support and mobile installation.

#### **Backend**
- **Node.js/Express**: Runs the server and defines API routes (e.g., `/api/v1/openai/chatbot`, `/api/v1/openai/summarize`).
- **MongoDB**: Stores user data, session history, and analytics (e.g., schemas for `User`, `Analytics`, `ChatHistory`).
- **OpenAI API**: Integrates GPT-4o for text-based features and DALL·E 3 for image generation.[](https://aimlapi.com/academy-articles/building-an-ai-sticker-maker-platform-with-ai-ml-api-next-js-react-and-tailwind-css-using-openai-gpt-4o-and-dall-e-3-models)
- **Socket.IO**: Facilitates real-time collaboration and live updates.
- **JWT**: Authenticates users for secure access to features.
- **Multer**: Processes file uploads for image generation prompts.

---

