import ThemeToggle from './ThemeToggle'

export default function Header({ query, setQuery, onSearch, dark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/50 dark:bg-gray-900/50 shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex gap-3 items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 dark:text-blue-400">
          News <span className="text-gray-900 dark:text-gray-100">Feed</span>
        </h1>

        <form onSubmit={onSearch} className="flex-1 max-w-xl flex">
          <input
            type="text"
            placeholder="Search headlines..."
            className="flex-1 p-2 rounded-l-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition"
          >
            Search
          </button>
        </form>

        <ThemeToggle dark={dark} onToggle={onToggleDark} />
      </div>
    </header>
  )
}
