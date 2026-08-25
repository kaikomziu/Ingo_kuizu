function labHTML() {
  const rounds = 5;
  if(_labPhase==='idle') return `
    <div class="lab-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.6rem">🧪</span>
        <div style="font-size:0.55rem;color:#006666;letter-spacing:3px;margin-top:2px">SECRET LABORATORY</div>
        <div style="font-size:1rem;font-weight:bold;color:#00cccc;margin-top:4px">🧪 隠語実験室</div>
      </div>
      <div style="font-size:0.78rem;color:#448888;line-height:2.2;margin-bottom:16px;text-align:left;border-left:2px solid #004444;padding-left:12px">
        実験内容：隠語フラッシュカードテスト<br>
        単語が1.6秒間表示されます。<br>
        意味を素早く選択してください。<br>
        <span style="color:#336666">全${rounds}問。全問正解で特別実績解除。</span>
      </div>
      <button onclick="startLab()"
        style="display:block;width:100%;padding:14px;background:#002222;border:2px solid #008888;border-radius:12px;color:#00cccc;font-size:1rem;font-weight:bold;cursor:pointer;margin-bottom:10px;transition:all .2s"
        onmouseover="this.style.background='#003333'" onmouseout="this.style.background='#002222'">
        🔬 実験開始
      </button>
      <button class="btn" style="background:transparent;border:1px solid #004444;color:#336666;font-size:0.8rem" onclick="goHome()">← 退室</button>
    </div>`;

  if(_labPhase==='show') return `
    <div class="lab-bg">
      <div style="font-size:0.7rem;color:#448888;text-align:center;margin-bottom:6px">問 ${_labRound+1} / ${rounds} — 記憶せよ</div>
      <div class="lab-timer"><div class="lab-timer-bar" style="width:100%"></div></div>
      <div class="lab-word">${_labQ.q.word}</div>
      <div style="font-size:0.65rem;color:#006666;text-align:center;margin-top:8px">この単語の意味は？</div>
      <div style="height:160px"></div>
    </div>`;

  if(_labPhase==='answer') return `
    <div class="lab-bg">
      <div style="font-size:0.7rem;color:#448888;text-align:center;margin-bottom:6px">問 ${_labRound+1} / ${rounds} — 答えを選べ</div>
      <div class="lab-timer"><div class="lab-timer-bar" style="width:0%"></div></div>
      <div style="font-size:1.1rem;font-weight:bold;text-align:center;color:#00ffff;margin:14px 0;text-shadow:0 0 10px rgba(0,255,255,.4)">${_labQ.q.word}</div>
      <div style="display:grid;gap:8px;margin:10px 0">
        ${_labQ.choices.map(c=>`<button
          style="padding:12px;background:#002222;border:2px solid #004444;border-radius:10px;color:#00aaaa;cursor:pointer;font-size:0.88rem;transition:all .15s"
          onmouseover="this.style.background='#003333';this.style.borderColor='#00aaaa'"
          onmouseout="this.style.background='#002222';this.style.borderColor='#004444'"
          onclick="labAnswer('${c.meaning.replace(/'/g,"\\'")}')">
          ${c.meaning}
        </button>`).join('')}
      </div>
    </div>`;

  const perfect = _labScore===rounds;
  return `
    <div class="lab-bg">
      <div style="text-align:center;padding:20px 0">
        <div style="font-size:2.5rem;margin-bottom:10px">${perfect?'🏆':_labScore>=3?'🎯':'💀'}</div>
        <div style="font-size:1.1rem;font-weight:bold;color:${perfect?'#00ffcc':_labScore>=3?'#00aacc':'#cc4444'};margin-bottom:8px">
          実験結果：${_labScore} / ${rounds} 正解
        </div>
        <div style="font-size:0.78rem;color:#448888;line-height:2;margin-bottom:16px">
          ${perfect?'🎉 全問正解！隠語の天才だ！':'もう一度実験してみよう。'}
        </div>
        <button onclick="startLab()" style="display:block;width:100%;padding:12px;background:#002222;border:2px solid #008888;border-radius:12px;color:#00cccc;font-size:0.9rem;font-weight:bold;cursor:pointer;margin-bottom:8px">🔄 再実験</button>
        <button class="btn" style="background:transparent;border:1px solid #004444;color:#336666;font-size:0.8rem" onclick="goHome()">← 退室</button>
      </div>
    </div>`;
}

