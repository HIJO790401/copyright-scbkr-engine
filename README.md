# Copyright SCBKR Responsibility-Boundary Engine v1

著作權 SCBKR 責任邊界引擎 v1 / Copyright SCBKR Responsibility-Boundary Engine v1 是一個可直接部署於 GitHub Pages 的純前端雙語 Demo，用來展示內容或語料在不同授權條件與使用模式下，如何被判定為可成立、需警示、不可閉合、失效或越界，並輸出可追蹤的 Semantic Responsibility Hash。

The Copyright SCBKR Responsibility-Boundary Engine v1 is a GitHub Pages-ready bilingual front-end demo that shows how content or datasets are adjudicated across licensing conditions and usage modes, producing traceable responsibility boundaries and a Semantic Responsibility Hash.

## Demo Scope / Demo 說明

- 單頁式治理引擎 Demo，而非一般產品 landing page。
- Full single-page governance demo rather than a generic product landing page.
- 所有標題、按鈕、說明、結果面板皆以中英雙語並行顯示。
- All headings, buttons, explanatory copy, and result panels display Chinese and English in parallel.
- 完全不依賴後端、資料庫或外部 API。
- No backend, database, or external API is required.

## Local Run / 本地執行

因為此專案是純靜態前端，可直接開啟 `index.html`，或使用任一靜態伺服器在本地預覽。

Because the project is fully static, you can open `index.html` directly or preview it through any static file server.

### Option 1 / 選項一：直接開啟

- Double-click `index.html` in your browser.
- 直接以瀏覽器開啟 `index.html`。

### Option 2 / 選項二：使用簡單靜態伺服器

```bash
python3 -m http.server 8000
```

然後開啟 `http://localhost:8000`。
Then open `http://localhost:8000`.

## GitHub Pages Deployment / GitHub Pages 部署

此專案不需要建置步驟，可直接作為 GitHub Pages 靜態網站部署。

This project requires no build step and can be deployed directly as a GitHub Pages static site.

### Recommended Steps / 建議步驟

1. Push the repository to GitHub.
2. 進入 GitHub repository 的 **Settings → Pages**。
3. 在 **Build and deployment** 中選擇 **Deploy from a branch**。
4. 選擇目前分支與 `/ (root)` 目錄。
5. 儲存後等待 Pages 發佈完成。

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

## Interactive Demo Features / 互動 Demo 功能

- 三個案例按鈕：
  - 新聞內容授權 / News Content Licensing
  - 教材語料授權 / Educational Dataset Licensing
  - 媒體內容生成使用 / Media Content Generative Use
- 四個用途按鈕：
  - 摘要 / Summary
  - 檢索輔助 / RAG Assist
  - 訓練 / Training
  - 商業生成 / Commercial Generation
- 執行按鈕：
  - 執行裁決 / Run Judgment
  - 生成責任雜湊 / Generate Responsibility Hash
  - 重設 / Reset
- 結果面板輸出：
  - Decision State / 判決狀態
  - SCBKR Breakdown / SCBKR 拆解
  - Boundary Judgment / 邊界判定
  - Failure Conditions / 失效條件
  - Responsibility Anchor / 責任錨點
  - Semantic Responsibility Hash / 語意責任雜湊值
  - Timestamp / 時間戳記

## Auto Demo Features / 自動播放示範功能

自動示範可由以下任一按鈕觸發：

The auto demo can be triggered by either of the following buttons:

- Hero 區的 `觀看自動示範 / Watch Auto Demo`
- Auto Demo 區的 `重播自動示範 / Replay Auto Demo`

流程會自動依序展示：

The flow automatically demonstrates:

1. 新聞內容授權案例 / News Content Licensing
2. Summary → WARN
3. RAG Assist → NON-CLOSABLE
4. Training → NON-CLOSABLE
5. Commercial Generation → OVERRUN
6. Semantic Responsibility Hash 逐字生成 / Hash generation with animated scan effect

## Bilingual Design / 中英雙語設計說明

本 Demo 不採語言切換模式，而是直接在所有關鍵內容中並列中文與英文，確保審計、提案與演示時可同時面向中文與英文讀者。

This demo does not use a language toggle. Instead, Chinese and English are shown side by side across all critical UI and narrative elements so that audit, proposal, and demonstration contexts can address both audiences simultaneously.

## Licensing Collaboration Note / 授權合作說明

如需算法 API 授權合作，請聯繫 許文耀 / 沈耀888π  
For algorithm/API licensing or collaboration, contact Wen-Yao Hsu / Yao Shen 888π

- Official Website: https://hijo790401.github.io/shen-yao-portal/
- Email: ken0963521@gmail.com
