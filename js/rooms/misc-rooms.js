function voidHTML() {
  return `
    <div class="void-page">
      <div style="color:#1a1a2a;font-size:0.95rem;line-height:3;text-align:center">
        <div style="font-size:2rem;opacity:.05">🌑</div>
        <div style="font-size:0.85rem;margin-top:14px">何もない</div>
        <div style="font-size:0.75rem;margin-top:8px;opacity:.7">本当に何もない</div>
        <div style="font-size:0.65rem;margin-top:8px;opacity:.5">ここに来た意味は？</div>
        <div style="font-size:0.5rem;margin-top:8px;opacity:.3">…</div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:24px">
        <button onclick="goMirror()"
          style="padding:8px 14px;background:none;border:1px solid #222233;border-radius:8px;color:#2a2a44;font-size:0.72rem;cursor:pointer;transition:all .2s"
          onmouseover="this.style.borderColor='#444466';this.style.color='#6666aa'"
          onmouseout="this.style.borderColor='#222233';this.style.color='#2a2a44'">🪞 鏡を見る</button>
        <button onclick="G.screen='shadow';triggerEgg('egg_shadow','👤','影の部屋','影の中に何かを見た👤');render()"
          style="padding:8px 14px;background:none;border:1px solid #1a1a1a;border-radius:8px;color:#252525;font-size:0.72rem;cursor:pointer;transition:all .2s"
          onmouseover="this.style.borderColor='#333333';this.style.color='#555555'"
          onmouseout="this.style.borderColor='#1a1a1a';this.style.color='#252525'">👤 影の中へ</button>
      </div>
      <button class="btn out" style="margin-top:40px;opacity:.25;font-size:0.75rem" onclick="goHome()">戻る</button>
    </div>
  `;
}
function gardenHTML() {
  return `
    <div class="garden-bg">
      <div style="font-size:2.5rem;margin-bottom:8px">🌸🌿🦋</div>
      <div style="font-size:1.1rem;font-weight:bold;color:#88ff88;margin-bottom:12px">秘密の庭</div>
      <div style="font-size:0.82rem;color:#aaddaa;line-height:2;margin-bottom:16px">
        四隅を順番にタップして<br>ここを見つけた君へ<br><br>
        🌸 ヌビ二の木<br>🌿 スパゲッティトイレッティのつる<br>🦋 Brr Brr の蝶<br>🌺 ポップポップポップサフールの花
      </div>
      <div style="font-size:0.7rem;color:#558855;margin-bottom:18px">この庭は誰にも話さないでね 🤫</div>
      <button class="btn" style="background:#1d4a1d" onclick="goHome()">🌿 庭を出る</button>
    </div>
  `;
}
function debugHTML() {
  const logs = [
    '[INFO] 隠語クイズ v∞.∞.∞ 起動中...',
    '[INFO] vocab.length = ' + vocab.length,
    '[INFO] ACHS.length = ' + ACHS.length,
    '[WARN] Easter eggs found: ' + Object.keys(getUnlocked()).filter(k=>k.startsWith('egg_')).length + ' / ' + ACHS.filter(a=>a.cat==='🥚 隠し').length,
    '[INFO] プレイヤー: ' + (G.name || '（未設定）'),
    '[DEBUG] localStorage: ' + JSON.stringify(localStorage).length + ' bytes',
    '[WARN] hidden pages: basement, void, garden, debug',
    '[INFO] Brr Brr Patapim is watching...',
    '[DEBUG] ヌビ二=pizza  079=おなら  基地=家',
    '[ERROR] このページを見つけてしまった',
    '[WARN] ポップポップポップサフール 💣 ready',
    '[DEBUG] 残り実績: ' + (ACHS.length - Object.keys(getUnlocked()).length) + '個',
    '[INFO] Have a nice day! 🐣',
  ];
  return `
    <button class="back" onclick="goHome()">← 戻る</button>
    <div style="font-size:1rem;font-weight:bold;margin-bottom:8px">💻 DEBUG CONSOLE</div>
    <div class="debug-term">${logs.map(l=>'> '+l).join('<br>')}</div>
    <div style="font-size:0.68rem;color:#006600;margin-top:8px;font-family:monospace">> _ <span onclick="goRadio()" style="cursor:pointer" onmouseover="this.style.color='#00ff00'" onmouseout="this.style.color='#00aa00'">radio_access --freq=SIBAKO</span></div>
    <div style="font-size:0.68rem;color:#006600;font-family:monospace">> _ <span onclick="goLab()" style="cursor:pointer" onmouseover="this.style.color='#00ff00'" onmouseout="this.style.color='#00aa00'">lab_entry --override</span></div>
    <div style="font-size:0.68rem;color:#006600;font-family:monospace">> _ <span onclick="goMirror()" style="cursor:pointer" onmouseover="this.style.color='#00ff00'" onmouseout="this.style.color='#00aa00'">mirror_protocol --flip</span></div>
    <div style="font-size:0.68rem;color:#006600;font-family:monospace">> _ <span onclick="goMysteryPerson()" style="cursor:pointer" onmouseover="this.style.color='#00ff00'" onmouseout="this.style.color='#00aa00'">banshoma_probe --deep</span></div>
    <div style="font-size:0.7rem;color:var(--txt2);text-align:center;margin-top:6px">Type "debug" to access this page</div>
  `;
}

// ─── STATS ──────────────────────────────
