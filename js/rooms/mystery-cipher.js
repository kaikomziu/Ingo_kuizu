function mysteryPersonHTML() {
  _checkAllRooms();
  return `
    <div class="mystery-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">🕵️</span>
        <div style="font-size:0.52rem;color:#330055;letter-spacing:4px;margin-top:4px">UNSOLVED CASE FILE</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#aa66cc;margin-top:6px">── ジブラ・ジブラの正体 ──</div>
      </div>

      <div style="font-size:0.7rem;color:#8866aa;line-height:2.2;margin-bottom:16px;text-align:left;border-left:2px solid #440066;padding-left:12px">
        SIBAKO語には「ジブラ・ジブラ」という単語がある。<br>
        意味は「しょうま」。<br>
        <span style="color:#664488">…「しょうま」とは、何なのか。</span>
      </div>

      <div style="font-size:0.7rem;color:#8866aa;text-align:left;margin-bottom:4px">📁 調査記録 #1「有力な仮説」</div>
      <div class="b2-doc">
        <span style="color:#aa66cc">仮説A：</span>家族の誰かの呼び名の一種<br>
        <span style="color:#665577;font-size:0.65rem">→ 該当する人物は見つかっていない</span><br><br>
        <span style="color:#aa66cc">仮説B：</span>意味を持たない、音だけの単語<br>
        <span style="color:#665577;font-size:0.65rem">→ 創始者はそう主張しているが、様子がおかしい</span><br><br>
        <span style="color:#aa66cc">仮説C：</span>誰かをからかうために作られた架空の存在<br>
        <span style="color:#665577;font-size:0.65rem">→ 最も有力。ただし証拠はない</span>
      </div>

      <div style="font-size:0.7rem;color:#8866aa;text-align:left;margin-bottom:4px;margin-top:12px">📁 調査記録 #2「関連する目撃情報」</div>
      <div class="b2-doc">
        <span style="color:#aa66cc">SIBAKO放送局 秘密チャンネルより：</span><br>
        「ジブラ・ジブラ（しょうま）の正体についての<br>
        　調査は継続中。意味は未だ解読不能。」<br><br>
        <span style="color:#665577;font-size:0.65rem">同時刻、67（ゆき）から暗号信号が届いていたことが判明。</span><br>
        <span style="color:#665577;font-size:0.65rem">「ミャウル ミャウル ミャウル」という3回の反復。</span><br>
        <span style="color:#aa66cc;font-size:0.68rem">…この2つは、無関係なのだろうか？</span>
      </div>

      <div style="font-size:0.62rem;color:#553377;text-align:center;margin:14px 0;line-height:2.2">
        法則Ⅲ「記録するな。記憶せよ。」のせいで<br>
        これ以上の記録は、この地下室のどこにも存在しない。
      </div>

      <button onclick="goCipher()"
        style="display:block;width:100%;padding:13px;background:#0d0018;border:2px solid #440066;border-radius:12px;color:#aa66cc;font-size:0.88rem;font-weight:bold;cursor:pointer;margin-bottom:10px;transition:all .2s"
        onmouseover="this.style.borderColor='#8800cc'" onmouseout="this.style.borderColor='#440066'">
        📡 67からの暗号信号を調べる
      </button>
      <button class="btn" style="background:transparent;border:1px solid #330044;color:#664488;font-size:0.8rem" onclick="G.screen='redacted';render()">← 機密ファイル室へ戻る</button>
    </div>`;
}

function cipherHTML() {
  _checkAllRooms();
  const step = _cipherStep;
  const solved = step >= 3;
  const dots = Array.from({length:3},(_,i)=>`<span class="cipher-dot${i<step?' on':''}"></span>`).join('');
  const options = shuffle(['頑張れ','猫の鳴き声','さようなら','助けて']);
  return `
    <div class="cipher-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">📡</span>
        <div style="font-size:0.52rem;color:#003322;letter-spacing:4px;margin-top:4px">SIGNAL DECRYPTION — 67</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#22cc99;margin-top:6px">── 暗号解読室 ──</div>
      </div>

      <div style="font-size:0.7rem;color:#448877;line-height:2.2;margin-bottom:14px;text-align:left;border-left:2px solid #005533;padding-left:12px">
        67（ゆき）から届いた最後の信号。<br>
        「ミャウル ミャウル ミャウル」<br>
        <span style="color:#336655">3回、同じ言葉が繰り返されている。</span>
      </div>

      <div style="background:#000f0a;border:1px solid #003322;border-radius:8px;padding:14px;margin-bottom:14px;text-align:center">
        <div style="font-size:1.1rem;font-weight:bold;color:#22ffbb;letter-spacing:2px">ミャウル</div>
        <div style="font-size:0.6rem;color:#337755;margin-top:6px">この単語の意味を、あなたはもう知っているはずだ。</div>
      </div>

      <div style="text-align:center;margin-bottom:10px">${dots}</div>

      ${solved ? `
        <div style="font-size:0.8rem;color:#22ddaa;text-align:center;padding:14px;border:1px solid #005533;border-radius:10px;margin-bottom:14px;line-height:2">
          ✅ <span style="color:#33eebb">解読完了</span><br>
          「頑張れ 頑張れ 頑張れ」<br>
          <span style="font-size:0.68rem;color:#448877">67は、ただ応援していただけだった。</span>
        </div>
        <button onclick="goEpilogue()"
          style="display:block;width:100%;padding:12px;background:#000f0a;border:2px solid #007755;border-radius:12px;color:#22ddaa;font-size:0.85rem;font-weight:bold;cursor:pointer;margin-bottom:10px"
          onmouseover="this.style.borderColor='#00cc88'" onmouseout="this.style.borderColor='#007755'">
          🌟 その先を見る
        </button>
      ` : `
        <div style="font-size:0.65rem;color:#337755;text-align:center;margin-bottom:8px">「ミャウル」の意味を選べ。3回連続で選べば解読完了。</div>
        <div>${options.map(o=>`<button class="cipher-choice" onclick="cipherAnswer('${esc(o)}')">${o}</button>`).join('')}</div>
      `}

      <button class="btn" style="background:transparent;border:1px solid #003322;color:#336655;font-size:0.8rem;margin-top:8px" onclick="goMysteryPerson()">← 調査ファイルへ戻る</button>
    </div>`;
}
