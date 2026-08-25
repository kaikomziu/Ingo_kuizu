function radioHTML() {
  const channels = [
    {
      label:'📡 Ch.1 ニュース',
      content:[
        '[SIBAKO放送局 - 本日のニュース]',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '> 本日早朝、ポップポップポップサフールが',
        '  「基地」付近で発見されたとの情報。',
        '  スビニィナボンバルディロは',
        '  「Yes my HotSpot」とだけコメント。',
        '',
        '> ウドンドンとウディンディンが',
        '  「ちゃちぇちぇ」で激しく口論。',
        '  原因は「ヌビ二」の分け方との情報。',
        '',
        '> 079事件：関係者は全員「No my HotSpot」',
        '  と否定。真相は不明のまま。',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '次のニュースは「エソク セコラ」からお届け。',
      ]
    },
    {
      label:'🎵 Ch.2 音楽',
      content:[
        '[SIBAKO-FM — リクエスト放送中]',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '♪ Now Playing:',
        '  "Brr Brr Patapim" - by ウドンドン',
        '',
        '♪ Next Up:',
        '  "ティクタクティクタクサフール"',
        '  (リミックスVer.) - ft. トリッピ',
        '',
        '♪ Requested by: バナナナニート・バンディート',
        '  "Noooo my Hotspot" (バラード版)',
        '',
        '♪ Special: 深夜限定放送',
        '  "079のブルース" - 演奏者不明',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        'リクエストは「Hot Pot Spot」経由で。',
      ]
    },
    {
      label:'🌤 Ch.3 天気',
      content:[
        '[SIBAKO気象センター]',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '> 基地周辺：晴れ',
        '  「ちゃちぇちぇ」は現在快適な温度。',
        '',
        '> トララレロ トララ（海）方面：',
        '  波高め。「グレン グレン バス イレン」',
        '  の運行に一部遅延の可能性。',
        '',
        '> エソク セコラ（学校）方面：',
        '  「ラ・エソク・ペクエルジャアン」',
        '  （会社）からの低気圧が接近中。',
        '',
        '> 明日の予報：',
        '  「Yes my HotSpot！」な一日でしょう。',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '防災情報：ポップポップポップサフール警報発令中。',
      ]
    },
    {
      label:'🔒 Ch.4 秘密',
      content:[
        '[CLASSIFIED BROADCAST — 傍受禁止]',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '受信者：スビニィナボンバルディロ のみ',
        '',
        '> 079作戦は予定通り進行中。',
        '',
        '> ジブラ・ジブラ（ばんしょうま）の',
        '  正体についての調査は継続中。',
        '  「ばんしょうま」の意味は',
        '  未だ解読不能。',
        '',
        '> 67（ゆき）からの暗号メッセージ：',
        '  「ミャウル ミャウル ミャウル」',
        '  解読中...',
        '',
        '> ロスラヴァカ（惑星）観測データ：',
        '  異常なし。ラヴァカ（地球）は安全。',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '送信終了。記録するな。記憶せよ。',
      ]
    },
  ];
  const ch = channels[_radioCh] || channels[0];
  return `
    <div class="radio-bg">
      <div style="text-align:center;margin-bottom:6px">
        <span style="font-size:1.6rem">📻</span>
        <div style="font-size:0.55rem;color:#006600;letter-spacing:3px;margin-top:2px">SIBAKO BROADCASTING STATION</div>
        <div style="font-size:1rem;font-weight:bold;color:#00cc00;margin-top:4px">🌐 SIBAKO放送局</div>
      </div>
      <div class="radio-ch">
        ${channels.map((c,i)=>`<div class="radio-ch-btn${i===_radioCh?' on':''}" onclick="_radioCh=${i};if(G.screen==='radio')render()">${c.label}</div>`).join('')}
      </div>
      <div class="radio-screen">${ch.content.map(l=>l===''?'<br>':'<div>'+l+'</div>').join('')}</div>
      <div style="font-size:0.58rem;color:#004400;text-align:center;margin-bottom:14px">受信状況：良好 | 周波数：079.0 MHz</div>
      <button onclick="G.screen='signal';triggerEgg('egg_signal','📡','信号傍受','暗号信号を受信した📡');render()"
        style="display:block;width:100%;padding:10px;background:#000005;border:1px solid #000033;border-radius:10px;color:#222255;font-size:0.75rem;cursor:pointer;margin-bottom:8px;transition:all .2s"
        onmouseover="this.style.borderColor='#000066';this.style.color='#333388'"
        onmouseout="this.style.borderColor='#000033';this.style.color='#222255'">
        📡 不明な信号を受信中…
      </button>
      <button class="btn" style="background:#001a00;border:1px solid #004400;color:#006600;font-size:0.8rem" onclick="goHome()">← 放送終了</button>
    </div>
  `;
}

