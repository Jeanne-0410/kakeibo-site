# Kakewari 独自ドメイン移行と App Store 再申請手順

この手順は、Kakewari の公開サイトを GitHub Pages の既定 URL から `https://kakewari.app/` に移行し、App Store Connect の URL と審査メモへ反映するためのものです。

## 目的

- GitHub ID が見える `https://jeanne-0410.github.io/kakeibo-site/` ではなく、Kakewari の公式URLとして `https://kakewari.app/` を使う。
- App Store Connect の以下のURLを独自ドメインへそろえる。
  - サポートURL
  - マーケティングURL
  - プライバシーポリシーURL
  - 概要欄に記載する利用規約URL
- App Review Guideline 3.1.2(c) 対応として、EULA/利用規約リンクを明確に提示する。

## 重要な進め方

審査中や再審査直前にリンク切れを出すと、再度リジェクトされる可能性があります。

そのため、次の順番で進めます。

1. `kakewari.app` を購入する。
2. DNSレコードを設定する。
3. GitHub Pages にカスタムドメインを設定する。
4. `https://kakewari.app/`、`/privacy.html`、`/terms.html` がすべて 200 で開けることを確認する。
5. その後に App Store Connect のメタデータを差し替える。
6. App Review に再提出する。

## DNS 設定

ドメイン管理サービス側で、以下のレコードを設定します。

### Apex domain: kakewari.app

| 種類 | ホスト名 | 値 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

### www subdomain

| 種類 | ホスト名 | 値 |
| --- | --- | --- |
| CNAME | `www` | `Jeanne-0410.github.io` |

ワイルドカード `*.kakewari.app` は設定しません。GitHub Pages のドメイン乗っ取りリスクを避けるためです。

## GitHub Pages 設定

GitHubで以下を設定します。

1. `Jeanne-0410/kakeibo-site` を開く。
2. `Settings` を開く。
3. 左メニューの `Pages` を開く。
4. `Custom domain` に `kakewari.app` を入力して `Save`。
5. DNS反映後、`Enforce HTTPS` を有効化する。

このブランチには `CNAME` を追加済みです。DNS設定とGitHub Pages設定が完了してから `main` に反映します。

## 確認コマンド

DNS反映後、以下で確認します。

```bash
dig kakewari.app A +short
dig kakewari.app AAAA +short
dig www.kakewari.app CNAME +short
curl -I -L https://kakewari.app/
curl -I -L https://kakewari.app/privacy.html
curl -I -L https://kakewari.app/terms.html
```

期待値:

- `curl` が `HTTP/2 200` または `HTTP/1.1 200` を返す。
- `https://kakewari.app/terms.html` が利用規約として開ける。
- `https://kakewari.app/privacy.html` がプライバシーポリシーとして開ける。

## App Store Connect で差し替えるURL

`配信` > `iOSアプリ 1.0` で以下を差し替えます。

| 項目 | 入力値 |
| --- | --- |
| サポートURL | `https://kakewari.app/` |
| マーケティングURL | `https://kakewari.app/` |
| プライバシーポリシーURL | `https://kakewari.app/privacy.html` |

概要欄の末尾には以下を追加します。

```text
利用規約: https://kakewari.app/terms.html
プライバシーポリシー: https://kakewari.app/privacy.html
```

## App Review メモ

`App Reviewに関する情報` > `メモ` には以下を入力します。

```text
Guideline 3.1.2(c) の指摘対応として、App Storeの概要欄に利用規約（EULA）リンクとプライバシーポリシーリンクを追記しました。

利用規約: https://kakewari.app/terms.html
プライバシーポリシー: https://kakewari.app/privacy.html

アプリ内のプレミアム画面にも、サブスクリプション名、期間、価格、利用規約、プライバシーポリシーへのリンクを表示しています。
```

Appleへの返信が必要な場合は以下を使います。

```text
Hello App Review team,

Thank you for the review.
We updated the App Store metadata to include a functional Terms of Use (EULA) link in the app description.

Terms of Use (EULA):
https://kakewari.app/terms.html

Privacy Policy:
https://kakewari.app/privacy.html

The app also displays the required subscription information on the premium screen, including the subscription title, duration, price, and functional links to the Terms of Use and Privacy Policy.

Thank you.
```

## アプリ本体のリンク更新

次のバイナリ更新時に、アプリ内リンクも以下へ変更します。

- `LegalLinks.privacyPolicy`: `https://kakewari.app/privacy.html`
- `LegalLinks.termsOfService`: `https://kakewari.app/terms.html`

ただし、現在の審査対応では、旧URLが機能している限りアプリ本体の再ビルドは必須ではありません。

## 参考

- GitHub Pages custom domain: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Pages domain verification: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- App Store Connect review submission: https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/overview-of-submitting-for-review/
