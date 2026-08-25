function redactedHTML() {
  _checkAllRooms();
  return `
    <div class="redacted-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">🖤</span>
        <div style="font-size:0.52rem;color:#220000;letter-spacing:4px;margin-top:4px">TOP SECRET — REDACTED</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#661111;margin-top:6px">── 消された記録 ──</div>
      </div>

      <div class="redact-doc">
        <div style="color:#440000;font-size:0.62rem;margin-bottom:8px">機密ファイル #079 — シュピオニロ・ゴルビロ発動記録</div>
        対象者：<span class="redact-blk">████████</span><br>
        発動日：<span class="redact-blk">████年██月</span><br>
        理由　：<span class="redact-blk">██████████████████████</span><br>
        処置　：<span class="redact-blk">███████████████████</span><br><br>
        承認者：<span class="redact-blk">████████</span>（2名）<br>
        証人　：<span class="redact-blk">████</span><br>
        結果　：<span class="redact-blk">██████████の██████</span>
      </div>

      <div class="redact-doc">
        <div style="color:#330000;font-size:0.62rem;margin-bottom:8px">機密ファイル #002 — ラグランデへの通達</div>
        送信先：ラグランデ（<span class="redact-blk">██</span>名）<br>
        件名　：<span class="redact-blk">████████████████</span><br>
        本文　：<span class="redact-blk">████████████████████████████████</span><br>
        　　　　<span class="redact-blk">████████████████████</span><br>
        　　　　「079信号を受信したら<span class="redact-blk">████████</span>」<br><br>
        <span style="color:#220000;font-size:0.6rem">※ この通達は全員に届いたとされるが、内容を覚えている者はいない。</span>
      </div>

      <div class="redact-doc">
        <div style="color:#440000;font-size:0.62rem;margin-bottom:8px">機密ファイル #∞ — 最終記録</div>
        <span class="redact-blk">████████████████████████████████████████████████████████████████████████████████</span><br><br>
        唯一判読できる部分：<br>
        「…スパゲッティトイレッティで<span class="redact-blk">████</span>、その後…」<br>
        「…ポップポップポップサフールは<span class="redact-blk">████</span>では<span class="redact-blk">██</span>…」<br>
        「…ラヴァカは<span class="redact-blk">████</span>大丈夫。ロスラヴァカも<span class="redact-blk">██</span>…」<br><br>
        <span style="color:#1a0000;font-size:0.58rem">残りのページは存在しない。</span>
      </div>

      <button class="btn" style="background:transparent;border:1px solid #220000;color:#442222;font-size:0.78rem;margin-top:10px" onclick="G.screen='basement2';render()">← アーカイブへ戻る</button>
    </div>`;
}

function monitorHTML() {
  _checkAllRooms();
  const st = getStats();
  const unlCnt = Object.keys(getUnlocked()).length;
  const roomCnt = _visitedRooms.size;
  const playSec = Math.floor((st.totalPlaySec||0));
  const playMin = Math.floor(playSec/60);
  const nm = G.name || localStorage.getItem('pname') || '（名無し）';
  return `
    <div class="monitor-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">👁️</span>
        <div style="font-size:0.52rem;color:#004400;letter-spacing:4px;margin-top:4px">SURVEILLANCE LOG — ACTIVE</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#006600;margin-top:6px">── 監視ログ ──</div>
      </div>

      <div class="monitor-warn">
        警告：このファイルは自動生成されています。<br>
        対象：現在このデバイスを操作している者<br>
        状態：<span style="color:#00ff44">監視中</span><span class="signal-cursor">▋</span>
      </div>

      <div style="background:#001500;border:1px solid #003300;border-radius:8px;padding:14px;margin:10px 0">
        <div class="monitor-row"><span class="monitor-key">識別名</span><span class="monitor-val">${nm}</span></div>
        <div class="monitor-row"><span class="monitor-key">総プレイ回数</span><span class="monitor-val">${st.plays||0} 回</span></div>
        <div class="monitor-row"><span class="monitor-key">総正解数</span><span class="monitor-val">${st.correct||0} 問</span></div>
        <div class="monitor-row"><span class="monitor-key">累計プレイ時間</span><span class="monitor-val">${playMin} 分 ${playSec%60} 秒</span></div>
        <div class="monitor-row"><span class="monitor-key">最大連続正解</span><span class="monitor-val">${st.maxStreak||0} 問</span></div>
        <div class="monitor-row"><span class="monitor-key">解錠済み実績</span><span class="monitor-val">${unlCnt} / ${ACHS.length}</span></div>
        <div class="monitor-row"><span class="monitor-key">訪問済み部屋</span><span class="monitor-val">${roomCnt} 室</span></div>
        <div class="monitor-row" style="border-bottom:none"><span class="monitor-key">現在地</span><span class="monitor-val">監視ログ</span></div>
      </div>

      <div class="monitor-warn">
        上記のデータは全てlocalStorageに保存されています。<br>
        このデバイスを使う全員が閲覧可能です。<br>
        <span style="color:#336633;font-size:0.65rem">…怖いですか？これが現実です。</span>
      </div>

      <button class="btn" style="background:transparent;border:1px solid #003300;color:#334433;font-size:0.78rem;margin-top:8px" onclick="G.screen='basement3';render()">← 地下2階へ戻る</button>
    </div>`;
}

