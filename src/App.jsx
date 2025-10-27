// import { useEffect, useMemo, useRef, useState } from 'react'
// import axios from 'axios'
// import { AnimatePresence, motion } from 'framer-motion'
// import Header from './components/Header'
// import CategoryBar from './components/CategoryBar'
// import SkeletonCard from './components/SkeletonCard'
// import ArticleCard from './components/ArticleCard'
// import useLocalStorage from './hooks/useLocalStorage'

// const API_URL = 'https://newsapi.org/v2/top-headlines'

// export default function App() {
//   const [articles, setArticles] = useState([])
//   const [query, setQuery] = useState('')
//   const [category, setCategory] = useLocalStorage('nf-category', 'General')
//   const [page, setPage] = useState(1)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [dark, setDark] = useLocalStorage('nf-theme-dark', false)
//   const controllerRef = useRef(null)

//   const apiKey = import.meta.env.VITE_NEWS_API_KEY || ''

//   const params = useMemo(() => ({
//     apiKey,
//     country: 'us',
//     category: category.toLowerCase(),
//     q: query || undefined,
//     pageSize: 12,
//     page
//   }), [apiKey, category, query, page])

//   const fetchNews = async (reset=false) => {
//     if (!apiKey) {
//       setLoading(false)
//       setError('Missing API key. Add it in a .env file as VITE_NEWS_API_KEY=YOUR_KEY')
//       return
//     }
//     setLoading(true)
//     setError(null)
//     try {
//       if (controllerRef.current) controllerRef.current.abort()
//       controllerRef.current = new AbortController()
//       const res = await axios.get(API_URL, { params, signal: controllerRef.current.signal })
//       const newArticles = res.data?.articles || []
//       setArticles((prev) => reset ? newArticles : [...prev, ...newArticles])
//     } catch (e) {
//       if (axios.isCancel(e)) return
//       setError('Failed to load news. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', dark)
//   }, [dark])

//   // Initial + when category changes
//   useEffect(() => {
//     setPage(1)
//     fetchNews(true)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category])

//   const onSearch = (e) => {
//     e?.preventDefault?.()
//     setPage(1)
//     fetchNews(true)
//   }

//   const loadMore = () => {
//     setPage((p) => p + 1)
//   }

//   // fetch when page increments (for load more)
//   useEffect(() => {
//     if (page > 1) fetchNews(false)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page])

//   return (
//     <div className="min-h-screen">
//       <Header query={query} setQuery={setQuery} onSearch={onSearch} dark={dark} onToggleDark={() => setDark(!dark)} />
//       <CategoryBar active={category} onChange={setCategory} />

//       {/* Error state */}
//       {!loading && error && (
//         <div className="max-w-3xl mx-auto p-6">
//           <div className="p-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-200/20 dark:text-red-300">
//             {error}
//           </div>
//         </div>
//       )}

//       {/* Grid */}
//       <main className="max-w-7xl mx-auto p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {loading && (
//           Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
//         )}

//         {!loading && !error && (
//           <AnimatePresence>
//             {articles.map((a, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.35, delay: idx * 0.03 }}
//               >
//                 <ArticleCard article={a} />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         )}
//       </main>

//       {/* Load more */}
//       {!loading && !error && articles.length > 0 && (
//         <div className="flex justify-center p-6">
//           <button
//             onClick={loadMore}
//             className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition"
//           >
//             Load more
//           </button>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="text-center p-6 text-sm text-gray-600 dark:text-gray-400">
//         © {new Date().getFullYear()} News Feed App — React + Tailwind + Vite
//       </footer>
//     </div>
//   )
// }
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import SkeletonCard from "./components/SkeletonCard";
import ArticleCard from "./components/ArticleCard";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useLocalStorage("nf-category", "General");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dark, setDark] = useLocalStorage("nf-theme-dark", false);
  const controllerRef = useRef(null);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY || "";

  // ✅ Use NewsAPI endpoints
  const API_URL =
    query && query.trim().length > 0
      ? "https://newsapi.org/v2/everything"
      : "https://newsapi.org/v2/top-headlines";

  // ✅ Smart parameters for NewsAPI (fixes 400 Bad Request)
  const params = useMemo(() => {
    const base = {
      apiKey,
      q: query || undefined,
      pageSize: 12,
      page,
    };

    if (!query || query.trim().length === 0) {
      // Only include these for top-headlines
      base.country = "us";
      base.category = category.toLowerCase();
    }

    return base;
  }, [apiKey, category, query, page]);

  const fetchNews = async (reset = false) => {
    if (!apiKey) {
      setLoading(false);
      setError(
        "Missing API key. Add it in a .env file as VITE_NEWS_API_KEY=YOUR_KEY"
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      const res = await axios.get("/api/news", { params: { query, category, page } });


      const newArticles = res.data?.articles || [];
      setArticles((prev) => (reset ? newArticles : [...prev, ...newArticles]));
    } catch (e) {
      if (axios.isCancel(e)) return;
      setError("Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Fetch on first load + category change
  useEffect(() => {
    setPage(1);
    fetchNews(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onSearch = (e) => {
    e?.preventDefault?.();
    setPage(1);
    fetchNews(true);
  };

  const loadMore = () => {
    setPage((p) => p + 1);
  };

  // Fetch when page increments
  useEffect(() => {
    if (page > 1) fetchNews(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gray-50 dark:bg-gray-900">
      <Header
        query={query}
        setQuery={setQuery}
        onSearch={onSearch}
        dark={dark}
        onToggleDark={() => setDark(!dark)}
      />

      <CategoryBar active={category} onChange={setCategory} />

      {/* Error message */}
      {!loading && error && (
        <div className="max-w-3xl mx-auto p-6">
          <div className="p-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-200/20 dark:text-red-300">
            {error}
          </div>
        </div>
      )}

      {/* Main grid */}
      <main className="max-w-7xl mx-auto p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading && !error && (
          <AnimatePresence>
            {articles.length > 0 ? (
              articles.map((a, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                >
                  <ArticleCard article={a} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No articles found. Try another keyword.
              </div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Load more */}
      {!loading && !error && articles.length > 0 && (
        <div className="flex justify-center p-6">
          <button
            onClick={loadMore}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition"
          >
            Load more
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center p-6 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} News Feed App — React + Tailwind + Vite
      </footer>
    </div>
  );
}