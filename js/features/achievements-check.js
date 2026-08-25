// ──────────────────────────────────────────
//  ランキング状態
// ──────────────────────────────────────────
let _rankData = {};
let _rankTab  = 'normal';
let _rankLoading = false;

// ══════════════════════════════════════════
//  ACHIEVEMENTS CHECK
// ══════════════════════════════════════════
function checkAchs(isSurv, mode) {
  const st=getStats(), h=new Date().getHours(), dow=new Date().getDay();
  mode = mode || G.mode;
  const nl=[];
  const mu=(id,cond)=>{ if(cond&&unlockAch(id)) nl.push(id); };

  // 共通
  mu('p5',  st.plays>=5);   mu('p20',  st.plays>=20);  mu('p50',  st.plays>=50);
  mu('p100',st.plays>=100); mu('p200', st.plays>=200); mu('p500', st.plays>=500);
  mu('r50', st.correct>=50); mu('r200',st.correct>=200); mu('r500', st.correct>=500);
  mu('r1000',st.correct>=1000); mu('r2500',st.correct>=2500);
  mu('r5000',st.correct>=5000); mu('r10000',st.correct>=10000);
  mu('night',h>=0&&h<5); mu('morning',h>=5&&h<7); mu('noon',h===12);
  mu('early4',h===4); mu('late2',h===2);
  mu('friday',dow===5); mu('weekend',dow===0||dow===6);
  mu('day3',(st.dayStreak||0)>=3); mu('day7',(st.dayStreak||0)>=7);
  mu('first', true);

  // 実績コレクター
  const unlockedCount = Object.keys(getUnlocked()).length;
  mu('ach10',unlockedCount>=10); mu('ach25',unlockedCount>=25); mu('ach50',unlockedCount>=50);
  const normalAchIds = ACHS.filter(a=>!a.cat.includes('隠し')).map(a=>a.id);
  mu('ach_all', normalAchIds.every(id=>getUnlocked()[id]));

  // 全モード制覇
  const mp = st.modePlays||{};
  mu('all_modes',['normal','reverse','hard','joke','surv','time'].every(m=>mp[m]>0));

  if(mode==='time'){
    mu('ta_10',G.taScore>=10); mu('ta_5',G.taScore>=5); mu('ta_15',G.taScore>=15);
    mu('ta_20',G.taScore>=20); mu('ta_25',G.taScore>=25); mu('ta_30',G.taScore>=30);
    mu('ta_acc',G.taTotal>=10&&G.taScore/G.taTotal>=0.9);
    return nl;
  }

  mu('s3',G.maxStreak>=3); mu('s5',G.maxStreak>=5); mu('s10',G.maxStreak>=10);
  mu('s15',G.maxStreak>=15); mu('s20',G.maxStreak>=20);

  if(isSurv){
    mu('sv5',G.survStreak>=5); mu('sv10',G.survStreak>=10);
    mu('sv15',G.survStreak>=15); mu('sv20',G.survStreak>=20);
    mu('sv30',G.survStreak>=30);
    mu('sv_all',G.survStreak>=vocab.length);
    mu('sv_die1',G.survStreak===0);
  } else {
    const cor=G.res.filter(Boolean).length, tot=G.res.length, sec=G.elapsedSec;
    const cfg=getSettings();
    mu('perfect',cor===tot); mu('god',cor===tot&&tot===vocab.length);
    mu('all_q',tot===vocab.length); mu('max_q',tot===vocab.length);
    mu('s_all',G.maxStreak===tot&&tot>=10);
    mu('sp5',tot>=10&&sec/tot<=5); mu('sp3',tot>=10&&sec/tot<=3);
    mu('sp2',tot>=10&&sec/tot<=2);
    mu('sp30',tot>=10&&sec<=30); mu('sp20',tot>=10&&sec<=20);
    mu('slow',tot>=10&&sec>=180); mu('zero',tot>=5&&cor===0);
    mu('two_perf',cfg.choices===2&&cor===tot&&tot>=5);
    mu('almost',tot>=5&&cor===tot-1);
    mu('one_wrong',tot>=10&&cor===tot-1);
    const best=st.best[tot];
    if(!best||cor>best.score||(cor===best.score&&sec<best.time)) mu('pb',!!best);
    if(mode==='reverse')  { mu('rev_first',true); mu('rev_perf',cor===tot); }
    if(mode==='hard')     { mu('hard_done',true); mu('hard_perf',cor===tot); }
    if(mode==='joke')     { mu('joke_play',true); mu('joke_perf',cor===tot); }
    // 語彙マスター
    const qi=G.qs;
    qi.forEach(({q},i)=>{
      if(G.res[i]){
        if(q.word==='079')   mu('know_079',true);
        if(q.word==='ヌビ二') mu('know_nubbi',true);
      }
    });
    const foodIdxs=qi.reduce((a,{q},i)=>q.category==='食べ物'?[...a,i]:a,[]);
    if(foodIdxs.length>0&&foodIdxs.every(i=>G.res[i])) mu('know_food',true);
    const catsDone=new Set(qi.map(({q},i)=>G.res[i]?q.category:null).filter(Boolean));
    mu('know_all_cat',Object.keys(CAT_COLORS).every(c=>catsDone.has(c)));
  }
  return nl;
}

function _trackDay(st) {
  const today = new Date().toDateString();
  if(st.lastPlayDay !== today) {
    const yesterday = new Date(Date.now()-86400000).toDateString();
    st.dayStreak = (st.lastPlayDay === yesterday) ? (st.dayStreak||0)+1 : 1;
    st.lastPlayDay = today;
  }
}
function updateStats(isSurv) {
  const st=getStats(), cor=G.res.filter(Boolean).length, tot=G.res.length;
  st.plays++; st.correct+=cor; st.questions+=tot;
  st.totalPlaySec=(st.totalPlaySec||0)+G.elapsedSec;
  st.maxStreak=Math.max(st.maxStreak, G.maxStreak);
  st.modePlays = st.modePlays||{};
  st.modePlays[G.mode] = (st.modePlays[G.mode]||0)+1;
  _trackDay(st);
  if(isSurv){
    st.survivalPlays++;
    st.survivalBest=Math.max(st.survivalBest||0, G.survStreak);
  } else {
    G.qs.forEach(({q},i)=>{
      st.catCorrect[q.category]=(st.catCorrect[q.category]||0)+(G.res[i]?1:0);
      st.catTotal[q.category]=(st.catTotal[q.category]||0)+1;
    });
    const prev=st.best[tot];
    if(!prev||cor>prev.score||(cor===prev.score&&G.elapsedSec<prev.time))
      st.best[tot]={score:cor, time:G.elapsedSec};
  }
  saveStats(st);
}
function updateStatsTA() {
  const st=getStats();
  st.plays++; st.correct+=G.taScore; st.questions+=G.taTotal;
  st.totalPlaySec=(st.totalPlaySec||0)+60;
  st.taPlays = (st.taPlays||0)+1;
  st.modePlays = st.modePlays||{}; st.modePlays['time']=(st.modePlays['time']||0)+1;
  if(G.taScore>(st.taBest||0)) st.taBest=G.taScore;
  _trackDay(st);
  saveStats(st);
}

