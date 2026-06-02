import { prettyDate, isMwf } from '../lib/date'
import { coreLine, mwfHighlights } from '../data/supplements'

// 首頁上方的今日摘要卡片
export default function TodaySummary({ now }: { now: Date }) {
  const mwf = isMwf(now)

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-md">
      <p className="text-sm font-medium text-emerald-50/90">今日摘要</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight">{prettyDate(now)}</h1>

      <div
        className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ring-1 ring-inset ${
          mwf
            ? 'bg-white/15 text-white ring-white/30'
            : 'bg-white/10 text-emerald-50 ring-white/20'
        }`}
      >
        {mwf ? (
          <div>
            <p className="flex items-center gap-2 text-base font-semibold">
              <span aria-hidden>✅</span> 今天有洋車前子與鋅
            </p>
            <ul className="mt-2 space-y-1 text-emerald-50/95">
              {mwfHighlights.map((h) => (
                <li key={h.time}>
                  <span className="font-semibold">{h.time}</span>　{h.text}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="flex items-center gap-2">
            <span aria-hidden>ℹ️</span>
            今天無鋅，洋車前子依階段決定（非週一 / 三 / 五）
          </p>
        )}
      </div>

      <div className="mt-4 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-inset ring-white/20">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-50/80">
          今日核心主線
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white">{coreLine.menu}</p>
      </div>
    </div>
  )
}
