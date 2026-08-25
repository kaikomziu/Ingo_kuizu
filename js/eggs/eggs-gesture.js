// ══════════════════════════════════════════
//  イースターエッグ ジェスチャー/操作系
//  （キーボード入力・名前欄の入力を伴わない隠し要素）
// ══════════════════════════════════════════

// ── モードカード長押し ──
function modeHoldStart() {
  _modeHoldTimer = setTimeout(() => {
    _modeHoldTimer = null;
    triggerEgg('egg_mode_hold','🃏','隠しモード探し','モードカードを1.2秒長押しした🃏');
  }, 1200);
}
function modeHoldEnd() {
  if(_modeHoldTimer) { clearTimeout(_modeHoldTimer); _modeHoldTimer = null; }
}

// ── 2本指タップ ──
document.addEventListener('touchstart', e => {
  if(e.touches.length === 2)
    triggerEgg('egg_two_finger','🤞','二刀流','2本指で同時タップ！器用だね🤞');
}, {passive:true});

// ── 端末を回転させる（スマホ限定：デスクトップのリサイズでは発火しない） ──
window.addEventListener('orientationchange', () => {
  triggerEgg('egg_rotate','🔄','世界を回転させた','端末を回転させた！画面も回る🔄');
});

// ── タブを5秒以上離れて戻ってくる ──
let _visHiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  if(document.hidden) {
    _visHiddenAt = Date.now();
  } else if(_visHiddenAt && Date.now() - _visHiddenAt >= 5000) {
    triggerEgg('egg_afk','🚶','浮気者','タブを5秒以上離れて戻ってきた🚶');
  }
});

// ── オフラインで開く／オフラインになる ──
function _checkOffline() {
  if(!navigator.onLine) triggerEgg('egg_offline','📵','圏外の民','Hot Pot Spotが見つからない…📵');
}
window.addEventListener('offline', _checkOffline);
_checkOffline();

// ── 印刷しようとする ──
window.addEventListener('beforeprint', () => {
  triggerEgg('egg_print','🖨️','印刷魔','このクイズを印刷しようとした！？🖨️');
});

// ── 隠語をコピーする ──
document.addEventListener('copy', () => {
  triggerEgg('egg_copy','📋','コピペ勢','隠語をコピーした？友達に送る気だな📋');
});

// ── 実績画面を一番下までスクロール ──
window.addEventListener('scroll', () => {
  if(G.screen === 'achs' && window.innerHeight + window.scrollY >= document.body.scrollHeight - 10)
    triggerEgg('egg_scroll_bottom','📜','全部読んだ','実績を一番下までスクロールした📜');
}, {passive:true});

// ── ピンチズーム（対応ブラウザのみ） ──
if(window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    if(window.visualViewport.scale > 1.15)
      triggerEgg('egg_pinch','🔍','拡大鏡','画面をピンチズームした🔍');
  });
}

// ── ウィンドウを極端に小さくする ──
window.addEventListener('resize', () => {
  if(window.innerWidth < 340)
    triggerEgg('egg_tiny_window','🔬','極小ウィンドウ','画面幅340px未満…極限まで縮めた🔬');
});

// ── 右クリック（PC） ──
document.addEventListener('contextmenu', () => {
  triggerEgg('egg_rightclick','🖱️','右クリック探検家','右クリックしてみたね🖱️');
});
