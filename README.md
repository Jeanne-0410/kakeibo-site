# Kakewari Public Site

iOS アプリ **Kakewari** の公開サイトです。App Store Connect のサポート URL、マーケティング URL、プライバシーポリシー URL として使います。

現在の GitHub Pages:

```text
https://jeanne-0410.github.io/kakeibo-site/
```

移行予定の公式URL:

```text
https://kakewari.app/
```

独自ドメイン移行と App Store 再申請の手順は `docs/custom-domain-and-app-review.md` を参照してください。

## 構成

- `index.html` — Kakewari の紹介ランディングページ
- `privacy.html` — プライバシーポリシー
- `terms.html` — 利用規約

すべて単一 HTML です。アプリ本体と表現がずれないように、以下の点を明記しています。

- レシート OCR は現行リリースの訴求から外す
- 「完全ローカル」ではなく、iCloud/CloudKit を利用する説明にする
- 共同費、個別費、毎回えらぶ費目に対応する
- 月額と買い切りのプレミアム導線を説明する

## デプロイ

main ブランチに push すると GitHub Pages が自動的に再ビルドして公開。

`CNAME` を含む独自ドメイン設定は、`kakewari.app` の購入、DNS設定、GitHub Pages の Custom domain 設定、HTTPS確認が完了してから main に反映します。

```bash
git add . && git commit -m "Update privacy policy" && git push
```

## 関連

- Kakewari 本体: https://github.com/Jeanne-0410/kakewari
- App Store: (公開後にリンク追加)

## ライセンス

サイトコードと本文は Kakewari の運用方針に従います。
