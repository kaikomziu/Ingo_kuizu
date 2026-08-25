function shadowHTML() {
  _checkAllRooms();
  return `
    <div class="shadow-bg">
      <div style="text-align:center;padding-top:10px;margin-bottom:20px">
        <div style="font-size:0.52rem;color:#111;letter-spacing:4px">THE SHADOW ROOM</div>
      </div>

      <div style="font-size:0.78rem;color:#1a1a1a;line-height:3.2;text-align:center">
        <div class="shadow-line" style="animation-delay:0.5s">影の中に、誰かいる。</div>
        <div class="shadow-line" style="animation-delay:2s;color:#161616">ずっと見ていた。</div>
        <div class="shadow-line" style="animation-delay:3.5s;color:#131313">最初から。</div>
        <div class="shadow-line" style="animation-delay:5s;color:#111">あなたがクイズを始めた時から。</div>
        <div class="shadow-line" style="animation-delay:6.5s;color:#0f0f0f">正解した時も。</div>
        <div class="shadow-line" style="animation-delay:8s;color:#0d0d0d">失敗した時も。</div>
        <div class="shadow-line" style="animation-delay:9.5s;color:#0a0a0a">何度もリトライした時も。</div>
        <div class="shadow-line" style="animation-delay:11s;color:#080808;font-size:0.68rem">影はあなたのことを知っている。</div>
        <div class="shadow-line" style="animation-delay:13s;color:#060606;font-size:0.65rem">名前も。スコアも。何度失敗したかも。</div>
        <div class="shadow-line" style="animation-delay:15s;color:#050505;font-size:0.6rem">でも影は何もしない。</div>
        <div class="shadow-line" style="animation-delay:17s;color:#040404;font-size:0.58rem">ただ、見ているだけ。</div>
        <div class="shadow-line" style="animation-delay:19s;color:#030303;font-size:0.55rem">それが影というものだから。</div>
        <div class="shadow-line" style="animation-delay:22s;color:#222;font-size:0.85rem;font-weight:bold">— 影より —</div>
      </div>

      <button class="btn out" style="margin-top:40px;opacity:.15;font-size:0.75rem" onclick="G.screen='void';render()">← 虚無に戻る</button>
    </div>`;
}

function signalHTML() {
  _checkAllRooms();
  return `
    <div class="signal-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">📡</span>
        <div style="font-size:0.52rem;color:#000033;letter-spacing:4px;margin-top:4px">SIGNAL INTERCEPT — ACTIVE</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#2222aa;margin-top:6px">── 傍受信号 ──</div>
      </div>

      <div class="signal-screen">
        受信中<span class="signal-cursor">▋</span><br>
        周波数：079.0 MHz<br>
        発信源：<span style="color:#1111aa">不明（推定：地下）</span><br>
        ──────────────────<br>
        <br>
        <span style="color:#2244ff">079 . 079 . 079 .</span><br>
        <span style="color:#1133dd">「ポップポップポップサフール — 準備完了」</span><br>
        <span style="color:#0022cc">「ラグランデ — スパゲッティトイレッティ — 集合」</span><br>
        <span style="color:#001199">「シュピオニロ・ゴルビロ — 解除待ち」</span><br>
        <br>
        ──────────────────<br>
        <span style="color:#0011aa">次の送信まで：<span class="signal-cursor">▋</span></span><br>
        <br>
        <span style="color:#000088">…079… 079… 079…</span><br>
        <span style="color:#000066;font-size:0.65rem">「ラヴァカは安全」</span><br>
        <span style="color:#000055;font-size:0.62rem">「ロスラヴァカも確認済み」</span><br>
        <span style="color:#000033;font-size:0.58rem">「Brr Brr Patapim — 応答なし」</span><br>
        <span style="color:#000022;font-size:0.55rem">「…繰り返す…ポップポップポップサフール…」</span><br>
        <span style="color:#00001a;font-size:0.5rem">信号途絶<span class="signal-cursor">▋</span></span>
      </div>

      <div style="font-size:0.62rem;color:#000033;text-align:center;margin-bottom:12px">
        この信号の発信者は特定できていない。<br>
        <span style="color:#00001a">解読できたのはSIBAKO語話者のみ。</span>
      </div>
      <button class="btn" style="background:#00000a;border:1px solid #000033;color:#111166;font-size:0.78rem" onclick="G.screen='radio';render()">← 放送局へ戻る</button>
    </div>`;
}

