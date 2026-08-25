// ══════════════════════════════════════════
//  小ネタ定数
// ══════════════════════════════════════════
const TAUNT_MSGS = [
  "それは違うやろ😂", "本当に？w", "君、大丈夫？",
  "これは流石に...", "もう一回最初からやり直し！", "え、まじで？",
  "うーん🤔 惜しくもない", "勉強不足ですよ〜",
  "ちょっと草生えた", "マジか〜！！",
  "これ間違えるの逆に難しくない？", "友達に教わり直せ😤",
  "そんな隠語知らなかった？ウケる", "ミャウル！（頑張れ！）",
  "ポップポップポップサフール💣", "Noooo my Hotspot...",
];
const JOKE_MEANINGS = [
  "知らない😅", "なんか違う🤷", "テキトー", "わかんない〜",
  "スパゲッティ？🍝", "雰囲気でイケる", "ぬぬ",
  "おそらく...", "なんとなくこれ", "絶対これ！(適当)",
  "Brr Brr？🤔", "うーん全部違くない？",
];
const FLAVOR_TEXTS = [
  "友達だけの秘密言語", "ヌビ二食べたい🍕", "Brr Brr... 🎵",
  "スパゲッティトイレッティ🚽", "Yes my HotSpot！",
  "今日もトララレロ トララへ🌊", "ポップポップポップサフール💣",
  "隠語、覚えてる？", "ティクタクティクタク⏰", "ガラマ全員集合🔥",
  "ラヴァカは地球のことだよ🌍", "ミャウル！！", "No my HotSpot...",
  "ウドンドン vs ウディンディン", "Hot Pot Spotに繋いで！📶",
];
const STREAK_CHEERS = {
  3:  '🔥 3連続！ノってきた！',
  5:  '🔥🔥 5連続！すごい！',
  7:  '🔥🔥🔥 7連続！天才かも',
  10: '💎 10連続！！天才すぎる！！',
  15: '🚀 15連続！もはや隠語の神',
  20: '👑 20連続！！！バケモノ！！！',
};
let _flavorIdx = Math.floor(Math.random() * FLAVOR_TEXTS.length);
let easterCount = 0;

function titleClick() {
  easterCount++;
  const p = document.getElementById('flavor-p');
  if(p) p.textContent = ['🥚','🐣','🥚🐣','🐣🥚','🥚🐣🥚'][Math.min(easterCount-1,4)] || FLAVOR_TEXTS[_flavorIdx];
  if(easterCount >= 10) { easterCount=0; unlockAch('easter'); G.screen='easter'; render(); }
  const now=Date.now();
  _logoClicks=_logoClicks.filter(t=>now-t<1000); _logoClicks.push(now);
  if(_logoClicks.length>=3){ _logoClicks=[]; triggerEgg('egg_logo3','🔓','解錠者','タイトルを1秒以内に3連打！🔓'); }
}

