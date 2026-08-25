function statsHTML() {
  const st=getStats(), acc=st.questions>0?Math.round(st.correct/st.questions*100):0;
  const catBars=Object.keys(CAT_COLORS).map(cat=>{
    const cor=st.catCorrect[cat]||0, tot=st.catTotal[cat]||0;
    const pct=tot>0?Math.round(cor/tot*100):0;
    return `<div><div class="cbi-top"><span>${cat}</span><span class="cbi-pct">${cor}/${tot} (${pct}%)</span></div>
      <div class="cbi-track"><div class="cbi-fill" style="width:${pct}%;background:${CAT_COLORS[cat]}"></div></div></div>`;
  }).join('');
  const pbItems=Object.entries(st.best).sort((a,b)=>Number(a[0])-Number(b[0])).map(([n,v])=>`
    <div class="pb-item"><span class="pbl">${n}問</span>
    <span><span class="pbv">${fmtT(v.time)}</span> <span class="pbs">${v.score}/${n}問</span></span></div>`).join('');
  return `
    <button class="back" onclick="goHome()">← 戻る</button>
    <div style="font-size:1.05rem;font-weight:bold;margin-bottom:14px">📊 統計</div>
    <div class="stat-grid">
      <div class="stat-box"><div class="sv">${st.plays}</div><div class="sk">総プレイ</div></div>
      <div class="stat-box"><div class="sv">${st.correct}</div><div class="sk">累計正解</div></div>
      <div class="stat-box"><div class="sv">${acc}%</div><div class="sk">通算正答率</div></div>
      <div class="stat-box"><div class="sv">${st.maxStreak}</div><div class="sk">最長連続正解</div></div>
      <div class="stat-box"><div class="sv">${st.survivalBest||0}</div><div class="sk">サバイバル記録</div></div>
      <div class="stat-box"><div class="sv">${st.taBest||0}</div><div class="sk">タイムアタック記録</div></div>
    </div>
    <div class="sec-lbl">カテゴリ別正解率</div>
    <div class="cat-bars" style="margin-bottom:16px">${catBars}</div>
    ${pbItems?`<div class="sec-lbl">個人ベスト</div><div class="pb-list">${pbItems}</div>`:''}
    <div onclick="triggerEgg('egg_gh_stats','🫥','統計の亡霊','この数字は本当に正しい？👻')" class="ghost-link">累計は嘘かもしれない</div>
  `;
}

// ─── ACHIEVEMENTS ───────────────────────
function achsHTML() {
  const unlocked=getUnlocked(), cnt=Object.keys(unlocked).length;
  const cats=[...new Set(ACHS.map(a=>a.cat))];
  const sections=cats.map(cat=>{
    const items=ACHS.filter(a=>a.cat===cat).map(a=>{
      const u=unlocked[a.id], dateStr=u?new Date(u.date).toLocaleDateString('ja-JP'):'';
      return `<div class="ach-item${u?'':' lk'}">
        <div class="ai-icon">${a.icon}</div>
        <div><div class="ai-name">${u?a.name:'???'}</div><div class="ai-desc">${a.desc}</div>
        ${dateStr?`<div class="ai-date">🗓 ${dateStr}</div>`:''}</div>
      </div>`;
    }).join('');
    return `<div class="ach-cat-title">${cat}</div><div class="ach-grid">${items}</div>`;
  }).join('');
  return `
    <button class="back" onclick="goHome()">← 戻る</button>
    <div class="ach-hdr">
      <span style="font-size:1.05rem;font-weight:bold">🎖 実績</span>
      <span class="ach-prog">${cnt} / ${ACHS.length} 解錠</span>
    </div>
    ${sections}
    <div onclick="triggerEgg('egg_gh_achs','🫥','実績の亡霊','全部見つけた？まだある…かも👻')" class="ghost-link">まだある...かもね？</div>
  `;
}

// ─── SETTINGS ───────────────────────────
