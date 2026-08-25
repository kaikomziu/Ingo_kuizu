// ══════════════════════════════════════════
//  イースターエッグ ストーリー拡張
//  「ジブラ・ジブラの正体」→「暗号解読」→「エピローグ」
// ══════════════════════════════════════════
function goMysteryPerson() {
  triggerEgg('egg_mystery_person','🕵️','謎の調査員','ジブラ・ジブラの正体ファイルに触れた🕵️');
  G.screen='mystery_person'; _visitedRooms.add('mystery_person'); render(); _checkAllRooms();
}

function goCipher() {
  triggerEgg('egg_cipher','📡','解読の糸口','67からの暗号を受信した📡');
  _cipherStep = 0;
  G.screen='cipher'; _visitedRooms.add('cipher'); render(); _checkAllRooms();
}

function cipherAnswer(meaning) {
  if(_cipherStep >= 3) return;
  if(meaning === '頑張れ') {
    _cipherStep++;
    if(_cipherStep >= 3) triggerEgg('egg_cipher_solved','🔓','解読完了','ミャウルの暗号を解読した🔓');
  }
  if(G.screen==='cipher') render();
}

function goEpilogue() {
  triggerEgg('egg_epilogue','🌟','それでも続く物語','隠された真実の、さらに先を見た🌟');
  G.screen='epilogue'; render();
}
