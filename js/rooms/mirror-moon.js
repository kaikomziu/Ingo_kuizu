function mirrorHTML() {
  const flipped = _mirrorFlipped;
  return `
    <div class="mirror-bg">
      <div style="text-align:center;margin-bottom:12px">
        <span style="font-size:1.6rem">🪞</span>
        <div style="font-size:1rem;font-weight:bold;color:#8888ff;margin-top:6px"${flipped?'':' class="mirror-text"'}>
          ${flipped ? '── 鏡の世界 ──' : '── の世界 鏡 ──'}
        </div>
        <div style="font-size:0.58rem;color:#333366;letter-spacing:2px;margin-top:3px">${flipped?'MIRROR WORLD':'DLROW RORRIM'}</div>
      </div>
      <div style="font-size:0.75rem;color:#445;line-height:2.5;margin:14px 0;padding:14px;border:1px solid #222244;border-radius:8px;background:#060612;text-align:${flipped?'left':'right'}"${flipped?'':' style="transform:scaleX(-1);text-align:left"'}>
        ${flipped ? `
          <div style="color:#6666aa">ようこそ、鏡の世界へ。</div>
          <div>ここでは全てが反転している。</div>
          <div>右は左。正解は不正解。</div>
          <div style="color:#555588">言葉の意味も、逆かもしれない。</div>
          <div style="color:#444477;font-size:0.65rem">「ヌビ二」はピザ。鏡の世界では？</div>
          <div style="color:#333366;font-size:0.6rem">ザピはニビヌ。逆もまた真なり。</div>
        ` : `
          <div style="transform:scaleX(-1);color:#6666aa">。へ界世の鏡、そこうよ</div>
          <div style="transform:scaleX(-1)">。るいてし転反が全。はでここ</div>
          <div style="transform:scaleX(-1)">。解正不は解正。左は右</div>
          <div style="transform:scaleX(-1);color:#555588">。いなれしかもな逆も、味意の葉言</div>
          <div style="transform:scaleX(-1);color:#444477;font-size:0.65rem">？はで界世の鏡。ザピはニビヌ「」</div>
          <div style="transform:scaleX(-1);color:#333366;font-size:0.6rem">。り真た又も逆。ニビヌはザピ</div>
        `}
      </div>
      <button onclick="_mirrorFlipped=!_mirrorFlipped;if(G.screen==='mirror')render()"
        style="display:block;width:100%;padding:12px;background:#0a0a20;border:2px solid #333366;border-radius:12px;color:#6666aa;font-size:0.88rem;cursor:pointer;margin-bottom:10px;transition:all .2s"
        onmouseover="this.style.borderColor='#6666aa'" onmouseout="this.style.borderColor='#333366'">
        🪞 ${flipped ? '反転する' : '正しく映す'}
      </button>
      <button class="btn" style="background:transparent;border:1px solid #222244;color:#444466;font-size:0.8rem" onclick="goHome()">← 現実に戻る</button>
    </div>`;
}

function moonHTML() {
  const poems = [
    { word:'ヌビ二', meaning:'ピザ', poem:'丸い星のような食べ物よ\nお前の名はヌビ二\n誰が最初にそう呼んだのか\nもうピザとは呼べない' },
    { word:'Brr Brr Patapim', meaning:'お父さん', poem:'不思議な音の連なりよ\nでもその意味は温かい\nBrr Brr と鳴りながら\nお父さんは今日も家に帰る' },
    { word:'トララレロ トララ', meaning:'海', poem:'波の音がそのまま名前になった\nトララレロ トララ\n言葉の海に溺れながら\n私たちは泳ぎ続ける' },
    { word:'079', meaning:'おなら', poem:'数字が言葉になる世界\n079 と打てば\nクスリと笑いが生まれる\n言語とはそういうものだ' },
    { word:'スパゲッティトイレッティ', meaning:'トイレ', poem:'最も長い名前を持つ場所よ\n行きたい時にこの言葉を思い出せ\nスパゲッティと食事は別物だが\n言語の上では同じ長さだ' },
    { word:'ポップポップポップサフール', meaning:'爆弾', poem:'三つの音が積み重なって\n世界で最も危険な単語になった\nでも今は平和な隠語として\nただ笑いを爆発させる' },
    { word:'ミャウル', meaning:'頑張れ', poem:'猫の声ではないけれど\nミャウル と言えば力が湧く\n応援する言葉に意味はいらない\n音が心に届けばいい' },
    { word:'Hot Pot Spot', meaning:'Wifi', poem:'熱い鍋の場所よ\nでも本当は見えない波\nHot Pot Spot に繋がれば\n世界が開く、隠語の世界も' },
  ];
  return `
    <div class="moon-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:2rem;display:block" class="moon-title">🌙</span>
        <div style="font-size:1rem;font-weight:bold;color:#6666cc;margin-top:6px" class="moon-title">月の図書館</div>
        <div style="font-size:0.58rem;color:#222244;letter-spacing:3px;margin-top:3px">LUNAR LIBRARY OF HIDDEN WORDS</div>
      </div>
      <div style="font-size:0.68rem;color:#334;border-left:2px solid #222244;padding-left:10px;margin-bottom:14px;line-height:2.2">
        ここは言葉が詩になる場所。<br>
        全ての隠語には、意味以上の何かがある。<br>
        <span style="color:#222244">月明かりの下で読むと、より深く理解できる。</span>
      </div>
      ${poems.map(p=>`
        <div class="moon-entry">
          <div class="moon-word">「${p.word}」<span style="font-size:0.7rem;color:#334466;font-weight:normal"> = ${p.meaning}</span></div>
          <div class="moon-poem">${p.poem.replace(/\n/g,'<br>')}</div>
        </div>`).join('')}
      <div style="font-size:0.62rem;color:#1a1a2a;text-align:center;margin:16px 0;line-height:2.5">
        言語は人を繋ぐ。<br>
        たとえそれが「スパゲッティトイレッティ」でも。
      </div>
      <button class="btn" style="background:#060612;border:1px solid #1a1a33;color:#333366;font-size:0.8rem" onclick="G.screen='basement3';render()">← 地下2階に戻る</button>
      <button class="btn" style="background:transparent;border:none;color:#111122;font-size:0.72rem;margin-top:4px" onclick="goHome()">地上へ</button>
    </div>`;
}

// ─── 新隠し部屋群 ────────────────────────

