# kakeibo-site

iOS アプリ [Kakewari](https://github.com/Jeanne-0410/kakewari) の **公開サイト** (プライバシーポリシー / 利用規約 / ランディングページ)。

GitHub Pages で `https://jeanne-0410.github.io/kakeibo-site/` として公開。
Kakewari 本体 (Private repo) のプラポリ URL がこのサイトを指す。

## 構成

- `index.html` — Kakewari の紹介ランディングページ (機能・精算ルール 3 種・料金)
- `privacy.html` — プライバシーポリシー
- `terms.html` — 利用規約

すべて単一 HTML (CSS インライン)。ダークモード対応。フォントは Google Fonts (Inter + Noto Sans JP)。

## デプロイ

main ブランチに push すると GitHub Pages が自動的に再ビルドして公開。

```bash
git add . && git commit -m "Update privacy policy" && git push
```

## 関連

- Kakewari 本体 (Private): https://github.com/Jeanne-0410/kakewari
- App Store: (公開後にリンク追加)

## ライセンス

サイトコード: MIT。本文 (プラポリ / 利用規約) はアプリの利用規約に従う。
