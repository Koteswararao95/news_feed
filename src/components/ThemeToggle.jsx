import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Toggle theme"
      title={dark ? 'Switch to light' : 'Switch to dark'}
    >
      {dark ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
    </button>
  )
}
