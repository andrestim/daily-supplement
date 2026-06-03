import { useMemo } from 'react'
import {
  dailyMenu,
  psylliumRules,
  specialSituations,
  backupItems,
  clinicPriorities,
  coreLine,
  weeklySchedule,
} from './data/supplements'
import { useDailyChecklist } from './hooks/useDailyChecklist'
import Section from './components/Section'
import TodaySummary from './components/TodaySummary'
import DailyChecklist from './components/DailyChecklist'
import SearchPanel from './components/SearchPanel'

const rankStyles: Record<number, string> = {
  1: 'bg-rose-100 text-rose-700 ring-rose-200',
  2: 'bg-amber-100 text-amber-700 ring-amber-200',
  3: 'bg-sky-100 text-sky-700 ring-sky-200',
}

export default function App() {
  const now = useMemo(() => new Date(), [])
  const day = now.getDay() // 0=日 … 6=六
  const { isChecked, toggle, reset } = useDailyChecklist()

  // 今日實際要勾的項目 id（有指定星期的，只在符合的日子算進去）
  const todayItemIds = useMemo(
    () =>
      dailyMenu.flatMap((slot) =>
        slot.items.filter((i) => !i.days || i.days.includes(day)).map((i) => i.id),
      ),
    [day],
  )
  const doneCount = todayItemIds.filter((id) => isChecked(id)).length
  const total = todayItemIds.length
  const allDone = total > 0 && doneCount === total

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-5 sm:px-6">
      <TodaySummary now={now} />

      <main className="mt-5 space-y-5">
        {/* 搜尋 / filter */}
        <Section
          emoji="🔎"
          title="快速查分類"
          description="輸入品項名稱，立即知道它目前屬於：日常、條件式或備用。"
        >
          <SearchPanel />
        </Section>

        {/* 每日菜單 + 今日完成勾選 */}
        <Section
          emoji="🗓️"
          title="今日菜單"
          description="勾選今天已完成的項目。狀態存在本機，跨日自動重置。"
          aside={
            <div className="flex flex-col items-end gap-1">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                  allDone
                    ? 'bg-emerald-100 text-emerald-700 ring-emerald-200'
                    : 'bg-slate-100 text-slate-600 ring-slate-200'
                }`}
              >
                {allDone ? '🎉 今日完成' : `${doneCount} / ${total}`}
              </span>
              <button
                onClick={reset}
                className="text-xs text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline"
              >
                重置今日
              </button>
            </div>
          }
        >
          <DailyChecklist day={day} isChecked={isChecked} toggle={toggle} />
        </Section>

        {/* 每週固定項目（非每天） */}
        <Section
          emoji="📌"
          title="每週固定項目"
          description="洋車前子（週一 / 三 / 五）與鋅（僅週三）。今天適用的會標示「今天」。"
        >
          <ul className="space-y-2">
            {weeklySchedule.map((w) => {
              const today = w.days.includes(day)
              return (
                <li
                  key={w.id}
                  className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 ${
                    today
                      ? 'border-emerald-200 bg-emerald-50/70'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${
                      today
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-sky-100 text-sky-700'
                    }`}
                  >
                    {w.time}
                  </span>
                  <span className="text-sm text-slate-700">{w.text}</span>
                  {today && (
                    <span className="ml-auto shrink-0 self-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      今天
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </Section>

        {/* 洋車前子升級規則 */}
        <Section
          emoji="🌾"
          title="洋車前子升級規則"
          description="依腸胃適應狀況逐步調整，不要一次加太快。"
        >
          <ol className="space-y-2">
            {psylliumRules.map((r) => {
              const isWarn = r.phase.includes('脹氣')
              return (
                <li
                  key={r.phase}
                  className={`rounded-xl border px-3 py-2.5 ${
                    isWarn
                      ? 'border-amber-200 bg-amber-50/70'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    {isWarn && <span aria-hidden>⚠️</span>}
                    {r.phase}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{r.condition}</p>
                  <p className="mt-1 text-sm text-slate-700">→ {r.action}</p>
                </li>
              )
            })}
          </ol>
        </Section>

        {/* 特殊狀況 */}
        <Section
          emoji="🧭"
          title="特殊狀況怎麼處理"
          description="遇到下列情形時的調整方式。原則：同類不要同天硬疊。"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {specialSituations.map((s) => (
              <div
                key={s.id}
                className="rounded-xl border border-slate-200 bg-white p-3"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <span aria-hidden>{s.emoji}</span>
                  {s.title}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {s.lines.map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* 備用區 */}
        <Section
          emoji="📦"
          title="備用區"
          description="可留，但不要日常吃；對應情境或接續用。"
        >
          <ul className="space-y-2">
            {backupItems.map((b) => (
              <li
                key={b.name}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5"
              >
                <p className="text-sm font-medium text-slate-800">{b.name}</p>
                {b.note && (
                  <p className="mt-0.5 text-xs text-slate-500">{b.note}</p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        {/* 看診優先順序 */}
        <Section
          emoji="🩺"
          title="看診優先順序"
          description="先處理風險最高的指標。"
        >
          <ol className="space-y-2">
            {clinicPriorities.map((c) => (
              <li
                key={c.rank}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-1 ring-inset ${
                    rankStyles[c.rank] ?? 'bg-slate-100 text-slate-600 ring-slate-200'
                  }`}
                >
                  {c.rank}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{c.dept}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    {c.reason}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 核心主線 */}
        <Section
          emoji="🎯"
          title="目前核心主線"
          description="一句話記住現在的主菜單與方向。"
        >
          <p className="rounded-xl bg-emerald-50/70 px-3 py-3 text-sm font-medium leading-relaxed text-emerald-900 ring-1 ring-inset ring-emerald-100">
            {coreLine.menu}
          </p>
          <ul className="mt-3 space-y-1.5">
            {coreLine.notes.map((n, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-slate-600"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      {/* Disclaimer */}
      <footer className="mt-8">
        <p className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-center text-xs leading-relaxed text-slate-500">
          此頁為個人保健品管理紀錄，不是醫療診斷或處方。抽血異常與用藥請依醫師建議處理。
        </p>
      </footer>
    </div>
  )
}
