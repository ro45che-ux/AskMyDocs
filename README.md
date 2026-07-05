# 🤖 AI Research Assistant (RAG)

A full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and ask questions using natural language. The system performs semantic search with Gemini Embeddings and ChromaDB before generating context-aware responses using Gemini AI.

## 🚀 Live Demo

**Frontend:** https://ai-research-assistant-lilac.vercel.app

**Backend API:** https://ai-research-assistant-dx3a.onrender.com/docs

---

## ✨ Features

- 📄 Upload one or multiple PDF documents
- 🧠 Semantic search using Gemini Embeddings
- 📚 ChromaDB vector database
- 💬 AI-powered answers using Gemini 2.5 Flash
- 📝 Markdown-formatted responses with source references
- ☁️ Fully deployed using Vercel & Render

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- FastAPI
- LangChain
- Gemini API
- ChromaDB
- PyPDF

---

## 🏗 Architecture

```
PDF Upload
      │
      ▼
PDF Processing
      │
      ▼
Text Chunking
      │
      ▼
Gemini Embeddings
      │
      ▼
ChromaDB
      │
      ▼
Semantic Search
      │
      ▼
Gemini 2.5 Flash
      │
      ▼
AI Response
```

---

## ⚙️ Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend

```env
GEMINI_API_KEY=YOUR_API_KEY
```

### Frontend

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## 📷 Screenshots

- Upload PDF
- Chat Interface
- AI Response

---

## 👨‍💻 Author

**Chetan N**
