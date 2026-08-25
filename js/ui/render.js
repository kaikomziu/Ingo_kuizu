// ══════════════════════════════════════════
//  RENDER
// ══════════════════════════════════════════
function render() {
  const _cfg = getSettings();
  applyAccent(_cfg.accent || 'red');
  applyTheme(_cfg.theme || 'dark');
  document.body.dataset.fs = _cfg.fontSize || 'normal';

  _flavorIdx = (_flavorIdx + 1) % FLAVOR_TEXTS.length;
  const fp = document.getElementById('flavor-p');
  if(fp && easterCount===0) fp.textContent = FLAVOR_TEXTS[_flavorIdx];

  const c=document.getElementById('card');
  switch(G.screen){
    case 'home':     c.innerHTML=homeHTML();     break;
    case 'quiz':     c.innerHTML=quizHTML();     break;
    case 'surv':     c.innerHTML=survHTML();     break;
    case 'time':     c.innerHTML=timeHTML();     break;
    case 'result':   c.innerHTML=resultHTML();   break;
    case 'sresult':  c.innerHTML=sresultHTML();  break;
    case 'taresult': c.innerHTML=taResultHTML(); break;
    case 'stats':    c.innerHTML=statsHTML();    break;
    case 'achs':     c.innerHTML=achsHTML();     break;
    case 'settings': c.innerHTML=settingsHTML(); break;
    case 'easter':   c.innerHTML=easterHTML();   break;
    case 'ranking':  c.innerHTML=rankingHTML();  break;
    case 'basement':  c.innerHTML=basementHTML();  break;
    case 'basement2': c.innerHTML=basement2HTML(); break;
    case 'basement3': c.innerHTML=basement3HTML(); break;
    case 'void':      c.innerHTML=voidHTML();      break;
    case 'garden':    c.innerHTML=gardenHTML();    break;
    case 'debug':     c.innerHTML=debugHTML();     break;
    case 'zero_room': c.innerHTML=zeroRoomHTML();  break;
    case 'radio':     c.innerHTML=radioHTML();     break;
    case 'lab':       c.innerHTML=labHTML();       break;
    case 'mirror':    c.innerHTML=mirrorHTML();    break;
    case 'moon':      c.innerHTML=moonHTML();      break;
    case 'admin':     c.innerHTML=adminHTML();     break;
    case 'origin':    c.innerHTML=originHTML();    break;
    case 'founders':  c.innerHTML=foundersHTML();  break;
    case 'redacted':  c.innerHTML=redactedHTML();  break;
    case 'monitor':   c.innerHTML=monitorHTML();   break;
    case 'shadow':    c.innerHTML=shadowHTML();    break;
    case 'signal':    c.innerHTML=signalHTML();    break;
    case 'archive_c': c.innerHTML=archiveCHTML();  break;
    case 'final':     c.innerHTML=finalHTML();     break;
    case 'mystery_person': c.innerHTML=mysteryPersonHTML(); break;
    case 'cipher':          c.innerHTML=cipherHTML();        break;
    case 'epilogue':        c.innerHTML=epilogueHTML();      break;
    case 'file_infinity':   c.innerHTML=fileInfinityHTML();  break;
    case 'trippi':          c.innerHTML=trippiHTML();        break;
  }
  _checkAllRooms();
  _setScreenIdleTimers();
}

// ─── HOME ───────────────────────────────
const MODE_INFO = {
  normal:  { mi:'📝', mn:'通常クイズ',     md:'問題数を選ぼう' },
  surv:    { mi:'⚔️', mn:'サバイバル',      md:'1ミスで終了' },
  reverse: { mi:'🔄', mn:'逆クイズ',       md:'意味→隠語を選ぶ' },
  time:    { mi:'⏰', mn:'タイムアタック', md:'60秒で何問？' },
  hard:    { mi:'💀', mn:'ハード',         md:'6択の地獄へ' },
  joke:    { mi:'🤪', mn:'ネタ',           md:'カオス選択肢' },
};
const MODE_DESC = {
  normal:  '普通にクイズ。問題数を選んでチャレンジ！',
  surv:    `全${vocab.length}問をシャッフル。1問でも間違えたらゲームオーバー。`,
  reverse: '今度は意味から隠語を当てるターン。ちゃんと覚えてる？🔄',
  time:    '60秒以内に何問正解できるか？とにかく速く答えよう！⚡',
  hard:    '選択肢が6択！！鬼畜な選択肢の地獄へようこそ。😈',
  joke:    'ちょっとカオスな選択肢が混じってる。笑えるかも？🤪',
};

