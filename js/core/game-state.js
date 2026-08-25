// ══════════════════════════════════════════
//  GAME STATE
// ══════════════════════════════════════════
const G = {
  screen:'home', mode:'normal', selNum:10,
  name: getName(),
  qs:[], cur:0, res:[], answered:false,
  streak:0, maxStreak:0, elapsedSec:0,
  startTime:null, timerInt:null,
  newlyUnlocked:[],
  survQueue:[], survStreak:0, survConsecWrong:0,
  taScore:0, taTotal:0, taQueue:[], timeLeft:60, taTimerInt:null,
};

// ──────────────────────────────────────────
//  イースターエッグ状態
// ──────────────────────────────────────────
let _retryCount  = 0;   // もう一度連続カウント
let _survDieX    = 0;   // サバイバル即死連続カウント
let _subClicks   = 0;   // サブタイトルクリック数
let _konamiSeq   = [];  // コナミコマンド入力バッファ
let _typeSeq     = '';  // キーボード入力バッファ
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let _holdTimer = null;
let _cornerSeq = [], _cornerTime = 0;
let _modalCancelCount = 0;
let _logoClicks = [];
let _themeSeq = [];
let _basementSafeSeq = [];
let _resultIdleTimer = null, _settingsIdleTimer = null, _achsIdleTimer = null, _homeIdleTimer = null, _cipherIdleTimer = null;
let _cipherStep = 0;  // 暗号解読室の正解カウント（0〜3）

let _modeHoldTimer = null;       // モードカード長押し用
let _quizAnswerPosSeq = [];      // クイズ回答の選択肢位置バッファ（同じ場所を選び続けたか判定）
let _usedAccents = new Set();    // 試したことのあるアクセントカラー

let _labRound = 0, _labScore = 0, _labQ = null, _labPhase = 'idle';
let _radioCh = 0;
let _mirrorFlipped = false;
let _visitedRooms = new Set();
let _rareEventFired = false;

