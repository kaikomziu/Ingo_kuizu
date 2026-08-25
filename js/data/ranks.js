// ══════════════════════════════════════════
//  RANKS
// ══════════════════════════════════════════
const RANKS = [
  { name:"🔰 ルーキー",   min:0    },
  { name:"🥉 ブロンズ",   min:50   },
  { name:"🥈 シルバー",   min:200  },
  { name:"🥇 ゴールド",   min:500  },
  { name:"💠 プラチナ",   min:1000 },
  { name:"🌟 レジェンド", min:2500 },
];
function getRank(n)      { let r=RANKS[0]; for(const x of RANKS) if(n>=x.min) r=x; return r; }
function getNextRank(n)  { for(const x of RANKS) if(n<x.min) return x; return null; }
function getRankBelow(t) { let p=RANKS[0]; for(const r of RANKS){ if(r.min>=t.min) return p; p=r; } return p; }

