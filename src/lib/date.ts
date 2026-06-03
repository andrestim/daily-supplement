// 日期相關工具

const WEEKDAY_TW = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']
const WEEKDAY_SHORT = ['日', '一', '二', '三', '四', '五', '六']

// 把星期幾陣列轉成標籤：[1,3,5] -> '週一三五'、[3] -> '週三'
export function daysLabel(days: number[]): string {
  return '週' + days.map((d) => WEEKDAY_SHORT[d]).join('')
}

// 回傳 YYYY-MM-DD（本地時區），當作每日 checkbox 重置的依據
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function weekdayLabel(d: Date = new Date()): string {
  return WEEKDAY_TW[d.getDay()]
}

// 是否為週一 / 三 / 五
export function isMwf(d: Date = new Date()): boolean {
  const day = d.getDay()
  return day === 1 || day === 3 || day === 5
}

// 友善顯示日期：2026年6月2日 週二
export function prettyDate(d: Date = new Date()): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${weekdayLabel(d)}`
}
