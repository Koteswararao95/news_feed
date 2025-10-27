# News Feed App

A modern, stylish React (Vite) + Tailwind news feed with:
- Category filters
- Search
- Dark/Light theme
- Skeleton loaders
- Load more pagination
- Framer Motion animations

## ⚙️ Setup

1) Install dependencies
```bash
npm install
```

2) Create `.env` file by copying the example and add your key from https://newsapi.org
```bash
cp .env.example .env
# edit .env and set:
# VITE_NEWS_API_KEY=YOUR_KEY
```

3) Run locally
```bash
npm run dev
```

## 🗂 Tech
- React 18 (functional components + hooks)
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- Heroicons

## 🔧 Notes
- API endpoint: `https://newsapi.org/v2/top-headlines`
- Env var: `VITE_NEWS_API_KEY`
- Country: `us` (change in `src/App.jsx` if needed)
