import type { Category } from '../types'
import { CATEGORY_LABELS, CATEGORY_STYLES } from '../types'

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${CATEGORY_STYLES[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  )
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-700/50 px-2.5 py-1 text-sm text-slate-200 ring-1 ring-inset ring-slate-600">
      {children}
    </span>
  )
}
