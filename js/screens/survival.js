function survHTML() {
  const cfg=getSettings();
  if(G.survQueue.length===0)
    G.survQueue=shuffle([...vocab]).map(q=>({q,ch:getChoices(q,vocab)}));
  const {q,ch}=G.survQueue[0];
  const cols=ch.length===2?'1fr':'1fr 1fr';
  return `
    <div class="surv-hdr">
      <div class="surv-num">${G.survStreak}</div>
      <div class="surv-lbl">連続正解</div>
      ${getStats().survivalBest>0?`<div class="surv-best-lbl">自己記録 ${getStats().survivalBest}問</div>`:''}
    </div>
    <div class="quiz-meta">
      ${cfg.catBadge?`<span class="cat-badge">${q.category}</span>`:'<span></span>'}
      <span class="timer" id="timer">${cfg.timer?'⏱ '+fmtT(G.elapsedSec):''}</span>
    </div>
    <div class="qword">${q.word}</div>
    <div class="qhint">は？</div>
    <div class="choices" style="grid-template-columns:${cols}">
      ${ch.map((c,i)=>`<button class="ch" id="sc${i}" onclick="answerS(${i},'${esc(c.meaning)}','${esc(q.meaning)}')">${i+1}. ${c.meaning}</button>`).join('')}
    </div>
    <div class="streak-lbl" id="slbl">${cfg.streak&&G.survStreak>=3?getStreakCheer(G.survStreak):''}</div>
    <div class="fb" id="fb"></div>
    <button class="btn" id="nxt" onclick="nextS()" disabled>次へ →</button>
  `;
}

function answerS(idx,sel,correct) {
  if(G.answered) return;
  showConfirm(`「${sel}」を選びますか？`, ()=>doAnswerS(idx,sel,correct));
}
function doAnswerS(idx,sel,correct) {
  if(G.answered) return;
  G.answered=true;
  const ok=sel===correct;
  G.res.push(ok);
  if(ok){
    G.survStreak++; G.streak++; G.maxStreak=Math.max(G.maxStreak,G.streak); G.survConsecWrong=0;
    if(G.survStreak===100) triggerEgg('egg_surv100','💯','百戦錬磨','サバイバル100連続正解！伝説だ💯');
  } else {
    if(G.survConsecWrong>=5&&unlockAch('comeback')) G.newlyUnlocked.push('comeback');
    G.survConsecWrong++; G.streak=0;
  }
  document.querySelectorAll('.ch').forEach((b,i)=>{
    b.disabled=true;
    const m=b.textContent.replace(/^\d+\.\s*/,'');
    if(m===correct) b.classList.add('ok');
    else if(i===idx&&!ok) b.classList.add('ng');
  });
  const cfg3=getSettings();
  const fb=document.getElementById('fb');
  if(ok){ fb.textContent='⭕ 正解！'; fb.className='fb ok'; }
  else {
    const tauntMsg=cfg3.taunt?TAUNT_MSGS[Math.floor(Math.random()*TAUNT_MSGS.length)]:'不正解…';
    fb.innerHTML=`❌ ${tauntMsg}<br><small style="font-weight:normal">正解は「${correct}」</small>`;
    fb.className='fb ng';
  }
  const sl=document.getElementById('slbl');
  if(sl) sl.textContent=cfg3.streak&&G.survStreak>=3?getStreakCheer(G.survStreak):'';
  const btn=document.getElementById('nxt');
  if(!ok){ btn.textContent='結果を見る'; btn.onclick=()=>endSurv(); }
  btn.disabled=false;
  if(ok && cfg3.autoNext) setTimeout(()=>{ const b=document.getElementById('nxt'); if(b&&!b.disabled) b.click(); },700);
}

function nextS() { G.answered=false; G.survQueue.shift(); G.screen='surv'; render(); }
function endSurv() {
  clearInterval(G.timerInt);
  G.elapsedSec=Math.floor((Date.now()-G.startTime)/1000);
  _survDieX++;
  if(_survDieX>=3) triggerEgg('egg_diex3','💀','即死3連続','3回連続でやられた…w💀');
  if(_survDieX>=5) triggerEgg('egg_die5','☠️','5回連続即死','サバイバル5連続即死…さすがにw☠️');
  updateStats(true); G.newlyUnlocked=checkAchs(true); G.screen='sresult'; render();
  submitScore('surv',{streak:G.survStreak, time:G.elapsedSec});
  checkEggAtResult();
}

// ─── TIME ATTACK ────────────────────────
