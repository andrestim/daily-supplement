import { useMemo, useState } from 'react'
import { searchIndex } from '../data/supplements'
import { CategoryBadge } from './Badge'

// 搜尋 / filter：輸入品項名稱，快速找到目前分類
export default function SearchPanel() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return searchIndex.filter((e) => e.name.toLowerCase().includes(q))
  }, [query])

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>
        <input
          type="search"
          inputMode="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="輸入品項名稱，例如：洋車前子、魚油、Onaka…"
          className="w-full rounded-xl border border-slate-700 bg-slate-800/70 py-2.5 pl-10 pr-3 text-sm text-slate-100 shadow-sm outline-none placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      {query.trim() && (
        <div className="mt-3">
          {results.length === 0 ? (
            <p className="rounded-lg bg-slate-800/60 px-3 py-3 text-sm text-slate-400">
              找不到「{query.trim()}」。試試別的關鍵字或部分名稱。
            </p>
          ) : (
            <ul className="space-y-2">
              {results.map((e, i) => (
                <li
                  key={`${e.name}-${i}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-100">
                      {e.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">{e.location}</p>
                  </div>
                  <CategoryBadge category={e.category} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
