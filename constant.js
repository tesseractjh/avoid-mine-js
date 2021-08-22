// Constant Values
const BLACK                = 'rgb(  0,   0,   0)';
const WHITE                = 'rgb(255, 255, 255)';
const CHARCOAL             = 'rgb( 70,  70,  70)';
const LIGHTGRAY            = 'rgb(220, 220, 220)';
const YELLOWGREEN          = 'rgb(154, 205,  50)';
const INVERTED_YELLOWGREEN = 'rgb(101,  50, 205)';
const TOMATO               = 'rgb(255,  99,  71)';
const INVERTED_TOMATO      = 'rgb( 20, 175, 207)';
const SKYBLUE              = 'rgb(135, 206, 235)';
const RED                  = 'rgb(255,   0,   0)';
const ORANGE               = 'rgb(255, 128,   0)';
const YELLOW               = 'rgb(255, 255,   0)';
const GREEN                = 'rgb(  0, 255,   0)';
const BLUE                 = 'rgb( 51, 153, 255)';
const NAVY                 = 'rgb(  0,   0, 128)';
const PURPLE               = 'rgb(127,   0, 255)';

const WHITE_ALPHA          = 'rgba(255, 255, 255, 0.95)';
const WHITE_ALPHA2         = 'rgba(255, 255, 255, 0.70)';
const RED_ALPHA            = 'rgba(255,   0,   0, 0.75)';
const ORANGE_ALPHA         = 'rgba(255, 128,   0, 0.75)';
const YELLOW_ALPHA         = 'rgba(255, 255,   0, 0.75)';
const GREEN_ALPHA          = 'rgba(  0, 255,   0, 0.75)';
const BLUE_ALPHA           = 'rgba( 51, 153, 255, 0.75)';
const NAVY_ALPHA           = 'rgba(  0,   0, 128, 0.75)';
const PURPLE_ALPHA         = 'rgba(127,   0, 255, 0.75)';

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

const shapeMatch = {
  red: [10, 11, 12, 13, 14],
  orange: [2, 7, 12, 17, 22],
  yellow: [1, 3, 4, 5, 7],
  green: [0, 2, 4, 6, 8],
  blue: [0, 2, 3, 4, 5, 6, 8],
  navy: [0, 1, 2, 4, 6, 7, 8]
};

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

const TEXT = {
	mainTitle: '지　뢰　피　하　기',
  mainButton01: '게임설명',
  mainButton02: '게임시작',
  tutorialButton01: '이전',
  tutorialButton02: '다음',
  tutorial01: '지뢰피하기는 좌측 상단 시작점에서 우측 하단 도착점까지\n지뢰를 피해서 도달하면 승리하는 게임입니다.',
  tutorial02: '칸에 적힌 숫자는 해당 칸과 주변 8칸을 포함한\n9칸 내에 존재하는 지뢰의 개수입니다.',
  tutorial03: '파란색 네모를 움직이면 주변 칸들의 숫자가 공개됩니다.\n시작점 근처 칸들의 숫자와 지뢰는 시작할 때 공개됩니다.',
  tutorial04: '숫자 힌트로는 여기까지가 한계입니다.\n이렇게 운에 의존해야 하는 상황이 종종 발생할 것입니다.',
  tutorial05: 'L키를 누르면 파란색 네모 주변에 아직 밟지 않은 칸들 중\n무작위로 하나를 공개하는 아이템을 사용할 수 있습니다.',
  tutorial06: '이 외에도 J키, K키로 무작위 칸을 공개하는\n아이템을 사용할 수 있고 횟수 제한이 있습니다.',
  tutorial07: '파란색 네모를 WASD키로 조작하여 움직일 수 있습니다.\n도착점까지 직접 들어가보세요!',
  bottomBar01: 'STAGE',
  bottomBar02: '💖',
  bottomBar03: '점수',
  bottomBar04: '⏱',
  bottomBar05: '🔍[J]',
  bottomBar06: '🔭[K]',
  bottomBar07: '📡[L]',
  destination: '도착! 메인화면으로 이동합니다.',
  ensuredMine: '💣',
  msgBox01: '지뢰를 밟았습니다!',
  msgBox02: '🔍[J] 아이템을 사용했습니다',
  msgBox03: '🔍[J] 아이템이 없습니다!',
  msgBox04: '🔭[K] 아이템을 사용했습니다',
  msgBox05: '🔭[K] 아이템이 없습니다!',
  msgBox06: '📡[L] 아이템을 사용했습니다',
  msgBox07: '📡[L] 아이템이 없습니다!',
  msgBox08: '더 이상 공개할 수 있는 칸이 없습니다!',
  msgBox09: '색깔 힌트의 지뢰 범위를 표시를 해제합니다.',
  msgBox10: '색깔 힌트의 지뢰 범위를 표시합니다.',  
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
      detected: [
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
      detected: [
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

const randRange = (start, end) => {
  return Math.floor(Math.random()*(end-start+1)) + start;
}

const GAME_PROCEDURE = [

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
	  title: '🔍[J]',
	  half1: {
		  type: 'board',
		  xCount: 3,
		  yCount: 4,
		  safe:[
			  [0, 1, 1], [1, 0, 1], [1, 1, 1]
			], 
		  me: [0, 0],
	  },
	  half2: {
		  type: 'board',
		  xCount: 3,
		  yCount: 4,
		  safe: [
			  [0, 1, 1], [1, 0, 1], [1, 1, 1]
			],
		  ensured: [
        [1, 2, 3]
      ],
      me: [0, 0]
		},
    arrow: true,
    header: 'J키를 눌러 내 주변 2칸 이내에 있는 25칸 중<br>공개되지 않은 무작위 칸의 숫자 힌트를 공개할 수 있습니다.',
    footer: 'H를 눌러 🔍 10개를 받으세요!',
    bonus: {
    	itemJ: 10
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
    title: '🔭[K]',
	  half1: {
      type: 'board',
      xCount: 3,
      yCount: 4,
      safe: [
        [0, 1, 1], [1, 0, 1], [1, 1, 1]
      ],
      me: [0, 0]
    },
	  half2: {
      type: 'board',
      xCount: 3,
      yCount: 4,
      safe: [
        [0, 1, 1], [1, 0, 1],
        [1, 1, 1], [1, 2, 3]
      ],
      me: [0, 0]
    },
    arrow: true,
	  header: 'K키를 눌러 주변 2칸 이내에 있는 25칸 중<br>공개되지 않은 무작위 칸을 공개할 수 있습니다.<br>만약 그 칸이 지뢰가 아니면 숫자 힌트를, 지뢰라면 지뢰를 표시합니다.',
    footer: 'H를 눌러 🔭 5개를 받으세요!',
    bonus: {
      itemK: 5
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
    title: '📡[L]',
	  half1: {
      type: 'board',
      xCount: 3,
      yCount: 4,
      safe: [
        [0, 0, 0], [0, 1, 1],
        [1, 0, 1], [1, 1, 1]
      ],
      ensured: [
        [0, 2, 3], [1, 2, 4], [2, 0, 1],
        [2, 1, 1], [2, 1, 3], [2, 2, 3]
      ],
      me: [1, 1]
    },
	  half2: {
      type: 'board',
      xCount: 3,
      yCount: 4,
      safe: [
        [0, 0, 0], [0, 1, 1], [1, 0, 1],
        [1, 1, 1], [2, 1, 1]
      ],
      ensured: [
        [0, 2, 3], [1, 2, 4], [2, 0, 1],
        [2, 1, 3], [2, 2, 3]
      ],
      me: [1, 1]
    },
    arrow: true,
	  header: 'L키를 눌러 내 주변 8칸 중에서 아직 밟지 않은 칸을 공개합니다.<br>만약 그 칸이 지뢰가 아니면 색칠하여 지뢰가 아님을 표시하고,<br>지뢰라면 지뢰를 표시합니다.',
    footer: 'H를 눌러 📡 3개를 받으세요!',
    bonus: {
      itemL: 3
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
    title: '움직임 최적화',
	  article: {
      type: 'text',
      text: '최대한 적게 움직이세요!<br>STAGE 6부터는 움직임을 최소화하면 보너스 점수를 얻습니다.'
    },
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
    title: 'STAGE 10 클리어 보너스',
	  article: {
      type: 'text', 
      text: '💖 +3<br>🔍[J] +10<br>🔭[K] +5<br>📡[L] +3'
    },
	  header: 'H를 눌러 보너스를 받으세요!',
    bonus: {
      life: 3, 
      itemJ: 10, 
      itemK: 5,
      itemL: 3
    }
  },
  
	{
	  type: 'info',
    layout: 'article',
    title: '새로운 힌트',
	  article: {
      type: 'board',
      xCount: 7,
      yCount: 3,
      safe: [
        [2, 1, 1], [3, 1, 2, 'red'], [5, 1, 3]
      ],
      mine: [
        [1, 1], [4, 1]
      ],
    },
	  header: '<span style="color:red;" class="stroke">빨간색 숫자</span>는 양 옆 2칸과 자기 자신을 포함한<br>가로 5칸 내의 지뢰 개수를 의미합니다.',
    footer: 'H를 누르면 다음 스테이지로 이동합니다.',
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
    title: '새로운 힌트',
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 5,
      safe: [
        [1, 1, 1], [1, 2, 2, 'orange'], [1, 4, 3]
      ],
      mine: [
        [1, 0], [1, 3]
      ],
    },
	  header: '<span style="color:rgb(255, 128, 0);" class="stroke">주황색 숫자</span>는 위 아래 2칸과 자기 자신을 포함한<br>세로 5칸 내의 지뢰 개수를 의미합니다.',
    footer: 'H를 누르면 다음 스테이지로 이동합니다.',
  },

	{
	  type: 'info',
    layout: 'leftRight',
    title: '색깔 힌트 모양 표시',
	  half1: {
      type: 'board',
      xCount: 3,
      yCount: 5,
      safe: [
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
      safe: [
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
	  header: '앞으로 새로운 색깔 힌트가 계속 등장할 것입니다.<br>모양이 헷갈린다면 U키를 눌러 각 색깔 힌트의 모양을 확인할 수 있습니다.<br>U키를 한 번 더 누르면 해제할 수 있습니다.',
    footer: 'H를 누르면 다음 스테이지로 이동합니다.',
    bonus: {
      itemL: 3
    }
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
	  title: '홀짝 힌트',
	  half1: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 3,
	  	safe: [
	  		[0, 1, 2], [0, 2, 0], [1, 1, '홀'],
	  		[1, 2, 1], [2, 0, 1], [2, 1, 2]
	  	],
	  	mine: [[0, 0], [1, 0], [2, 2]]
	  },
	  half2: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 3,
	  	safe: [
	  		[0, 1, '짝'], [0, 2, '짝'], [1, 1, 3],
	  		[1, 2, 1], [2, 0, 1], [2, 1, '짝']
	  	],
	  	mine: [
	  		[0, 0], [1, 0], [2, 2]
	  	],
	  },
	  header: '일부 칸의 숫자 힌트가 홀짝 힌트로 전환됩니다.<br>1, 3, 5, 7, 9는 "홀"로,<br>0, 2, 4, 6, 8은 "짝"으로 표시됩니다.',
	  footer: 'H를 누르면 다음 스테이지로 이동합니다.',
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
    title: 'STAGE 20 클리어 보너스',
	  article: {
      type: 'text', 
      text: '💖 +3<br>🔍[J] +7<br>🔭[K] +3<br>📡[L] +2'
    },
	  header: 'H를 눌러 보너스를 받으세요!',
    bonus: {
      life: 3, 
      itemJ: 7, 
      itemK: 3,
      itemL: 2
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
    title: '새로운 힌트',
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      safe: [
        [2, 0, 1], [1, 1, 2, 'yellow'],
        [2, 1, 2], [1, 2, 3]
      ],
      mine: [
        [0, 0], [1, 0], [0, 1],
        [0, 2], [2, 2]
      ],
    },
	  header: '<span style="color:rgb(255, 255, 0);" class="stroke">노란색 숫자</span>는 상하좌우 4칸과 자기 자신을 포함한<br>십자가 모양 5칸 내의 지뢰 개수를 의미합니다.',
    footer: 'H를 누르면 다음 스테이지로 이동합니다.',
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
    title: '새로운 힌트',
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      safe: [
        [2, 0, 1], [1, 1, 3, 'green'],
        [2, 1, 2], [1, 2, 3]
      ],
      mine: [
        [0, 0], [1, 0], [0, 1],
        [0, 2], [2, 2]
      ],
    },
	  header: '<span style="color:rgb(0, 255, 0);" class="stroke">초록색 숫자</span>는 대각선 4칸과 자기 자신을 포함한<br>X자 모양 5칸 내의 지뢰 개수를 의미합니다.',
    footer: 'H를 누르면 다음 스테이지로 이동합니다.',
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
    title: 'STAGE 30 클리어 보너스',
	  article: {
      type: 'text', 
      text: '💖 +2<br>🔍[J] +5<br>🔭[K] +2<br>📡[L] +1'
    },
	  header: 'H를 눌러 보너스를 받으세요!',
    bonus: {
      life: 2, 
      itemJ: 5, 
      itemK: 2,
	  itemL: 1
    }
  },

  {
	  type: 'info',
	  layout: 'leftRight',
	  title: '최대/최소 힌트',
	  half1: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 6,
	  	safe: [
	  		[1, 0, 3], [0, 1, 2], [1, 1, 5],
        [2, 1, 3], [0, 3, 2], [1, 3, 3],
        [2, 3, 2], [0, 4, 1], [1, 4, 1],
        [2, 4, 1], [0, 5, 1], [2, 5, 1]
	  	],
	  	mine: [
        [0, 0], [2, 0], [0, 2],
        [1, 2], [2, 2], [1, 5]
      ]
	  },
	  half2: {
	  	type: 'board',
	  	xCount: 3,
	  	yCount: 6,
	  	safe: [
	  		[1, 0, 3], [0, 1, 2], [1, 1, '▲'],
        [2, 1, 3], [0, 3, 2], [1, 3, 3],
        [2, 3, 2], [0, 4, 1], [1, 4, '▼'],
        [2, 4, 1], [0, 5, 1], [2, 5, 1]
	  	],
	  	mine: [
        [0, 0], [2, 0], [0, 2],
        [1, 2], [2, 2], [1, 5]
      ]
	  },
	  header: '일부 칸의 숫자 힌트가 최대/최소 힌트로 전환됩니다.<br>주변 8칸 숫자들의 최댓값보다 크거나 같다면 ▲,<br>주변 8칸 숫자들의 최솟값보다 작거나 같다면 ▼으로 표시됩니다.',
	  footer: 'H를 누르면 다음 스테이지로 이동합니다.',
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
    title: '새로운 힌트',
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      safe: [
        [2, 0, 2], [1, 1, 3, 'blue'],
        [0, 2, 2], [2, 2, 2]
      ],
      mine: [
        [0, 0], [1, 0], [0, 1],
        [2, 1], [1, 2]
      ],
    },
	  header: '<span style="color:rgb(51, 153, 255);" class="stroke">파란색 숫자</span>는 H자 모양 7칸 내의 지뢰 개수를 의미합니다.',
    footer: 'H를 누르면 다음 스테이지로 이동합니다.',
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
      red: randRange(1, 2),
      orange: randRange(1, 2),
      yellow: randRange(1, 3),
      green: randRange(1, 3),
      blue: randRange(3, 5),
      oddEven: randRange(3, 5),
      highLow: randRange(2, 4)
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: '새로운 힌트',
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      safe: [
        [1, 0, 3], [2, 0, 2], [1, 1, 2, 'navy'],
        [0, 2, 2], [2, 2, 2]
      ],
      mine: [
        [0, 0], [0, 1],
        [2, 1], [1, 2]
      ],
    },
	  header: '<span style="color:rgb(0, 50, 128);">남색 숫자</span>는 工자 모양 7칸 내의 지뢰 개수를 의미합니다.',
    footer: 'H를 누르면 다음 스테이지로 이동합니다.',
  },

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 360,
      red: randRange(1, 2),
      orange: randRange(1, 2),
      yellow: randRange(1, 2),
      green: randRange(1, 2),
      blue: randRange(1, 2),
      navy: randRange(5, 6),
      oddEven: randRange(2, 4),
      highLow: randRange(1, 3)
	  }
	},

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 360,
      red: randRange(1, 3),
      orange: randRange(1, 3),
      yellow: randRange(1, 3),
      green: randRange(1, 3),
      blue: randRange(1, 3),
      navy: randRange(4, 6),
      oddEven: randRange(3, 5),
      highLow: randRange(2, 4)
	  }
	},

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 30,
	  boardSetting: {
		  time: 360,
      red: randRange(2, 3),
      orange: randRange(2, 3),
      yellow: randRange(3, 4),
      green: randRange(3, 4),
      blue: randRange(4, 5),
      navy: randRange(4, 5),
      oddEven: randRange(5, 6),
      highLow: randRange(3, 5)
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
      red: randRange(2, 3),
      orange: randRange(2, 3),
      yellow: randRange(3, 4),
      green: randRange(3, 4),
      blue: randRange(4, 5),
      navy: randRange(4, 5),
      oddEven: randRange(5, 7),
      highLow: randRange(4, 6)
	  }
	},

	{
	  type: 'info',
    layout: 'article',
    title: 'STAGE 40 클리어 보너스',
	  article: {
      type: 'text', 
      text: '💖 +1<br>🔍[J] +3<br>🔭[K] +1<br>📡[L] +1'
    },
	  header: 'H를 눌러 보너스를 받으세요!',
    bonus: {
      life: 1, 
      itemJ: 3,
      itemK: 1,
	  itemL: 1
    }
  },

	{
	  type: 'info',
    layout: 'article',
    title: '새로운 힌트',
	  article: {
      type: 'board',
      xCount: 3,
      yCount: 3,
      safe: [
        [0, 0, 2], [1, 1, 0, 'purple', [0, 4, 6, 8]],
        [0, 2, 2], [2, 2, 2]
      ],
      mine: [
        [1, 0], [2, 0], [0, 1],
        [2, 1], [1, 2]
      ],
    },
	  header: '<span style="color:rgb(127, 0, 255);" class="stroke">보라색 숫자</span>는 2~8칸의 무작위 모양 내의 지뢰 개수를 의미합니다.<br>어떤 모양인지는 숫자가 밝혀질 때 표시됩니다.',
    footer: 'H를 누르면 다음 스테이지로 이동합니다.',
  },

  {
	  type: 'game',
	  xCount: 10,
	  yCount: 10,
	  mine: 35,
	  boardSetting: {
		  time: 420,
      red: randRange(1, 3),
      orange: randRange(1, 3),
      yellow: randRange(3, 4),
      green: randRange(3, 4),
      blue: randRange(4, 5),
      navy: randRange(4, 5),
      purple: randRange(3, 4),
      oddEven: randRange(4, 6),
      highLow: randRange(4, 6)
	  }
	},

  {
	  type: 'game',
	  xCount: 12,
	  yCount: 10,
	  mine: 42,
	  boardSetting: {
		  time: 480,
      red: randRange(1, 3),
      orange: randRange(1, 3),
      yellow: randRange(3, 4),
      green: randRange(3, 4),
      blue: randRange(3, 4),
      navy: randRange(3, 4),
      purple: randRange(4, 6),
      oddEven: randRange(5, 7),
      highLow: randRange(5, 6)
	  }
	},

  {
	  type: 'game',
	  xCount: 14,
	  yCount: 10,
	  mine: 49,
	  boardSetting: {
		  time: 480,
      red: randRange(2, 5),
      orange: randRange(2, 5),
      yellow: randRange(4, 5),
      green: randRange(4, 5),
      blue: randRange(4, 5),
      navy: randRange(4, 5),
      purple: randRange(6, 8),
      oddEven: randRange(6, 8),
      highLow: randRange(5, 6)
	  }
	},

  {
	  type: 'game',
	  xCount: 16,
	  yCount: 10,
	  mine: 60,
	  boardSetting: {
		  time: 600,
      red: randRange(2, 5),
      orange: randRange(2, 5),
      yellow: randRange(4, 6),
      green: randRange(4, 6),
      blue: randRange(4, 6),
      navy: randRange(4, 6),
      purple: randRange(6, 8),
      oddEven: randRange(6, 8),
      highLow: randRange(5, 6)
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
      red: randRange(4, 7),
      orange: randRange(4, 7),
      yellow: randRange(5, 7),
      green: randRange(5, 7),
      blue: randRange(6, 7),
      navy: randRange(6, 7),
      purple: randRange(7, 10),
      oddEven: randRange(10, 12),
      highLow: randRange(8, 11)
	  }
	},
];

[
  colorMatch, RAINBOW,
  OFFSET_X, OFFSET_Y, 
  OFFSET5_X, OFFSET5_Y, 
  TEXT, BUTTON, TUTORIAL, 
  GAME_PROCEDURE
].forEach(obj => Object.freeze(obj));