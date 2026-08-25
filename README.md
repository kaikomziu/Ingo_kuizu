# 🔐 隠語クイズ

友達内だけで通じる「隠語」を当てるクイズWebアプリ。

**公開URL:** https://exquisite-torrone-ca4025.netlify.app

## 概要

- 単語(隠語)とその意味を4〜6択クイズ形式で出題
- 6モード:通常クイズ / サバイバル(1ミスで終了) / 逆クイズ(意味→隠語) / タイムアタック(60秒) / ハード(6択) / ネタ(カオス選択肢)
- ランク制度、実績(164種)、統計、ランキング(Supabase連携)、多数の隠しイースターエッグ
- 管理者ブロードキャスト機能(バナー配信)

## 技術構成

素のHTML/CSS/JavaScript(ビルド不要、フレームワークなし)。ランキングと管理者配信は [Supabase](https://supabase.com/) を利用。

```
index.html          エントリーポイント(マークアップのみ)
css/
  style.css         全スタイル
js/
  data/             静的データ(単語帳・Supabase設定・実績定義・ランク定義・小ネタ文言)
    vocab.js
    supabase-config.js
    achievements-data.js
    ranks.js
    flavor-text.js
  core/             共通ロジック(設定・モーダル・保存・ユーティリティ・ゲーム状態)
    settings.js
    modal.js
    storage.js
    utils.js
    game-state.js
  eggs/
    eggs.js         イースターエッグ発火・隠し部屋への遷移ロジック
  features/         機能単位のロジック
    achievements-check.js
    admin.js        管理者ブロードキャスト
    ranking.js      Supabaseランキング送受信
  ui/
    render.js       画面切り替えの中枢(render関数)
  screens/          メイン画面ごとのHTML生成・進行処理
    home.js / quiz.js / survival.js / timeattack.js / results.js
    ranking-easter.js / stats-achs.js / settings.js
  rooms/            隠し部屋(イースターエッグ)ごとのHTML生成
    basement.js / basement2.js / basement3-zero.js / radio.js / lab.js
    mirror-moon.js / origin-founders.js / redacted-monitor.js
    shadow-signal.js / archive-final.js / misc-rooms.js
  bootstrap.js      ナビ関数・キーボード/スワイプ/シェイク入力検出・起動処理(render()呼び出し)
```

`<script src>` を `index.html` 末尾で上記の順番に読み込んでおり(ビルドツールなし・ES Modules不使用)、全体で1つのスクリプトとして動いていた元の `script.js` と完全に同じ実行順序・スコープを保っています。1ファイルは概ね200行以内に収めています。

## デプロイ

GitHub([kaikomziu/Ingo_kuizu](https://github.com/kaikomziu/Ingo_kuizu))と Netlify が連携しており、`main` ブランチに push すると自動的に再デプロイされます。
