function quizHTML() {
  const cfg=getSettings();
  const {q,ch}=G.qs[G.cur];
  const isReverse=G.mode==='reverse';
  const qDisplay  = isReverse ? q.meaning : q.word;
  const hint      = isReverse ? 'の隠語は？' : G.mode==='joke' ? 'は？ (ちょっとカオスな選択肢あり🤪)' : 'は？';
  const choiceKey = isReverse ? 'word' : 'meaning';
  const correctVal= isReverse ? q.word  : q.meaning;

  const dots=G.qs.map((_,i)=>{
    if(i<G.res.length) return `<div class="dot ${G.res[i]?'ok':'ng'}"></div>`;
    if(i===G.cur)      return `<div class="dot cur"></div>`;
    return `<div class="dot"></div>`;
  }).join('');

  const modeColors = {reverse:'#2196f3',hard:'#e91e63',joke:'#ff9800',normal:'var(--ac)'};
  const modeLabels = {reverse:'🔄逆クイズ',hard:'💀ハード6択',joke:'🤪ネタ',normal:''};
  const modeBadge  = modeLabels[G.mode]
    ? `<span class="mode-badge" style="background:${modeColors[G.mode]}">${modeLabels[G.mode]}</span>`
    : '';

  const cols=ch.length===2?'1fr':'1fr 1fr';
  return `
    <div class="quiz-meta">
      <span>${G.cur+1} / ${G.qs.length}</span>
      <span style="display:flex;gap:5px;align-items:center">
        ${cfg.catBadge?`<span class="cat-badge">${q.category}</span>`:''}
        ${modeBadge}
      </span>
      <span class="timer" id="timer">${cfg.timer?'⏱ '+fmtT(G.elapsedSec):''}</span>
    </div>
    <div class="dots">${dots}</div>
    <div class="qword">${qDisplay}</div>
    <div class="qhint">${hint}</div>
    <div class="choices" style="grid-template-columns:${cols}">
      ${ch.map((c,i)=>`<button class="ch" id="c${i}" onclick="answerQ(${i},'${esc(c[choiceKey])}','${esc(correctVal)}')">${i+1}. ${c[choiceKey]}</button>`).join('')}
    </div>
    <div class="streak-lbl" id="slbl">${cfg.streak&&G.streak>=3?getStreakCheer(G.streak):''}</div>
    <div class="fb" id="fb"></div>
    <button class="btn" id="nxt" onclick="nextQ()" disabled>${G.cur+1<G.qs.length?'次へ →':'結果を見る'}</button>
  `;
}

function getStreakCheer(n) {
  let msg = '🔥 '+n+'連続正解中！';
  for(const k of Object.keys(STREAK_CHEERS).map(Number).sort((a,b)=>b-a))
    if(n>=k){ msg=STREAK_CHEERS[k].replace(/\d+/,n); break; }
  return msg;
}

function answerQ(idx,sel,correct) {
  if(G.answered) return;
  showConfirm(`「${sel}」を選びますか？`, ()=>doAnswerQ(idx,sel,correct));
}
function doAnswerQ(idx,sel,correct) {
  if(G.answered) return;
  G.answered=true;
  const ok=sel===correct;
  G.res.push(ok);
  if(ok){ G.streak++; G.maxStreak=Math.max(G.maxStreak,G.streak); } else G.streak=0;
  document.querySelectorAll('.ch').forEach((b,i)=>{
    b.disabled=true;
    const m=b.textContent.replace(/^\d+\.\s*/,'');
    if(m===correct) b.classList.add('ok');
    else if(i===idx&&!ok) b.classList.add('ng');
  });
  const fb=document.getElementById('fb');
  if(ok){
    const msgs = G.mode==='joke' ? ['⭕ 正解！騙されなかった！','⭕ ネタに釣られなかった！','⭕ 天才！','⭕ そう！カオスの中から正解！'] :
                 G.mode==='hard' ? ['⭕ 6択から正解！さすが！','⭕ ハードをクリア！天才！','⭕ 正解！難しいのに！','⭕ すごい、ちゃんと覚えてる！'] :
                 ['⭕ 正解！','⭕ 天才！','⭕ さすが！','⭕ よっしゃ！','⭕ 完璧！','⭕ わかってる！'];
    fb.textContent=msgs[Math.floor(Math.random()*msgs.length)];
    fb.className='fb ok';
  } else {
    const cfg2=getSettings();
    const tauntMsg=cfg2.taunt?TAUNT_MSGS[Math.floor(Math.random()*TAUNT_MSGS.length)]:'不正解…';
    fb.innerHTML=`❌ ${tauntMsg}<br><small style="font-weight:normal">正解は「${correct}」</small>`;
    fb.className='fb ng';
  }
  const sl=document.getElementById('slbl');
  if(sl) sl.textContent=getSettings().streak&&G.streak>=3?getStreakCheer(G.streak):'';
  const nxtBtn=document.getElementById('nxt');
  nxtBtn.disabled=false;
  _quizAnswerPosSeq.push(idx); if(_quizAnswerPosSeq.length>5) _quizAnswerPosSeq.shift();
  if(_quizAnswerPosSeq.length===5 && _quizAnswerPosSeq.every(p=>p===idx))
    triggerEgg('egg_same_pos','🎯','いつも同じ場所','5問連続で同じ位置の選択肢を選んだ🎯');
  if(ok && getSettings().autoNext) setTimeout(()=>{ const b=document.getElementById('nxt'); if(b&&!b.disabled) b.click(); },700);
}

function nextQ() {
  G.answered=false; G.cur++;
  if(G.cur>=G.qs.length){
    clearInterval(G.timerInt);
    G.elapsedSec=Math.floor((Date.now()-G.startTime)/1000);
    _rareEventFired=false;
    updateStats(false); G.newlyUnlocked=checkAchs(false); G.screen='result';
    const cor=G.res.filter(Boolean).length, tot=G.res.length;
    submitScore(G.mode||'normal',{score:cor,total:tot,pct:Math.round(cor/tot*100),time:G.elapsedSec});
    checkEggAtResult();
    if(cor*2===tot && tot>=4) triggerEgg('egg_half','🎯','ジャスト半分','ちょうど50%！奇跡の真ん中🎯');
    const pct2=Math.round(cor/tot*100);
    if(pct2===79) triggerEgg('egg_79pct','🧮','79パーセント','ちょうど79%！おならの数字w🧮');
    if(cor===7&&tot>7&&tot!==10) triggerEgg('egg_exact7','7️⃣','ラッキー7','ちょうど7問正解！ラッキーセブン🎰');
    if(cor===7&&tot===10) triggerEgg('egg_777','🎰','トリプルセブン','7/10のトリプルセブン！🎰');
    if(tot===1) triggerEgg('egg_1q','1️⃣','1問勝負','たった1問で勝負！漢だ1️⃣');
  } else {
    G.screen='quiz';
    if(!_rareEventFired && Math.random()<0.015) {
      _rareEventFired=true;
      triggerEgg('egg_rare','⚡','レアイベント目撃者','クイズ中に極稀なイベントが発生⚡');
      document.getElementById('card').classList.add('rare-glitch');
      setTimeout(()=>document.getElementById('card')?.classList.remove('rare-glitch'),600);
    }
  }
  render();
}

// ─── SURVIVAL ───────────────────────────
