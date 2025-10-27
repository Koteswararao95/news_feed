export default function ArticleCard({ article }) {
  return (
    <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition flex flex-col overflow-hidden">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-semibold text-lg leading-snug line-clamp-2">{article.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {article.description || 'No description available.'}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{article.source?.name || 'Unknown'}</span>
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </time>
          )}
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline mt-1"
        >
          Read more →
        </a>
      </div>
    </div>
  )
}
