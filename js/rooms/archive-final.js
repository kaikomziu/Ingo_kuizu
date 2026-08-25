function archiveCHTML() {
  _checkAllRooms();
  return `
    <div class="archive-c-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">💾</span>
        <div style="font-size:0.52rem;color:#1a1a1a;letter-spacing:4px;margin-top:4px">FILE RECOVERY SYSTEM v0.1</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#333333;margin-top:6px">── 消去ファイル ──</div>
      </div>

      <div class="archive-c-file">
        <div style="color:#222;font-size:0.62rem;margin-bottom:8px">RECOVERY LOG — 削除されたファイル一覧</div>
        <div style="color:#2a2a2a">FILE_001.txt — <span class="archive-c-del">名前：████ / 日付：████年</span> [DELETED]</div>
        <div style="color:#252525">FILE_002.txt — <span class="archive-c-del">内容：最初の079使用記録</span> [DELETED]</div>
        <div style="color:#222222">FILE_003.txt — <span class="archive-c-del">シュピオニロ・ゴルビロ #001 詳細</span> [DELETED]</div>
        <div style="color:#1f1f1f">FILE_004.txt — <span class="archive-c-del">ラグランデ宛通達 全文</span> [DELETED]</div>
        <div style="color:#1c1c1c">FILE_005.txt — <span class="archive-c-del">創設者Aの最後のメモ</span> [DELETED]</div>
        <div style="color:#191919">FILE_006.txt — <span class="archive-c-del">███████████████</span> [DELETED]</div>
        <div style="color:#161616">FILE_∞.txt — <span class="archive-c-del">このゲームの本当の目的</span> [DELETED]</div>
      </div>

      <div class="archive-c-file">
        <div style="color:#1a1a1a;font-size:0.62rem;margin-bottom:8px">PARTIAL RECOVERY — 断片復元</div>
        FILE_005.txt より（部分復元）：<br>
        <span style="color:#222">「…ヌビ二を食べながら、</span><br>
        <span style="color:#1e1e1e">思ったんだ。言葉って不思議だって。</span><br>
        <span style="color:#1a1a1a">同じものを見て、</span><br>
        <span style="color:#161616">違う言葉で呼んでいるだけで、</span><br>
        <span style="color:#131313">こんなに楽しくなれるなんて。</span><br>
        <span style="color:#0f0f0f">俺はそれで十分だった。…」</span><br>
        <span style="color:#0a0a0a;font-size:0.6rem">（以降は復元不可）</span>
      </div>

      <div style="font-size:0.6rem;color:#111;text-align:center;margin:12px 0;line-height:2.5">
        これらのファイルは意図的に削除されました。<br>
        <span style="color:#0a0a0a">誰が削除したかは、もうわかりません。</span>
      </div>

      <button onclick="goFileInfinity()"
        style="display:block;width:100%;padding:12px;background:#0d0d0d;border:2px solid #333333;border-radius:12px;color:#888888;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-bottom:10px;transition:all .2s"
        onmouseover="this.style.borderColor='#666666';this.style.color='#bbbbbb'"
        onmouseout="this.style.borderColor='#333333';this.style.color='#888888'">
        🗝️ FILE_∞.txt を復元する…
      </button>
      <button class="btn" style="background:transparent;border:1px solid #151515;color:#222222;font-size:0.78rem" onclick="G.screen='basement3';render()">← 地下2階へ戻る</button>
    </div>`;
}

function finalHTML() {
  const u = getUnlocked();
  const epilogueReady = !!(u['egg_mystery_person'] && u['egg_cipher_solved']);
  return `
    <div class="final-bg">
      <div class="final-seal">🌑</div>
      <div class="final-title">── 真実 ──</div>

      <div class="final-text">
        全ての部屋を訪れたあなたへ。<br><br>

        本当にここまで来たんだね。<br>
        地下室も、影の部屋も、消されたファイルも、<br>
        全部見てしまったんだね。<br><br>

        SIBAKOの「真実」を話そう。<br><br>

        <span style="color:#556688">これは最初から「ゲーム」だった。</span><br>
        言語も、地下室も、機密ファイルも、全部。<br>
        でも——<br><br>

        <span style="color:#6677aa">あなたが費やした時間は、本物だった。</span><br>
        <span style="color:#7788bb">あなたが覚えた言葉は、本物だった。</span><br>
        <span style="color:#8899cc">あなたがここに存在したことは、本物だった。</span><br><br>

        <span style="color:#99aad4">079はおならの音に似てるから選ばれた。</span><br>
        <span style="color:#aabbd8">ヌビ二はなんとなく「ピザっぽい」から。</span><br>
        <span style="color:#bccce0">Brr Brr Patapimは誰かの口癖から。</span><br><br>

        それだけの理由で生まれた言葉たちが、<br>
        今あなたの記憶の中にある。<br><br>

        <span style="color:#ccddee">それで十分だと思う。</span>
      </div>

      <div style="border:1px solid #222244;border-radius:10px;padding:14px;margin:10px 0;font-size:0.68rem;color:#334455;text-align:center;line-height:2.5">
        SIBAKO Ver ∞<br>
        全ての謎を解いた探偵へ<br>
        <span style="color:#2a3344">— スビニィナボンバルディロより —</span>
      </div>

      ${epilogueReady ? `
        <button onclick="goEpilogue()"
          style="display:block;width:100%;padding:12px;background:#0a0a20;border:2px solid #333366;border-radius:12px;color:#8899dd;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-top:6px;margin-bottom:8px;transition:all .2s"
          onmouseover="this.style.borderColor='#6666aa'" onmouseout="this.style.borderColor='#333366'">
          🌟 まだ何かある気がする…
        </button>` : ''}
      <button class="btn" style="background:#050510;border:1px solid #222244;color:#445566;font-size:0.82rem;margin-top:8px" onclick="goHome()">← 地上に戻る</button>
    </div>`;
}

