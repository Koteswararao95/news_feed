const categories = [
  'General', 'Technology', 'Sports', 'Business', 'Health', 'Science', 'Entertainment'
]

export default function CategoryBar({ active, onChange }) {
  return (
    <div className="w-full flex flex-wrap justify-center gap-2 p-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
            active === cat
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-800'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
