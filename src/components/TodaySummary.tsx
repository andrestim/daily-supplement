import { prettyDate } from '../lib/date'
import { coreLine, weeklySchedule } from '../data/supplements'

// 首頁上方的今日摘要卡片
export default function TodaySummary({ now }: { now: Date }) {
  const day = now.getDay()
  const todays = weeklySchedule.filter((w) => w.days.includes(day))
  const hasPsyllium = todays.some((w) => w.id === 'psyllium')
  const hasZinc = todays.some((w) => w.id === 'zinc')
  const active = todays.length > 0

  const headline =
    hasPsyllium && hasZinc
      ? '今天有洋車前子與鋅'
      : hasPsyllium
        ? '今天有洋車前子（無鋅）'
        : '今天無洋車前子與鋅'

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-5 text-white shadow-lg shadow-emerald-900/30 ring-1 ring-inset ring-white/10">
      <p className="text-sm font-medium text-emerald-50/90">今日摘要</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight">{prettyDate(now)}</h1>

      <div
        className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ring-1 ring-inset ${
          active
            ? 'bg-white/15 text-white ring-white/30'
            : 'bg-white/10 text-emerald-50 ring-white/20'
        }`}
      >
        {active ? (
          <div>
            <p className="flex items-center gap-2 text-base font-semibold">
              <span aria-hidden>✅</span> {headline}
            </p>
            <ul className="mt-2 space-y-1 text-emerald-50/95">
              {todays.map((w) => (
                <li key={w.id}>
                  <span className="font-semibold">{w.time}</span>　{w.text}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="flex items-center gap-2">
            <span aria-hidden>ℹ️</span>
            今天無洋車前子與鋅（洋車前子限週一 / 三 / 五，鋅限週三）
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
