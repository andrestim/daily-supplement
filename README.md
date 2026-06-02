# 保健品菜單儀表板 🌿

一個 mobile-first 的單頁式靜態網頁，方便每天打開手機快速查看：

- 今天要吃什麼（今日菜單 + 可勾選的完成狀態）
- 週一 / 三 / 五要額外吃什麼
- 洋車前子怎麼逐步升級
- 脹氣、外食、高普林、過敏、疲勞等特殊狀況怎麼處理
- 哪些是備用區
- 看診優先順序
- 用品項名稱快速查目前分類（日常 / 條件式 / 備用）

> ⚠️ 此頁為個人保健品管理紀錄，不是醫療診斷或處方。抽血異常與用藥請依醫師建議處理。

---

## 技術

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)（mobile-first 卡片式 UI）
- 純前端、無後端；資料寫在 `src/data/supplements.ts`
- 今日完成狀態存在 `localStorage`，跨日自動重置

## 專案結構

```
.
├── index.html
├── vite.config.ts            # base path 可由 VITE_BASE 環境變數配置
├── tailwind.config.js
├── postcss.config.js
├── .github/workflows/deploy.yml   # GitHub Actions 自動部署到 Pages
└── src/
    ├── main.tsx
    ├── App.tsx               # 組裝所有區塊
    ├── index.css             # Tailwind + 背景樣式
    ├── types.ts              # 共用型別與分類設定
    ├── data/supplements.ts   # ★ 所有內容資料都在這裡（要改菜單改這個檔）
    ├── lib/date.ts           # 日期 / 週一三五判斷
    ├── hooks/useDailyChecklist.ts  # localStorage 今日完成狀態
    └── components/
        ├── Section.tsx        # 卡片式區塊容器
        ├── Badge.tsx          # 分類標籤
        ├── TodaySummary.tsx   # 今日摘要（日期 / 星期 / 是否週一三五）
        ├── DailyChecklist.tsx # 今日菜單 + checkbox
        └── SearchPanel.tsx    # 搜尋 / filter
```

---

## 本地啟動

需要 Node.js 18+（建議 20+）。

```bash
npm install      # 安裝依賴
npm run dev      # 啟動開發伺服器，預設 http://localhost:5173
```

## 本地建置 / 預覽

```bash
npm run build    # 產出靜態檔到 dist/
npm run preview  # 在本機預覽 build 結果
```

---

## 部署到 GitHub Pages

### 方式 A：用 GitHub Actions 自動部署（建議）

本專案已內建 `.github/workflows/deploy.yml`。步驟：

1. 在 GitHub 建立一個 repo（例如 `daily-supplement`），把程式碼 push 上去。
2. 到 repo 的 **Settings → Pages**，將 **Build and deployment → Source** 設為 **GitHub Actions**。
3. 每次 push 到 `main` 分支，Actions 會自動 build 並部署。
4. 完成後網址通常是：
   `https://<你的帳號>.github.io/<repo 名稱>/`

> Workflow 會自動把 Vite 的 `base` 設成 `/<repo 名稱>/`（透過 `VITE_BASE` 環境變數），
> 所以 **你不需要手動修改 `vite.config.ts`**。

### 方式 B：手動 build 後上傳

```bash
# 專案站（https://<user>.github.io/<repo>/），把 base 設成 repo 名稱
# PowerShell:
$env:VITE_BASE = "/你的repo名稱/"; npm run build
# bash:
VITE_BASE=/你的repo名稱/ npm run build
```

再把 `dist/` 內容部署到 Pages（例如用 `gh-pages` 分支或任何靜態主機）。

### base path 說明

- **使用者 / 組織站**（`https://<user>.github.io`）：base 用 `/`（預設值即可）。
- **專案站**（`https://<user>.github.io/<repo>/`）：base 必須是 `/<repo>/`。

`vite.config.ts` 會優先讀取 `VITE_BASE` 環境變數，沒設定時預設 `/`。
細節與註解見 `vite.config.ts`。

---

## 修改內容

所有菜單 / 規則 / 清單都集中在 [`src/data/supplements.ts`](src/data/supplements.ts)。
要新增、暫停或調整品項，直接改這個檔即可，UI 會自動跟著更新（搜尋索引也會自動重建）。
