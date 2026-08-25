function _clearIdleTimers() {
  [_resultIdleTimer,_settingsIdleTimer,_achsIdleTimer,_homeIdleTimer].forEach(t=>t&&clearTimeout(t));
  _resultIdleTimer=_settingsIdleTimer=_achsIdleTimer=_homeIdleTimer=null;
}
function _setScreenIdleTimers() {
  _clearIdleTimers();
  if(G.screen==='result')
    _resultIdleTimer=setTimeout(()=>{ triggerEgg('egg_result_idle','🧘','沈黙の観察者','結果を5秒静かに見つめた🧘'); _resultIdleTimer=null; },5000);
  if(G.screen==='settings')
    _settingsIdleTimer=setTimeout(()=>{ triggerEgg('egg_settings_idle','⚙️','設定マニア','設定を30秒ぼーっとした⚙️'); _settingsIdleTimer=null; },30000);
  if(G.screen==='achs')
    _achsIdleTimer=setTimeout(()=>{ triggerEgg('egg_achs_idle','🔍','実績鑑賞家','実績を20秒眺めた🔍'); _achsIdleTimer=null; },20000);
  if(G.screen==='home')
    _homeIdleTimer=setTimeout(()=>{ triggerEgg('egg_home_idle','💤','怠惰なホーマー','ホームで60秒ぼーっとした💤'); _homeIdleTimer=null; },60000);
}

function showEggToast(icon, name, msg) {
  const d = document.createElement('div');
  d.className = 'egg-toast';
  d.innerHTML = `
    <div style="font-size:2.2rem;margin-bottom:6px">${icon}</div>
    <div style="font-weight:bold;color:#ff9800;margin-bottom:4px">🥚 隠し実績解除！</div>
    <div style="font-weight:bold;margin-bottom:6px">${name}</div>
    <div style="font-size:0.78rem;color:var(--txt2)">${msg}</div>`;
  document.body.appendChild(d);
  setTimeout(()=>{ d.classList.add('out'); setTimeout(()=>d.remove(),400); }, 3200);
}

function triggerEgg(id, icon, name, msg) {
  if(unlockAch(id)) showEggToast(icon, name, msg);
}

function checkEggAtResult() {
  const nm=(G.name||'');
  const nl=nm.toLowerCase();
  if(nl.includes('ヌビ二')||nl.includes('ぬびに'))
    triggerEgg('egg_pizza','🍕','ヌビ二フリーク','ヌビ二はピザのことだよ！🍕 お腹すいてきた');
  if(nl.includes('brr'))
    triggerEgg('egg_brr','🎵','Brr Brr族','Brr Brr！！同士よ！🎵');
  const t=new Date();
  const [h,mi,m,day,dow]=[t.getHours(),t.getMinutes(),t.getMonth(),t.getDate(),t.getDay()];
  if(h===3&&mi===33)   triggerEgg('egg_333','🌙','魔の3時33分','この時間にプレイ！？呪われてるかも…👻');
  if(h===11&&mi===11)  triggerEgg('egg_1111','🕐','11:11の奇跡','11時11分にプレイ！幸運かも🕐');
  if(m===0&&day===1)   triggerEgg('egg_newyear','🎍','新年一発目','元旦にプレイ！おめでとう🎍');
  if(h===0&&mi===0)    triggerEgg('egg_midnight','🕛','深夜0時ちょうど','真夜中ちょうど！怖い🕛');
  if(h===1&&mi===23)   triggerEgg('egg_0123','🔢','1:23の時間','01:23という並びで発見🔢');
  // 季節・曜日
  if(m===9&&day===31)  triggerEgg('egg_halloween','🎃','ハロウィン','10月31日にプレイ！🎃');
  if(m===11&&day===25) triggerEgg('egg_xmas','🎄','クリスマス','12月25日にプレイ！🎄');
  if(h===3)            triggerEgg('egg_3am','😴','魔の3時台','深夜3時台プレイ…お化けに気をつけて😴');
  if(m===3&&day===1)   triggerEgg('egg_april','🃏','エイプリルフール','4月1日！全部ウソかもよ🃏');
  if(dow===6&&h>=20)   triggerEgg('egg_sat_night','🌃','土曜の夜','土曜の夜プレイヤー🌃');
  // 名前
  if(nm.length>=20)    triggerEgg('egg_name_long','📏','長い名前の使徒','名前20文字以上！長すぎw📏');
  if(nm.length>0&&/^\d+$/.test(nm)) triggerEgg('egg_name_num','🔢','数字の名前','名前が全部数字！？不思議🔢');
  if(nm==='神')        triggerEgg('egg_name_god','⛩️','神プレイヤー','名前が「神」！？本物の神だ⛩️');
  if(nm==='SIBAKO'||nm==='sibako') triggerEgg('egg_name_sibako','📦','SIBAKO民','SIBAKOで遊ぶSIBAKO民📦');
  if(nm.length>0&&/\p{Emoji_Presentation}/u.test(nm)) triggerEgg('egg_emoji_name','😎','絵文字族','名前に絵文字！オシャレ😎');
  // 累計プレイ時間
  const st2=getStats();
  if((st2.totalPlaySec||0)>=3600) triggerEgg('egg_1hour','⏳','1時間の勇者','累計1時間以上プレイ！⏳');
  // 42%
  const cor2=G.res.filter(Boolean).length, tot2=G.res.length;
  if(tot2>0 && Math.round(cor2/tot2*100)===42) triggerEgg('egg_42','🌌','宇宙の答え','正答率42%！宇宙の答えだ🌌');
  if(nm.includes('42')) triggerEgg('egg_name_42','✨','42という名の者','名前に42が入ってる！✨');
  // 神速パーフェクト
  if(tot2>=5 && cor2===tot2 && G.elapsedSec<10) triggerEgg('egg_perfect_fast','🚀','神速パーフェクト','満点を10秒未満で達成！🚀');
}

function subClick() {
  _subClicks++;
  if(_subClicks >= 5) {
    _subClicks = 0;
    triggerEgg('egg_sub','👆','サブタイトル探偵','そこを連打するの…？w よく気づいたね');
  }
}

// ── 隠しページナビ ──
function goBasement()  { triggerEgg('egg_basement','🚪','地下室','こんなところに扉が…🚪'); G.screen='basement'; render(); }
function goVoid()      { triggerEgg('egg_void','🌑','虚無の部屋','何もない… でも来てしまった🌑'); G.screen='void'; render(); }
function goGarden()    { triggerEgg('egg_garden','🌸','秘密の庭','四隅をタップして庭を発見！🌸'); G.screen='garden'; render(); }
function goDebug()     { triggerEgg('egg_debug','💻','デバッグルーム','"debug"と打ってここへ！💻'); G.screen='debug'; render(); }
function goBasement2() { triggerEgg('egg_basement_deep','⬇️','地下アーカイブ','地下室の奥のアーカイブへ…⬇️'); G.screen='basement2'; render(); }
function goBasement3() { triggerEgg('egg_basement3','🕯️','最深部','地下2階まで来た…🕯️'); G.screen='basement3'; render(); }
function goZeroRoom()  { triggerEgg('egg_zero_room','🕳️','零の部屋','0点でここへ来た…🕳️'); G.screen='zero_room'; render(); }

function goRadio()  { triggerEgg('egg_radio','📻','ラジオ局','隠語ラジオ放送局を発見！📻'); G.screen='radio'; _visitedRooms.add('radio'); render(); _checkAllRooms(); }
function goMirror() { triggerEgg('egg_mirror','🪞','鏡の世界','"mirror"と入力して鏡の世界へ🪞'); G.screen='mirror'; _visitedRooms.add('mirror'); render(); _checkAllRooms(); }
function goLab()    { triggerEgg('egg_lab','🧪','実験室','"lab"と入力して実験室に侵入！🧪'); _labRound=0; _labScore=0; _labPhase='idle'; G.screen='lab'; _visitedRooms.add('lab'); render(); _checkAllRooms(); }
function goMoon()   { triggerEgg('egg_moon','🌙','月の図書館','地下2階から月の図書館へ🌙'); G.screen='moon'; _visitedRooms.add('moon'); render(); _checkAllRooms(); }

function _checkAllRooms() {
  const allRooms = ['basement','void','garden','debug','basement2','basement3','radio','lab','moon','mirror',
                    'origin','founders','redacted','monitor','shadow','signal','archive_c'];
  allRooms.forEach(r => { if(G.screen===r) _visitedRooms.add(r); });
  const needed = ['basement','void','garden','debug','radio','lab','moon','mirror',
                  'origin','founders','redacted','monitor','shadow','signal','archive_c'];
  if(needed.every(r => _visitedRooms.has(r))) {
    triggerEgg('egg_all_rooms','🗺️','全部屋制覇','全ての隠し部屋を制覇！🗺️');
    // 最終部屋も解放
    setTimeout(()=>{ G.screen='final'; triggerEgg('egg_final','🌑','真実','全てを知ってしまった者🌑'); render(); }, 2000);
  }
}

function _getLabQ() {
  const pool = shuffle([...vocab]);
  const q = pool[0];
  const wrong = shuffle(pool.slice(1)).slice(0,3);
  return { q, choices: shuffle([q, ...wrong]) };
}
function startLab() {
  _labRound=0; _labScore=0; _labPhase='show';
  _labQ = _getLabQ();
  if(G.screen==='lab') render();
  setTimeout(()=>{ if(G.screen==='lab'){ _labPhase='answer'; render(); } }, 1600);
}
function labAnswer(meaning) {
  if(_labPhase!=='answer') return;
  if(meaning===_labQ.q.meaning) _labScore++;
  _labRound++;
  if(_labRound>=5){
    _labPhase='done';
    if(_labScore===5) triggerEgg('egg_lab_clear','🔬','実験完了','実験室ミニゲーム全問正解！🔬');
  } else {
    _labPhase='show'; _labQ=_getLabQ();
  }
  if(G.screen==='lab') render();
  if(_labPhase==='show') setTimeout(()=>{ if(G.screen==='lab'){ _labPhase='answer'; render(); } }, 1600);
}

function spawnStars() {
  const emojis = ['⭐','🌟','✨','💫','🌠'];
  for(let i=0;i<8;i++){
    const d = document.createElement('div');
    d.className='star-particle';
    d.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    d.style.left=Math.random()*90+'vw';
    d.style.top=Math.random()*80+'vh';
    d.style.animationDelay=Math.random()*1+'s';
    document.body.appendChild(d);
    setTimeout(()=>d.remove(), 2500);
  }
}

function basementSafe(key) {
  const expected=['r','y','b'];
  const pos=_basementSafeSeq.length;
  if(key===expected[pos]){
    _basementSafeSeq.push(key);
    if(_basementSafeSeq.length===3){
      _basementSafeSeq=[];
      triggerEgg('egg_basement_safe','🔐','金庫解錠','地下室の謎の金庫を開けた！🔐');
    }
  } else {
    _basementSafeSeq=[];
    if(key===expected[0]) _basementSafeSeq.push(key);
  }
  if(G.screen==='basement') render();
}

// ── タイトル長押し ──
function holdStart() { _holdTimer = setTimeout(() => { _holdTimer = null; triggerEgg('egg_hold','✋','長押しの探求者','タイトルを2.5秒長押し！✋'); goVoid(); }, 2500); }
function holdEnd()   { if(_holdTimer){ clearTimeout(_holdTimer); _holdTimer = null; } }

// ── カード四隅タップ ──
function cardCornerTap(e) {
  const card = document.getElementById('card');
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  const corner = (x < r.width/2 ? 'L' : 'R') + (y < r.height/2 ? 'T' : 'B');
  const now = Date.now();
  if(now - _cornerTime > 3000) _cornerSeq = [];
  _cornerTime = now;
  _cornerSeq.push(corner);
  if(_cornerSeq.length > 4) _cornerSeq.shift();
  if(_cornerSeq.join(',') === 'LT,RT,RB,LB') { _cornerSeq = []; triggerEgg('egg_corners','🔲','四隅制覇','カードの四隅を順番にタップ！🔲'); goGarden(); }
}

