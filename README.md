# 🌐 EchoGraph Frontend

React-based frontend for EchoGraph — an AI semantic memory system for storing, searching, and interacting with contextual memories through a clean API-driven interface.

---

# 🚀 Overview

The frontend acts as the user interface layer for the EchoGraph memory engine.

It allows users to:

- Store memories
- Search memories semantically
- View ranked retrieval results
- Interact with the backend memory API
- Visualize contextual memory behavior

The frontend communicates with the backend entirely through HTTP APIs.

---

# 🧱 Tech Stack

- React
- Vite
- JavaScript
- Fetch API

---

# 🔌 Backend Connection

The frontend connects to the backend using an environment variable.

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

For production deployment:

```env
VITE_API_URL=https://api.echograph.in
```

---

# ⚡ API Communication Example

```js
fetch(`${import.meta.env.VITE_API_URL}/search`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: "What database does the user prefer?"
  })
});
```

---

# 🧠 Frontend Responsibilities

The frontend is responsible for:

- User interaction
- Sending requests to backend APIs
- Displaying ranked memory results
- Managing UI state
- Providing memory visualization and interaction tools

The backend handles:

- Embeddings
- Semantic search
- Ranking logic
- Database operations
- Memory lifecycle management

---

# ⚙️ Setup Instructions

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Default local development server:

```text
http://localhost:5173
```

---

# 🌍 Environment Variables

```env
VITE_API_URL=http://localhost:8000
```

---

# 📈 Project Status

MVP completed.

Current capabilities:

- frontend-backend API integration
- semantic search interface
- memory interaction workflow
- React + FastAPI architecture setup

EchoGraph is currently evolving into a full AI memory platform.
