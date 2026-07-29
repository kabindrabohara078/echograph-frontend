# 🧠 EchoGraph Frontend

EchoGraph is an AI memory system, and this is its frontend interface built with React and Vite.

## 🚀 Overview

This project is part of a Retrieval-Augmented Generation (RAG) system that stores information in a database for retrieval by AI agents and LLMs. The frontend enables users to interact with their AI memories, settings, and other related data.

> **Note:** This interface primarily acts as a playground. In practice, the actual data and user preferences are dynamically retrieved and provided by the LLMs directly whenever they are required.

## 🗺️ Roadmap / Future Plans

- **Local Lightweight Database:** In the future, we plan to implement a lightweight local database directly on the user's computer. This will be used to store temporary data and frequent user preferences for faster access, a smoother user experience, and potential offline capabilities.

## 🛠️ Setup Instructions

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Running the Project

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

---

*Note: Currently, two official plugins are available for Vite:*
* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
