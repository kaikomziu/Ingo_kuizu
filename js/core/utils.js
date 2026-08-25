// ══════════════════════════════════════════
//  UTILS
// ══════════════════════════════════════════
const shuffle = a => [...a].sort(()=>Math.random()-.5);
const esc = s => String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
function fmtT(s) {
  return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
}
function getChoices(q, all) {
  const n = getSettings().choices===2 ? 1 : 3;
  return shuffle([q, ...shuffle(all.filter(v=>v.meaning!==q.meaning)).slice(0,n)]);
}
function buildChoices(q) {
  if(G.mode==='hard'){
    const wrong=shuffle(vocab.filter(v=>v.meaning!==q.meaning)).slice(0,5);
    return shuffle([q,...wrong]);
  }
  if(G.mode==='joke'){
    const realWrong=shuffle(vocab.filter(v=>v.meaning!==q.meaning)).slice(0,1);
    const jokeWrong=shuffle(JOKE_MEANINGS).slice(0,2).map(m=>({word:'???',meaning:m,category:'？'}));
    return shuffle([q,...realWrong,...jokeWrong]);
  }
  return getChoices(q, vocab);
}
function getFilteredVocab() {
  const cats = getSettings().cats || [];
  const filtered = cats.length ? vocab.filter(v => cats.includes(v.category)) : vocab;
  return filtered.length >= 2 ? filtered : vocab;
}
function buildQs(num) {
  const pool = getFilteredVocab();
  return shuffle(pool).slice(0, Math.min(num, pool.length)).map(q=>({q, ch:buildChoices(q)}));
}

// 文字列をSHA-256でハッシュ化(16進文字列)。管理者パスワードの照合などに使用。
async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}

