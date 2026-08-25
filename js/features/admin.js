// ══════════════════════════════════════════
//  ADMIN BROADCAST
// ══════════════════════════════════════════
// 平文ではなくSHA-256ハッシュで保持(ソースを見てもパスワードが読めない)
// 変更したいときはブラウザのコンソールで下記を実行してハッシュを再生成し、貼り替える:
//   sha256Hex('新しいパスワード').then(console.log)
const ADMIN_PASS_HASH = '217f48d803c097b11f642556e277308663a2043af7d6815f95aa2785f07421e8';
let _adminAuthed = false;
let _lastAnnId   = null;
let _annActive   = false;
let _adminStatus = '';

async function pollAnnouncement() {
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/announcements?select=id,message&active=eq.true&order=created_at.desc&limit=1`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    if(!r.ok) return;
    const data = await r.json();
    if(data.length > 0) {
      const ann = data[0];
      if(ann.id !== _lastAnnId) {
        _lastAnnId = ann.id;
        _showAnnBanner(ann.message);
      }
    } else {
      _hideAnnBanner();
      _lastAnnId = null;
    }
  } catch(e) {}
}

function _showAnnBanner(msg) {
  const b = document.getElementById('ann-banner');
  const m = document.getElementById('ann-msg');
  if(!b || !m) return;
  m.textContent = msg;
  b.style.display = 'flex';
  _annActive = true;
  // バナー分だけ上パディングを追加してコンテンツが隠れないように
  document.body.style.paddingTop = '50px';
}

function _hideAnnBanner() {
  const b = document.getElementById('ann-banner');
  if(b) b.style.display = 'none';
  document.body.style.paddingTop = '';
  _annActive = false;
}

function dismissAnn() {
  _hideAnnBanner();
}

async function adminPost(msg) {
  if(!msg || !msg.trim()) return;
  _adminStatus = '送信中…';
  if(G.screen==='admin') render();
  try {
    // 既存のアクティブメッセージを全部オフ
    await fetch(`${SUPABASE_URL}/rest/v1/announcements?active=eq.true`, {
      method: 'PATCH',
      headers: { ..._SB_HDR(), 'Prefer': 'return=minimal' },
      body: JSON.stringify({ active: false })
    });
    // 新しいメッセージを投稿
    await fetch(`${SUPABASE_URL}/rest/v1/announcements`, {
      method: 'POST',
      headers: { ..._SB_HDR(), 'Prefer': 'return=minimal' },
      body: JSON.stringify({ message: msg.trim(), active: true })
    });
    _adminStatus = '✅ 送信完了！全員に表示されます';
    _lastAnnId = null; // 自分にも即反映させるため強制リセット
    await pollAnnouncement();
  } catch(e) {
    _adminStatus = '❌ エラーが発生しました';
  }
  if(G.screen==='admin') render();
}

async function adminClearAll() {
  _adminStatus = 'クリア中…';
  if(G.screen==='admin') render();
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/announcements?active=eq.true`, {
      method: 'PATCH',
      headers: { ..._SB_HDR(), 'Prefer': 'return=minimal' },
      body: JSON.stringify({ active: false })
    });
    _adminStatus = '🗑 全員のバナーを消しました';
    _hideAnnBanner();
    _lastAnnId = null;
  } catch(e) {
    _adminStatus = '❌ エラーが発生しました';
  }
  if(G.screen==='admin') render();
}

function goAdmin() { G.screen='admin'; render(); }

function adminHTML() {
  if(!_adminAuthed) return `
    <div class="admin-bg">
      <div style="text-align:center;margin-bottom:20px">
        <span style="font-size:2rem">🔐</span>
        <div style="font-size:1rem;font-weight:bold;color:#9944cc;margin-top:8px">管理者パネル</div>
        <div style="font-size:0.65rem;color:#443355;letter-spacing:2px;margin-top:3px">ADMIN ACCESS ONLY</div>
      </div>
      <div class="admin-label">パスワード</div>
      <input type="password" id="admin-pass-inp" class="admin-pass-inp" placeholder="••••••••••"
        onkeydown="if(event.key==='Enter')adminLogin()">
      <div id="admin-pass-err" style="color:#ff4466;font-size:0.78rem;margin-top:8px;text-align:center;min-height:18px"></div>
      <button class="admin-btn send" style="margin-top:14px" onclick="adminLogin()">🔓 ログイン</button>
      <button class="btn" style="background:transparent;border:1px solid #330044;color:#553366;font-size:0.8rem;margin-top:8px" onclick="goHome()">← 戻る</button>
    </div>`;

  const statusColor = _adminStatus.startsWith('✅') ? '#44cc88' : _adminStatus.startsWith('❌') ? '#ff4466' : '#556677';
  const goto = (s) => `G.screen='${s}';render()`;
  const navBtn = (s, icon, label) =>
    `<button onclick="${goto(s)}" style="padding:8px 6px;background:#0d0018;border:1px solid #330044;border-radius:8px;color:#7744aa;font-size:0.72rem;cursor:pointer;transition:all .15s;text-align:center"
      onmouseover="this.style.borderColor='#7722cc';this.style.color='#aa66ff'"
      onmouseout="this.style.borderColor='#330044';this.style.color='#7744aa'">${icon}<br><span style="font-size:0.62rem;color:#554466">${label}</span></button>`;
  return `
    <div class="admin-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.6rem">📡</span>
        <div style="font-size:1rem;font-weight:bold;color:#aa44ff;margin-top:6px">管理者パネル</div>
        <div style="font-size:0.62rem;color:#443355;letter-spacing:2px">BROADCAST CONTROL</div>
      </div>

      <div class="admin-label">メッセージを全員に送信</div>
      <textarea id="admin-msg-inp" class="admin-textarea" placeholder="例：今日は10問モードで遊ぼう！&#10;例：新しい単語を追加したよ👀"></textarea>
      <button class="admin-btn send" onclick="adminPost(document.getElementById('admin-msg-inp').value)">📢 全員に送信</button>
      <button class="admin-btn clear" onclick="adminClearAll()">🗑 バナーを全員から消す</button>
      <div class="admin-status" style="color:${statusColor}">${_adminStatus||'待機中'}</div>

      <div style="margin-top:14px;padding:10px;background:#0d0018;border:1px solid #330044;border-radius:10px;margin-bottom:14px">
        <div style="font-size:0.68rem;color:#553366;margin-bottom:4px">配信状態</div>
        <div style="font-size:0.8rem;color:${_annActive?'#aa44ff':'#443355'}">
          ${_annActive ? '🟣 配信中 — '+document.getElementById('ann-msg')?.textContent : '⚫ 配信なし'}
        </div>
      </div>

      <div class="admin-label">通常画面</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
        ${navBtn('home',     '🏠', 'ホーム')}
        ${navBtn('stats',    '📊', '統計')}
        ${navBtn('achs',     '🎖', '実績')}
        ${navBtn('settings', '⚙️', '設定')}
        ${navBtn('ranking',  '🏆', 'ランキング')}
        ${navBtn('easter',   '🥚', 'イースター')}
      </div>

      <div class="admin-label">隠し部屋</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px">
        ${navBtn('basement',  '🚪', '地下室')}
        ${navBtn('basement2', '📂', '地下1F')}
        ${navBtn('basement3', '🕯️', '地下2F')}
        ${navBtn('moon',      '🌙', '月図書館')}
        ${navBtn('origin',    '📜', '起源')}
        ${navBtn('founders',  '🏛️', '創設者')}
        ${navBtn('redacted',  '🖤', '機密')}
        ${navBtn('monitor',   '👁️', '監視')}
        ${navBtn('archive_c', '💾', '消去F')}
        ${navBtn('void',      '🌑', '虚無')}
        ${navBtn('shadow',    '👤', '影')}
        ${navBtn('garden',    '🌸', '庭')}
        ${navBtn('debug',     '💻', 'デバッグ')}
        ${navBtn('radio',     '📻', 'ラジオ')}
        ${navBtn('signal',    '📡', '信号')}
        ${navBtn('lab',       '🧪', '実験室')}
        ${navBtn('mirror',    '🪞', '鏡')}
        ${navBtn('zero_room', '🕳️', '零の部屋')}
        ${navBtn('final',     '🌑', '真実')}
      </div>

      <button class="btn" style="background:transparent;border:1px solid #330044;color:#553366;font-size:0.8rem" onclick="_adminAuthed=false;goHome()">← ログアウト</button>
    </div>`;
}

async function adminLogin() {
  const v = document.getElementById('admin-pass-inp')?.value || '';
  const hash = await sha256Hex(v);
  if(hash === ADMIN_PASS_HASH) {
    _adminAuthed = true;
    _adminStatus = '';
    render();
  } else {
    const e = document.getElementById('admin-pass-err');
    if(e) e.textContent = 'パスワードが違います';
  }
}

// 3秒ごとにポーリング開始
setInterval(pollAnnouncement, 3000);
pollAnnouncement(); // 初回即実行

