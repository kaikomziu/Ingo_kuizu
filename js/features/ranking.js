// ══════════════════════════════════════════
//  FIREBASE RANKING
// ══════════════════════════════════════════
const _SB_HDR = () => ({
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
});

async function submitScore(tab, data) {
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/scores`, {
      method: 'POST',
      headers: { ..._SB_HDR(), 'Prefer': 'return=minimal' },
      body: JSON.stringify({ name: G.name||'名無し', tab, ...data, date: Date.now() }),
    });
  } catch(e) { /* サイレント失敗 */ }
}

async function fetchRankings(tab) {
  if(!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const order = tab==='surv' ? 'streak.desc,time.asc'
                : tab==='time' ? 'ta_score.desc'
                :                'pct.desc,time.asc';
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/scores?select=*&tab=eq.${tab}&order=${order}&limit=300`,
      { headers: _SB_HDR() }
    );
    const data = await res.json();
    if(!Array.isArray(data)) return [];

    // 名前ごとに最高スコアだけ残す
    const best = {};
    for(const e of data) {
      const key = (e.name||'名無し').trim().toLowerCase();
      if(!best[key]) { best[key]=e; continue; }
      const cur = best[key];
      let better = false;
      if(tab==='surv')      better = (e.streak||0)>(cur.streak||0) || ((e.streak||0)===(cur.streak||0)&&(e.time||9999)<(cur.time||9999));
      else if(tab==='time') better = (e.ta_score||0)>(cur.ta_score||0);
      else                  better = (e.pct||0)>(cur.pct||0) || ((e.pct||0)===(cur.pct||0)&&(e.time||9999)<(cur.time||9999));
      if(better) best[key]=e;
    }
    return Object.values(best);
  } catch(e) { return []; }
}

async function goRanking() {
  G.screen = 'ranking';
  _rankTab = G.mode==='surv' ? 'surv' : G.mode==='time' ? 'time' : (G.mode||'normal');
  _rankData = {};
  _rankLoading = true;
  render();
  _rankData[_rankTab] = await fetchRankings(_rankTab);
  _rankLoading = false;
  if(G.screen === 'ranking') render();
}

async function switchRankTab(tab) {
  _rankTab = tab;
  if(!_rankData[tab]) {
    _rankLoading = true;
    render();
    _rankData[tab] = await fetchRankings(tab);
    _rankLoading = false;
  }
  if(G.screen === 'ranking') render();
}

