function originHTML() {
  _checkAllRooms();
  return `
    <div class="origin-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">📜</span>
        <div style="font-size:0.52rem;color:#332200;letter-spacing:4px;margin-top:4px">DOCUMENT — CLASSIFIED</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#887744;margin-top:6px">── SIBAKOの起源 ──</div>
      </div>

      <div class="origin-doc">
        <div class="origin-stamp">記録番号 001 — 起源</div><br>
        最初の言葉は「079」だった。<br>
        なぜそれを選んだか、今となっては誰も覚えていない。<br><br>
        最初は2人だった。<br>
        部屋の中で、誰にも聞かれないように話すための言葉が<br>
        必要だった。ただそれだけの理由で。<br><br>
        次の日、「ヌビ二」が生まれた。<br>
        その次の日、「Brr Brr Patapim」。<br>
        言語は生き物のように成長した。
      </div>

      <div class="origin-doc">
        <div class="origin-stamp">記録番号 002</div><br>
        気づけばメンバーは増え、<br>
        気づけば「ラグランデ」という言葉が必要になった。<br><br>
        言語が「みんな」を必要とする規模になった時、<br>
        それは単なる遊びではなくなっていた。<br><br>
        「シュピオニロ・ゴルビロ」という言葉が<br>
        初めて使われたのは、その翌月のことだった。<br>
        <span style="color:#554433;font-size:0.65rem">誰が制限されたのか、記録は残っていない。</span>
      </div>

      <div class="origin-doc">
        <div class="origin-stamp">記録番号 003 — 分岐点</div><br>
        「これはもう、ゲームじゃない。」<br>
        ━━ 創設者B、第7回集会にて<br><br>
        <span style="color:#554433">この発言の3日後、創設者Aは</span><br>
        <span style="color:#443322">「シュピオニロ・ゴルビロ」された。</span><br>
        <span style="color:#332211;font-size:0.65rem">理由：記録なし</span>
      </div>

      <div style="margin-top:14px;border-top:1px solid #221100;padding-top:12px">
        <button onclick="G.screen='founders';triggerEgg('egg_founders','🏛️','創設者たち','SIBAKOの生みの親の真実🏛️');render()"
          style="display:block;width:100%;padding:11px;background:#060400;border:1px solid #331100;border-radius:10px;color:#554422;font-size:0.8rem;font-weight:bold;cursor:pointer;margin-bottom:8px;transition:all .2s"
          onmouseover="this.style.borderColor='#552200'" onmouseout="this.style.borderColor='#331100'">
          🏛️ 創設者の記録へ
        </button>
      </div>
      <button class="btn" style="background:transparent;border:1px solid #221100;color:#443322;font-size:0.78rem" onclick="G.screen='basement2';render()">← アーカイブへ戻る</button>
    </div>`;
}

function foundersHTML() {
  _checkAllRooms();
  return `
    <div class="founders-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">🏛️</span>
        <div style="font-size:0.52rem;color:#441100;letter-spacing:4px;margin-top:4px">FOUNDER RECORDS</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#996644;margin-top:6px">── 創設者たち ──</div>
      </div>

      <div class="founders-log">
        <div class="founders-speaker">創設者A — 最初の発言（復元記録）</div>
        「言葉を作ることは、世界を作ることだ。」<br>
        「079って言えば通じる。それだけでよかった。」<br>
        「難しく考えるな。ただ楽しんでくれ。」
      </div>

      <div class="founders-log">
        <div class="founders-speaker">創設者B — 第7回集会記録</div>
        「これはもう、ゲームじゃない。」<br>
        「ラグランデが増えすぎた。管理が必要だ。」<br>
        「シュピオニロ・ゴルビロを使うべき場面がある。」
      </div>

      <div class="founders-log">
        <div class="founders-speaker">創設者A — 最後の記録</div>
        「俺は最初から、ただ笑いたかっただけだ。」<br>
        「079は、おならの音に似てるから選んだ。」<br>
        「それだけだった。本当に、それだけだった。」<br>
        <span style="color:#441100;font-size:0.65rem">※ この後、創設者AはSIBAKOから離れた。理由：本人の意思</span>
      </div>

      <div class="founders-log">
        <div class="founders-speaker">創設者B — 後日談（日付不明）</div>
        「あいつが正しかったのかもしれない。」<br>
        「言葉は道具だ。でも道具は使う人間を映す。」<br>
        「SIBAKOが何を映しているか、ラグランデは知っているか？」<br>
        <span style="color:#331100;font-size:0.62rem">記録終了。以降の音声なし。</span>
      </div>

      <div style="margin-top:14px;font-size:0.65rem;color:#331100;text-align:center;border:1px solid #220000;border-radius:8px;padding:12px;line-height:2.2">
        この記録はSIBAKO創設から数年後に発見された。<br>
        発見者：<span style="background:#110000;color:#110000;border-radius:2px;padding:0 4px">████</span><br>
        保管場所：この地下室
      </div>
      <button class="btn" style="background:transparent;border:1px solid #331100;color:#553322;font-size:0.78rem;margin-top:12px" onclick="G.screen='origin';render()">← 起源記録へ戻る</button>
    </div>`;
}

