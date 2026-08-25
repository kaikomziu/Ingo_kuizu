function toastHTML(ids) {
  return ids.map(id=>{
    const a=ACHS.find(x=>x.id===id); if(!a) return '';
    return `<div class="ach-toast"><div class="at-icon">${a.icon}</div><div><div class="at-name">${a.name}</div><div class="at-desc">${a.desc}</div></div></div>`;
  }).join('');
}

function resultHTML() {
  const cor=G.res.filter(Boolean).length, tot=G.res.length;
  const pct=Math.round(cor/tot*100), sec=G.elapsedSec;
  let msg;
  if(cor===0)    msg='💀 全問ハズレ！！友達に謝れ！！';
  else if(pct===100) msg=G.mode==='hard'?'💥 6択で満点！？バケモノかよ！！':'🎉 完璧！隠語マスター！';
  else if(pct>=80)   msg=G.mode==='hard'?'😤 ハードでこの正解率はすごい！':'😎 すごい！';
  else if(pct>=60)   msg='🙂 まあまあ！';
  else if(pct>=40)   msg='😅 もっと練習！';
  else               msg='😱 一から覚え直し！';

  const modeLabel = G.mode==='reverse'?'🔄 逆クイズ ':G.mode==='hard'?'💀 ハード ':G.mode==='joke'?'🤪 ネタ ':'';
  const dots=G.res.map(r=>`<div class="dot ${r?'ok':'ng'}"></div>`).join('');
  const st=getStats(), prev=st.best[tot];
  const isPB=prev&&(cor>prev.score||(cor===prev.score&&sec<prev.time));
  const toasts=toastHTML(G.newlyUnlocked);
  return `
    <div class="res-center">
      <div class="res-msg">${modeLabel}${msg}</div>
      ${cor===0
        ? `<div class="res-big" onclick="goZeroRoom()" style="cursor:pointer;text-shadow:0 0 20px rgba(255,30,30,.07)">${cor}<span class="res-sub"> / ${tot}</span></div>`
        : `<div class="res-big" ondblclick="triggerEgg('egg_score_dbl','🎰','スコアをダブルタップ','なんでダブルタップするの？w🎰')" style="cursor:default">${cor}<span class="res-sub"> / ${tot}</span></div>`
      }
      <div class="res-stats">
        <div class="res-stat"><strong>${pct}%</strong><span>正答率</span></div>
        <div class="res-stat"><strong>${fmtT(sec)}</strong><span>タイム</span></div>
        <div class="res-stat"><strong>${(sec/tot).toFixed(1)}秒</strong><span>1問平均</span></div>
        <div class="res-stat"><strong>${G.maxStreak}</strong><span>最大連続</span></div>
      </div>
      ${isPB?'<div class="pb-chip">🆙 自己ベスト更新！</div>':''}
      <div class="dots" style="justify-content:center;margin-top:12px">${dots}</div>
    </div>
    ${toasts?`<div class="ach-toasts"><div class="ach-new-lbl">🎖 新しい実績！</div>${toasts}</div>`:''}
    ${SUPABASE_URL&&SUPABASE_KEY?`<div class="submit-chip">📤 スコアをランキングに登録済み</div>`:''}
    <div class="btn-row">
      <button class="btn sec" onclick="goAchs()">🎖 実績</button>
      <button class="btn sec" onclick="goRanking()">🏆 ランキング</button>
    </div>
    <div class="btn-row">
      <button class="btn out" onclick="goHome()">ホームへ</button>
      <button class="btn" onclick="startGame(true)">もう一度</button>
    </div>
    <div onclick="triggerEgg('egg_gh_result','🫥','スコアの亡霊','本当のスコアは消えた👻')" class="ghost-link">スコアは幻</div>
  `;
}

function sresultHTML() {
  const st=getStats(), isNew=G.survStreak>=st.survivalBest&&G.survStreak>0;
  const toasts=toastHTML(G.newlyUnlocked);
  let msg;
  if(G.survStreak===0)      msg='💀 即死！？一問目から間違えた！';
  else if(G.survStreak>=20) msg='🔱 20連続以上！！バケモノ！！';
  else if(G.survStreak>=10) msg='💎 10連続！すごすぎる！';
  else if(G.survStreak>=5)  msg='😎 5連続！なかなかやるね！';
  else                      msg='😤 まだまだ！もっとやれる！';
  return `
    <div class="res-center">
      <div class="res-msg">⚔️ サバイバル結果 ${msg}</div>
      <div class="res-big">${G.survStreak}<span class="res-sub"> 連続</span></div>
      <div class="res-stats">
        <div class="res-stat"><strong>${fmtT(G.elapsedSec)}</strong><span>タイム</span></div>
        <div class="res-stat"><strong>${st.survivalBest}</strong><span>自己記録</span></div>
      </div>
      ${isNew?'<div class="pb-chip">🆙 新記録！</div>':''}
    </div>
    ${toasts?`<div class="ach-toasts"><div class="ach-new-lbl">🎖 新しい実績！</div>${toasts}</div>`:''}
    ${SUPABASE_URL&&SUPABASE_KEY?`<div class="submit-chip">📤 スコアをランキングに登録済み</div>`:''}
    <div class="btn-row">
      <button class="btn sec" onclick="goAchs()">🎖 実績</button>
      <button class="btn sec" onclick="goRanking()">🏆 ランキング</button>
    </div>
    <div class="btn-row">
      <button class="btn out" onclick="goHome()">ホームへ</button>
      <button class="btn" onclick="startGame(true)">もう一度</button>
    </div>
  `;
}

function taResultHTML() {
  const acc=G.taTotal>0?Math.round(G.taScore/G.taTotal*100):0;
  const st=getStats();
  let msg;
  if(G.taScore>=20)     msg='🚀 超高速！タイムアタッカーすぎる！';
  else if(G.taScore>=15) msg='⚡ 速い！ノリノリやん！';
  else if(G.taScore>=10) msg='😎 10問以上！なかなかやる！';
  else if(G.taScore>=5)  msg='🙂 5問正解！もっと速く！';
  else if(G.taScore===0) msg='💀 0問！？指が動かなかった？';
  else                   msg='😅 もっとスピードアップ！';
  const isNew=G.taScore>(st.taBest||0)&&G.taScore>0;
  const toasts=toastHTML(G.newlyUnlocked);
  return `
    <div class="res-center">
      <div class="res-msg">⏰ タイムアタック 60秒間の結果</div>
      <div class="res-big">${G.taScore}<span class="res-sub"> 問正解</span></div>
      <div class="res-stats">
        <div class="res-stat"><strong>${G.taTotal}</strong><span>挑戦数</span></div>
        <div class="res-stat"><strong>${acc}%</strong><span>正答率</span></div>
        <div class="res-stat"><strong>${st.taBest}</strong><span>自己記録</span></div>
      </div>
      ${isNew?'<div class="pb-chip">🆙 新記録！</div>':''}
      <div style="margin-top:10px;font-size:0.88rem;color:var(--txt2)">${msg}</div>
    </div>
    ${toasts?`<div class="ach-toasts"><div class="ach-new-lbl">🎖 新しい実績！</div>${toasts}</div>`:''}
    ${SUPABASE_URL&&SUPABASE_KEY?`<div class="submit-chip">📤 スコアをランキングに登録済み</div>`:''}
    <div class="btn-row">
      <button class="btn sec" onclick="goAchs()">🎖 実績</button>
      <button class="btn sec" onclick="goRanking()">🏆 ランキング</button>
    </div>
    <div class="btn-row">
      <button class="btn out" onclick="goHome()">ホームへ</button>
      <button class="btn" onclick="startGame(true)">もう一度</button>
    </div>
  `;
}

// ─── RANKING ────────────────────────────
