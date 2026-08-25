function settingsHTML() {
  const cfg=getSettings();
  const tog=(key,val)=>`<label class="tog">
    <input type="checkbox" ${val?'checked':''} onchange="setSetting('${key}',this.checked)">
    <span class="tog-sl"></span>
  </label>`;
  const accentColors = [
    {id:'red',    label:'🔴', name:'レッド'},
    {id:'blue',   label:'🔵', name:'ブルー'},
    {id:'green',  label:'🟢', name:'グリーン'},
    {id:'purple', label:'🟣', name:'パープル'},
    {id:'orange', label:'🟠', name:'オレンジ'},
  ];
  return `
    <button class="back" onclick="goHome()">← 戻る</button>
    <div style="font-size:1.05rem;font-weight:bold;margin-bottom:16px">⚙️ 設定</div>

    <div class="sec-lbl">表示</div>
    <div class="set-section">
      <div class="set-row">
        <div><div class="set-name">確認ダイアログ</div><div class="set-desc">選択肢を押したとき「本当に？」を表示</div></div>
        ${tog('confirm',cfg.confirm)}
      </div>
      <div class="set-row">
        <div><div class="set-name">タイマー表示</div><div class="set-desc">クイズ中に経過時間を表示</div></div>
        ${tog('timer',cfg.timer)}
      </div>
      <div class="set-row">
        <div><div class="set-name">ストリーク表示</div><div class="set-desc">連続正解中のコンボカウントを表示</div></div>
        ${tog('streak',cfg.streak)}
      </div>
      <div class="set-row">
        <div><div class="set-name">カテゴリバッジ</div><div class="set-desc">問題の種類（人物・場所など）を表示</div></div>
        ${tog('catBadge',cfg.catBadge)}
      </div>
      <div class="set-row">
        <div><div class="set-name">煽り文言</div><div class="set-desc">不正解のとき面白い煽りを表示（OFFで静かに不正解）</div></div>
        ${tog('taunt',cfg.taunt)}
      </div>
    </div>

    <div class="sec-lbl">ゲーム</div>
    <div class="set-section">
      <div class="set-row">
        <div><div class="set-name">選択肢の数</div><div class="set-desc">2択は簡単・4択はやりごたえあり（ハードは常に6択）</div></div>
        <div class="seg">
          <button class="seg-btn${cfg.choices===2?' on':''}" onclick="setSetting('choices',2)">2択</button>
          <button class="seg-btn${cfg.choices===4?' on':''}" onclick="setSetting('choices',4)">4択</button>
        </div>
      </div>
      <div class="set-row">
        <div><div class="set-name">自動次へ</div><div class="set-desc">正解したら0.7秒後に自動で次の問題へ</div></div>
        ${tog('autoNext',cfg.autoNext)}
      </div>
    </div>

    <div class="sec-lbl">見た目</div>
    <div class="set-section">
      <div class="set-row">
        <div><div class="set-name">問題文サイズ</div><div class="set-desc">問題の文字を大きくする（スマホ向け）</div></div>
        <div class="seg">
          <button class="seg-btn${cfg.fontSize==='normal'?' on':''}" onclick="setSetting('fontSize','normal')">標準</button>
          <button class="seg-btn${cfg.fontSize==='large'?' on':''}" onclick="setSetting('fontSize','large')">大きめ</button>
        </div>
      </div>
      <div class="set-row" style="flex-wrap:wrap;gap:10px">
        <div style="width:100%"><div class="set-name">背景テーマ</div><div class="set-desc">アプリの背景・カードの色を変更</div></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${[{id:'dark',label:'🌑',name:'ダーク'},{id:'light',label:'☀️',name:'ライト'},{id:'sakura',label:'🌸',name:'サクラ'},{id:'ocean',label:'🌊',name:'オーシャン'},{id:'forest',label:'🌲',name:'フォレスト'}].map(t=>`
            <button onclick="setSetting('theme','${t.id}')"
              style="padding:6px 12px;border-radius:10px;border:2px solid ${cfg.theme===t.id?'var(--ac)':'transparent'};background:var(--card2);cursor:pointer;font-size:0.85rem;color:var(--txt);transition:all .15s">
              ${t.label} ${t.name}
            </button>`).join('')}
        </div>
      </div>
      <div class="set-row" style="flex-wrap:wrap;gap:10px">
        <div style="width:100%"><div class="set-name">アクセントカラー</div><div class="set-desc">ボタン・ハイライトの色を変更</div></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${accentColors.map(a=>`
            <button onclick="setSetting('accent','${a.id}')"
              style="padding:6px 12px;border-radius:10px;border:2px solid ${cfg.accent===a.id?'var(--ac)':'transparent'};background:var(--card2);cursor:pointer;font-size:0.85rem;color:var(--txt);transition:all .15s">
              ${a.label} ${a.name}
            </button>`).join('')}
        </div>
      </div>
    </div>

    <div class="sec-lbl">言語（出題カテゴリ）</div>
    <div class="set-section">
      <div class="set-row" style="flex-wrap:wrap;gap:10px">
        <div style="width:100%"><div class="set-name">出題するカテゴリ</div><div class="set-desc">OFFにしたカテゴリは出題されません（最低1つ必要）</div></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;padding:6px 0">
          ${Object.entries(CAT_COLORS).map(([cat,col])=>{
            const on=(cfg.cats||[]).includes(cat);
            return `<button onclick="toggleCat('${cat}')"
              style="padding:7px 13px;border-radius:10px;border:2px solid ${on?col:'transparent'};background:${on?col+'22':'var(--card2)'};cursor:pointer;font-size:0.82rem;color:${on?col:'var(--txt2)'};font-weight:${on?'bold':'normal'};transition:all .2s">
              ${cat}
            </button>`;
          }).join('')}
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;padding:4px 0 8px">
        <button class="btn sec" style="width:auto;padding:7px 16px;font-size:0.8rem;margin-top:0"
          onclick="setSetting('cats',${JSON.stringify(Object.keys(CAT_COLORS))})">全て選択</button>
      </div>
    </div>

    <div onclick="triggerEgg('egg_gh_settings','🫥','設定の亡霊','本当の設定はもっと深くに👻')" class="ghost-link">本当の設定はここにある...</div>
    <div class="sec-lbl">データ</div>
    <div class="danger-zone">
      <div class="danger-title">⚠ 危険ゾーン　取り消せません</div>
      <button class="btn danger" onclick="resetStats()">📊 統計をリセット</button>
      <button class="btn danger" onclick="resetAchs()">🎖 実績をリセット</button>
      <hr style="border-color:#3a1010;margin:10px 0">
      <button class="btn danger" style="opacity:.75" onclick="resetAll()">☠️ 全データをリセット</button>
    </div>

    <div style="margin-top:20px;text-align:center">
      <button onclick="goAdmin()"
        style="background:none;border:1px solid #2a1a3a;border-radius:10px;color:#443355;font-size:0.72rem;padding:8px 18px;cursor:pointer;transition:all .2s"
        onmouseover="this.style.borderColor='#6633aa';this.style.color='#8855cc'"
        onmouseout="this.style.borderColor='#2a1a3a';this.style.color='#443355'">
        🔐 管理者パネル
      </button>
    </div>
  `;
}

