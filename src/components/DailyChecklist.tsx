import { dailyMenu } from '../data/supplements'
import type { MenuItem } from '../types'
import { daysLabel } from '../lib/date'

interface Props {
  /** 今天星期幾（0=日 … 6=六） */
  day: number
  isChecked: (id: string) => boolean
  toggle: (id: string) => void
}

function Row({
  item,
  active,
  checked,
  onToggle,
}: {
  item: MenuItem
  active: boolean
  checked: boolean
  onToggle: () => void
}) {
  const label = item.days ? daysLabel(item.days) : ''

  // 有指定星期、但今天不在範圍 → 顯示為灰階、不可勾選
  if (!active) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-3 py-2.5 opacity-70">
        <span className="mt-0.5 text-slate-300" aria-hidden>
          ▢
        </span>
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-slate-500">
            <span className="line-through decoration-slate-300">{item.name}</span>
            {item.dose && <span className="text-slate-400">{item.dose}</span>}
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-700">
              僅{label}・今日不用
            </span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
        checked
          ? 'border-emerald-200 bg-emerald-50/70'
          : 'border-slate-200 bg-white hover:bg-slate-50'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
      />
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-slate-800">
          <span className={checked ? 'text-slate-400 line-through' : ''}>
            {item.name}
          </span>
          {item.dose && (
            <span className="font-semibold text-emerald-700">{item.dose}</span>
          )}
          {item.days && (
            <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[11px] font-medium text-sky-700">
              {label}
            </span>
          )}
        </p>
        {item.note && (
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
            {item.note}
          </p>
        )}
      </div>
    </label>
  )
}

// 每日菜單 + 今日完成 checkbox
export default function DailyChecklist({ day, isChecked, toggle }: Props) {
  return (
    <div className="space-y-4">
      {dailyMenu.map((slot) => (
        <div key={slot.time}>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            {slot.emoji && <span aria-hidden>{slot.emoji}</span>}
            <span>{slot.time}</span>
          </h3>
          <div className="space-y-2">
            {slot.items.map((item) => {
              const active = !item.days || item.days.includes(day)
              return (
                <Row
                  key={item.id}
                  item={item}
                  active={active}
                  checked={active && isChecked(item.id)}
                  onToggle={() => toggle(item.id)}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
