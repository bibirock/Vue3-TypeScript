# Vue3 + TypeScript + Pug + Tailwind CSS

## Random-user
![ 網址 Random-user](apps/Random-user/public/Random-user.png)
- [Random-user](https://random-user-21ee3.web.app/#/)
- 無使用 UI 組件的切版及狀態練習，手刻`Pagination`實現換頁處理。
- 串接使用第三方`Random-User`API，並透過`Pagination`及當頁總數來載入所需資料，減少流量。
- 使用`Route.query`紀錄頁面狀態與可以分享 URL，重新整理保留原有頁面狀態。
- 多狀態的切換練習，使用`Pinia`作為狀態管理工具。
- 使用`Tailwind CSS`進行樣式切版。
- 使用`firebase`進行頁面發布。
-----
## Nested-tree
![ 網址 Random-user](apps/Nested-tree/public/Nested-tree.png)
-   [Nested-tree](https://nested-tree-f46a0.web.app/)
- 樹狀結構的渲染練習，以`.`作為分割，使用遞迴組件做出結構渲染。
- 使用`Tailwind CSS`進行樣式切版。
- 使用`firebase`進行頁面發布。
-----

## 如何啟動專案

#### 請先確認 Node 版本為 `version 14.18+, 16+` 才能正常啟動專案

### 🚀 啟動專案 Random-user

1. 移動至該資料夾

```bash
$ cd apps/Random-user
```

2. 安裝所需 node_modules

```bash
$ npm i
```

3. 啟動

```bash
$ npm run dev
```

---

### 🚀 啟動專案 Nested-tree

1. 移動至該資料夾

```bash
$ cd apps/Nested-tree
```

2. 安裝所需 node_modules

```bash
$ npm i
```

3. 啟動

```bash
$ npm run dev
```

---
