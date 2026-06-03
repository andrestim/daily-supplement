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
  daily: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  conditional: 'bg-sky-100 text-sky-800 ring-sky-200',
  paused: 'bg-amber-100 text-amber-800 ring-amber-200',
  backup: 'bg-slate-100 text-slate-700 ring-slate-200',
  discard: 'bg-rose-100 text-rose-700 ring-rose-200',
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
