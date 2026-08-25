function rankingHTML() {
  const tabs = [
    {id:'normal',  label:'📝 通常'},
    {id:'reverse', label:'🔄 逆'},
    {id:'hard',    label:'💀 ハード'},
    {id:'joke',    label:'🤪 ネタ'},
    {id:'surv',    label:'⚔️ サバイバル'},
    {id:'time',    label:'⏰ タイムアタック'},
  ];
  const tabsHTML = tabs.map(t=>
    `<div class="rank-tab${_rankTab===t.id?' on':''}" onclick="switchRankTab('${t.id}')">${t.label}</div>`
  ).join('');

  let content = '';
  if(!SUPABASE_URL || !SUPABASE_KEY) {
    content = `<div class="no-db-banner">
      ⚙️ Supabaseの設定がまだです。<br>
      quiz.html の <code>SUPABASE_URL</code> と<br>
      <code>SUPABASE_KEY</code> を貼り付けてください。
    </div>`;
  } else if(_rankLoading || !_rankData[_rankTab]) {
    content = `<div class="rank-loading">
      <div style="font-size:2rem;animation:pulse 1s infinite">⏳</div>
      <div style="margin-top:8px">読み込み中...</div>
    </div>`;
  } else {
    const entries = _rankData[_rankTab] || [];
    let sorted;
    if(_rankTab==='surv')
      sorted = [...entries].sort((a,b)=>(b.streak||0)-(a.streak||0)||((a.time||9999)-(b.time||9999)));
    else if(_rankTab==='time')
      sorted = [...entries].sort((a,b)=>(b.ta_score||0)-(a.ta_score||0));
    else
      sorted = [...entries].sort((a,b)=>(b.pct||0)-(a.pct||0)||((a.time||9999)-(b.time||9999)));
    sorted = sorted.slice(0,20);

    if(sorted.length===0){
      content = `<div class="rank-empty">まだランキングがありません🙂<br>プレイしてスコアを登録しよう！</div>`;
    } else {
      const medals=['🥇','🥈','🥉'];
      const myName=(G.name||'名無し').trim().toLowerCase();
      content = `<div class="rank-list">`+sorted.map((e,i)=>{
        const isMe=(e.name||'名無し').trim().toLowerCase()===myName;
        let val, sub='';
        if(_rankTab==='surv'){
          val=(e.streak||0)+'連続'; sub=fmtT(e.time||0);
        } else if(_rankTab==='time'){
          val=(e.ta_score||0)+'問';
        } else {
          val=(e.score||0)+'/'+(e.total||0)+' '+(e.pct||0)+'%'; sub=fmtT(e.time||0);
        }
        return `<div class="rank-entry${isMe?' me':''}">
          <span class="rank-pos">${medals[i]||'#'+(i+1)}</span>
          <span class="rank-n">${esc(e.name||'名無し')}${isMe?' 👈':''}</span>
          <span class="rank-v">${val}</span>
          <span class="rank-t">${sub}</span>
        </div>`;
      }).join('')+'</div>';
    }
  }

  return `
    <button class="back" onclick="goHome()">← 戻る</button>
    <div style="font-size:1.05rem;font-weight:bold;margin-bottom:12px">🏆 オンラインランキング</div>
    <div class="rank-tabs">${tabsHTML}</div>
    ${content}
    <button class="btn sec" style="margin-top:14px" onclick="switchRankTab('${_rankTab}')">🔄 更新</button>
    <div onclick="triggerEgg('egg_rank_ghost','🏅','ランキングの亡霊','ランキングに隠れた幽霊を発見！👻')" class="ghost-link" style="text-align:right">このランキングは本物</div>
  `;
}

// ─── EASTER EGG ─────────────────────────
function easterHTML() {
  return `
    <div class="easter-bg">
      <div style="font-size:3.5rem;margin-bottom:12px;animation:pulse 1s infinite">🥚</div>
      <div style="font-size:1.4rem;font-weight:bold;margin-bottom:8px" class="rainbow">イースターエッグ発見！</div>
      <div style="font-size:0.85rem;color:var(--txt2);margin-bottom:18px;line-height:1.6">
        タイトルを10回も押すなんて...<br>
        相当ヒマか、好奇心旺盛だね🐣<br>
        実績「イースターエッグ」をゲット！
      </div>
      <div style="font-size:1.8rem;margin-bottom:6px">🐣 Brr Brr！🐣</div>
      <div style="font-size:0.75rem;color:#444;margin-bottom:22px">
        「隠語の神」はここに眠る<br>
        ポップポップポップサフール💣
      </div>
      <button class="btn" onclick="goHome()">ホームへ戻る</button>
    </div>
  `;
}

