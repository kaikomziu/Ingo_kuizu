function trippiHTML() {
  _checkAllRooms();
  return `
    <div class="mystery-bg" style="background:linear-gradient(180deg,#0a0f05,#050a00);border-color:#334400">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.6rem">🐈</span>
        <div style="font-size:0.52rem;color:#445500;letter-spacing:4px;margin-top:4px">CASE CLOSED — RESOLVED</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#88aa44;margin-top:6px">── トリッピの正体 ──</div>
      </div>

      <div style="font-size:0.7rem;color:#6f8844;line-height:2.2;margin-bottom:16px;text-align:left;border-left:2px solid #445500;padding-left:12px">
        隠語の世界に、なぜか猫が一匹まぎれている。<br>
        「トリッピ」。唯一の動物メンバー。<br>
        <span style="color:#556633">なぜ猫がいるのか、誰も説明してこなかった。</span>
      </div>

      <div style="font-size:0.7rem;color:#6f8844;text-align:left;margin-bottom:4px">📁 これは、数少ない「解決した」謎</div>
      <div class="b2-doc" style="background:#050a00;border-color:#223300">
        <span style="color:#88aa44">答え：</span>トリッピは創始者の実家で飼われていた猫。<br>
        言語会議（という名の、ただのおしゃべり）に<br>
        いつも同席していたから、いつの間にか<br>
        単語のリストに紛れ込んでいた。それだけ。<br><br>
        <span style="color:#6f8844;font-size:0.65rem">…拍子抜けした？　でも本当に、それだけなんだ。</span><br>
        <span style="color:#556633;font-size:0.62rem">全部の謎に、複雑な理由があるわけじゃない。</span>
      </div>

      <div style="font-size:0.62rem;color:#556633;text-align:center;margin:14px 0;line-height:2.2">
        ちなみにトリッピの鳴き声は「ミャウル」に似ていた、<br>
        という説もある。67（ゆき）はきっと知っている。
      </div>

      <button class="btn" style="background:transparent;border:1px solid #334400;color:#5c7733;font-size:0.8rem" onclick="goHome()">← 現実に戻る</button>
    </div>`;
}
