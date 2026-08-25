// ─── NAV ────────────────────────────────
function goHome() {
  clearInterval(G.timerInt); clearInterval(G.taTimerInt);
  _clearIdleTimers();
  if(G.screen==='quiz' && G.cur===1 && G.res.length===1)
    triggerEgg('egg_quit_early','🏃','逃走者','1問答えた直後に逃げた！🏃');
  _retryCount=0; _survDieX=0; G.screen='home'; render();
}
function goStats()    { G.screen='stats';    render(); }
function goAchs()     { G.screen='achs';     render(); }
function goSettings() { G.screen='settings'; render(); }
// goRanking は async なので上部で定義済み

// ──────────────────────────────────────────
//  イースターエッグ入力検出
// ──────────────────────────────────────────

// ── PC: キーボード ──
document.addEventListener('keydown', e => {
  // コナミコマンド
  _konamiSeq.push(e.key);
  if(_konamiSeq.length > KONAMI.length) _konamiSeq.shift();
  if(_konamiSeq.join() === KONAMI.join())
    triggerEgg('egg_konami','🕹️','コナミの使徒','↑↑↓↓←→←→BA 入力した！レジェンドすぎる🕹️');

  // "pizza" タイプ + 追加ワード
  if(e.key.length === 1) {
    _typeSeq = (_typeSeq + e.key.toLowerCase()).slice(-10);
    if(_typeSeq.includes('pizza'))  triggerEgg('egg_type','⌨️','pizza職人','キーボードでpizza召喚！？🍕🍕🍕');
    if(_typeSeq.includes('debug'))  goDebug();
    if(_typeSeq.includes('079'))    triggerEgg('egg_type_079','💨','079職人','079を入力！おなら好きかw💨');
    if(_typeSeq.includes('bomb'))   triggerEgg('egg_type_bomb','💣','爆弾魔','ポップポップポップサフール💣');
    if(_typeSeq.includes('love'))   triggerEgg('egg_type_love','💕','愛の告白','loveって打ったの照れる💕');
    if(_typeSeq.includes('brrbrr')) triggerEgg('egg_type_brr','🎵','Brr Brr入力者','Brr Brr Patapim！🎵');
    if(_typeSeq.includes('help'))   triggerEgg('egg_type_help','🆘','助けを求める者','助けても隠語で返すよ🆘');
    if(_typeSeq.includes('sudo'))   triggerEgg('egg_type_sudo','🔐','管理者権限','sudo: permission denied🔐');
    if(_typeSeq.includes('nyan'))   triggerEgg('egg_type_nyan','🐱','にゃんこ','ニャー！🐱🌈');
    if(_typeSeq.includes('sibako')) triggerEgg('egg_type_sib','📦','SIBAKO入力者','SIBAKOって打った！？📦');
    if(_typeSeq.includes('radio'))   goRadio();
    if(_typeSeq.includes('mirror'))  goMirror();
    if(_typeSeq.includes('lab'))     { if(G.screen==='home') goLab(); }
    if(_typeSeq.includes('admin'))   goAdmin();
    if(_typeSeq.includes('origin'))  { G.screen='origin';   triggerEgg('egg_origin','📜','SIBAKOの起源','起源の記録に触れた📜'); render(); }
    if(_typeSeq.includes('shadow'))  { G.screen='shadow';   triggerEgg('egg_shadow','👤','影の部屋','影の中に何かを見た👤'); render(); }
    if(_typeSeq.includes('signal'))  { G.screen='signal';   triggerEgg('egg_signal','📡','信号傍受','暗号信号を受信した📡'); render(); }
    if(_typeSeq.includes('redact'))  { G.screen='redacted'; triggerEgg('egg_redacted','🖤','消された記録','黒塗りの真実に触れた🖤'); render(); }
    if(_typeSeq.endsWith('gg'))     triggerEgg('egg_type_gg','🎮','GG','ggと入力！いいゲームだった！🎮');
    if(_typeSeq.includes('yolo'))   triggerEgg('egg_type_yolo','🤟','YOLO','You Only Live Once！🤟');
    if(_typeSeq.includes('wtf'))    triggerEgg('egg_type_wtf','😱','WTF...','本当にwtfって打ったの？😱');
    if(_typeSeq.includes('lol'))    triggerEgg('egg_type_lol','😂','lol','何が笑えた？lol😂');
  }
});

// ── スマホ: スワイプでコナミ ──
(()=>{
  const SWIPE_DIRS = ['up','up','down','down','left','right','left','right'];
  let _swipeSeq = [], _swipeVSeq = [];
  let _tx0 = 0, _ty0 = 0;
  document.addEventListener('touchstart', e => {
    _tx0 = e.touches[0].clientX;
    _ty0 = e.touches[0].clientY;
  }, {passive:true});
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - _tx0;
    const dy = e.changedTouches[0].clientY - _ty0;
    if(Math.abs(dx) < 30 && Math.abs(dy) < 30) return; // タップはスキップ
    let dir;
    if(Math.abs(dx) > Math.abs(dy)) dir = dx > 0 ? 'right' : 'left';
    else dir = dy > 0 ? 'down' : 'up';
    _swipeSeq.push(dir);
    if(_swipeSeq.length > SWIPE_DIRS.length) _swipeSeq.shift();
    if(_swipeSeq.join() === SWIPE_DIRS.join())
      triggerEgg('egg_konami','🕹️','コナミの使徒','スワイプでコナミ入力！？天才すぎる🕹️');
    // 下→上→下で画面反転
    _swipeVSeq.push(dir); if(_swipeVSeq.length>3) _swipeVSeq.shift();
    if(_swipeVSeq.join(',') === 'down,up,down') {
      _swipeVSeq=[];
      document.body.style.filter='invert(1)';
      setTimeout(()=>document.body.style.filter='', 1000);
      triggerEgg('egg_invert','🙃','世界の裏側','下上下スワイプで世界が反転！🙃');
    }
  }, {passive:true});
})();

// ── スマホ: シェイクでpizza ──
(()=>{
  let _lastShake = 0, _shakeCnt = 0;
  const onMotion = e => {
    const a = e.accelerationIncludingGravity;
    if(!a) return;
    const force = Math.abs(a.x||0) + Math.abs(a.y||0) + Math.abs(a.z||0);
    if(force > 40) {
      const now = Date.now();
      if(now - _lastShake < 1200) {
        _shakeCnt++;
        if(_shakeCnt >= 3) {
          _shakeCnt = 0;
          triggerEgg('egg_type','⌨️','pizza職人','スマホを振ってpizza召喚！🍕🍕🍕');
        }
      } else {
        _shakeCnt = 1;
      }
      _lastShake = now;
    }
  };
  if(typeof DeviceMotionEvent !== 'undefined') {
    if(typeof DeviceMotionEvent.requestPermission === 'function') {
      // iOS 13+ は初回タップ後に許可要求
      document.addEventListener('click', ()=>{
        DeviceMotionEvent.requestPermission().then(s=>{
          if(s==='granted') window.addEventListener('devicemotion', onMotion);
        }).catch(()=>{});
      }, {once:true});
    } else {
      window.addEventListener('devicemotion', onMotion);
    }
  }
})();

render();
