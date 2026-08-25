function homeHTML() {
  const st=getStats(), rank=getRank(st.correct), next=getNextRank(st.correct);
  const unlCnt=Object.keys(getUnlocked()).length;
  const nums=[5,10,15,20,vocab.length];
  let bar='';
  if(next){
    const pct=Math.min(100,((st.correct-getRankBelow(next).min)/(next.min-getRankBelow(next).min))*100);
    bar=`<div class="rank-track"><div class="rank-fill" style="width:${pct}%"></div></div>
         <div class="rank-next">次のランクまで ${next.min-st.correct}問</div>`;
  } else {
    bar=`<div class="rank-track"><div class="rank-fill" style="width:100%"></div></div>
         <div class="rank-next">最高ランク達成！</div>`;
  }
  const modeCards = Object.entries(MODE_INFO).map(([id,{mi,mn,md}])=>
    `<div class="mode-card${G.mode===id?' on':''}" onclick="G.mode='${id}';render()">
       <div class="mi">${mi}</div><div class="mn">${mn}</div><div class="md">${md}</div>
     </div>`
  ).join('');

  const numSection = ['normal','reverse','hard','joke'].includes(G.mode) ? `
    <div class="sec-lbl">問題数</div>
    <div class="num-row">
      ${nums.map(n=>`<div class="num-btn${n===G.selNum?' on':''}" onclick="G.selNum=${n};render()">
        ${n===vocab.length?`全部<br><small>(${n})</small>`:n+'問'}
      </div>`).join('')}
    </div>
  ` : '';

  const taRecord = st.taBest>0 ? `<br><span style="color:#ff9800;font-weight:bold">自己記録 ${st.taBest}問正解</span>` : '';
  const survRecord = st.survivalBest>0 ? `<br><span style="color:#ff9800;font-weight:bold">自己記録 ${st.survivalBest}連続</span>` : '';

  return `
    <div class="inp-g">
      <label>あなたの名前</label>
      <input type="text" value="${esc(G.name)}" placeholder="名前を入力" maxlength="12"
             oninput="G.name=this.value;saveName(this.value)">
    </div>
    <div class="rank-bar">
      <div class="rank-top"><span class="rank-name">${rank.name}</span><span class="rank-total">累計正解 ${st.correct}問</span></div>
      ${bar}
    </div>
    <div class="sec-lbl">モード</div>
    <div class="mode-grid">${modeCards}</div>
    <div class="mode-desc">
      ${MODE_DESC[G.mode]}
      ${G.mode==='surv'?survRecord:''}
      ${G.mode==='time'?taRecord:''}
    </div>
    ${numSection}
    <button class="btn" onclick="startGame()">スタート！</button>
    <div class="nav-row">
      <button class="nav-btn" onclick="goStats()">📊 統計</button>
      <button class="nav-btn" onclick="goAchs()">🎖 実績 <small style="color:var(--txt2)">${unlCnt}/${ACHS.length}</small></button>
      <button class="nav-btn" onclick="goRanking()">🏆 ランキング</button>
      <button class="nav-btn" onclick="goSettings()">⚙️ 設定</button>
    </div>
    <div onclick="triggerEgg('egg_gh_home','🫥','ホームの亡霊','見えてる…？幽霊だよ👻')" class="ghost-link" style="text-align:right">幽霊がここにいます</div>
    <div style="text-align:center;margin-top:18px;padding-bottom:4px">
      <span onclick="goBasement()" id="basement-door"
        style="font-size:1.4rem;opacity:0.07;cursor:pointer;display:inline-block;transition:opacity .6s,transform .4s;user-select:none"
        onmouseover="this.style.opacity='.18';this.style.transform='scale(1.1)'"
        onmouseout="this.style.opacity='.07';this.style.transform='scale(1)'"
        ontouchstart="this.style.opacity='.18'"
        ontouchend="this.style.opacity='.07'">🚪</span>
    </div>
  `;
}

// ─── START ──────────────────────────────
function startGame(isRetry=false) {
  if(isRetry) {
    _retryCount++;
    if(_retryCount>=5)  triggerEgg('egg_retry','🔄','もう一度中毒','やめられない止まらない笑🔄');
    if(_retryCount>=10) triggerEgg('egg_result_rage','😤','リトライ魔','もう一度を10回以上押した😤');
  } else {
    _retryCount=0;
  }
  clearInterval(G.timerInt);
  clearInterval(G.taTimerInt);
  G.res=[]; G.answered=false; G.streak=0; G.maxStreak=0;
  G.elapsedSec=0; G.newlyUnlocked=[]; G.startTime=Date.now();

  if(G.mode==='surv'){
    G.survQueue=shuffle([...vocab]).map(q=>({q,ch:getChoices(q,vocab)}));
    G.survStreak=0; G.survConsecWrong=0;
    G.screen='surv'; render();
    G.timerInt=setInterval(()=>{
      G.elapsedSec=Math.floor((Date.now()-G.startTime)/1000);
      const el=document.getElementById('timer');
      if(el) el.textContent=getSettings().timer?'⏱ '+fmtT(G.elapsedSec):'';
    },500);
  } else if(G.mode==='time'){
    G.taScore=0; G.taTotal=0; G.timeLeft=60; G.answered=false;
    G.taQueue=shuffle([...vocab]).map(q=>({q,ch:getChoices(q,vocab)}));
    G.screen='time'; render();
    G.taTimerInt=setInterval(()=>{
      G.timeLeft=Math.max(0,G.timeLeft-1);
      const el=document.getElementById('ta-timer');
      if(el){ el.textContent=G.timeLeft; el.className='time-big'+(G.timeLeft<=10?' urgent':''); }
      if(G.timeLeft<=0){ clearInterval(G.taTimerInt); endTimeAttack(); }
    },1000);
  } else {
    G.qs=buildQs(G.selNum); G.cur=0;
    G.screen='quiz'; render();
    G.timerInt=setInterval(()=>{
      G.elapsedSec=Math.floor((Date.now()-G.startTime)/1000);
      const el=document.getElementById('timer');
      if(el) el.textContent=getSettings().timer?'⏱ '+fmtT(G.elapsedSec):'';
    },500);
  }
}

// ─── QUIZ ───────────────────────────────
