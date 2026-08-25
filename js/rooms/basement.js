function basementHTML() {
  return `
    <div class="basement-bg">
      <div style="font-size:3rem;animation:doorFloat 3s ease-in-out infinite;margin-bottom:10px">🚪</div>
      <div style="font-size:1.2rem;font-weight:bold;color:#cc00cc;margin-bottom:6px">── 地下室 ──</div>
      <div style="font-size:0.58rem;color:#553355;letter-spacing:3px;margin-bottom:18px">CLASSIFIED / RESTRICTED AREA</div>

      <div style="font-size:0.8rem;color:#886688;line-height:2.2;margin-bottom:18px;text-align:left;border-left:2px solid #440044;padding-left:12px">
        暗い廊下の奥に、重い金属製の扉がある。<br>
        鍵はかかっていない。<br>
        ただ…誰もこの扉を開けようとしなかった。<br>
        <span style="color:#664466;font-size:0.7rem">— ここに来ることを、誰も勧めない —</span>
      </div>

      <div style="font-size:0.7rem;color:#664466;margin-bottom:4px;text-align:left">📋 入口に貼られた紙</div>
      <div style="font-size:0.68rem;color:#553355;background:#0d0008;border:1px solid #2a0022;border-radius:6px;padding:12px;margin-bottom:20px;line-height:2.2;text-align:left">
        関係者以外立入禁止<br>
        ──────────────<br>
        この先に何があるかを知りたい者は<br>
        自己責任で扉を開けること。<br>
        <span style="color:#440033">発見者：スビニィナボンバルディロ</span><br>
        <span style="font-size:0.6rem;color:#330022">※ 一度入ったら、知らなかった頃には戻れない</span>
      </div>

      <button onclick="goBasement2()"
        style="display:block;width:100%;padding:16px;background:#1a0018;border:2px solid #880066;border-radius:14px;color:#cc44aa;font-size:1rem;font-weight:bold;cursor:pointer;margin-bottom:10px;transition:all .3s;letter-spacing:2px"
        onmouseover="this.style.background='#2a0028';this.style.borderColor='#cc00aa';this.style.boxShadow='0 0 16px #880066'"
        onmouseout="this.style.background='#1a0018';this.style.borderColor='#880066';this.style.boxShadow='none'">
        🚪 扉を開けて中へ進む
      </button>

      <div style="margin-top:18px;border-top:1px solid #220022;padding-top:14px">
        <div style="font-size:0.55rem;color:#330033;letter-spacing:2px;margin-bottom:8px">地下から繋がる場所</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px">
          <button onclick="goVoid()"
            style="padding:10px 4px;background:#08080f;border:1px solid #1a1a2a;border-radius:9px;color:#22223a;font-size:0.72rem;cursor:pointer;transition:all .2s;text-align:center"
            onmouseover="this.style.borderColor='#333355';this.style.color='#4444aa'"
            onmouseout="this.style.borderColor='#1a1a2a';this.style.color='#22223a'">🌑<br>虚無の部屋</button>
          <button onclick="goGarden()"
            style="padding:10px 4px;background:#080f08;border:1px solid #1a2a1a;border-radius:9px;color:#224422;font-size:0.72rem;cursor:pointer;transition:all .2s;text-align:center"
            onmouseover="this.style.borderColor='#335533';this.style.color='#44aa44'"
            onmouseout="this.style.borderColor='#1a2a1a';this.style.color='#224422'">🌸<br>秘密の庭</button>
          <button onclick="goDebug()"
            style="padding:10px 4px;background:#080f08;border:1px solid #1a2a1a;border-radius:9px;color:#224433;font-size:0.72rem;cursor:pointer;transition:all .2s;text-align:center"
            onmouseover="this.style.borderColor='#335544';this.style.color='#44aa66'"
            onmouseout="this.style.borderColor='#1a2a1a';this.style.color='#224433'">💻<br>デバッグ</button>
        </div>
      </div>

      <button class="btn" style="background:transparent;border:1px solid #330033;color:#553355;font-size:0.8rem" onclick="goHome()">← 地上に戻る（安全）</button>
    </div>
  `;
}

