function fileInfinityHTML() {
  _checkAllRooms();
  return `
    <div class="archive-c-bg">
      <div style="text-align:center;margin-bottom:14px">
        <span style="font-size:1.5rem">🗝️</span>
        <div style="font-size:0.52rem;color:#1a1a1a;letter-spacing:4px;margin-top:4px">FILE_∞.txt — RECOVERED</div>
        <div style="font-size:0.95rem;font-weight:bold;color:#556688;margin-top:6px">── このゲームの本当の目的 ──</div>
      </div>

      <div class="archive-c-file">
        <div style="color:#222;font-size:0.62rem;margin-bottom:8px">RECOVERY LOG — FILE_∞.txt</div>
        <span style="color:#334455">「消せない」と思われていたファイルが、</span><br>
        <span style="color:#445577">実は一つだけ、どこにも消えずに残っていた。</span><br>
        <span style="color:#556699;font-size:0.65rem">（法則Ⅲ「記録するな。記憶せよ。」の唯一の例外）</span>
      </div>

      <div class="archive-c-file">
        <div style="color:#1a1a1a;font-size:0.62rem;margin-bottom:8px">本文（全文復元）</div>
        <span style="color:#334455">「このゲームの本当の目的？　実は単純だ。</span><br>
        <span style="color:#445577">誰かと二人だけの言葉を持つこと。</span><br>
        <span style="color:#556699">それだけで、世界は少しだけ特別になる。</span><br><br>
        <span style="color:#334455">隠語は、遊びだった。同時に、絆の記録でもあった。</span><br>
        <span style="color:#445577">079も、ヌビ二も、スパゲッティトイレッティも、</span><br>
        <span style="color:#556699">意味なんてなんでもよかった。大事なのは、</span><br>
        <span style="color:#6677aa">『二人（それ以上）だけが知っている』ということだった。」</span>
      </div>

      <div class="archive-c-file">
        <div style="color:#1a1a1a;font-size:0.62rem;margin-bottom:8px">追記（消えかけの文字）</div>
        <span style="color:#334455">「ドビドビ」だけ、思い出せた。</span><br>
        <span style="color:#445577">意味は──「おやすみ」。</span><br>
        <span style="color:#556699;font-size:0.65rem">他の失われた言葉（ゾンビン・ランラン・テテパニ・バボバボ・ムルムル）は、<br>
        本当にもう、誰の記憶にもない。それでいいんだと思う。</span>
      </div>

      <div style="font-size:0.62rem;color:#334455;text-align:center;margin:14px 0;line-height:2.4">
        このファイルを見つけたということは──<br>
        あなたにも、誰かと二人だけの言葉があるのかもしれない。
      </div>

      <button class="btn" style="background:transparent;border:1px solid #222244;color:#445566;font-size:0.78rem" onclick="G.screen='archive_c';render()">← 消去ファイル一覧へ戻る</button>
    </div>`;
}
