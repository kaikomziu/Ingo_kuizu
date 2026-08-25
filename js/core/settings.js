// ══════════════════════════════════════════
//  SETTINGS
// ══════════════════════════════════════════
function getSettings() {
  const def = { confirm:true, timer:true, streak:true, catBadge:true, choices:4,
                autoNext:false, taunt:true, fontSize:'normal', accent:'red', theme:'dark',
                cats:['人物','場所','感情','モノ','食べ物','その他'] };
  return Object.assign({}, def, JSON.parse(localStorage.getItem('cfg')||'{}'));
}
function saveSettings(s) { localStorage.setItem('cfg', JSON.stringify(s)); }
function setSetting(k, v) {
  const s=getSettings(); s[k]=v; saveSettings(s);
  if(k==='theme'){
    _themeSeq.push(v); if(_themeSeq.length>4) _themeSeq.shift();
    const p=_themeSeq.join(',');
    if(p==='dark,light,dark,light'||p==='light,dark,light,dark'){
      _themeSeq=[]; triggerEgg('egg_duality','☯️','光と闇の狭間','テーマを明暗交互に4回切替！☯️');
    }
  }
  render();
}
function toggleCat(cat) {
  const s=getSettings();
  const idx=s.cats.indexOf(cat);
  if(idx>=0) s.cats.splice(idx,1); else s.cats.push(cat);
  saveSettings(s);
  if(s.cats.length===0) triggerEgg('egg_no_cats','🌌','虚無の学習者','全カテゴリOFF…虚無で学ぶ者🌌');
  render();
}

const ACCENTS = {
  red:    { '--ac':'#e94560', '--ac-dk':'#c73652', '--ac-glow':'rgba(233,69,96,.53)',  '--ac-ghost':'rgba(233,69,96,.08)' },
  blue:   { '--ac':'#2196f3', '--ac-dk':'#1565c0', '--ac-glow':'rgba(33,150,243,.53)', '--ac-ghost':'rgba(33,150,243,.08)' },
  green:  { '--ac':'#4caf50', '--ac-dk':'#388e3c', '--ac-glow':'rgba(76,175,80,.53)',  '--ac-ghost':'rgba(76,175,80,.08)' },
  purple: { '--ac':'#9c27b0', '--ac-dk':'#7b1fa2', '--ac-glow':'rgba(156,39,176,.53)', '--ac-ghost':'rgba(156,39,176,.08)' },
  orange: { '--ac':'#ff9800', '--ac-dk':'#e65100', '--ac-glow':'rgba(255,152,0,.53)',  '--ac-ghost':'rgba(255,152,0,.08)' },
};
function applyAccent(name) {
  const c = ACCENTS[name] || ACCENTS.red;
  const r = document.documentElement;
  Object.entries(c).forEach(([k,v]) => r.style.setProperty(k, v));
}

const THEMES = {
  dark:   { '--bg':'#1a1a2e','--card':'#16213e','--card2':'#0f3460','--card3':'#1a4a80','--txt':'#eee','--txt2':'#888' },
  light:  { '--bg':'#eef2f7','--card':'#ffffff','--card2':'#dde4ee','--card3':'#c0ccdd','--txt':'#1a1a2e','--txt2':'#556' },
  sakura: { '--bg':'#1a0818','--card':'#2d1028','--card2':'#4a1540','--card3':'#6e2060','--txt':'#ffdde8','--txt2':'#bb88a0' },
  ocean:  { '--bg':'#001219','--card':'#001f2d','--card2':'#003049','--card3':'#005f73','--txt':'#caf0f8','--txt2':'#6fa8bb' },
  forest: { '--bg':'#0a1a0d','--card':'#122418','--card2':'#1d3d25','--card3':'#2e6040','--txt':'#d4edda','--txt2':'#7aab88' },
};
function applyTheme(name) {
  const t = THEMES[name] || THEMES.dark;
  const r = document.documentElement;
  Object.entries(t).forEach(([k,v]) => r.style.setProperty(k, v));
}

