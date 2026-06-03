import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  emoji?: string
  title: string
  description?: string
  /** 右上角附加內容，例如按鈕或標籤 */
  aside?: ReactNode
  children: ReactNode
}

// 統一的卡片式區塊容器（標題 + 簡短說明 + 內容）
export default function Section({
  id,
  emoji,
  title,
  description,
  aside,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-5"
    >
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100">
            {emoji && <span aria-hidden>{emoji}</span>}
            <span>{title}</span>
          </h2>
          {description && (
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {description}
            </p>
          )}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </header>
      {children}
    </section>
  )
}
