// ══════════════════════════════════════════
//  CONFIRM MODAL
// ══════════════════════════════════════════
function showConfirm(msg, cb, force=false, icon='❓') {
  const cfg = getSettings();
  if (!cfg.confirm && !force) { cb(); return; }
  document.getElementById('modal-icon').textContent  = icon;
  document.getElementById('modal-msg').textContent   = msg;
  document.getElementById('modal-yes').onclick = () => { closeModal(); cb(); };
  document.getElementById('modal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
  _modalCancelCount++;
  if(_modalCancelCount >= 7) { _modalCancelCount = 0; triggerEgg('egg_modal7','🔄','モーダル連打','確認ダイアログを7回キャンセル🔄'); }
}

function resetStats() { showConfirm('統計データを全て削除します。\nこの操作は元に戻せません！', ()=>{ localStorage.removeItem('stats'); render(); }, true, '⚠️'); }
function resetAchs()  { showConfirm('実績データを全て削除します。\nこの操作は元に戻せません！', ()=>{ localStorage.removeItem('ach'); render(); }, true, '⚠️'); }
function resetAll()   { showConfirm('全てのデータを削除します。\nこの操作は絶対に元に戻せません！', ()=>{ ['stats','ach','pname','cfg'].forEach(k=>localStorage.removeItem(k)); G.name=''; render(); }, true, '☠️'); }

