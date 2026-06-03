// 共用型別定義

// 品項分類（同時用於搜尋 / filter 的結果標籤）
export type Category = 'daily' | 'conditional' | 'paused' | 'backup' | 'discard'

export const CATEGORY_LABELS: Record<Category, string> = {
  daily: '日常',
  conditional: '條件式',
  paused: '暫停',
  backup: '備用',
  discard: '丟掉',
}

export const CATEGORY_STYLES: Record<Category, string> = {
  daily: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  conditional: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  paused: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  backup: 'bg-slate-600/30 text-slate-300 ring-slate-600',
  discard: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
}

// 每日菜單中的單一項目
export interface MenuItem {
  id: string // 給 localStorage checkbox 用的穩定 id
  name: string
  dose?: string
  note?: string
  // 指定僅在某些星期幾服用（0=日,1=一,…,6=六）。未設定 = 每天。
  // 例：洋車前子 [1,3,5]（週一三五）、鋅 [3]（僅週三）
  days?: number[]
}

// 每日菜單的時段（早餐、午餐後…）
export interface MenuSlot {
  time: string
  emoji?: string
  items: MenuItem[]
}

// 特殊狀況卡片
export interface SpecialSituation {
  id: string
  emoji: string
  title: string
  lines: string[]
}

// 看診優先順序
export interface ClinicPriority {
  rank: number
  dept: string
  reason: string
}

// 備用區 / 未來可考慮的項目（帶說明）
export interface NamedNote {
  name: string
  note?: string
}

// 搜尋索引：把所有品項攤平，方便快速查目前分類
export interface SearchEntry {
  name: string
  category: Category
  location: string // 出現在哪個區塊
}
