function basement2HTML() {
  const solved = !!getUnlocked()['egg_basement_safe'];
  const step = _basementSafeSeq.length;
  const prog = '●'.repeat(step) + '○'.repeat(3-step);

  return `
    <div class="basement-bg" style="background:#08000a">
      <div style="font-size:0.55rem;color:#443344;letter-spacing:4px;margin-bottom:6px">B1F — 地下アーカイブ室</div>
      <div style="font-size:1.1rem;font-weight:bold;color:#cc44cc;margin-bottom:16px">── 地下の記録 ──</div>

      <div style="font-size:0.7rem;color:#886688;text-align:left;margin-bottom:4px">📜 文書 #001「この言語の起源」</div>
      <div class="basement-doc">
        記録日：<span class="redacted">████</span>年<span class="redacted">██</span>月<br>
        記録者：スビニィナボンバルディロ（本名：<span class="redacted">████████</span>）<br>
        ──────────────────────<br>
        この言語を作った理由はひとつだ。<br>
        <span style="color:#aa55aa">「親に会話を聞かれたくなかった。」</span><br>
        ──────────────────────<br>
        最初に作った単語は「ヌビ二」だった。<br>
        意味は「ピザ」。当時はよく食べていた。<br>
        次に「Brr Brr Patapim」（お父さん）、<br>
        「Brr Brr Mamabim」（お母さん）を制定。<br>
        これで家族の会話を隠語で話せるようになった。
      </div>

      <div style="font-size:0.7rem;color:#886688;text-align:left;margin-bottom:4px;margin-top:12px">📜 文書 #002「登場人物たち」</div>
      <div class="basement-doc">
        <span style="color:#aa55aa">■ スビニィナボンバルディロ</span><br>
        創始者。言語のほぼ全単語を考案した。<br>
        「基地」（家）に住む。通称：親。<br>
        ──────────────────────<br>
        <span style="color:#aa55aa">■ ウドンドン &amp; ウディンディン</span><br>
        兄と弟。二人はよく「ガラマ」（兄弟）として<br>
        呼ばれる。二人の存在が多くの単語を生んだ。<br>
        ──────────────────────<br>
        <span style="color:#aa55aa">■ トリッピ</span><br>
        猫。唯一の動物メンバー。<br>
        隠語の世界に猫がいる理由は誰も知らない。<br>
        ──────────────────────<br>
        <span style="color:#aa55aa">■ バナナナニート・バンディート（りく）</span><br>
        名前が最も長い人物。<br>
        「りく」という平凡な名前との落差が激しい。<br>
        ──────────────────────<br>
        <span style="color:#aa55aa">■ ジブラ・ジブラ（しょうま）</span><br>
        謎の人物。「しょうま」とは何か。<br>
        記録にこれ以上の情報はない。
      </div>

      <div style="font-size:0.7rem;color:#886688;text-align:left;margin-bottom:4px;margin-top:12px">📜 文書 #003「奇妙な単語たちの真実」</div>
      <div class="basement-doc">
        <span style="color:#aa55aa">■ 079 → おなら</span><br>
        なぜ数字が隠語になったのか。<br>
        創始者曰く「打ちやすいから」。<br>
        使用シーン：「079した」→「おならをした」<br>
        ──────────────────────<br>
        <span style="color:#aa55aa">■ スパゲッティトイレッティ → トイレ</span><br>
        この言語で最も有名な単語。<br>
        なぜトイレがスパゲッティなのか。<br>
        理由は「面白いから」以上の説明がない。<br>
        ──────────────────────<br>
        <span style="color:#aa55aa">■ ポップポップポップサフール → 爆弾</span><br>
        音の感じで作った単語らしい。<br>
        実際に使う場面があるのかは不明。<br>
        ──────────────────────<br>
        <span style="color:#aa55aa">■ ティクタクティクタクティクタクサフール → 時計</span><br>
        この言語で最も長い単語。<br>
        時計の「チクタク」音から派生したと思われる。<br>
        言いにくいが、それが隠語の本質かもしれない。
      </div>

      <div style="font-size:0.7rem;color:#886688;text-align:left;margin-bottom:4px;margin-top:12px">🔒 謎の金庫</div>
      <div style="font-size:0.62rem;color:#664466;margin-bottom:6px;text-align:left">壁に埋め込まれた古い金庫。ヒント：炎・光・空 の順</div>
      ${solved ? `
        <div style="font-size:0.75rem;color:#aa44aa;padding:10px 12px;border:1px solid #440044;border-radius:8px;margin-bottom:14px;line-height:2">
          ✅ <span style="color:#cc66cc">金庫解錠済み</span><br>
          <span style="font-size:0.65rem;color:#886688">中にあったメモ：「地下2階への鍵は勇気だ。でも行くな。」</span>
        </div>` : `
        <div class="basement-safe">
          <button class="safe-btn red${step===1?' pressed':''}" onclick="basementSafe('r')">🔴</button>
          <button class="safe-btn yel${step===2?' pressed':''}" onclick="basementSafe('y')">🟡</button>
          <button class="safe-btn blu${step===3?' pressed':''}" onclick="basementSafe('b')">🔵</button>
        </div>
        <div style="font-size:0.62rem;color:#443344;text-align:center;letter-spacing:4px;margin-bottom:4px">${prog}</div>
        <div style="font-size:0.58rem;color:#332233;text-align:center;margin-bottom:14px">（ヒント：炎=🔴 光=🟡 空=🔵）</div>`}

      <div style="font-size:0.7rem;color:#886688;text-align:left;margin-bottom:4px;margin-top:4px">🔦 壁の落書き</div>
      <div class="bgraffiti">
        <div>「ここに来た者は隠語が好きなはずだ。」</div>
        <div>「67はゆきのこと。なぜ67なのかは本人に聞け。」</div>
        <div>「Yes my HotSpotは同意の言葉だ。迷ったら使え。」</div>
        <div>「ラヴァカは地球。ロスラヴァカは惑星全体。宇宙の話をするとき便利。」</div>
        <div>「ミャウルは頑張れの意味。語源は猫の鳴き声ではない。」</div>
        <div style="color:#664466">「この言語を完全に覚えた者は、もう普通の言葉では話せない。」</div>
        <div style="color:#553355;font-size:0.62rem">「地下2階には行くな。私は行った。後悔している。」</div>
        <div style="color:#330033;font-size:0.55rem">「でも行ってしまった。」</div>
      </div>

      <div style="font-size:0.7rem;color:#886688;text-align:left;margin-bottom:4px;margin-top:12px">📋 注意書き（追記あり）</div>
      <div style="font-size:0.65rem;color:#553355;background:#0a0008;border:1px dashed #330033;border-radius:6px;padding:12px;margin-bottom:20px;line-height:2.3">
        ・この部屋の情報を外に持ち出さないこと<br>
        ・特に「079」の使用頻度については口外禁止<br>
        ・スパゲッティトイレッティの語源は調査中<br>
        <span style="color:#440033">追記：さらに下の階があることが判明した。</span><br>
        <span style="color:#330022;font-size:0.6rem">追記2：やはり行かないほうがいい。でも扉はある。</span>
      </div>

      <button onclick="goBasement3()"
        style="display:block;width:100%;padding:14px;background:#100010;border:2px solid #550055;border-radius:12px;color:#880088;font-size:0.9rem;font-weight:bold;cursor:pointer;margin-bottom:10px;transition:all .3s"
        onmouseover="this.style.borderColor='#aa00aa';this.style.color='#bb00bb'"
        onmouseout="this.style.borderColor='#550055';this.style.color='#880088'">
        ⬇️ さらに下の階へ（地下2階）
      </button>

      <div style="margin-top:16px;border-top:1px solid #220022;padding-top:14px">
        <div style="font-size:0.58rem;color:#330033;letter-spacing:2px;margin-bottom:8px">隣接エリア</div>
        <button onclick="G.screen='origin';triggerEgg('egg_origin','📜','SIBAKOの起源','起源の記録に触れた📜');render()"
          style="display:block;width:100%;padding:10px;background:#080500;border:1px solid #2a1800;border-radius:10px;color:#665533;font-size:0.78rem;cursor:pointer;margin-bottom:6px;text-align:left;transition:all .2s"
          onmouseover="this.style.borderColor='#554400'" onmouseout="this.style.borderColor='#2a1800'">
          📜 起源記録室 — SIBAKO言語の誕生
        </button>
        <button onclick="G.screen='redacted';triggerEgg('egg_redacted','🖤','消された記録','黒塗りの真実に触れた🖤');render()"
          style="display:block;width:100%;padding:10px;background:#050000;border:1px solid #220000;border-radius:10px;color:#442222;font-size:0.78rem;cursor:pointer;margin-bottom:6px;text-align:left;transition:all .2s"
          onmouseover="this.style.borderColor='#440000'" onmouseout="this.style.borderColor='#220000'">
          🖤 機密ファイル室 — 消された記録
        </button>
      </div>

      <button class="btn" style="background:transparent;border:1px solid #440044;color:#664466;font-size:0.8rem" onclick="G.screen='basement';render()">← 入口に戻る</button>
      <button class="btn" style="background:transparent;border:none;color:#332233;font-size:0.72rem;margin-top:4px" onclick="goHome()">地上へ逃げる</button>
    </div>
  `;
}

