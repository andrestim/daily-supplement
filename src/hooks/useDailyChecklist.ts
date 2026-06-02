import { useCallback, useEffect, useState } from 'react'
import { todayKey } from '../lib/date'

const STORAGE_KEY = 'supp-daily-checklist'

interface StoredState {
  date: string // YYYY-MM-DD
  checked: Record<string, boolean>
}

function load(): StoredState {
  const today = todayKey()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoredState
      // 日期不同 → 自動重置今日完成狀態
      if (parsed.date === today) {
        return { date: today, checked: parsed.checked ?? {} }
      }
    }
  } catch {
    // 壞掉的資料就忽略，重新開始
  }
  return { date: today, checked: {} }
}

/**
 * 管理「今日已完成」的 checkbox 狀態。
 * - 狀態存在 localStorage
 * - 每天（日期改變）自動重置
 */
export function useDailyChecklist() {
  const [state, setState] = useState<StoredState>(() => load())

  // 寫回 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // 無痕模式等情況下寫入失敗就略過
    }
  }, [state])

  // 跨午夜或切回分頁時，重新檢查日期是否需要重置
  useEffect(() => {
    const check = () => {
      setState((prev) => (prev.date === todayKey() ? prev : load()))
    }
    document.addEventListener('visibilitychange', check)
    const timer = window.setInterval(check, 60_000)
    return () => {
      document.removeEventListener('visibilitychange', check)
      window.clearInterval(timer)
    }
  }, [])

  const toggle = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      checked: { ...prev.checked, [id]: !prev.checked[id] },
    }))
  }, [])

  const reset = useCallback(() => {
    setState({ date: todayKey(), checked: {} })
  }, [])

  const isChecked = useCallback(
    (id: string) => Boolean(state.checked[id]),
    [state.checked],
  )

  return { isChecked, toggle, reset, checked: state.checked }
}
