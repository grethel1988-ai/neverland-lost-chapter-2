# 專案筆記（agent.md）

## 決策紀錄（2026-10-25）
- 標題：永無島的失落篇章：公主、謊言與隱密樹屋
- 副標題：國小國語文第二學習階段（中年級）能力指標題目總匯
- 夥伴：虎蓮公主、約翰、雙胞胎、溫蒂
- 生命圖示：羽毛（SVG，三色輪替）
- 以第一部程式為底，只換劇情、角色、題庫、配色（深綠叢林）
- 題庫：選擇題取自兩份 docx；拖曳題依劇情補寫（詞性、譬喻、句子重組）
- 閱讀：直接用題庫三篇短文
- 測試階段，暫不部署 GitHub

## 上次做到哪
- 第一版完成：index / css / game.js / bank_mc.js(150) / bank_drag.js(36)
- 使用者確認三關背景（部落營地／迷霧森林／地下樹屋）OK
- 難度名稱：叢林探險隊（25）／部落勇士（40）／樹屋守護者（50）
- 2026-10-26：使用者學會在 Antigravity 直接編輯 bank_mc.js，10:45 有手動修改（語法檢查通過）
- 2026-10-26：修正 bank_mc.js 第 240–248 行錯題（原「亻＋爾」答案誤設為「你」→ 改為「亻＋尔＝你」）

- 2026-10-26：實測通過，git init + 公開 repo + GitHub Pages 部署完成
  - Repo：https://github.com/grethel1988-ai/neverland-lost-chapter-2
  - 網址：https://grethel1988-ai.github.io/neverland-lost-chapter-2/

## 下一步
- 線上版確認可玩；之後修改直接 commit + push 即自動更新

## 踩坑
- Windows 的 `python` 是 Store stub，請用 `py -X utf8`
- docx 轉檔用 python-docx 腳本（scratch/conv.py、build_bank.py）
