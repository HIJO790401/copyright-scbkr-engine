# Copyright SCBKR Responsibility-Boundary Engine v1

著作權 SCBKR 責任邊界引擎 v1 / Copyright SCBKR Responsibility-Boundary Engine v1 是一個可直接部署於 GitHub Pages 的純前端雙語 Demo，用來展示某一批內容在不同用途邊界下，如何得到不同的授權責任判決，並輸出可追蹤的 Semantic Responsibility Hash。

## Demo Scope / Demo 說明

- 這不是單純授權平台，而是授權裁決引擎。
- This is not a simple licensing platform, but a licensing decision engine.
- 所有主要文案、區塊標題、案例、按鈕、結果面板都以中英雙語並行呈現。
- All major copy, section headings, scenarios, buttons, and result panels are shown bilingually.
- 純 HTML / CSS / JavaScript，無後端、無資料庫、無假 API。
- Pure HTML / CSS / JavaScript with no backend, database, or fake API.

## Local Run / 本地執行

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` after starting the server.
啟動後開啟 `http://localhost:8000`。

## GitHub Pages Deployment / GitHub Pages 部署

此專案不需要建置步驟，可直接以 repository root 部署到 GitHub Pages。

1. Push repository to GitHub.
2. 開啟 **Settings → Pages**。
3. 選擇 **Deploy from a branch**。
4. 選擇目前分支與 `/ (root)`。
5. 儲存後等待發佈。

## Project Structure / 專案結構

```text
.
├── index.html
├── copyright-hero-desktop.jpg
├── copyright-hero-mobile.jpg
├── assets
│   ├── css
│   │   └── styles.css
│   └── js
│       └── main.js
└── README.md
```

## Built-in Demo Cases / 內建案例

1. 台灣新聞內容授權事件 / Taiwanese News Content Licensing Event
2. 教材語料授權事件 / Educational Dataset Licensing Event
3. 媒體內容商業生成使用事件 / Media Content Commercial Generative Use Event

## Interactive Demo / 互動 Demo

- 案例按鈕可切換 3 個案例。
- 用途按鈕可切換 Summary、RAG Assist、Training、Commercial Generation。
- `Run Judgment` 會輸出案例名稱、SCBKR 五維、邊界模型、失效條件、判決狀態、責任錨點與時間戳。
- `Generate Responsibility Hash` 會用 deterministic 字串種子產生穩定的 `SRH-v1` 責任雜湊。
- `Reset` 會回到初始狀態。

## Auto Demo / 自動示範

自動示範固定以案例 1 台灣新聞內容授權事件為主流程：

1. Summary → WARN
2. RAG Assist → WARN
3. Training → NON-CLOSABLE
4. Commercial Generation → OVERRUN
5. 生成 Semantic Responsibility Hash 與責任錨點

## Bilingual Design / 中英雙語設計

本專案不做語言切換，而是直接在同一畫面中並列中文與英文，適合展示、簡報、法務審閱與治理說明。
