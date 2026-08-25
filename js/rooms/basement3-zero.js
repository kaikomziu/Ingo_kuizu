function basement3HTML() {
  return `
    <div class="basement-bg" style="background:#040004;border-color:#1a001a">
      <div style="font-size:0.52rem;color:#330033;letter-spacing:4px;margin-bottom:6px">B2F — 最深部</div>
      <div style="font-size:1rem;font-weight:bold;color:#880088;margin-bottom:16px">── 地下2階 ──</div>

      <div style="font-size:0.68rem;color:#662266;text-align:left;border-left:2px solid #440044;padding-left:10px;margin-bottom:16px;line-height:2.3">
        ここまで来るとは思わなかった。<br>
        本当に来てしまったのか。<br>
        <span style="color:#551155">…まあ、ようこそ。</span>
      </div>

      <div class="b2-doc">
        <div style="color:#770077;font-size:0.8rem;margin-bottom:10px">── 門外不出の記録 ──</div>
        <div style="color:#664466">創始者「スビニィナボンバルディロ」の3つの法則：</div>
        <div style="color:#553355;padding-left:8px;margin-top:6px">Ⅰ.「誰も意味を知らない言葉を使え」</div>
        <div style="color:#553355;padding-left:8px">&nbsp;&nbsp;→ 意味がわからなければ盗聴できない。</div>
        <div style="color:#553355;padding-left:8px;margin-top:6px">Ⅱ.「意味はいつでも変えることができる」</div>
        <div style="color:#553355;padding-left:8px">&nbsp;&nbsp;→ 柔軟性こそが秘密言語の命。</div>
        <div style="color:#553355;padding-left:8px;margin-top:6px">Ⅲ.「記録するな。記憶せよ。」</div>
        <div style="color:#553355;padding-left:8px">&nbsp;&nbsp;→ 記録が残れば、いつか誰かに見つかる。</div>
        <div style="color:#440044;font-size:0.6rem;margin-top:10px">※ この文書は法則Ⅲに違反して作られた</div>
      </div>

      <div class="b2-doc" style="margin-top:12px">
        <div style="color:#770077;font-size:0.8rem;margin-bottom:10px">── 失われた言葉たち ──</div>
        <div style="color:#553355;font-size:0.65rem;margin-bottom:8px">かつて使われ、今は誰も意味を覚えていない単語。</div>
        <div>「ドビドビ」= <span class="b2-redact">███████████</span></div>
        <div>「ゾンビン」= <span class="b2-redact">███████████</span></div>
        <div>「ランラン」= <span class="b2-redact">███████████</span></div>
        <div>「テテパニ」= <span class="b2-redact">███████████</span></div>
        <div>「バボバボ」= <span class="b2-redact">███████████</span></div>
        <div>「ムルムル」= <span class="b2-redact">███████████</span></div>
        <div style="color:#441144;font-size:0.6rem;margin-top:10px">※ 記録者が法則Ⅲを守りすぎたため、意味は永久に不明。</div>
        <div style="color:#330033;font-size:0.58rem">これらの言葉は今も、誰かの記憶の中に生きているかもしれない。</div>
      </div>

      <div class="b2-doc" style="margin-top:12px">
        <div style="color:#770077;font-size:0.8rem;margin-bottom:10px">── このゲームについて ──</div>
        <div style="color:#664466;line-height:2.2">
          このゲームは実在する家族の隠語を<br>
          元に作られています。<br>
          全${vocab.length}単語は全て本物の隠語です。<br>
          <span style="color:#553355">あなたが今覚えた言葉たちは、</span><br>
          <span style="color:#553355">どこかの家族の秘密の言葉です。</span><br>
          <span style="color:#440044;font-size:0.65rem">大切に使ってください。</span>
        </div>
      </div>

      <div style="font-size:0.65rem;color:#441144;border:1px solid #220022;border-radius:8px;padding:14px;margin:14px 0;line-height:2.5;text-align:center">
        ここまで読んでくれてありがとう。<br>
        <span style="color:#662266">あなたは今、このゲームの全てを知った。</span><br>
        <span style="color:#553355">おかえりなさい。隠語の世界へ。</span><br>
        <span style="font-size:0.55rem;color:#330033">— スビニィナボンバルディロより —</span>
      </div>

      <button onclick="goMoon()"
        style="display:block;width:100%;padding:12px;background:#050510;border:2px solid #222255;border-radius:12px;color:#6666cc;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-bottom:8px;transition:all .3s"
        onmouseover="this.style.borderColor='#4444aa';this.style.color='#9999ff'"
        onmouseout="this.style.borderColor='#222255';this.style.color='#6666cc'">
        🌙 月の図書館へ（最奥部）
      </button>

      <div style="border-top:1px solid #1a001a;padding-top:12px;margin-top:4px">
        <div style="font-size:0.55rem;color:#220022;letter-spacing:2px;margin-bottom:8px">機密エリア</div>
        <button onclick="G.screen='monitor';triggerEgg('egg_monitor','👁️','監視されていた','全てのデータは記録されていた👁️');render()"
          style="display:block;width:100%;padding:10px;background:#000a00;border:1px solid #003300;border-radius:10px;color:#224422;font-size:0.78rem;cursor:pointer;margin-bottom:6px;text-align:left;transition:all .2s"
          onmouseover="this.style.borderColor='#005500'" onmouseout="this.style.borderColor='#003300'">
          👁️ 監視ログ — あなたの記録
        </button>
        <button onclick="G.screen='archive_c';triggerEgg('egg_archive_c','💾','消去ファイル復元','削除された記録を見てしまった💾');render()"
          style="display:block;width:100%;padding:10px;background:#010101;border:1px solid #151515;border-radius:10px;color:#333333;font-size:0.78rem;cursor:pointer;margin-bottom:6px;text-align:left;transition:all .2s"
          onmouseover="this.style.borderColor='#333333'" onmouseout="this.style.borderColor='#151515'">
          💾 消去ファイル — 削除された記録
        </button>
      </div>

      <button class="btn" style="background:#110011;border:1px solid #330033;color:#660066;margin-bottom:8px" onclick="G.screen='basement2';render()">↑ 地下1階アーカイブへ戻る</button>
      <button class="btn" style="background:transparent;border:none;color:#220022;font-size:0.72rem" onclick="goHome()">地上へ帰る</button>
    </div>
  `;
}

function zeroRoomHTML() {
  return `
    <div class="zero-room">
      <div style="font-size:4rem;opacity:.08;margin-bottom:12px;animation:pulse 3s infinite">0</div>
      <div style="font-size:0.95rem;font-weight:bold;color:#2a2a2a;margin-bottom:12px">─ 零の部屋 ─</div>
      <div style="font-size:0.78rem;color:#252525;line-height:2.5;margin-bottom:24px">
        全問ハズレ。<br>
        <span style="color:#1e1e1e">それもまた、ひとつの記録。</span><br>
        <span style="color:#181818;font-size:0.7rem">この部屋は全問ハズレの者だけが来られる。</span><br>
        <span style="color:#111;font-size:0.65rem">誇っていい。ある意味で完璧だ。</span><br>
        <span style="font-size:0.55rem;color:#0a0a0a">0/0 = undefined… でも君は来た。</span>
      </div>
      <div style="font-size:0.6rem;color:#1a1a1a;margin-bottom:24px">
        記録：全問ハズレ達成者のみ入室可
      </div>
      <button class="btn" style="opacity:.35;font-size:0.8rem;background:#111" onclick="startGame(true)">もう一度（今度は正解して）</button>
      <button class="btn out" style="opacity:.2;font-size:0.75rem;margin-top:8px" onclick="goHome()">戻る</button>
    </div>
  `;
}
