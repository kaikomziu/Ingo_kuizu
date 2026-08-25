function timeHTML() {
  if(!G.taQueue||G.taQueue.length===0)
    G.taQueue=shuffle([...vocab]).map(q=>({q,ch:getChoices(q,vocab)}));
  const {q,ch}=G.taQueue[0];
  const cols=ch.length===2?'1fr':'1fr 1fr';
  return `
    <div class="ta-hdr">
      <div style="font-size:0.75rem;color:var(--txt2)">残り時間</div>
      <div class="time-big${G.timeLeft<=10?' urgent':''}" id="ta-timer">${G.timeLeft}</div>
      <div class="ta-score-lbl">✅ ${G.taScore}問正解 / ${G.taTotal}問挑戦</div>
    </div>
    <div class="qword">${q.word}</div>
    <div class="qhint">は？</div>
    <div class="choices" style="grid-template-columns:${cols}">
      ${ch.map((c,i)=>`<button class="ch" id="tc${i}" onclick="answerTA(${i},'${esc(c.meaning)}','${esc(q.meaning)}')">${i+1}. ${c.meaning}</button>`).join('')}
    </div>
    <div class="fb" id="fb"></div>
  `;
}

function answerTA(idx,sel,correct) {
  if(G.answered||G.timeLeft<=0) return;
  doAnswerTA(idx,sel,correct);
}
function doAnswerTA(idx,sel,correct) {
  if(G.answered) return;
  G.answered=true;
  const ok=sel===correct;
  G.taTotal++;
  if(ok) G.taScore++;
  document.querySelectorAll('.ch').forEach((b,i)=>{
    b.disabled=true;
    const m=b.textContent.replace(/^\d+\.\s*/,'');
    if(m===correct) b.classList.add('ok');
    else if(i===idx&&!ok) b.classList.add('ng');
  });
  const fb=document.getElementById('fb');
  fb.textContent=ok?'⭕':'❌ 正解:'+correct;
  fb.className='fb '+(ok?'ok':'ng');
  setTimeout(()=>{
    if(G.timeLeft<=0||G.screen!=='time') return;
    G.answered=false;
    G.taQueue.shift();
    if(G.taQueue.length===0)
      G.taQueue=shuffle([...vocab]).map(q=>({q,ch:getChoices(q,vocab)}));
    render();
  }, ok?350:700);
}

function endTimeAttack() {
  clearInterval(G.taTimerInt);
  if(G.taTotal===0) triggerEgg('egg_lazy','💤','怠惰の王','60秒間ただ眺めてた👀💤');
  updateStatsTA();
  G.newlyUnlocked=checkAchs(false,'time');
  G.screen='taresult'; render();
  submitScore('time',{ta_score:G.taScore, ta_total:G.taTotal});
  checkEggAtResult();
}

// ─── RESULT ─────────────────────────────
