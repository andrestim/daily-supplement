import { useMemo } from 'react'
import {
  dailyMenu,
  psylliumRules,
  specialSituations,
  pausedItems,
  discardItems,
  backupItems,
  doNotBuyNow,
  futureMaybe,
  clinicPriorities,
  coreLine,
  mwfHighlights,
} from './data/supplements'
import { isMwf } from './lib/date'
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
  const mwf = isMwf(now)
  const { isChecked, toggle, reset } = useDailyChecklist()

  // 今日實際要勾的項目 id（mwfOnly 只在週一三五算進去）
  const todayItemIds = useMemo(
    () =>
      dailyMenu.flatMap((slot) =>
        slot.items.filter((i) => !i.mwfOnly || mwf).map((i) => i.id),
      ),
    [mwf],
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
          description="輸入品項名稱，立即知道它目前屬於：日常、條件式、暫停、備用或丟掉。"
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
          <DailyChecklist isMwf={mwf} isChecked={isChecked} toggle={toggle} />
        </Section>

        {/* 週一三五固定項目 */}
        <Section
          emoji="📌"
          title="週一 / 三 / 五 固定項目"
          description={
            mwf ? '今天就是週一三五，記得加這兩項。' : '非週一三五日，今天先略過。'
          }
        >
          <ul className="space-y-2">
            {mwfHighlights.map((h) => (
              <li
                key={h.time}
                className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2.5"
              >
                <span className="rounded-md bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700">
                  {h.time}
                </span>
                <span className="text-sm text-slate-700">{h.text}</span>
              </li>
            ))}
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

        {/* 暫停不用 */}
        <Section
          emoji="⏸️"
          title="目前暫停不用"
          description="以下品項目前不進主菜單。"
        >
          <div className="flex flex-wrap gap-2">
            {pausedItems.map((name) => (
              <span
                key={name}
                className="rounded-full bg-amber-50 px-3 py-1.5 text-sm text-amber-800 ring-1 ring-inset ring-amber-200"
              >
                {name}
              </span>
            ))}
          </div>
        </Section>

        {/* 建議丟掉 / 淘汰 */}
        <Section
          emoji="🗑️"
          title="建議丟掉 / 淘汰"
          description="過期、無標示或保存不確定的，整理掉。"
        >
          <ul className="space-y-2">
            {discardItems.map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-rose-700"
              >
                <span aria-hidden>✕</span>
                {name}
              </li>
            ))}
          </ul>
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

        {/* 目前不建議新增購買 */}
        <Section
          emoji="🛑"
          title="目前不建議新增購買"
          description="先不要買；未來可視抽血或症狀再評估。"
        >
          <div className="mb-3 flex flex-wrap gap-2">
            {doNotBuyNow.map((name) => (
              <span
                key={name}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600 ring-1 ring-inset ring-slate-200"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            未來可視抽血 / 症狀考慮
          </p>
          <ul className="space-y-2">
            {futureMaybe.map((f) => (
              <li
                key={f.name}
                className="rounded-xl border border-emerald-100 bg-emerald-50/50 px-3 py-2.5"
              >
                <p className="text-sm font-medium text-slate-800">{f.name}</p>
                {f.note && (
                  <p className="mt-0.5 text-xs text-slate-500">{f.note}</p>
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
