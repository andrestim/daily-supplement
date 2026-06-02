import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署說明：
// - 使用者/組織站 (https://<user>.github.io)：base 用 '/'
// - 專案站 (https://<user>.github.io/<repo>/)：base 必須是 '/<repo>/'
//
// 為了讓 repo 名稱可配置，這裡優先讀取環境變數 VITE_BASE。
// 在 .github/workflows/deploy.yml 內，我們會自動帶入：
//   VITE_BASE=/<repo-name>/
// 本地開發時沒有設這個變數，預設用 '/'。
//
// 若你想手動寫死，也可以直接把下面改成 base: '/你的repo名稱/'
const base = process.env.VITE_BASE ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
