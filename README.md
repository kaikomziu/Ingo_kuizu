# 🔐 隠語クイズ

友達内だけで通じる「隠語」を当てるクイズWebアプリ。

**公開URL:** https://exquisite-torrone-ca4025.netlify.app

## 概要

- 単語(隠語)とその意味を4〜6択クイズ形式で出題
- 6モード:通常クイズ / サバイバル(1ミスで終了) / 逆クイズ(意味→隠語) / タイムアタック(60秒) / ハード(6択) / ネタ(カオス選択肢)
- ランク制度、実績(190種)、統計、ランキング(Supabase連携)、多数の隠しイースターエッグ・隠し部屋(17部屋+ストーリー)
- 管理者ブロードキャスト機能(バナー配信、パスワードはSHA-256ハッシュで保管)

### 隠しストーリーについて

地下室(`basement`)を起点に、起源記録・創設者の記録・機密ファイル・監視ログなど17の隠し部屋を巡ると最終部屋「真実」(`final`)に到達する。さらに機密ファイル室/放送局の秘密チャンネルから「謎の人物ファイル(`mystery_person`)」→「暗号解読室(`cipher`)」を発見・解読すると、「真実」画面に隠しボタンが出現し「エピローグ(`epilogue`)」へ進める、という2段構えの隠しストーリーになっている。新しい部屋・実績を追加する際は既存の世界観(SIBAKO語・創始者スビニィナボンバルディロ・「記録するな。記憶せよ。」の法則など)と矛盾しないようにすること。

### 隠し要素のPC/スマホ両対応について

「合言葉をキーボードで打つ」系のイースターエッグ(`pizza`・`debug`・`admin`・`cipher`・`shoma` など)は、`js/bootstrap.js` の `checkTypedSeq(seq)` に判定ロジックを集約している。PCでは `document` の `keydown` から、スマホを含む全端末では「あなたの名前」入力欄の `oninput`(`onNameInput()`)から同じ関数を呼んでおり、ソフトウェアキーボードでも同じ隠し要素に到達できる。コナミコマンドのみ矢印キー前提のためPC限定だが、スワイプ版(上上下下左右左右)を別途用意して同等の体験にしてある。新しく「〇〇と入力したら」系のエッグを足すときは、必ず `checkTypedSeq` に追記すること(そうすればPC/スマホ両方に自動で対応する)。

### 入力を伴わないジェスチャー系イースターエッグ

`js/eggs/eggs-gesture.js` に、名前入力やキーボードを使わない隠し要素(2本指タップ・モードカード長押し・端末回転・タブ離脱復帰・オフライン検知・印刷・コピー・実績スクロール到達・ピンチズーム・極小ウィンドウ・右クリックなど)をまとめている。設定操作系(全アクセントカラー踏破・文字サイズ「大」・トグル全ON/OFF)は `js/core/settings.js` に、クイズの回答パターン系(5問連続同じ位置を選ぶ)は `js/screens/quiz.js` に実装している。実績定義は `js/data/achievements-gesture.js`。

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
    achievements-story.js   追加実績(ジブラ・ジブラ〜エピローグ系)
    achievements-gesture.js 追加実績(ジェスチャー/操作系)
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
    eggs-story.js   新ストーリー(謎の人物/暗号解読/エピローグ)のナビ・ロジック
    eggs-gesture.js 入力を伴わないジェスチャー系イースターエッグ
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
    shadow-signal.js / archive-final.js
    mystery-cipher.js  謎の人物ファイル・暗号解読室
    epilogue.js        エピローグ
    misc-rooms.js
  bootstrap.js      ナビ関数・キーボード/スワイプ/シェイク入力検出・起動処理(render()呼び出し)
```

`<script src>` を `index.html` 末尾で上記の順番に読み込んでおり(ビルドツールなし・ES Modules不使用)、全体で1つのスクリプトとして動いていた元の `script.js` と完全に同じ実行順序・スコープを保っています。1ファイルは概ね200行以内に収めています。

## デプロイ

GitHub([kaikomziu/Ingo_kuizu](https://github.com/kaikomziu/Ingo_kuizu))と Netlify が連携しており、`main` ブランチに push すると自動的に再デプロイされます。
