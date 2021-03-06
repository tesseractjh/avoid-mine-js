// Constant Values
const PATCH_DATE = '마지막 업데이트: 12/03 오후 5시'

const BACKGROUND_COLOR     = 'rgb( 90,  96, 116)';
const BLACK                = 'rgb(  0,   0,   0)';
const WHITE                = 'rgb(255, 255, 255)';
const CHARCOAL             = 'rgb( 70,  70,  70)';
const INVERTED_CHARCOAL    = 'rgb(185, 185, 185)';
const DARK_CHARCOAL        = 'rgb( 50,  50,  50)';
const LIGHTGRAY            = 'rgb(220, 220, 220)';
const YELLOWGREEN          = 'rgb(154, 205,  50)';
const INVERTED_YELLOWGREEN = 'rgb(101,  50, 205)';
const TOMATO               = 'rgb(255,  99,  71)';
const INVERTED_TOMATO      = 'rgb( 20, 175, 207)';
const SKYBLUE              = 'rgb(135, 206, 235)';
const INVERTED_SKYBLUE     = 'rgb(120,  49,  20)';
const RED                  = 'rgb(255,   0,   0)';
const ORANGE               = 'rgb(255, 128,   0)';
const YELLOW               = 'rgb(255, 255,   0)';
const GREEN                = 'rgb(  0, 255,   0)';
const BLUE                 = 'rgb( 51, 153, 255)';
const INVERTED_BLUE        = 'rgb(204, 102,   0)';
const NAVY                 = 'rgb(  0,   0, 128)';
const PURPLE               = 'rgb(127,   0, 255)';
const LIGHTPURPLE          = 'rgb(204, 153, 255)';

const WHITE_ALPHA          = 'rgba(255, 255, 255, 0.95)';
const WHITE_ALPHA2         = 'rgba(255, 255, 255, 0.70)';
const RED_ALPHA            = 'rgba(255,   0,   0, 0.75)';
const ORANGE_ALPHA         = 'rgba(255, 128,   0, 0.75)';
const YELLOW_ALPHA         = 'rgba(255, 255,   0, 0.75)';
const GREEN_ALPHA          = 'rgba(  0, 255,   0, 0.75)';
const BLUE_ALPHA           = 'rgba( 51, 153, 255, 0.75)';
const NAVY_ALPHA           = 'rgba(  0,   0, 128, 0.75)';
const PURPLE_ALPHA         = 'rgba(127,   0, 255, 0.75)';
const SKYBLUE_ALPHA        = 'rgba(135, 206, 235, 0.75)';

const colorMatch = {
  red: RED,
  orange: ORANGE,
  yellow: YELLOW,
  green: GREEN,
  blue: BLUE,
  navy: NAVY,
  purple: PURPLE,
  [RED]: RED_ALPHA,
  [ORANGE]: ORANGE_ALPHA,
  [YELLOW]: YELLOW_ALPHA,
  [GREEN]: GREEN_ALPHA,
  [BLUE]: BLUE_ALPHA,
  [NAVY]: NAVY_ALPHA,
  [PURPLE]: PURPLE_ALPHA
};

const RAINBOW = [
  'red', 'orange', 'yellow',
  'green', 'blue', 'navy', 'purple'
];

const TEXT_HINT = [
  'oddEven', 'highLow', 'plus'
]

const shapeMatch = {
  red: [10, 11, 12, 13, 14],
  orange: [2, 7, 12, 17, 22],
  yellow: [1, 3, 4, 5, 7],
  green: [0, 2, 4, 6, 8],
  blue: [0, 2, 3, 4, 5, 6, 8],
  navy: [0, 1, 2, 4, 6, 7, 8]
};

const textHintMatch = {
  oddEven: '홀짝',
  highLow: '▲▼',
  plus: '+'
}

const itemMatch = {
  item1: '🔍',
  item2: '🔭',
  item3: '📡',
  item4: '🔨',
  life: '💖',
  slow: '⏪'
}

const BOARD_WIDTH_RATIO         = 2/3;
const BOARD_HEIGHT_RATIO        = 0.85;
const BOARD_BOTTOM_GAP_RATIO    = 0.12;

const CELL_COUNT_SCORE          = 50;
const REMAINING_TIME_SCORE      = 1;
const MOVEMENT_GOOD_RATIO       = 1.1;
const MOVEMENT_GREAT_RATIO      = 1.2;
const MOVEMENT_EXCELLENT_RATIO  = 1.3;
const MOVEMENT_PERFECT_RATIO    = 1.5;
const RESERVED_ITEM_RATIO       = 1.25;
const PERFECT_CLEAR_RATIO       = 2;

const getRank = (value, mode) => {
  if (mode === 'CLASSIC') {
    if (value > 250000) {
      return 'S';
    } else if (value > 200000) {
      return 'A';
    } else if (value > 100000) {
      return 'B';
    } else if (value > 50000) {
      return 'C';
    } else if (value > 10000) {
      return 'D';
    } else {
      return 'F';
    }
  } else if (mode === 'SURVIVAL') {
    if (value > 100000) {
      return 'S';
    } else if (value > 75000) {
      return 'A';
    } else if (value > 50000) {
      return 'B';
    } else if (value > 30000) {
      return 'C';
    } else if (value > 10000) {
      return 'D';
    } else {
      return 'F';
    }
  }
}

const OFFSET_X = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
const OFFSET_Y = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
const OFFSET5_X = [
  -2, -1, 0, 1, 2,
  -2, -1, 0, 1, 2,
  -2, -1, 0, 1, 2,
  -2, -1, 0, 1, 2,
  -2, -1, 0, 1, 2,
];
const OFFSET5_Y = [
  -2, -2, -2, -2, -2,
  -1, -1, -1, -1, -1,
  0, 0, 0, 0, 0,
  1, 1, 1, 1, 1,
  2, 2, 2, 2, 2
];
const OFFSET4_X = [0, -1, 1, 0];
const OFFSET4_Y = [-1, 0, 0, 1];

const randRange = (start, end) => {
  return Math.floor(Math.random()*(end-start+1)) + start;
};

const TEXT = {
	mainTitle: '💣 지뢰피하기 💣',
  selectGameTitle: '게임 선택',
  mainButton01: '게임설명',
  mainButton02: '게임시작',
  mainButton03: '순위표',
  mainButton04: '패치노트',
  modeClassic: '클래식 모드',
  modeChallenge: '도전 모드',
  modeSurvival: '생존 모드',
  backToMainPage: '메인 메뉴',
  tutorialButton01: '이전',
  tutorialButton02: '다음',
  backButton: '메인 화면으로 돌아가기',
  submitButton: '확인',
  tutorial01: '지뢰피하기는 좌측 상단 시작점에서 우측 하단 도착점까지\n지뢰를 피해서 도달하면 승리하는 게임입니다.',
  tutorial02: '칸에 적힌 숫자는 해당 칸과 주변 8칸을 포함한\n9칸 내에 존재하는 지뢰의 개수입니다.',
  tutorial03: '파란색 네모를 움직이면 주변 칸들의 숫자가 공개됩니다.\n시작점 근처 칸들의 숫자와 지뢰는 시작할 때 공개됩니다.',
  tutorial04: '숫자 힌트로는 여기까지가 한계입니다.\n이렇게 운에 의존해야 하는 상황이 종종 발생할 것입니다.',
  tutorial05: '숫자 3키를 누르면 파란색 네모 주변에 아직 밟지 않은 칸들\n중 무작위로 하나를 공개하는 아이템을 사용할 수 있습니다.',
  tutorial06: '이 외에도 숫자 1키, 2키로 무작위 칸을 공개하는\n아이템을 사용할 수 있고 횟수 제한이 있습니다.',
  tutorial07: '파란색 네모를 WASD키로 조작하여 움직일 수 있습니다.\n도착점까지 직접 들어가보세요!',
  bottomBar01: 'STAGE',
  bottomBar02: '점수',
  bottomBar03: '💖',
  bottomBar04: '💣',
  bottomBar05: '⏱',
  bottomBar06: '🔍[1]',
  bottomBar07: '🔭[2]',
  bottomBar08: '📡[3]',
  bottomBarCh01: '🧩',
  bottomBarCh02: '🏃',
  bottomBarCh03: '💣',
  bottomBarCh04: '⏱',
  bottomBarCh05: '🔍[1]',
  bottomBarCh06: '🔭[2]',
  bottomBarCh07: '📡[3]',
  bottomBarCh08: '🔨[4]',
  bottomBarSur01: '점수',
  bottomBarSur02: '🧩',
  bottomBarSur03: '💖',
  bottomBarSur04: '⏩',
  bottomBarSur05: '⏱',
  bottomBarSur06: '🔍[1]',
  bottomBarSur07: '🔭[2]',
  bottomBarSur08: '📡[3]',
  bottomBarSur09: '🔨[4]',
  challengeList01: '🧩 맵 크기:　',
  challengeList02: '⏱ 제한시간:　',
  challengeList03: '💣 지뢰비율:　',
  challengeList04: '🎨 색깔힌트:　',
  challengeList05: '📝 글자힌트:　',
  challengeList06: '🧷 아이템:　',
  challengeList07: '🔍',
  challengeList08: '🔭',
  challengeList09: '📡',
  challengeList10: '🔨',
  challengeList11: '⭐',
  destination: '도착! 메인화면으로 이동합니다.',
  ensuredMine: '💣',
  msgBox01: '지뢰를 밟았습니다!',
  msgBox02: '🔍[1] 아이템을 사용했습니다',
  msgBox03: '🔍[1] 아이템이 없습니다!',
  msgBox04: '🔭[2] 아이템을 사용했습니다',
  msgBox05: '🔭[2] 아이템이 없습니다!',
  msgBox06: '📡[3] 아이템을 사용했습니다',
  msgBox07: '📡[3] 아이템이 없습니다!',
  msgBox08: '더 이상 공개할 수 있는 칸이 없습니다!',
  msgBox09: '색깔 힌트의 지뢰 범위를 표시를 해제합니다.',
  msgBox10: '색깔 힌트의 지뢰 범위를 표시합니다.',
  msgBox11: '🔨[4] 아이템을 사용했습니다.',
  msgBox12: '🔨[4] 아이템이 없습니다!',
  msgBox13: '근처에 벽이 없습니다!',
  clickCell01: '색깔 표시',
  clickCell02: '칸을 클릭하여 색깔 표시를 할 수 있습니다.<br>한 번 누르면 빨간색, 두 번 누르면 초록색, 세 번 누르면 사라집니다.<br>눈으로만 추측하면 실수하기 쉽습니다. 색깔 표시를 적극적으로 활용하세요!',
  clickCell03: 'F를 누르면 게임을 시작합니다.',
  introduceItem101: '🔍[1]',
  introduceItem102: '숫자 1키를 눌러 내 주변 2칸 이내에 있는 칸 중에서<br>공개되지 않은 무작위 칸의 숫자 힌트를 공개할 수 있습니다.',
  introduceItem103: 'F를 눌러 🔍 10개를 받으세요!',
  introduceItem201: '🔭[2]',
  introduceItem202: '숫자 2키를 눌러 주변 2칸 이내에 있는 칸 중에서<br>공개되지 않은 무작위 칸을 공개할 수 있습니다.<br>만약 그 칸이 지뢰가 아니면 숫자 힌트를, 지뢰라면 지뢰를 표시합니다.',
  introduceItem203: 'F를 눌러 🔭 5개를 받으세요!',
  introduceItem301: '📡[3]',
  introduceItem302: '숫자 3키를 눌러 내 주변 1칸 이내에 있는 칸 중에서<br>아직 밟지 않은 칸을 공개합니다. 만약 그 칸이 지뢰가 아니면<br>색칠하여 지뢰가 아님을 표시하고, 지뢰라면 지뢰를 표시합니다.',
  introduceItem303: 'F를 눌러 📡 3개를 받으세요!',
  introduceItem401: '🔨[4]',
  introduceItem402: '숫자 4키를 눌러 상하좌우 4칸에 있는 벽 중 무작위로 하나를 제거합니다.',
  perfectClear01: '퍼펙트 클리어',
  perfectClear02: '밟을 수 있는 모든 칸을 다 밟으세요!<br>STAGE 5부터는 한 번도 죽지 않고<br>모든 안전한 칸을 밟으면 보너스 점수를 얻습니다.',
  movementOpt01: '움직임 최적화',
  movementOpt02: '최대한 적게 움직이세요!<br>STAGE 6부터는 움직임을 최소화하면 보너스 점수를 얻습니다.',
  stage10Bonus01: 'STAGE 10 클리어 보너스',
  stage10Bonus02: '💖 +3<br>🔍[1] +10<br>🔭[2] +5<br>📡[3] +3',
  stage20Bonus01: 'STAGE 20 클리어 보너스',
  stage20Bonus02: '💖 +3<br>🔍[1] +7<br>🔭[2] +4<br>📡[3] +3',
  stage30Bonus01: 'STAGE 30 클리어 보너스',
  stage30Bonus02: '💖 +2<br>🔍[1] +5<br>🔭[2] +3<br>📡[3] +2',
  stage40Bonus01: 'STAGE 40 클리어 보너스',
  stage40Bonus02: '💖 +1<br>🔍[1] +3<br>🔭[2] +1<br>📡[3] +1',
  stageBonusHeader: 'F를 눌러 보너스를 받으세요!',

  newHintTitle: '새로운 힌트',
  newHintRed: '<span style="color:red;" class="stroke">빨간색 숫자</span>는 양 옆 2칸과 자기 자신을 포함한<br>가로 5칸 내의 지뢰 개수를 의미합니다.',
  newHintOrange: '<span style="color:rgb(255, 128, 0);" class="stroke">주황색 숫자</span>는 위 아래 2칸과 자기 자신을 포함한<br>세로 5칸 내의 지뢰 개수를 의미합니다.',
  newHintYellow: '<span style="color:rgb(255, 255, 0);" class="stroke">노란색 숫자</span>는 상하좌우 4칸과 자기 자신을 포함한<br>십자가 모양 5칸 내의 지뢰 개수를 의미합니다.',
  newHintGreen: '<span style="color:rgb(0, 255, 0);" class="stroke">초록색 숫자</span>는 대각선 4칸과 자기 자신을 포함한<br>X자 모양 5칸 내의 지뢰 개수를 의미합니다.',
  newHintBlue: '<span style="color:rgb(51, 153, 255);" class="stroke">파란색 숫자</span>는 H자 모양 7칸 내의 지뢰 개수를 의미합니다.',
  newHintNavy: '<span style="color:rgb(0, 50, 128);">남색 숫자</span>는 工자 모양 7칸 내의 지뢰 개수를 의미합니다.',
  newHintPurple: '<span style="color:rgb(127, 0, 255);" class="stroke">보라색 숫자</span>는 2~8칸의 무작위 모양 내의 지뢰 개수를 의미합니다.<br>어떤 모양인지는 숫자가 밝혀질 때 표시됩니다.',

  showShape01: '색깔 힌트 모양 표시',
  showShape02: '앞으로 새로운 색깔 힌트가 계속 등장할 것입니다.<br>모양이 헷갈린다면 R키를 눌러 각 색깔 힌트의 모양을 확인할 수 있습니다.<br>R키를 한 번 더 누르면 해제할 수 있습니다.',
  oddEven01: '홀짝 힌트',
  oddEven02: '일부 칸의 숫자 힌트가 홀짝 힌트로 전환됩니다.<br>1, 3, 5, 7, 9는 "홀"로,<br>0, 2, 4, 6, 8은 "짝"으로 표시됩니다.',
  highLow01: '최대/최소 힌트',
  highLow02: '일부 칸의 숫자 힌트가 최대/최소 힌트로 전환됩니다.<br>이 칸의 숫자가 범위 내 모든 숫자들보다 더 크면 ▲,<br>범위 내 모든 숫자들보다 더 작으면 ▼로 표시됩니다.',
  highLow03: '만약 이 칸의 숫자가 범위 내 숫자들의 최댓값과 같다면 △,<br> 범위 내 숫자들의 최솟값과 같다면 ▽로 표시됩니다.<br>즉 ▲▼는 범위 내 유일한 값이고,<br>△▽는 같은 값을 가지는 칸이 있다는 의미입니다.',
  highLow04: '범위 내 모든 숫자들이 같다면, △와 ▽ 둘 중에서 △가 우선적으로 표시됩니다.',

  newElementTitle01: '새로운 요소',
  newElementBlock01: 'X가 그려진 칸은 지나갈 수 없는 벽입니다.<br>🔍[1], 🔭[2], 📡[3] 아이템으로 공개할 수 없습니다.',
  newElementTitle02: '새로운 패배 조건',
  newElementBlock02: '🔨[4] 아이템은 맵 전체 벽의 개수보다 적습니다.<br>만약 🔨[4] 아이템을 모두 사용했을 때,<br>도착점으로 가는 길이 막혀있다면 즉시 패배합니다.',
  newElementTitle03: '퍼펙트 클리어 조건',
  newElementBlock03: '벽이 있는 맵에서 퍼펙트 클리어 조건은<br>지뢰뿐 아니라 벽까지 고려하여<br>밟을 수 있는 모든 칸을 밟는 것입니다.',

  newElementTitle04: '덧셈 힌트',
  newElementPlus01: '일부 칸의 숫자 힌트가 덧셈 힌트로 전환됩니다.<br>+가 표시된 칸은 이 칸을 제외한 이 칸의 범위 내<br>모든 숫자들의 합의 마지막 숫자가 이 칸이 가리키는 숫자와 같습니다.',
  newElementPlus02: '예를 들어 아래 그림에서 숫자 4가 적힌 칸은<br>이 칸을 제외한 이 칸의 범위 내 숫자들의 합이 14이고<br>14의 마지막 숫자인 4와 이 칸의 숫자가 같습니다.',

  survivalMode01: '생존 모드',
  survivalMode02: '생존 모드에서는 맵이 계속 왼쪽으로 움직입니다.<br>만약 맵이 움직일 때, 내 캐릭터가 맨 왼쪽줄에 위치해있다면 즉시 패배합니다.',
  survivalMode03: '각 칸의 힌트는 현재 보이는 맵을 기준으로 숫자가 결정됩니다.<br>따라서, 맵이 움직이면서 일부 칸들의 힌트가 변경될 수 있습니다.',
  survivalMode04: '처음 30초 동안은 맵이 움직이지 않으며,<br>30초가 되는 순간 움직이기 시작합니다.<br>처음에는 10초 간격으로 맵이 움직이며, 점점 간격이 짧아집니다.',
  survivalMode05: '맵 곳곳에 아이템이 흩뿌려져 있습니다.<br>해당 아이템 근처 칸으로 이동하면 아이템을 획득할 수 있습니다.',
  survivalMode06: '아이템은 🔍🔭📡🔨 아이템들과 라이프(💖), 그리고 ⏪가 있습니다.<br>⏪ 아이템은 획득 즉시 맵이 움직이는 속도를 10% 더 느리게 만듭니다.',

  pressH: 'F를 누르면 다음 스테이지로 이동합니다.',
  pressH2: 'F를 누르면 다음 설명으로 이동합니다.',
  pressH3: 'F를 누르면 게임을 시작합니다.',

  classicHead: `<div class="border-bottom">순위</div>
  <div class="border-bottom">이름</div>
  <div class="border-bottom">점수</div>
  <div class="border-bottom">랭크</div>
  <div class="border-bottom">스테이지</div>`,
  challengeHead01: `<div class="border-bottom">순위</div>
  <div class="border-bottom">이름</div>
  <div class="border-bottom">점수</div>
  <div class="border-bottom">⏱</div>
  <div class="border-bottom">🧩</div>
  <div class="border-bottom">🏃</div>
  <div class="border-bottom">🔍</div>
  <div class="border-bottom">🔭</div>
  <div class="border-bottom">📡</div>`,
  challengeHead02: `<div class="border-bottom">순위</div>
  <div class="border-bottom">이름</div>
  <div class="border-bottom">점수</div>
  <div class="border-bottom">⏱</div>
  <div class="border-bottom">🧩</div>
  <div class="border-bottom">🏃</div>
  <div class="border-bottom">🔍</div>
  <div class="border-bottom">🔭</div>
  <div class="border-bottom">📡</div>
  <div class="border-bottom">🔨</div>`,
  survivalHead: `<div class="border-bottom">순위</div>
  <div class="border-bottom">이름</div>
  <div class="border-bottom">점수</div>
  <div class="border-bottom">랭크</div>
  <div class="border-bottom">⏱</div>
  <div class="border-bottom">⏩</div>
  <div class="border-bottom">🧩</div>`,
};

const BUTTON = {
  tutorial: {
    text: TEXT.mainButton01,
    fillColor: YELLOWGREEN,
    hover: {
      fillColor: INVERTED_YELLOWGREEN,
      textColor: WHITE
    }
  },

  start: {
    text: TEXT.mainButton02,
    fillColor: TOMATO,
    hover: {
      fillColor: INVERTED_TOMATO,
      textColor: WHITE
    }
  },

  leaderboard: {
    text: TEXT.mainButton03,
    fillColor: SKYBLUE,
    hover: {
      fillColor: INVERTED_SKYBLUE,
      textColor: WHITE
    }
  },

  updateLog: {
    text: TEXT.mainButton04,
    innerText: PATCH_DATE,
    fillColor: BLUE,
    hover: {
      fillColor: INVERTED_BLUE,
      textColor: WHITE
    }
  },

  modeClassic: {
    text: TEXT.modeClassic,
    fillColor: YELLOWGREEN,
    hover: {
      fillColor: INVERTED_YELLOWGREEN,
      textColor: WHITE
    },
    caption: '스테이지를 하나씩 클리어하며 지뢰피하기 룰을 익힐 수 있는 기본 모드'
  },

  modeChallenge: {
    text: TEXT.modeChallenge,
    fillColor: TOMATO,
    hover: {
      fillColor: INVERTED_TOMATO,
      textColor: WHITE
    },
    caption: '단 하나의 목숨으로 개별 맵 클리어에 도전하는 모드'
  },

  modeSurvival: {
    text: TEXT.modeSurvival,
    fillColor: SKYBLUE,
    hover: {
      fillColor: INVERTED_SKYBLUE,
      textColor: WHITE
    },
    caption: '제한 시간 없이 최대한 오래 살아남는 모드'
  },

  backToMainPage: {
    text: TEXT.backToMainPage,
    textColor: WHITE,
    fillColor: CHARCOAL,
    hover: {
      fillColor: INVERTED_CHARCOAL,
      textColor: BLACK
    }
  },

  prev: {
    text: TEXT.tutorialButton01,
    fillColor: TOMATO,
    hover: {
      fillColor: INVERTED_TOMATO,
      textColor: WHITE
    }
  },

  next: {
    text: TEXT.tutorialButton02,
    fillColor: TOMATO,
    hover: {
      fillColor: INVERTED_TOMATO,
      textColor: WHITE
    }
  },

  back: {
    text: TEXT.backButton,
    fillColor: YELLOWGREEN,
    hover: {
      fillColor: INVERTED_YELLOWGREEN,
      textColor: WHITE
    }
  },

  submit: {
    text: TEXT.submitButton,
    fillColor: SKYBLUE,
    hover: {
      fillColor: INVERTED_SKYBLUE,
      textColor: WHITE
    }
  }
};

const tutorialClearPage = function(boardInfo) {
  this.ctx.clearRect(0, 0, this.width, this.board.maxHeight);
  this.paintTutorialBoard(boardInfo);
};

const TUTORIAL = {
  tutorial01: {
    next: 2,
    board: {},
    bottomText: {
      text: TEXT.tutorial01,
      linebreak: true
    },
    timer: {
      getTimer: function() {
        const frame01 = () => {
          tutorialClearPage.bind(this)({});
          this.board.getCell(0, 0).stroke(NAVY, 10);
          this.board.getCell(4, 4).stroke(NAVY, 10);
        };

        const frame02 = () => {
          tutorialClearPage.bind(this)({});
        }

        let frame = 2;

        return () => {
          switch (frame) {
            case 2:
              frame01();
              break;
            case 1:
              frame02();
              break;
          }
          if (--frame === 0) {
            frame = 2;
          }
        };
      },
      delay: 500
    }
  },

  tutorial02: {
    prev: 1,
    next: 3,
    board: {},
    bottomText: {
      text: TEXT.tutorial02,
      linebreak: true
    },
    timer: {
      getTimer: function() {
        const frame01 = () => {
          tutorialClearPage.bind(this)({});
          this.board.getCell(1, 1).stroke(NAVY, 10);
        };
      
        const frame02 = () => {
          tutorialClearPage.bind(this)({});
          const startCell = this.board.getCell(0, 0);
          const endCell = this.board.getCell(2, 2);
          this.strokeCells(startCell, endCell, NAVY, 10);
          this.board.getCell(2, 2).stroke(ORANGE, 10);
        };
      
        const frame03 = () => {
          tutorialClearPage.bind(this)({});
          this.board.getCell(0, 1).stroke(NAVY, 10);
        };
      
        const frame04 = () => {
          tutorialClearPage.bind(this)({});
          const startCell = this.board.getCell(0, 0);
          const endCell = this.board.getCell(1, 2);
          this.strokeCells(startCell, endCell, NAVY, 10);
        }

        let frame = 12;

        return () => {
          switch (frame) {
            case 12: case 10: case 8:
              frame01();
              break;
            case 11: case 9: case 7:
              frame02();
              break;
            case 6: case 4: case 2:
              frame03();
              break;
            case 5: case 3: case 1:
              frame04();
              break;
          }
          if (--frame === 0) {
            frame = 12;
          }
        };
      },
      delay: 600
    }
  },

  tutorial03: {
    prev: 2,
    next: 4,
    board: {
      me: true
    },
    bottomText: {
      text: TEXT.tutorial03,
      linebreak: true
    },
    timer: {
      getTimer: function() {
        const frame01 = () => {
          this.board.me.moveX(1);
        };
      
        const frame02 = () => {
          this.board.me.moveY(1);
        };
      
        const frame03 = () => {
          tutorialClearPage.bind(this)({});
          const startCell = this.board.getCell(0, 0);
          const endCell = this.board.getCell(2, 2);
          this.strokeCells(startCell, endCell, NAVY, 10);
        }

        const frame04 = () => {
          tutorialClearPage.bind(this)({});
        }

        let frame = 11;

        return () => {
          switch (frame) {
            case 11:
              tutorialClearPage.bind(this)({ me: true });
              break;
            case 10: case 9: case 8:
              frame01();
              break;
            case 7: case 6:
              frame02();
              break;
            case 4: case 2:
              frame03();
              break;
            case 3: case 1:
              frame04();
              break;
          }
          if (--frame === 0) {
            frame = 11;
          }
        };
      },
      delay: 500
    }
  },

  tutorial04: {
    prev: 3,
    next: 5,
    board: {
      me: true
    },
    bottomText: {
      text: TEXT.tutorial04,
      linebreak: true
    },
    timer: {
      getTimer: function() {
        const frame01 = () => {
          this.board.me.moveX(1);
        };
      
        const frame02 = () => {
          this.board.me.moveX(-1);
        };
      
        const frame03 = () => {
          this.board.me.moveY(1);
        };
      
        const frame04 = () => {
          this.board.me.moveY(-1);
        };

        let frame = 17;

        return animation = () => {
          switch (frame) {
            case 17:
              tutorialClearPage.bind(this)({ me: true });
              break;
            case 13: case 12: case 6: case 5: case 1:
              frame01();
              break;
            case 9:
              frame02();
              break;
            case 16: case 15: case 14: case 11: case 3: case 2:
              frame03();
              break;
            case 10: case 8: case 7: case 4:
              frame04();
              break;
          }
          if (--frame === 0) {
            clearInterval(animation);
          }
        }
      },
      delay: 125
    }
  },
  
  tutorial05: {
    prev: 4,
    next: 6,
    board: {
      me: true,
      meX: 4,
      meY: 2,
      ensured: [
        [0, 3], [1, 3], [2, 3], [2, 4],
        [3, 0], [3, 1], [3, 2], [3, 3], [4, 2]
      ],
      open: [
        [0, 4], [1, 4], [3, 4],
        [4, 0], [4, 1], [4, 3]
      ]
    },
    bottomText: {
      text: TEXT.tutorial05,
      linebreak: true
    }
  },

  tutorial06: {
    prev: 5,
    next: 7,
    board: {
      me: true,
      meX: 4,
      meY: 2,
      ensured: [
        [0, 3], [1, 3], [2, 3], [2, 4],
        [3, 0], [3, 1], [3, 2], [3, 3], [4, 2]
      ],
      open: [
        [0, 4], [1, 4], [3, 4],
        [4, 0], [4, 1], [4, 3]
      ]
    },
    bottomText: {
      text: TEXT.tutorial06,
      linebreak: true
    }
  },

  tutorial07: {
    board: {
      me: true
    },
    bottomText: {
      text: TEXT.tutorial07,
      linebreak: true
    },
    addition: function () {
      this.page = 'tutorial';
    }
  }
}

const MODE_CLASSIC = [

  {
    type: 'input'
  },

	{
	  type: 'info',
	  layout: 'leftRight',
	  title: TEXT.clickCell01,
	  half1: {
		  type: 'board',
		  xCount: 3,
		  yCount: 4,
		  ensured:[
			  [0, 0, 0], [0, 1, 0], [0, 2, 1],
        [1, 0, 1], [1, 1, 1], [1, 2, 1], [1, 3, 1]
			],
      open: [
        [0, 3, 1], [2, 0, 1],
        [2, 1, 1], [2, 2, 0], [2, 3, 0]
      ],
		  me: [1, 2],
	  },
	  half2: {
		  type: 'board',
		  xCount: 3,
		  yCount: 4,
      tomato: [
        [0, 3], [2, 0]
      ],
      yellowgreen: [
        [2, 1], [2, 2], [2, 3]
      ],
		  ensured:[
			  [0, 0, 0], [0, 1, 0], [0, 2, 1],
        [1, 0, 1], [1, 1, 1], [1, 2, 1], [1, 3, 1]
			],
      open: [
        [0, 3, 1], [2, 0, 1],
        [2, 1, 1], [2, 2, 0], [2, 3, 0]
      ],
		  me: [1, 2],
	  },
    arrow: true,
    header: TEXT.clickCell02,
    footer: TEXT.clickCell03,
	},

	{ //  6 6 4 150
	  type: 'game',
	  xCount: 6,
	  yCount: 6,
	  mine: 4,
	  boardSetting: {
		  time: 150
	  }
	},

	{
	  type: 'info',
	  layout: 'leftRight',
	  title: TEXT.introduceItem101,
	  half1: {
		  type: 'board',
		  xCount: 3,
		  yCount: 4,
		  ensured:[
			  [0, 1, 1], [1, 0, 1], [1, 1, 1]
			], 
		  me: [0, 0],
	  },
	  half2: {
		  type: 'board',
		  xCount: 3,
		  yCount: 4,
		  ensured: [
			  [0, 1, 1], [1, 0, 1], [1, 1, 1]
			],
		  open: [
        [1, 2, 3]
      ],
      me: [0, 0]
		},
    arrow: true,
    header: TEXT.introduceItem102,
    footer: TEXT.introduceItem103,
    bonus: {
    	item1: 10
    }
	},

	{
		type: 'game',
		xCount: 6,
		yCount: 6,
		mine: 5,
		boardSetting: {
			time: 150
		}
	},
  
	{
	  type: 'info',
    layout: 'leftRight',
    title: TEXT.introduceItem201,
	  half1: {
      type: 'board',
      xCount: 3,
      yCount: 4,
      ensured: [
        [0, 1, 1], [1, 0, 1], [1, 1, 1]
      ],
      me: [0, 0]
    },
	  half2: {
      type: 'board',
      xCount: 3,
      yCount: 4,
      ensured: [
        [0, 1, 1], [1, 0, 1],
        [1, 1, 1], [1, 2, 3]
      ],
      me: [0, 0]
    },
    arrow: true,
	  header: TEXT.introduceItem202,
    footer: TEXT.introduceItem203,
    bonus: {
      item2: 5
    }
  },

	{
	  type: 'game',
	  xCount: 6,
	  yCount: 6,
	  mine: 6,
	  boardSetting: {
		  time: 150
	  }
	},

	{
	  type: 'info',
    layout: 'leftRight',
    title: TEXT.introduceItem301,
	  half1: {
      type: 'board',
      xCount: 3,
      yCount: 4,
      ensured: [
        [0, 0, 0], [0, 1, 1],
        [1, 0, 1], [1, 1, 1]
      ],
      open: [
        [0, 2, 3], [1, 2, 4], [2, 0, 1],
        [2, 1, 1], [2, 1, 3], [2, 2, 3]
      ],
      me: [1, 1]
    },
	  half2: {
      type: 'board',
      xCount: 3,
      yCount: 4,
      ensured: [
        [0, 0, 0], [0, 1, 1], [1, 0, 1],
        [1, 1, 1], [2, 1, 1]
      ],
      open: [
        [0, 2, 3], [1, 2, 4], [2, 0, 1],
        [2, 1, 3], [2, 2, 3]
      ],
      me: [1, 1]
    },
    arrow: true,
	  header: TEXT.introduceItem302,
    footer: TEXT.introduceItem303,
    bonus: {
      item3: 3
    }
  },

	{
	  type: 'game',
	  xCount: 6,
	  yCount: 6,
	  mine: 7,
	  boardSetting: {
		  time: 150
	  }
	},
  
	{
	  type: 'info',
    layout: 'article',
    title: TEXT.perfectClear01,
	  article: {
      type: 'text',
      text: TEXT.perfectClear02
    },
    footer: TEXT.pressH
	},

	// STAGE 5
	{
	  type: 'game',
	  xCount: 7,
	  yCount: 6,
	  mine: 8,
	  boardSetting: {
		  time: 150
	  }
	},
  
	{
	  type: 'info',
    layout: 'article',
    title: TEXT.movementOpt01,
	  article: {
      type: 'text',
      text: TEXT.movementOpt02
    },
    footer: TEXT.pressH
	},
  
	{
	  type: 'game',
	  xCount: 5,
	  yCount: 5,
	  mine: 8,
	  boardSetting: {
		  time: 180
	  }
	},
	
	{
	  type: 'game',
	  xCount: 5,
	  yCount: 6,
	  mine: 9,
	  boardSetting: {
		  time: 180
	  }
	},
	
	{
	  type: 'game',
	  xCount: 5,
	  yCount: 7,
	  mine: 9,
	  boardSetting: {
		  time: 180
	  }
	},
	
	{
	  type: 'game',
	  xCount: 5,
	  yCount: 8,
	  mine: 10,
	  boardSetting: {
		  time: 180
	  }
	},
	
	// STAGE 10
	{
	  type: 'game',
	  xCount: 8,
	  yCount: 5,
	  mine: 10,
	  boardSetting: {
		  time: 180
	  }
	},
	
	{
	  type: 'info',
    layout: 'article',
    title: TEXT.stage10Bonus01,
	  article: {
      type: 'text', 
      text: TEXT.stage10Bonus02
    },
	  header: TEXT.stageBonusHeader,
    bonus: {
      life: 3, 
      item1: 10, 
      item2: 5,
      item3: 3
    }
  },
  
	{
	  type: 'info',
    layout: 'article',
    title: TEXT.newHintTitle,
	  article: {
      type: 'board',
      xCount: 7,
      yCount: 3,
      ensured: [
        [2, 1, 1], [3, 1, 2, 'red'], [5, 1, 3]
      ],
      mine: [
        [1, 1], [4, 1]
      ],
    },
	  header: TEXT.newHintRed,
    footer: TEXT.pressH,
  },
	
  {
	  type: 'game',
	  xCount: 8,
	  yCount: 6,
	  mine: 12,
	  boardSetting: {
		  time: 210,
      red: 3
	  }
	},
	
  {
	  type: 'game',
	  xCount: 7,
	  yCount: 7,
	  mine: 12,
	  boardSetting: {
		  time: 210,
      red: 3
	  }
	},

  {
	  type: 'game',
	  xCount: 7,
	  yCount: 7,
	  mine: 13,
	  boardSetting: {
		  time: 210,
      red: 4
	  }
	},
	
  {
	  type: 'game',
	  xCount: 8,
	  yCount: 7,
	  mine: 14,
	  boardSetting: {
		  time: 210,
      red: 4
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.newHintTitle,
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 5,
      ensured: [
        [1, 1, 1], [1, 2, 2, 'orange'], [1, 4, 3]
      ],
      mine: [
        [1, 0], [1, 3]
      ],
    },
	  header: TEXT.newHintOrange,
    footer: TEXT.pressH,
  },

	{
	  type: 'info',
    layout: 'leftRight',
    title: TEXT.showShape01,
	  half1: {
      type: 'board',
      xCount: 3,
      yCount: 5,
      ensured: [
        [0, 0, 0, 'red'], [1, 0, 1], [2, 0, 0], [1, 1, 2],
        [2, 1, 2], [0, 2, 2], [1, 2, 1, 'orange'], [1, 3, 3],
        [2, 3, 2], [0, 4, 2], [2, 4, 1]
      ],
      mine: [
        [0, 1], [2, 2],
        [0, 3], [1, 4]
      ]
    },
    half2: {
      type: 'board',
      xCount: 3,
      yCount: 5,
      ensured: [
        [0, 0, 0, 'red'], [1, 0, 1], [2, 0, 0], [1, 1, 2],
        [2, 1, 2], [0, 2, 2], [1, 2, 1, 'orange'], [1, 3, 3],
        [2, 3, 2], [0, 4, 2], [2, 4, 1]
      ],
      mine: [
        [0, 1], [2, 2],
        [0, 3], [1, 4]
      ],
      showShape: true
    },
    arrow: true,
	  header: TEXT.showShape02,
    footer: TEXT.pressH,
  },

  // STAGE 15
  {
	  type: 'game',
	  xCount: 9,
	  yCount: 7,
	  mine: 15,
	  boardSetting: {
		  time: 210,
      red: 3,
      orange: 2
	  }
	},
	
  {
	  type: 'game',
	  xCount: 10,
	  yCount: 6,
	  mine: 15,
	  boardSetting: {
		  time: 240,
      red: 2,
      orange: 4
	  }
	},
	
  {
	  type: 'game',
	  xCount: 13,
	  yCount: 5,
	  mine: 16,
	  boardSetting: {
		  time: 240,
      red: 2,
      orange: 5
	  }
	},
	
  {
	  type: 'game',
	  xCount: 11,
	  yCount: 6,
	  mine: 16,
	  boardSetting: {
		  time: 240,
      red: 2,
      orange: 5
	  }
	},

  {
	  type: 'info',
	  layout: 'leftRight',
	  title: TEXT.oddEven01,
	  half1: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 3,
	  	ensured: [
	  		[0, 1, 2], [0, 2, 0], [1, 1, '홀'],
	  		[1, 2, 1], [2, 0, 1], [2, 1, 2]
	  	],
	  	mine: [[0, 0], [1, 0], [2, 2]]
	  },
	  half2: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 3,
	  	ensured: [
	  		[0, 1, '짝'], [0, 2, '짝'], [1, 1, 3],
	  		[1, 2, 1], [2, 0, 1], [2, 1, '짝']
	  	],
	  	mine: [
	  		[0, 0], [1, 0], [2, 2]
	  	],
	  },
	  header: TEXT.oddEven02,
	  footer: TEXT.pressH,
  },

  {
	  type: 'game',
	  xCount: 8,
	  yCount: 8,
	  mine: 19,
	  boardSetting: {
		  time: 240,
      red: 3,
      orange: 5,
      oddEven: 1
	  }
	},

  // STAGE 20
  {
	  type: 'game',
	  xCount: 8,
	  yCount: 8,
	  mine: 19,
	  boardSetting: {
		  time: 240,
      red: 2,
      orange: 3,
      oddEven: 2
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.stage20Bonus01,
	  article: {
      type: 'text', 
      text: TEXT.stage20Bonus02
    },
	  header: TEXT.stageBonusHeader,
    bonus: {
      life: 3, 
      item1: 7, 
      item2: 4,
      item3: 3
    }
  },

  {
	  type: 'game',
	  xCount: 8,
	  yCount: 8,
	  mine: 19,
	  boardSetting: {
		  time: 240,
      red: 2,
      orange: 2,
      oddEven: 3
	  }
	},

  {
	  type: 'game',
	  xCount: 9,
	  yCount: 8,
	  mine: 21,
	  boardSetting: {
		  time: 240,
      red: 3,
      orange: 3,
      oddEven: 4
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.newHintTitle,
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      ensured: [
        [2, 0, 1], [1, 1, 2, 'yellow'],
        [2, 1, 2], [1, 2, 3]
      ],
      mine: [
        [0, 0], [1, 0], [0, 1],
        [0, 2], [2, 2]
      ],
    },
	  header: TEXT.newHintYellow,
    footer: TEXT.pressH,
  },

  {
	  type: 'game',
	  xCount: 9,
	  yCount: 8,
	  mine: 21,
	  boardSetting: {
		  time: 240,
      red: 2,
      orange: 2,
      yellow: 5,
      oddEven: 2
	  }
	},

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 8,
	  mine: 24,
	  boardSetting: {
		  time: 240,
      red: 2,
      orange: 2,
      yellow: 6,
      oddEven: 4
	  }
	},

  // STAGE 25
  {
	  type: 'game',
	  xCount: 9,
	  yCount: 9,
	  mine: 24,
	  boardSetting: {
		  time: 270,
      red: 3,
      orange: 3,
      yellow: 4,
      oddEven: 4
	  }
	},

  {
	  type: 'game',
	  xCount: 9,
	  yCount: 9,
	  mine: 24,
	  boardSetting: {
		  time: 270,
      red: 2,
      orange: 2,
      yellow: 5,
      oddEven: 5
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.newHintTitle,
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      ensured: [
        [2, 0, 1], [1, 1, 3, 'green'],
        [2, 1, 2], [1, 2, 3]
      ],
      mine: [
        [0, 0], [1, 0], [0, 1],
        [0, 2], [2, 2]
      ],
    },
	  header: TEXT.newHintGreen,
    footer: TEXT.pressH,
  },

  {
	  type: 'game',
	  xCount: 9,
	  yCount: 9,
	  mine: 24,
	  boardSetting: {
		  time: 270,
      red: 2,
      orange: 2,
      yellow: 2,
      green: 4,
      oddEven: 2
	  }
	},

  {
	  type: 'game',
	  xCount: 9,
	  yCount: 9,
	  mine: 24,
	  boardSetting: {
		  time: 270,
      red: 1,
      orange: 1,
      yellow: 2,
      green: 6,
      oddEven: 2
	  }
	},

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 9,
	  mine: 27,
	  boardSetting: {
		  time: 270,
      red: 1,
      orange: 1,
      yellow: 3,
      green: 5,
      oddEven: 3
	  }
	},

  // STAGE 30
  {
	  type: 'game',
	  xCount: 10,
	  yCount: 9,
	  mine: 27,
	  boardSetting: {
		  time: 270,
      red: 2,
      orange: 2,
      yellow: 2,
      green: 5,
      oddEven: 4
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.stage30Bonus01,
	  article: {
      type: 'text', 
      text: TEXT.stage30Bonus02
    },
	  header: TEXT.stageBonusHeader,
    bonus: {
      life: 2, 
      item1: 5, 
      item2: 3,
	    item3: 2
    }
  },

  {
	  type: 'info',
	  layout: 'leftRight',
	  title: TEXT.highLow01,
	  half1: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 6,
	  	ensured: [
	  		[1, 0, 3], [0, 1, 2], [1, 1, 5],
        [2, 1, 3], [1, 3, 5], [1, 5, 1],
        [2, 3, 3], [0, 4, 1], [1, 4, 2],
        [0, 5, 0], [2, 5, 1]
	  	],
	  	mine: [
        [0, 0], [2, 0], [0, 2], [0, 3],
        [1, 2], [2, 2], [2, 4]
      ]
	  },
	  half2: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 6,
	  	ensured: [
	  		[1, 0, 3], [0, 1, 2], [1, 1, '▲'],
        [2, 1, 3], [1, 3, 5], [1, 5, 1],
        [2, 3, 3], [0, 4, 1], [1, 4, 2],
        [0, 5, '▼'], [2, 5, 1]
	  	],
	  	mine: [
        [0, 0], [2, 0], [0, 2], [0, 3],
        [1, 2], [2, 2], [2, 4]
      ]
	  },
    arrow: true,
	  header: TEXT.highLow02,
	  footer: TEXT.pressH2,
  },

  {
	  type: 'info',
	  layout: 'leftRight',
	  title: TEXT.highLow01,
	  half1: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 3,
	  	ensured: [
	  		[0, 0, 1], [1, 0, 2], [0, 1, 1],
        [2, 1, 2], [0, 2, 1], [1, 2, 1], [2, 2, 1]
	  	],
	  	mine: [
        [2, 0], [1, 1]
      ]
	  },
	  half2: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 3,
	  	ensured: [
	  		[0, 0, '▽'], [1, 0, 2], [0, 1, 1],
        [2, 1, '△'], [0, 2, 1], [1, 2, 1], [2, 2, 1]
	  	],
	  	mine: [
        [2, 0], [1, 1]
      ]
	  },
    arrow: true,
	  header: TEXT.highLow03,
	  footer: TEXT.pressH2,
  },

  {
	  type: 'info',
	  layout: 'leftRight',
	  title: TEXT.highLow01,
	  half1: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 3,
	  	ensured: [
	  		[0, 0, 0], [0, 1, 0], [0, 2, 0],
        [1, 0, 0], [1, 1, 0], [1, 2, 0],
        [2, 0, 0], [2, 1, 0], [2, 2, 0]
	  	]
	  },
	  half2: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 3,
	  	ensured: [
	  		[0, 0, '△'], [0, 1, '△'], [0, 2, '△'],
        [1, 0, '△'], [1, 1, '△'], [1, 2, '△'],
        [2, 0, '△'], [2, 1, '△'], [2, 2, '△']
	  	]
	  },
    arrow: true,
	  header: TEXT.highLow04,
	  footer: TEXT.pressH,
  },

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 9,
	  mine: 27,
	  boardSetting: {
		  time: 300,
      red: 1,
      orange: 1,
      yellow: 2,
      green: 2,
      oddEven: 2,
      highLow: 3
	  }
	},

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 9,
	  mine: 27,
	  boardSetting: {
		  time: 300,
      red: 1,
      orange: 1,
      yellow: 2,
      green: 3,
      oddEven: 1,
      highLow: 4
	  }
	},

  {
	  type: 'game',
	  xCount: 11,
	  yCount: 9,
	  mine: 29,
	  boardSetting: {
		  time: 300,
      red: 2,
      orange: 2,
      yellow: 3,
      green: 3,
      oddEven: 3,
      highLow: 4
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.newHintTitle,
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      ensured: [
        [2, 0, 2], [1, 1, 3, 'blue'],
        [0, 2, 2], [2, 2, 2]
      ],
      mine: [
        [0, 0], [1, 0], [0, 1],
        [2, 1], [1, 2]
      ],
    },
	  header: TEXT.newHintBlue,
    footer: TEXT.pressH,
  },

  {
	  type: 'game',
	  xCount: 11,
	  yCount: 9,
	  mine: 29,
	  boardSetting: {
		  time: 300,
      red: 2,
      orange: 2,
      yellow: 2,
      green: 2,
      blue: 4,
      oddEven: 2,
      highLow: 2
	  }
	},

  // STAGE 35
  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 300,
      red: 1,
      orange: 1,
      yellow: 2,
      green: 2,
      blue: 6,
      oddEven: 4,
      highLow: 2
	  }
	},

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 360,
      get red() { return randRange(1, 2); },
      get orange() { return randRange(1, 2); },
      get yellow() { return randRange(1, 3); },
      get green() { return randRange(1, 3); },
      get blue() { return randRange(3, 5); },
      get oddEven() { return randRange(3, 5); },
      get highLow() { return randRange(2, 4); },
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.newHintTitle,
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      ensured: [
        [1, 0, 3], [2, 0, 2], [1, 1, 2, 'navy'],
        [0, 2, 2], [2, 2, 2]
      ],
      mine: [
        [0, 0], [0, 1],
        [2, 1], [1, 2]
      ],
    },
	  header: TEXT.newHintNavy,
    footer: TEXT.pressH,
  },

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 360,
      get red() { return randRange(1, 2); },
      get orange() { return randRange(1, 2); },
      get yellow() { return randRange(1, 2); },
      get green() { return randRange(1, 2); },
      get blue() { return randRange(1, 2); },
      get navy() { return randRange(5, 6); },
      get oddEven() { return randRange(2, 4); },
      get highLow() { return randRange(1, 3); },
	  }
	},

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 360,
      get red() { return randRange(1, 3); },
      get orange() { return randRange(1, 3); },
      get yellow() { return randRange(1, 3); },
      get green() { return randRange(1, 3); },
      get blue() { return randRange(1, 3); },
      get navy() { return randRange(4, 6); },
      get oddEven() { return randRange(3, 5); },
      get highLow() { return randRange(2, 4); },
	  }
	},

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 360,
      get red() { return randRange(2, 3); },
      get orange() { return randRange(2, 3); },
      get yellow() { return randRange(3, 4); },
      get green() { return randRange(3, 4); },
      get blue() { return randRange(4, 5); },
      get navy() { return randRange(4, 5); },
      get oddEven() { return randRange(5, 6); },
      get highLow() { return randRange(3, 5); },
	  }
	},

  // STAGE 40
  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 360,
      get red() { return randRange(2, 3); },
      get orange() { return randRange(2, 3); },
      get yellow() { return randRange(3, 4); },
      get green() { return randRange(3, 4); },
      get blue() { return randRange(4, 5); },
      get navy() { return randRange(4, 5); },
      get oddEven() { return randRange(5, 7); },
      get highLow() { return randRange(4, 6); },
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.stage40Bonus01,
	  article: {
      type: 'text', 
      text: TEXT.stage40Bonus02
    },
	  header: TEXT.stageBonusHeader,
    bonus: {
      life: 1, 
      item1: 3,
      item2: 1,
	  item3: 1
    }
  },

	{
	  type: 'info',
    layout: 'article',
    title: TEXT.newHintTitle,
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      ensured: [
        [0, 0, 2], [1, 1, 0, 'purple', [0, 4, 6, 8]],
        [0, 2, 2], [2, 2, 2]
      ],
      mine: [
        [1, 0], [2, 0], [0, 1],
        [2, 1], [1, 2]
      ],
    },
	  header: TEXT.newHintPurple,
    footer: TEXT.pressH,
  },

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 35,
	  boardSetting: {
		  time: 420,
      get red() { return randRange(1, 3); },
      get orange() { return randRange(1, 3); },
      get yellow() { return randRange(3, 4); },
      get green() { return randRange(3, 4); },
      get blue() { return randRange(4, 5); },
      get navy() { return randRange(4, 5); },
      get purple() { return randRange(3, 4); },
      get oddEven() { return randRange(4, 6); },
      get highLow() { return randRange(4, 6); },
	  }
	},

  {
	  type: 'game',
	  xCount: 12,
	  yCount: 10,
	  mine: 42,
	  boardSetting: {
		  time: 480,
      get red() { return randRange(1, 3); },
      get orange() { return randRange(1, 3); },
      get yellow() { return randRange(3, 4); },
      get green() { return randRange(3, 4); },
      get blue() { return randRange(3, 4); },
      get navy() { return randRange(3, 4); },
      get purple() { return randRange(4, 6); },
      get oddEven() { return randRange(5, 7); },
      get highLow() { return randRange(5, 6); },
	  }
	},

  {
	  type: 'game',
	  xCount: 14,
	  yCount: 10,
	  mine: 49,
	  boardSetting: {
		  time: 480,
      get red() { return randRange(2, 5); },
      get orange() { return randRange(2, 5); },
      get yellow() { return randRange(4, 5); },
      get green() { return randRange(4, 5); },
      get blue() { return randRange(4, 5); },
      get navy() { return randRange(4, 5); },
      get purple() { return randRange(6, 8); },
      get oddEven() { return randRange(6, 8); },
      get highLow() { return randRange(5, 6); },
	  }
	},

  {
	  type: 'game',
	  xCount: 16,
	  yCount: 10,
	  mine: 60,
	  boardSetting: {
		  time: 600,
      get red() { return randRange(2, 5); },
      get orange() { return randRange(2, 5); },
      get yellow() { return randRange(4, 6); },
      get green() { return randRange(4, 6); },
      get blue() { return randRange(4, 6); },
      get navy() { return randRange(4, 6); },
      get purple() { return randRange(6, 8); },
      get oddEven() { return randRange(6, 8); },
      get highLow() { return randRange(5, 6); },
	  }
	},
  
  // STAGE 45
  {
	  type: 'game',
	  xCount: 20,
	  yCount: 10,
	  mine: 90,
	  boardSetting: {
		  time: 900,
      get red() { return randRange(4, 7); },
      get orange() { return randRange(4, 7); },
      get yellow() { return randRange(5, 7); },
      get green() { return randRange(5, 7); },
      get blue() { return randRange(6, 7); },
      get navy() { return randRange(6, 7); },
      get purple() { return randRange(7, 10); },
      get oddEven() { return randRange(10, 12); },
      get highLow() { return randRange(8, 11); },
	  }
	},
];

const getProcedure = (modeId) => {
  const game = MODE_CHALLENGE[modeId];
  const add = game?.add ?? [];
  return [
    { type: 'input' },
    ...add,
    MODE_CHALLENGE[modeId]
  ];
};

const MODE_CHALLENGE = [

  {
    type: 'game',
    xCount: 8,
    yCount: 8,
    mine: 20,
    boardSetting: {
      time: 90
    },
    selectInfo: {
      name: '초급 01',
      difficulty: 1,
      item: [5, 3, 1]
    }
  },

  {
    type: 'game',
    xCount: 8,
    yCount: 8,
    mine: 20,
    boardSetting: {
      time: 90,
      get red() { return randRange(2, 3); },
      get orange() { return randRange(2, 3); },
    },
    selectInfo: {
      name: '초급 02',
      difficulty: 1,
      item: [5, 3, 1]
    }
  },

  {
    type: 'game',
    xCount: 8,
    yCount: 8,
    mine: 20,
    boardSetting: {
      time: 100,
      get red() { return randRange(2, 4); },
      get orange() { return randRange(2, 4); },
      get oddEven() { return randRange(2, 3); },
    },
    selectInfo: {
      name: '초급 03',
      difficulty: 1,
      item: [5, 3, 1]
    }
  },

  {
    type: 'game',
    xCount: 9,
    yCount: 9,
    mine: 26,
    boardSetting: {
      time: 110,
      get red() { return randRange(2, 4); },
      get orange() { return randRange(2, 4); },
      get yellow() { return randRange(2, 3); },
      get oddEven() { return randRange(3, 4); },
    },
    selectInfo: {
      name: '초급 04',
      difficulty: 1,
      item: [5, 3, 1]
    }
  },

  {
    type: 'game',
    xCount: 9,
    yCount: 9,
    mine: 26,
    boardSetting: {
      time: 110,
      get yellow() { return randRange(4, 5); },
      get green() { return randRange(4, 5); },
    },
    selectInfo: {
      name: '초급 05',
      difficulty: 1,
      item: [5, 3, 1]
    }
  },

  {
    type: 'game',
    xCount: 9,
    yCount: 9,
    mine: 26,
    boardSetting: {
      time: 120,
      get yellow() { return randRange(8, 11); },
      get green() { return randRange(8, 11); },
      get oddEven() { return randRange(4, 7); },
    },
    selectInfo: {
      name: '초급 06',
      difficulty: 1,
      item: [5, 3, 1],
    }
  },

  {
    type: 'game',
    xCount: 8,
    yCount: 8,
    mine: 23,
    boardSetting: {
      time: 135,
      red: 32,
      orange: 32
    },
    selectInfo: {
      name: '중급 01',
      difficulty: 2,
      item: [5, 3, 1],
    }
  },

  {
    type: 'game',
    xCount: 8,
    yCount: 8,
    mine: 23,
    boardSetting: {
      time: 150,
      blue: 32,
      navy: 32
    },
    selectInfo: {
      name: '중급 02',
      difficulty: 2,
      item: [5, 3, 1],
    }
  },

  {
    type: 'game',
    xCount: 10,
    yCount: 10,
    mine: 35,
    boardSetting: {
      time: 210,
      get red() { return randRange(2, 4); },
      get orange() { return randRange(2, 4); },
      get yellow() { return randRange(3, 5); },
      get green() { return randRange(3, 5); },
      get blue() { return randRange(3, 5); },
      get navy() { return randRange(3, 5); },
      get oddEven() { return randRange(4, 6); },
    },
    selectInfo: {
      name: '중급 03',
      difficulty: 2,
      item: [10, 5, 2],
    }
  },

  {
    type: 'game',
    xCount: 10,
    yCount: 10,
    mine: 32,
    boardSetting: {
      time: 210,
      block: [0, [
        33, 34, 35,
        36, 46, 56,
        66, 65, 64,
        63, 53, 43
      ]]
    },
    selectInfo: {
      name: '중급 04',
      difficulty: 2,
      item: [5, 3, 1, 7],
    },
    add: [
      {
        type: 'info',
        layout: 'article',
        title: TEXT.newElementTitle01,
        article: {
          type: 'board',
          xCount: 4,
          yCount: 4,
          ensured: [
            [1, 1, 1], [1, 2, 1],
            [2, 1, 1], [2, 2, 1], [0, 2, 1]
          ],
          block: [
            [0, 0], [1, 0], [2, 0],
            [3, 0], [3, 1], [3, 2],
            [3, 3], [2, 3], [1, 3],
            [0, 3], [0, 1]
          ],
          me: [2, 1]
        },
        header: TEXT.newElementBlock01,
        footer: TEXT.pressH2,
      },

      {
        type: 'info',
        layout: 'leftRight',
        title: TEXT.introduceItem401,
        half1: {
          type: 'board',
          xCount: 3,
          yCount: 4,
          ensured: [
            [1, 1, 0], [1, 2, 0]
          ],
          block: [
            [0, 0], [1, 0],
            [2, 0], [2, 1], [2, 2],
            [2, 3], [1, 3],
            [0, 3], [0, 2], [0, 1]
          ],
          me: [1, 1],
        },
        half2: {
          type: 'board',
          xCount: 3,
          yCount: 4,
          open: [[2, 1, 1]],
          ensured: [
            [1, 1, 0], [1, 2, 0]
          ],
          block: [
            [0, 0], [1, 0],
            [2, 0], [2, 2],
            [2, 3], [1, 3],
            [0, 3], [0, 2], [0, 1]
          ],
          me: [1, 1]
        },
        arrow: true,
        header: TEXT.introduceItem402,
        footer: TEXT.pressH2
      },

      {
        type: 'info',
        layout: 'article',
        title: TEXT.newElementTitle02,
        article: {
          type: 'board',
          xCount: 4,
          yCount: 4,
          yellowgreen: [[3, 3]],
          ensured: [
            [0, 0, 1], [0, 1, 1],
            [1, 0, 1], [1, 1, 1], [3, 3, '']
          ],
          mine: [[3, 1]],
          block: [
            [2, 2], [2, 3]
          ],
          me: [0, 0]
        },
        header: TEXT.newElementBlock02,
        footer: TEXT.pressH2,
      },

      {
        type: 'info',
        layout: 'article',
        title: TEXT.newElementTitle03,
        article: {
          type: 'text',
          text: TEXT.newElementBlock03
        },
        footer: TEXT.pressH3
      }
    ]
  },

  {
    type: 'game',
    xCount: 8,
    yCount: 8,
    mine: 24,
    boardSetting: {
      time: 240,
      get red() { return randRange(2, 4); },
      get orange() { return randRange(2, 4); },
      get oddEven() { return randRange(6, 8); },
      block: [0, [
        2, 5, 10, 13,
        16, 17, 19,
        20, 22, 23,
        26, 29, 34, 37,
        40, 41, 43,
        44, 46, 47,
        50, 53, 58, 61
      ]]
    },
    selectInfo: {
      name: '중급 05',
      difficulty: 2,
      item: [10, 5, 2, 12]
    },
  },

  {
    type: 'game',
    xCount: 15,
    yCount: 6,
    mine: 30,
    boardSetting: {
      time: 180,
      yellow: 90,
      oddEven: 90
    },
    selectInfo: {
      name: '중급 06',
      difficulty: 2,
      item: [5, 3, 1]
    }
  },

  {
    type: 'game',
    xCount: 9,
    yCount: 9,
    mine: 25,
    boardSetting: {
      time: 600,
      red: 13,
      orange: 13,
      yellow: 12,
      green: 12,
      blue: 11,
      navy: 11,
      purple: 9,
      highLow: 81
    },
    selectInfo: {
      name: '고급 01',
      difficulty: 3,
      item: [10, 5, 2]
    }
  },

  {
    type: 'game',
    xCount: 9,
    yCount: 9,
    mine: 30,
    boardSetting: {
      time: 480,
      purple: 81,
      oddEven: 15,
      highLow: 15

    },
    selectInfo: {
      name: '고급 02',
      difficulty: 3,
      item: [10, 5, 2]
    }
  },

  {
    type: 'game',
    xCount: 10,
    yCount: 10,
    mine: 35,
    boardSetting: {
      time: 450,
      red: 10,
      orange: 10,
      yellow: 10,
      green: 10,
      blue: 10,
      navy: 10,
      purple: 10,
      oddEven: 25,
      highLow: 25,
      block: [20, []]
    },
    selectInfo: {
      name: '고급 03',
      difficulty: 3,
      item: [10, 5, 2, 12]
    }
  },

  {
    type: 'game',
    xCount: 12,
    yCount: 10,
    mine: 42,
    boardSetting: {
      time: 450,
      red: 10,
      orange: 10,
      yellow: 12,
      green: 12,
      blue: 15,
      navy: 15,
      purple: 20,
      oddEven: 25,
      highLow: 20,
      plus: true
    },
    selectInfo: {
      name: '고급 04',
      difficulty: 4,
      item: [10, 5, 2]
    },
    add: [
      {
        type: 'info',
        layout: 'leftRight',
        title: TEXT.newElementTitle04,
        half1: {
          type: 'board',
          xCount: 3,
          yCount: 3,
          ensured: [
            [0, 0, 2], [1, 0, 2], [2, 0, 1],
            [0, 1, 1], [1, 1, 4], [2, 1, 3],
            [0, 2, 2], [1, 2, 1], [2, 2, 2]
          ]
        },
        half2: {
          type: 'board',
          xCount: 3,
          yCount: 3,
          ensured: [
            [0, 0, 2], [1, 0, 2], [2, 0, 1],
            [0, 1, 1], [1, 1, '+'], [2, 1, 3],
            [0, 2, 2], [1, 2, 1], [2, 2, 2]
          ]
        },
        arrow: true,
        header: TEXT.newElementPlus01,
        footer: TEXT.pressH2,
      },

      {
        type: 'info',
        layout: 'leftRight',
        title: TEXT.newElementTitle04,
        half1: {
          type: 'board',
          xCount: 3,
          yCount: 3,
          ensured: [
            [0, 0, 2], [1, 0, 2], [2, 0, 1],
            [0, 1, 1], [1, 1, 4], [2, 1, 3],
            [0, 2, 2], [1, 2, 1], [2, 2, 2]
          ]
        },
        half2: {
          type: 'board',
          xCount: 3,
          yCount: 3,
          ensured: [
            [0, 0, 2], [1, 0, 2], [2, 0, 1],
            [0, 1, 1], [1, 1, '+'], [2, 1, 3],
            [0, 2, 2], [1, 2, 1], [2, 2, 2]
          ]
        },
        arrow: true,
        header: TEXT.newElementPlus02,
        footer: TEXT.pressH3,
      }
    ]
  },

  {
    type: 'game',
    xCount: 13,
    yCount: 10,
    mine: 45,
    boardSetting: {
      time: 540,
      purple: 130,
      oddEven: 20,
      highLow: 20,
      block: [0, [
        1, 3, 5, 7, 9, 11,
        26, 28, 30, 32, 34, 36, 38,
        53, 55, 57, 59, 61, 63,
        78, 80, 82, 84, 86, 88, 90,
        105, 107, 109, 111, 113, 115
      ]]
    },
    selectInfo: {
      name: '고급 05',
      difficulty: 4,
      item: [10, 5, 2, 17]
    }
  },

  {
    type: 'game',
    xCount: 17,
    yCount: 11,
    mine: 75,
    boardSetting: {
      time: 720,
      red: 20,
      orange: 20,
      yellow: 25,
      green: 25,
      blue: 30,
      navy: 30,
      purple: 30,
      oddEven: 35,
      highLow: 30,
      plus: true,
      block: [0, [
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        32, 49, 66, 83, 100, 117, 134, 151,
        168, 167, 166, 165, 164, 163, 162, 161, 160, 159, 158, 157, 156, 155,
        154, 137, 120, 103, 86, 69,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
        64, 81, 98, 115,
        132, 131, 130, 129, 128, 127, 126, 125, 124, 123,
        122, 105,
        88, 89, 90, 91, 92, 93, 94, 95, 96
      ]]
    },
    selectInfo: {
      name: '고급 06',
      difficulty: 5,
      item: [15, 7, 3, 45]
    }
  }

];

const MODE_SURVIVAL = [

  {
    type: 'input'
  },

  {
    type: 'info',
    layout: 'leftRight',
    title: TEXT.survivalMode01,
    half1: {
      type: 'board',
      xCount: 6,
      yCount: 3,
      ensured: [
        [0, 1, 2], [0, 2, 1], [2, 1, 3],
        [1, 0, 2], [1, 1, 3], [2, 2, 2],
        [3, 0, 2], [3, 1, 3], [4, 1, 3],
        [4, 2, 2], [5, 0, 1], [5, 1, 2]
      ],
      mine: [
        [0, 0], [1, 2], [2, 0], [3, 2], [4, 0], [5, 2]
      ],
      me: [2, 1]
    },
    half2: {
      type: 'board',
      xCount: 6,
      yCount: 3,
      ensured: [
        [0, 0, 1], [0, 1, 2], [1, 1, 3],
        [1, 2, 2], [2, 0, 2], [2, 1, 3],
        [3, 1, 3], [3, 2, 2], [4, 0, 1],
        [4, 1, 3], [5, 0, 0], [5, 1, 2]
      ],
      mine: [
        [0, 2], [1, 0], [2, 2], [3, 0], [4, 2], [5, 2]
      ],
      me: [1, 1]
    },
    arrow: true,
    header: TEXT.survivalMode02,
    footer: TEXT.pressH2,
  },

  {
    type: 'info',
    layout: 'leftRight',
    title: TEXT.survivalMode01,
    half1: {
      type: 'board',
      xCount: 6,
      yCount: 3,
      ensured: [
        [0, 1, 2], [0, 2, 1], [2, 1, 3],
        [1, 0, 2], [1, 1, 3], [2, 2, 2],
        [3, 0, 2], [3, 1, 3], [4, 1, 3],
        [4, 2, 2], [5, 0, 1], [5, 1, 2]
      ],
      mine: [
        [0, 0], [1, 2], [2, 0], [3, 2], [4, 0], [5, 2]
      ],
      me: [2, 1]
    },
    half2: {
      type: 'board',
      xCount: 6,
      yCount: 3,
      ensured: [
        [0, 0, 1], [0, 1, 2], [1, 1, 3],
        [1, 2, 2], [2, 0, 2], [2, 1, 3],
        [3, 1, 3], [3, 2, 2], [4, 0, 1],
        [4, 1, 3], [5, 0, 0], [5, 1, 2]
      ],
      mine: [
        [0, 2], [1, 0], [2, 2], [3, 0], [4, 2], [5, 2]
      ],
      me: [1, 1]
    },
    arrow: true,
    header: TEXT.survivalMode03,
    footer: TEXT.pressH2,
  },

  {
    type: 'info',
    layout: 'article',
    title: TEXT.survivalMode01,
    article: {
      type: 'text',
      text: TEXT.survivalMode04
    },
    footer: TEXT.pressH2,
  },

  {
    type: 'info',
    layout: 'article',
    title: TEXT.survivalMode01,
    article: {
      type: 'text',
      text: TEXT.survivalMode05
    },
    footer: TEXT.pressH2,
  },

  {
    type: 'info',
    layout: 'article',
    title: TEXT.survivalMode01,
    article: {
      type: 'text',
      text: TEXT.survivalMode06
    },
    footer: TEXT.pressH2,
  },

  {
    type: 'survival',
    xCount: 15,
    yCount: 7,
    mine: 30,
    boardSetting: {
      time: 0,
      specialCells: {
        get start() { return randRange(0, 6) * 15; },
        get destination() { return randRange(1, 7) * 15 - 1; } 
      },
      itemDrop: 3
    }
  },

  {
    type: 'survivalSetting',
    mine: 31,
    boardSetting: {
      get red() { return randRange(4, 6); },
      get orange() { return randRange(4, 6); },
      itemDrop: 3
    }
  },

  {
    type: 'survivalSetting',
    mine: 32,
    boardSetting: {
      get red() { return randRange(3, 5); },
      get orange() { return randRange(3, 5); },
      get oddEven() { return randRange(4, 6); },
      itemDrop: 4
    }
  },

  {
    type: 'survivalSetting',
    mine: 33,
    boardSetting: {
      get red() { return randRange(3, 5); },
      get orange() { return randRange(3, 5); },
      get yellow() { return randRange(3, 5); },
      get green() { return randRange(3, 5); },
      get oddEven() { return randRange(4, 6); },
      itemDrop: 4
    }
  },

  {
    type: 'survivalSetting',
    mine: 34,
    boardSetting: {
      get red() { return randRange(3, 5); },
      get orange() { return randRange(3, 5); },
      get yellow() { return randRange(3, 5); },
      get green() { return randRange(3, 5); },
      get blue() { return randRange(3, 5); },
      get navy() { return randRange(3, 5); },
      get oddEven() { return randRange(4, 6); },
      itemDrop: 5
    }
  },

  {
    type: 'survivalSetting',
    mine: 35,
    boardSetting: {
      get red() { return randRange(3, 5); },
      get orange() { return randRange(3, 5); },
      get yellow() { return randRange(3, 5); },
      get green() { return randRange(3, 5); },
      get blue() { return randRange(3, 5); },
      get navy() { return randRange(3, 5); },
      get oddEven() { return randRange(4, 6); },
      get highLow() { return randRange(4, 6); },
      itemDrop: 5
    }
  },

  {
    type: 'survivalSetting',
    mine: 36,
    boardSetting: {
      get red() { return randRange(3, 5); },
      get orange() { return randRange(3, 5); },
      get yellow() { return randRange(3, 5); },
      get green() { return randRange(3, 5); },
      get blue() { return randRange(3, 5); },
      get navy() { return randRange(3, 5); },
      get purple() { return randRange(3, 5); },
      get oddEven() { return randRange(4, 6); },
      get highLow() { return randRange(4, 6); },
      get itemDrop() { return randRange(4, 6); },
    }
  },

  {
    type: 'survivalSetting',
    mine: 37,
    boardSetting: {
      get red() { return randRange(2, 3); },
      get orange() { return randRange(2, 3); },
      get yellow() { return randRange(3, 5); },
      get green() { return randRange(3, 5); },
      get blue() { return randRange(3, 5); },
      get navy() { return randRange(3, 5); },
      get purple() { return randRange(3, 5); },
      get oddEven() { return randRange(5, 7); },
      get highLow() { return randRange(5, 7); },
      get block() { return [randRange(3, 5), []]; },
      get itemDrop() { return randRange(4, 6); },
    }
  },

  {
    type: 'survivalSetting',
    mine: 38,
    boardSetting: {
      get red() { return randRange(2, 3); },
      get orange() { return randRange(2, 3); },
      get yellow() { return randRange(3, 6); },
      get green() { return randRange(3, 6); },
      get blue() { return randRange(3, 6); },
      get navy() { return randRange(3, 6); },
      get purple() { return randRange(4, 6); },
      get oddEven() { return randRange(6, 8); },
      get highLow() { return randRange(6, 8); },
      get block() { return [randRange(4, 6), []]; },
      get itemDrop() { return randRange(4, 6); },
    }
  },

  {
    type: 'survivalSetting',
    mine: 39,
    boardSetting: {
      get red() { return randRange(2, 4); },
      get orange() { return randRange(2, 4); },
      get yellow() { return randRange(4, 7); },
      get green() { return randRange(4, 7); },
      get blue() { return randRange(4, 7); },
      get navy() { return randRange(4, 7); },
      get purple() { return randRange(4, 7); },
      get oddEven() { return randRange(6, 8); },
      get highLow() { return randRange(6, 8); },
      get block() { return [randRange(5, 7), []]; },
      get itemDrop() { return randRange(4, 6); },
    }
  },

  {
    type: 'survivalSetting',
    get mine() { return randRange(35, 45); },
    isFinalSetting: true,
    boardSetting: {
      get red() { return randRange(2, 4); },
      get orange() { return randRange(2, 4); },
      get yellow() { return randRange(3, 6); },
      get green() { return randRange(3, 6); },
      get blue() { return randRange(3, 6); },
      get navy() { return randRange(3, 6); },
      get purple() { return randRange(3, 6); },
      get oddEven() { return randRange(5, 8); },
      get highLow() { return randRange(4, 8); },
      get block() { return [randRange(3, 8), []]; },
      get itemDrop() { return randRange(3, 9); },
    }
  }
];

const SURVIVAL_DELAY = 10000;
const SURVIVAL_INIT_RATIO = 0.92;
const SURVIVAL_FINAL_RATIO = 0.97;

const BLOCK_MAPS = [9, 10, 14, 16, 17];

const LICENSE = [
  [
    '스테이지 클리어 효과음',
    `CC0 1.0 Universal made by DayDreamSound<br>
    https://youtu.be/kfnh9QAfDgA`
  ],
  [
    '지뢰 폭발음',
    `Thanks to, Mike Koenig<br>
    From: http://soundbible.com/1151-Grenade.html<br>
    Distributor: 저작권 걱정없는 유튜브용 음원 & 무료 효과음 서비스 ‘뮤팟’<br>
    https://www.mewpot.com`
  ],
  [
    '패배 효과음',
    `CC0 1.0 Universal<br>
    Short jingles by Kenney Vleugels (www.kenney.nl)`
  ],
  [
    '생존 모드 맵 이동 효과음',
    `CC0 1.0 Universal made by qubodup https://freesound.org/people/qubodup/packs/12143/`
  ],
  [
    '아이템 사용 효과음',
    `Thanks to, KevanGC<br>
    From: http://soundbible.com/1645-Pling.html<br>
    Distributor: 저작권 걱정없는 유튜브용 음원 & 무료 효과음 서비스 ‘뮤팟’<br>
    https://www.mewpot.com`
  ],
  [
    '벽 파괴 효과음',
    `Thanks to, Mike Koenig<br>
    From: http://soundbible.com/1761-Glass-Breaking.html<br>
    Distributor: 저작권 걱정없는 유튜브용 음원 & 무료 효과음 서비스 ‘뮤팟’<br>
    https://www.mewpot.com`
  ],
  [
    '아이템 획득 효과음',
    `CC0 1.0 Universal made by DayDreamSound<br>
    https://youtu.be/kfnh9QAfDgA`
  ],
  [
    '힌트 모양 효과음',
    `Thanks to, DeepFrozenApps<br>
    From: http://soundbible.com/2044-Tick.html<br>
    Distributor: 저작권 걱정없는 유튜브용 음원 & 무료 효과음 서비스 ‘뮤팟’<br>
    https://www.mewpot.com`
  ],
  [
    '30초 카운트다운 효과음',
    `CC BY-NC 4.0<br>
    Artist: Alexander<br>
    From: https://orangefreesounds.com/stopwatch-sound-effect/#google_vignette`
  ],
  [
    '아이템 사용 불가 효과음',
    `CC0 1.0 Universal<br>
    Short jingles by Kenney Vleugels (www.kenney.nl)`
  ]
];

[
  colorMatch, itemMatch, shapeMatch, textHintMatch, RAINBOW, TEXT_HINT,
  OFFSET_X, OFFSET_Y, 
  OFFSET5_X, OFFSET5_Y, 
  TEXT, BUTTON, TUTORIAL, 
  MODE_CLASSIC, MODE_CHALLENGE, MODE_SURVIVAL,
  LICENSE
].forEach(obj => Object.freeze(obj));