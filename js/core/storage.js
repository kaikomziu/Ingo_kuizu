// ══════════════════════════════════════════
//  STORAGE
// ══════════════════════════════════════════
function getUnlocked() { return JSON.parse(localStorage.getItem('ach')||'{}'); }
function unlockAch(id) {
  const u=getUnlocked();
  if(!u[id]){ u[id]={date:Date.now()}; localStorage.setItem('ach',JSON.stringify(u)); return true; }
  return false;
}
function getStats() {
  return JSON.parse(localStorage.getItem('stats')||JSON.stringify({
    plays:0, correct:0, questions:0, maxStreak:0,
    survivalBest:0, survivalPlays:0,
    catCorrect:{}, catTotal:{}, best:{}, taBest:0,
  }));
}
function saveStats(s) { localStorage.setItem('stats',JSON.stringify(s)); }
function getName()     { return localStorage.getItem('pname')||''; }
function saveName(n)   { localStorage.setItem('pname',n); }

