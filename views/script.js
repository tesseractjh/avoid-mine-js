'use strict';

class Canvas {
  constructor(canvas, init = true) {
    this.canvas = canvas;
    this.width = +canvas.clientWidth;
    this.height = +canvas.clientHeight;
    this.CENTER = Math.floor(canvas.width/2);
    this.TITLE_SIZE = Math.floor(this.width/24);
    this.FONT_SIZE = Math.floor(this.TITLE_SIZE*3/4);
    this.initValues();
    this.initContext();
    if (init) {
      this.initTimerID();
      this.initElement();
      this.initEventListener();
      this.initSound();
    }
  }

  initValues() {
    this.page = 'main';
    this.button = [];
    this.callback = [];
    this.sound = this.sound ?? {};
    this.board = null;
    this.gameInfo = {
      name: '',
      stage: 0,
      life: 5,
      score: 0,
      item1: 0,
      item2: 0,
      item3: 0,
      tempScore: 0,
      procedure: 0,
      shapeSwitch: false,
      timerSoundSwitch: false,
      bonus: null,
      log: []
    };
    this.leaderboardInfo = {
      page: 1,
      isLastPage: false,
      record: []
    }
  }

  initContext() {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';
  }

  initTimerID() {
    this.tutorialTimer = null;
    this.gameTimer = null;
    this.msgTimer = null;
    this.boxDropTimer = null;
  }

  initElement() {
    this.$container = new Element('canvas-container');
    this.$msgBox = new Element('msg-box');
    this.$gameResult = new Element('game-result');
    this.$gameResult.$title = new Element('game-result-title');
    this.$gameResult.$stage = new Element('stage');
    this.$gameResult.$score = new Element('score');
    this.$gameResult.$rank = new Element('rank');
    this.$gameResult.$space = new Element('space');
    this.$gameResult.$back = new Element('back');
    this.$stageResult = new Element('stage-result');
    this.$stageResult.$title = new Element('stage-result-title');
    this.$stageResult.$cellCount = new Element('cell-count');
    this.$stageResult.$time = new Element('remaining-time');
    this.$stageResult.$movementDiv = new Element('movement-div');
    this.$stageResult.$moveOpt = new Element('movement-optimization');
    this.$stageResult.$itemDiv = new Element('item-div');
    this.$stageResult.$item = new Element('reserved-item');
    this.$stageResult.$perfectClearDiv = new Element('perfect-clear-div');
    this.$stageResult.$perfectClear = new Element('perfect-clear');
    this.$stageResult.$totalScore = new Element('total-score');
    this.$information = new Element('information');
    this.$information.$title = new Element('information-title');
    this.$information.$header = new Element('information-header');
    this.$information.$left = new Element('information-left');
    this.$information.$right = new Element('information-right');
    this.$information.$arrow = new Element('arrow');
    this.$information.$article = new Element('information-article');
    this.$information.$footer = new Element('information-footer');
    this.$inputId = new Element('input-id');
    this.$inputId.$title = new Element('input-id-title');
    this.$inputId.$header = new Element('input-id-header');
    this.$inputId.$input = new Element('input-id-input');
    this.$inputId.$submit = new Element('submit');
    this.$leaderboard = new Element('leaderboard');
    this.$leaderboard.$title = new Element('leaderboard-title');
    this.$leaderboard.$list = new Element('leaderboard-list');
    this.$leaderboard.$footer = new Element('leaderboard-footer');

    this.$gameResult.$back.elem.setAttribute('width', `${this.canvas.height * BOARD_HEIGHT_RATIO}px`);
    this.$gameResult.$back.elem.setAttribute('height', `${this.TITLE_SIZE*3/2}px`);

    this.$inputId.$submit.elem.setAttribute('width', `${this.canvas.height * BOARD_HEIGHT_RATIO}px`);
    this.$inputId.$submit.elem.setAttribute('height', `${this.TITLE_SIZE*3}px`);
  }

  initEventListener() {
    this.canvas.addEventListener('click', this.getCallback('clickButton'));
    this.canvas.addEventListener('mousemove', this.getCallback('mousemove'));
    window.addEventListener('keydown', this.getCallback('keydown'));
  }

  initSound() {
    ['cannotUseItem', 'clear', 'explosion', 'fail', 'item', 'shape', 'stopwatch']
      .forEach(sound => {
        const audio = new Audio();
        audio.src = `/sounds/${sound}.mp3`;
        audio.preload = 'auto';
        this.sound[sound] = audio;
      });
  }

  // temp
  sendLogToServer() {
    const { name, stage, tempScore, score } = this.gameInfo;
    const userInfo = {
      name, stage, tempScore,
      score: score + tempScore
    };
    fetch('/log', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userInfo)
    })
  }

  setRectPath(obj) {
    const { x1, y1, x2, y2 } = obj.contextInfo;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x1, y2);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x2, y1);
    this.ctx.closePath();
  }

  initList() {
    this.$leaderboard.$list.innerHTML = 
    `<div class="border-bottom">순위</div>
    <div class="border-bottom">이름</div>
    <div class="border-bottom">점수</div>
    <div class="border-bottom">랭크</div>
    <div class="border-bottom">스테이지</div>`;
  }

  appendToList(users) {
    const $fragment = document.createDocumentFragment();
    users.forEach(user => this.createUserInfo($fragment, user));
    this.$leaderboard.$list.elem.appendChild($fragment);
  }

  setLeaderboard() {
    this.page = 'fetching';
    const { page, isLastPage, record } = this.leaderboardInfo;

    if (page === 1 && record.length === 0) { // 처음 순위표 버튼 클릭했을 때
      fetch('/leaderboard')
      .then(res => res.json())
      .then(users => {
        record.push(...users);
        this.initList();
        this.appendToList(users.slice(0, 10));
        if (users.length < 10) {
          this.leaderboardInfo.isLastPage = true;
        }
        this.$leaderboard.show();
        this.page = 'leaderboard';
      })
      .catch(console.error);
    } else if (record.length > (page - 1) * 10) { // record가 커버 가능한 목록 이동
      this.initList();
      this.appendToList(record.slice((page - 1) * 10, page * 10));
      this.$leaderboard.show();
      this.page = 'leaderboard';
    } else { // record에 없는 목록을 fetch하고, fetch 결과에 따라 isLastPage와 page 조정
      fetch(`/leaderboard/${page}`)
        .then(res => res.json())
        .then(users => {
          if (users.length < 10) {
            this.leaderboardInfo.isLastPage = true;
          }
          if (users.length > 0) {
            this.initList();
          } else {
            this.leaderboardInfo.page--;
          }
          this.appendToList(users);
          this.$leaderboard.show();
          this.page = 'leaderboard';
        })
        .catch(console.error);
    }
    
  }

  postLeaderBoard(userInfo) {
    fetch('/save-record', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userInfo)
    })
      .then(() => {
        this.$gameResult.show();
        this.elementDropEffect(this.$gameResult);
      })
      .catch(console.error);
  }

  createUserInfo(fragment, user) {
    const { ranking, name, score, rank, stage } = user;
    [ranking, name, score, rank, stage].forEach(v => {
      const div = document.createElement('div');
      const text = document.createTextNode(v);
      div.appendChild(text);
      div.classList.add('border-bottom2');
      fragment.appendChild(div);
    });
  }

  saveLog(cellCount, movement, isItemUsed, isDead, isAllEnsured) {
    const { stage, life, item1, item2, item3, tempScore } = this.gameInfo;
    const { time } = this.board.boardSetting;
    this.gameInfo.log.push({
      stage, cellCount, time, movement, isItemUsed, isDead, isAllEnsured,
      life, item1, item2, item3,
      score: tempScore
    });
  }

  getTutorialPage(number) {
    const page = TUTORIAL[`tutorial0${number}`];
    return function() {
      this.paintTutorialPage(page);
    };
  }

  getGamePage() {
    return function() {
      this.board = new Board(this, 1, 1, false);
      this.paintPage();
      this.canvas.removeEventListener('click', this.getCallback('clickButton'));
      this.canvas.addEventListener('click', this.getCallback('clickCell'));
    }
  }

  getLeaderboardPage() {
    return function() {
      this.showLeaderBoard();
    }
  }

  playSound(sound) {
    this.sound[sound].pause();
    this.sound[sound].currentTime = 0;
    this.sound[sound].play();
  }

  decreaseLife() {
    if (this.gameInfo.life === 0) {
      this.board.ensureWholeCell();
      this.showGameResult();
    } else {
      this.gameInfo.life--;
      this.paintBottomBar();
    }
  }

  strokeRect(obj) {
    const { strokeColor, lineWidth } = obj.contextInfo;
    this.setRectPath(obj);
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
  }
  
  strokeText(obj) {
    const { text, x, y, strokeColor, lineWidth, fontSize, font } = obj.contextInfo;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.font = font;
    this.ctx.strokeText(text, x, y + fontSize*0.075);
  }

  strokeLine(obj) {
    const { x1, y1, x2, y2, strokeColor, lineWidth } = obj.contextInfo;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(parseInt(x1), parseInt(y1));
    this.ctx.lineTo(parseInt(x2), parseInt(y2));
    this.ctx.closePath();
    this.ctx.stroke();
  }

  strokeCells(startCell, endCell, strokeColor = BLACK, lineWidth = 1) {
    const [ sx, sy ] = [ startCell.contextInfo.x, startCell.contextInfo.y ];
    const [ ex, ey ] = [ endCell.contextInfo.x, endCell.contextInfo.y ];
    const cellSize = startCell.width;
    const width = (endCell.x - startCell.x + 1) * cellSize;
    const height = (endCell.y - startCell.y + 1) * cellSize;
    const bigCell = new Rect((sx + ex)/2, (sy + ey)/2);
    bigCell.setFillInfo(width, height);
    bigCell.setStrokeInfo(strokeColor, lineWidth);
    this.strokeRect(bigCell);
  }

  fillRect(obj, stroke=false) {
    const { fillColor } = obj.contextInfo;
    this.ctx.fillStyle = fillColor;
    this.setRectPath(obj);
    this.ctx.fill();
    if (stroke) {
      this.strokeRect(obj);
    }
  }
  
  fillText(obj) {
    const { text, x, y, textColor, fontSize, font } = obj.contextInfo;
    this.ctx.fillStyle = textColor;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y + fontSize*0.075);
  }

  createButton(info, addition) {
    const {
      x, y,
      text, fontSize, textColor,
      width, height, fillColor,
      strokeColor, lineWidth,
      hover,
      page
    } = { ...info, ...addition };
    const button = new Button(x, y, page);
    button
      .setTextInfo(text, fontSize, textColor)
      .setFillInfo(width, height, fillColor)
      .setStrokeInfo(strokeColor, lineWidth);
    const hoverInfo = new ContextInfo();
    Object.entries(button.contextInfo).forEach(([key, value]) => {
      hoverInfo[key] = value;
    });

    hoverInfo.fillColor = hover.fillColor;
    hoverInfo.textColor = hover.textColor;
    button.hoverContextInfo = hoverInfo;
    this.button.push(button);
    return button;
  }

  clearPage() {
    this.button = [];
    this.board = null;
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  clearTimer() {
    clearInterval(this.gameTimer);
    clearInterval(this.msgTimer);
    clearInterval(this.boxDropTimer);
  }

  clearElement() {
    this.$msgBox.hide();
    this.$gameResult.hide();
    this.$gameResult.top = 0;
    this.$gameResult.opacity = 0;
    this.$stageResult.hide();
    this.$stageResult.top = 0;
    this.$stageResult.opacity = 0;
    this.$information.hide();
    this.$information.$left.clear();
    this.$information.$right.clear();
    this.$information.$article.clear();
    this.$information.$arrow.clear();
    this.$inputId.hide();
    this.$leaderboard.hide();
  }

  paintAllButton() {
    this.button.forEach(btn => {
      this.fillRect(btn, true);
      this.fillText(btn);
    });
  }

  paintMainPage() {
    this.clearPage();
    this.page = 'main';
    this.paintMainTitle();
    this.paintMainButton();
    this.$stageResult.$movementDiv.hide();
    this.$stageResult.$itemDiv.hide();
    this.$stageResult.$perfectClearDiv.hide();
  }

  paintMainTitle() {
    const title = new Rect(this.CENTER, this.TITLE_SIZE * 3);
    title.setTextInfo(TEXT.mainTitle, this.TITLE_SIZE);
    this.fillText(title);
  }

  paintMainButton() {
    const [ x, width, height, fontSize ] = [
      this.CENTER, this.FONT_SIZE * 7, this.FONT_SIZE * 2, this.FONT_SIZE
    ];
    this.createButton(BUTTON.tutorial, {
        x,
        y: this.TITLE_SIZE * 5,
        width,
        height,
        fontSize,
        page: this.getTutorialPage(1)
    });
    this.createButton(BUTTON.start, {
      x,
      y: this.TITLE_SIZE * 7,
      fontSize,
      width,
      height,
      page: this.getGamePage()
    });
    this.createButton(BUTTON.leaderboard, {
      x,
      y: this.TITLE_SIZE * 9,
      fontSize,
      width,
      height,
      page: this.getLeaderboardPage()
    });
    this.paintAllButton();
  }

  paintTutorialPage(page) {
    const { prev, next, board, bottomText, timer, addition } = page;
    this.clearPage();
    this.paintTutorialBoard(board);
    this.paintTutorialButton(prev, next);
    this.paintBottomText(bottomText);
    clearInterval(this.tutorialTimer);
    if (timer) {
      const { getTimer, delay } = timer;
      const timerID = getTimer.bind(this)();
      this.tutorialTimer = setInterval(timerID, delay);
    }
    if (addition) {
      addition.bind(this)();
    }
  }

  paintTutorialBoard(boardInfo) {
    const { me, meX, meY, ensured, detected } = boardInfo;
    const board = new Board(this, 5, 5);
    this.board = board;
    [
      [2, 2], [0, 4],
      [4, 0], [3, 3]
    ].forEach(coord => {
      const [ x, y ] = coord;
      board.getCell(x, y).type = 'mine';
    });
    if (ensured) {
      ensured.forEach(coord => {
        const [ x, y ] = coord;
        board.ensureCell(x, y);
      })
    }
    if (detected) {
      detected.forEach(coord => {
        const [ x, y ] = coord;
        board.openCell(x, y);
      })
    }
    board.getCell(2, 2).type = 'ensuredMine';
    board.updateCellProperty();
    board.updateCanvas();
    if (me) {
      board.me.moveTo(meX ?? 0, meY ?? 0);
    }
  }

  paintGameBoard({ xCount, yCount, mine, boardSetting }) {
    const board = new Board(this, xCount, yCount);
    this.board = board;
    board.boardSetting = { mine, ...boardSetting };
    board.setBoard(mine);
    board.updateCanvas();
    board.me.updateCanvas();
  }

  paintInfoBoard(boardInfo, $div, widthRatio = 2/5, heightRatio = 3/5) {
    const { xCount, yCount, tomato, yellowgreen, safe, ensured, mine, me, showShape } = boardInfo;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${this.board.maxWidth * widthRatio}px`);
    canvas.setAttribute('height', `${this.height * heightRatio}px`);
    const tempCanvas = new Canvas(canvas, false);
    tempCanvas.width = this.board.maxWidth * widthRatio;
    tempCanvas.height = this.height * heightRatio;
    
    const cellSize = Math.min(tempCanvas.width / xCount, tempCanvas.height*0.9 / yCount);
    const tempBoard = new Board(tempCanvas, xCount, yCount, false, {
      maxWidth: tempCanvas.width,
      maxHeight: tempCanvas.height,
      cellSize
    });
    tempBoard.showShapeSwitch = showShape ?? false;
    tempBoard.updateCanvas();
    
    tomato?.forEach(([ x, y ]) => {
      const cell = tempBoard.getCell(x, y);
      cell.check = 1;
      cell.checkColor = TOMATO;
    });

    yellowgreen?.forEach(([ x, y ]) => {
      const cell = tempBoard.getCell(x, y);
      cell.check = 2;
      cell.checkColor = YELLOWGREEN;
    });

    safe?.forEach(([ x, y, value, hintType, shape ]) => {
      const cell = tempBoard.getCell(x, y);
      tempBoard.ensureCell(x, y);
      cell.number = value;
      cell.hintType = hintType ?? 'normal';
      if (hintType !== 'normal') {
        cell.shape = shape ?? shapeMatch[hintType];
      }
      cell.textColor = hintType ? colorMatch[hintType] : BLACK;
      tempBoard.updateCell(cell);
    });

    ensured?.forEach(([ x, y, value ]) => {
      const cell = tempBoard.getCell(x, y);
      tempBoard.openCell(x, y);
      cell.number = value;
      tempBoard.updateCell(cell);
    });

    mine?.forEach(([ x, y ]) => {
      const cell = tempBoard.getCell(x, y);
      cell.type = 'ensuredMine';
      tempBoard.ensureCell(x, y);
      tempBoard.updateCell(cell);
    });

    if (me) {
      tempBoard.me.moveTo(me[0], me[1]);
    }

    $div.elem.appendChild(tempCanvas.canvas);
  }

  paintTutorialButton(prev, next) {
    const [ y, width, height, fontSize, lineWidth ] = [
      this.board.bottomCenterY,
      this.FONT_SIZE * 3, this.FONT_SIZE * 3/2,
      this.FONT_SIZE, 1
    ];
    if (prev) {
      this.createButton(BUTTON.prev, {
        x: this.board.x - width*3/4,
        y,
        width,
        height,
        fontSize,
        lineWidth,
        page: this.getTutorialPage(prev)
      });
    }
    if (next) {
      this.createButton(BUTTON.next, {
        x: this.board.x + this.board.width + width*3/4,
        y,
        width,
        height,
        fontSize,
        lineWidth,
        page: this.getTutorialPage(next)
      });
    }
    this.paintAllButton();
  }

  paintBottomText(textInfo) {
    const { text, linebreak } = textInfo;
    const box = new Rect(this.CENTER, this.board.bottomCenterY);
    box.setFillInfo(
      this.board.width, this.board.bottomHeight, WHITE_ALPHA2
    );
    this.fillRect(box);

    const fontSize = this.board.bottomHeight / 5;
    if (linebreak) {
      const [text1, text2] = [...text].join('').split('\n');
      const textRect = new Rect(this.CENTER, this.board.bottomCenterY - fontSize*3/4);
      textRect.setTextInfo(text1, fontSize);
      this.fillText(textRect);
      this.strokeRect(textRect);
      textRect.contextInfo.y = this.board.bottomCenterY + fontSize*3/4;
      textRect.text = text2;
      this.fillText(textRect);
    } else {
      const textRect = new Rect(this.CENTER, this.board.bottomCenterY);
      textRect.setTextInfo(text, fontSize);
      this.fillText(textRect);
    }
  }

  paintGamePage(stageInfo) {
    this.page = 'game';
    this.gameInfo.stage++;
    this.clearPage();
    this.clearTimer();
    this.clearElement();
    this.paintGameBoard(stageInfo);
    this.paintBottomBar();
    this.gameTimer = setInterval(this.setTimer.bind(this), 1000);
  }

  paintBottomBar() {
    const { stage, life, score, item1, item3, item2 } = this.gameInfo;
    const { bottomBarHeight, bottomCenterY, remainingMine } = this.board;
    const { time } = this.board.boardSetting;
    const [ minute, second ] = [ Math.floor(time/60), time%60 ];
    const [ width, height ] = [ this.width/2, bottomBarHeight ];
    let mine = 0;
    this.board.forEachCell(v => {
      if (v.isMine) {
        mine++;
      }
    });
    const background = new Rect(this.CENTER, bottomCenterY);
    background
      .setFillInfo(width, height, WHITE)
      .setStrokeInfo();
    this.fillRect(background, true);

    this.paintDivisionLine(background);

    const bottomValues = [
      `${stage}`,
      `${score}`,
      `${life}`,
      `${remainingMine}/${mine}`,
      `${minute}:${second<10 ? '0'+second : second}`,
      `${item1}개`,
      `${item2}개`,
      `${item3}개`
    ];

    const fontSize = bottomBarHeight/4;
    const [ topY, bottomY ] = [ bottomCenterY - bottomBarHeight/5, bottomCenterY + bottomBarHeight/5 ];
    bottomValues.forEach((value, idx) => {
      const top = new Rect(this.CENTER + width*(idx*2-7)/16, topY);
      top.setTextInfo(TEXT[`bottomBar0${idx+1}`], fontSize);
      this.fillText(top);

      let textColor = BLACK;
      if ((idx === 2 && life === 0) || (idx === 4 && time < 30)) {
        textColor = TOMATO;
      }
      const bottom = new Rect(this.CENTER + width*(idx*2-7)/16, bottomY);
      bottom.setTextInfo(value, fontSize, textColor);
      this.fillText(bottom);
    });
  }

  paintDivisionLine(box) {
    const x = box.contextInfo.x - box.width / 2;
    const y = box.contextInfo.y;
    for (let i=0; i<7; i++) {
      const line = new Rect(x + box.width*(i+1)/8, y);
      line.setFillInfo(0, box.height*3/4);
      line.setStrokeInfo(LIGHTGRAY, 3);
      this.strokeRect(line);
    }
  }

  setTimer() {
    const { time } = this.board.boardSetting;

    if (time <= 30 && !this.gameInfo.timerSoundSwitch) {
      this.gameInfo.timerSoundSwitch = true;
      this.playSound('stopwatch');
    }

    if (time > 0) {
      this.board.boardSetting.time--;
      this.paintBottomBar();
    } else {
      clearInterval(this.gameTimer);
      this.showGameResult();
    }
  }

  // 메세지 박스 그리기
  showMsgBox(text, color=RED, sound='explosion') {
    if (this.msgTimer) {
      clearInterval(this.msgTimer);
      this.$msgBox.hide();
      this.$msgBox.opacity = 1;
    }

    this.$msgBox.innerHTML = text;
    this.$msgBox.font = this.FONT_SIZE/2;
    this.$msgBox.width = this.board.maxHeight;
    this.$msgBox.height = this.FONT_SIZE*3/4;
    this.$msgBox.borderRadius = this.FONT_SIZE/8
    this.$msgBox.backgroundColor = color;
  
    this.playSound(sound);
    this.$msgBox.show();

    let opacity = 1000;
    let delay = 40;
    const setOpacity = () => {
      if (delay > 0) {
        delay--;
      } else {
        this.$msgBox.opacity = opacity/1000;
        opacity -= 17;
        if (opacity < 0) {
          this.$msgBox.hide();
          clearInterval(this.msgTimer);
        }
      }
    }
    this.msgTimer = setInterval(setOpacity, 10);
  }

  initPage(page) {
    this.page = page;
    this.clearElement();
    this.clearTimer();
    this.sound['stopwatch'].pause();
    this.gameInfo.timerSoundSwitch = false;
  }

  elementDropEffect(element) {
    let top = 0;
    let opacity = 0;
    const dropBox = () => {
      element.top = ++top/2;
      element.opacity = ++opacity/100;
      if (top === 100) {
        clearInterval(this.boxDropTimer);
      }
    };
    this.boxDropTimer = setInterval(dropBox, 4);
  }

  showGameResult() {
    this.initPage('gameResult');
    const { stage, score } = this.gameInfo;
    const { $title, $stage, $score, $rank, $back } = this.$gameResult;

    this.$gameResult.backgroundColor = WHITE_ALPHA;
    this.$gameResult.font = this.TITLE_SIZE;
    this.$gameResult.width = this.board.maxWidth;
    this.$gameResult.height = this.height;

    $title.innerHTML = stage < 45 ? 'GAME OVER' : 'GAME CLEAR!!';

    $stage.innerHTML = stage;
    $score.innerHTML = `${score}점`;
    let rank;
    if (score > 300000) {
      rank = 'S';
    } else if (score > 200000) {
      rank = 'A';
    } else if (score > 100000) {
      rank = 'B';
    } else if (score > 50000) {
      rank = 'C';
    } else if (score > 10000) {
      rank = 'D';
    } else {
      rank = 'F';
    }
    $rank.innerHTML = rank;

    const tempCanvas = new Canvas($back.elem, false);
    $back.elem.addEventListener('click', tempCanvas.getCallback('clickButton'));
    $back.elem.addEventListener('mousemove', tempCanvas.getCallback('mousemove'));
    $back.width = this.canvas.height * BOARD_HEIGHT_RATIO;
    $back.height = this.TITLE_SIZE*3/2;
    tempCanvas.createButton(BUTTON.back, {
      x: $back.width/2,
      y: $back.height/2,
      fontSize: this.FONT_SIZE,
      width: $back.width*0.9,
      height: $back.height*0.9,
      page: (() => {
        const originalCanvas = this;
        return function () {
          this.canvas.removeEventListener('click', this.getCallback('clickButton'));
          this.canvas.removeEventListener('mousemove', this.getCallback('mousemove'));
          originalCanvas.clearPage();
          originalCanvas.clearElement();
          originalCanvas.clearTimer();
          originalCanvas.initValues();
          originalCanvas.canvas.addEventListener('click', originalCanvas.getCallback('clickButton'));
          originalCanvas.paintMainPage();
        };
      })()
    });
    tempCanvas.paintAllButton();

    const userInfo = {
      rank,
      name: this.gameInfo.name,
      score: this.gameInfo.score,
      stage: this.gameInfo.stage,
      log: this.gameInfo.log
    }

    this.playSound(stage < 45 ? 'fail' : 'clear');
    this.postLeaderBoard(userInfo);
    this.canvas.removeEventListener('click', this.getCallback('clickCell'));
  }

  showStageResult() {
    this.initPage('stageResult');
    const { isItemUsed, accessable, shortest } = this.board;
    const { time } = this.board.boardSetting;
    const { movement, isDead } = this.board.me
    const { stage } = this.gameInfo;
    const { $title, $cellCount, $time, $moveOpt, $item, $perfectClear, $totalScore } = this.$stageResult;
    const cellCount = this.board.cellArr.flat()
    .reduce((count, cell) => {
      if (cell.isEnsured && cell.type !== 'ensuredMine') {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
    const isAllEnsured = accessable.every(cell => cell.isEnsured);
  
    this.$stageResult.backgroundColor = WHITE_ALPHA;
    this.$stageResult.font = this.FONT_SIZE;
    this.$stageResult.width = this.board.maxWidth;
    this.$stageResult.height = this.height;

    $title.innerHTML = `STAGE ${stage} 결과`;
    $cellCount.innerHTML = cellCount * CELL_COUNT_SCORE;
    $time.innerHTML = time * REMAINING_TIME_SCORE;
  
    let movementRatio = 1;
    if (stage > 5) {
      let rank;
      if (movement <= shortest + (accessable.length-shortest)*1.2) {
        movementRatio = MOVEMENT_PERFECT_RATIO;
        rank = `Perfect +${Math.floor(movementRatio*100-100)}%`;
        $moveOpt.color = YELLOWGREEN;
      } else if (movement <= shortest + (accessable.length-shortest)*1.5) {
        movementRatio = MOVEMENT_EXCELLENT_RATIO;
        rank = `Excellent +${Math.floor(movementRatio*100-100)}%`;
        $moveOpt.color = YELLOWGREEN;
      } else if (movement <= shortest + (accessable.length-shortest)*2) {
        movementRatio = MOVEMENT_GREAT_RATIO;
        rank = `Great +${Math.floor(movementRatio*100-100)}%`;
        $moveOpt.color = NAVY;
      } else if (movement <= shortest + (accessable.length-shortest)*2.5) {
        movementRatio = MOVEMENT_GOOD_RATIO;
        rank = `Good +${Math.floor(movementRatio*100-100)}%`;
        $moveOpt.color = NAVY;
      } else {
        movementRatio = 1;
        rank = `Bad`;
        $moveOpt.color = BLACK;
      }
      $moveOpt.innerHTML = rank;
      this.$stageResult.$movementDiv.show();
    }
  
    let itemRatio = 1;
    if (stage > 1) {
      if (!isItemUsed) {
        itemRatio = RESERVED_ITEM_RATIO
        $item.color = YELLOWGREEN;
        $item.innerHTML = `CLEAR +${Math.floor(itemRatio*100-100)}%`;
      } else {
        $item.color = BLACK;
        $item.innerHTML = 'FAIL';
      }
      this.$stageResult.$itemDiv.show();
    }
  
    let perfectClearRatio = 1;
    if (stage > 4) {
      if (!isDead && isAllEnsured) {
        perfectClearRatio = PERFECT_CLEAR_RATIO;
        $perfectClear.color = YELLOWGREEN;
        $perfectClear.innerHTML = `CLEAR x${perfectClearRatio}`;
      } else {
        $perfectClear.color = BLACK;
        $perfectClear.innerHTML = 'FAIL';
      }
      this.$stageResult.$perfectClearDiv.show();
    }
  
    this.gameInfo.tempScore = Math.floor(
      (cellCount * CELL_COUNT_SCORE + time * REMAINING_TIME_SCORE)
      * movementRatio
      * itemRatio
      * perfectClearRatio
    );
    $totalScore.innerHTML = this.gameInfo.tempScore;
    
    this.playSound('clear');
    this.saveLog(cellCount, movement, isItemUsed, isDead, isAllEnsured);

    // temp
    this.sendLogToServer();
    // temp

    this.$stageResult.show();
    this.elementDropEffect(this.$stageResult);
  }

  showInformation(info) {
    const { layout, title, half1, half2, article, arrow, header, footer, bonus } = info;
    const { $title, $header, $left, $right, $arrow, $article, $footer } = this.$information;
    this.initPage('information');
    this.gameInfo.bonus = bonus;

    this.$information.backgroundColor = WHITE_ALPHA;
    this.$information.font = this.FONT_SIZE*3/5;
    this.$information.width = this.board.maxWidth;
    this.$information.height = this.height;

    $title.innerHTML = title ?? '';
    $title.font = this.FONT_SIZE;
    $header.innerHTML = header ?? '';
    $footer.innerHTML = footer ?? '';

    if (layout === 'leftRight') {
      if (half1.type === 'board') {
        this.paintInfoBoard(half1, $left);
      } else if (half1.type === 'text') {
        $left.innerHTML = half1.text;
      }
      if (half2.type === 'board') {
        this.paintInfoBoard(half2, $right);
      } else if (half2.type === 'text') {
        $right.innerHTML = half2.text;
      }
      if (arrow) {
        $arrow.font = this.FONT_SIZE*2;
        $arrow.innerHTML = '☞';
        $arrow.show();
      } else {
        $arrow.hide();
      }
    } else if (layout === 'article') {
      if (article.type === 'text') {
        $article.innerHTML = article.text;
      } else if (article.type === 'board') {
        this.paintInfoBoard(article, $article, 7/10, 1/2);
      }
    }

    this.$information.show();
  }

  showInputId() {
    this.initPage('inputId');
    const { $header, $input, $submit } = this.$inputId;

    this.$inputId.backgroundColor = WHITE_ALPHA;
    this.$inputId.font = this.FONT_SIZE;
    this.$inputId.width = this.width * BOARD_WIDTH_RATIO;
    this.$inputId.height = this.height;

    $header.font = this.FONT_SIZE*2/3;

    const tempCanvas = new Canvas($submit.elem, false);
    $submit.elem.addEventListener('click', tempCanvas.getCallback('clickButton'));
    $submit.elem.addEventListener('mousemove', tempCanvas.getCallback('mousemove'));
    $submit.width = this.canvas.height * BOARD_HEIGHT_RATIO;
    $submit.height = this.TITLE_SIZE*3;
    tempCanvas.createButton(BUTTON.submit, {
      x: $submit.width/2,
      y: $submit.height/2,
      fontSize: this.FONT_SIZE,
      width: $submit.width*0.5,
      height: $submit.height*0.5,
      page: (() => {
        const originalCanvas = this;
        return function () {
          const { value } = $input.elem;
          if (value.length > 0 && !/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/.test(value)) {
            this.canvas.removeEventListener('click', tempCanvas.getCallback('clickButton'));
            this.canvas.removeEventListener('mousemove', tempCanvas.getCallback('mousemove'));
            originalCanvas.gameInfo.name = value;
            originalCanvas.paintPage();
          } else {
            alert('잘못된 입력입니다');
          }
        };
      })()
    });
    tempCanvas.paintAllButton();

    this.$inputId.$input.value = '';
    this.$inputId.show();
  }

  showLeaderBoard() {
    this.initPage('leaderboard');
    const { $list, $footer } = this.$leaderboard;

    this.$leaderboard.backgroundColor = WHITE_ALPHA;
    this.$leaderboard.font = this.FONT_SIZE;
    this.$leaderboard.width = this.width * BOARD_WIDTH_RATIO;
    this.$leaderboard.height = this.height;

    $list.font = this.FONT_SIZE/2;
    $list.fontWeight = 500;
    $footer.font = this.FONT_SIZE/2;

    this.leaderboardInfo.page = 1;
    this.leaderboardInfo.isLastPage = false;
    this.setLeaderboard();
  }

  showShape() {
    if (this.gameInfo.shapeSwitch) {
      this.showMsgBox(TEXT.msgBox09, TOMATO, 'shape');
    } else {
      this.showMsgBox(TEXT.msgBox10, YELLOWGREEN, 'shape');
    }
    this.gameInfo.shapeSwitch = !this.gameInfo.shapeSwitch;
    this.board.showShapeSwitch = this.gameInfo.shapeSwitch;
    this.board.updateCanvas();
    this.board.me.updateCanvas();
  }

  useItem1() {
    const { board } = this;
    const { me } = board;
    if (this.gameInfo.item1 > 0) {
      const cellArr = board.getCell(me.x, me.y).getSurroundingCell(2)
        .filter(cell => !cell.isDetected);
      if (cellArr.length) {
        const rand = randRange(0, cellArr.length-1);
        const ensuredCell = cellArr[rand];
        board.openCell(ensuredCell.x, ensuredCell.y);
        board.updateCell(ensuredCell);
        this.gameInfo.item1--;
        board.isItemUsed = true;
        this.paintBottomBar();
        this.showMsgBox(TEXT.msgBox02, YELLOWGREEN, 'item');
      } else {
        this.showMsgBox(TEXT.msgBox08, TOMATO, 'cannotUseItem');
      }
    } else {
      this.showMsgBox(TEXT.msgBox03, TOMATO, 'cannotUseItem');
    }
  }

  useItem2() {
    const { board } = this;
    const { me } = board;
    if (this.gameInfo.item2 > 0) {
      const cellArr = board.getCell(me.x, me.y).getSurroundingCell(2)
        .filter(cell => !cell.isDetected && cell.type !== 'destination');
      if (cellArr.length) {
        const rand = randRange(0, cellArr.length-1);
        const safeCell = cellArr[rand];
        board.ensureCell(safeCell.x, safeCell.y);
        board.clearCheck(safeCell);
        board.updateCell(safeCell);
        this.gameInfo.item2--;
        board.isItemUsed = true;
        this.paintBottomBar();
        this.showMsgBox(TEXT.msgBox04, YELLOWGREEN, 'item');
      } else {
        this.showMsgBox(TEXT.msgBox08, TOMATO, 'cannotUseItem');
      }
    } else {
      this.showMsgBox(TEXT.msgBox05, TOMATO, 'cannotUseItem');
    }
  }

  useItem3() {
    const { board } = this;
    const { me } = board;
    if (this.gameInfo.item3 > 0) {
      const cellArr = board.getCell(me.x, me.y).getSurroundingCell()
        .filter(cell => !cell.isEnsured && cell.type !== 'destination');
      if (cellArr.length) {
        const rand = randRange(0, cellArr.length-1);
        const safeCell = cellArr[rand];
        board.ensureCell(safeCell.x, safeCell.y);
        board.clearCheck(safeCell);
        board.updateCell(safeCell);
        this.gameInfo.item3--;
        board.isItemUsed = true;
        this.paintBottomBar();
        this.showMsgBox(TEXT.msgBox06, YELLOWGREEN, 'item');
      } else {
        this.showMsgBox(TEXT.msgBox08, TOMATO, 'cannotUseItem');
      }
    } else {
      this.showMsgBox(TEXT.msgBox07, TOMATO, 'cannotUseItem');
    }
  }

  getCallback(type) {
    if (!this.callback[type]) {
      const thisBindedCallback = this[`${type}Callback`].bind(this);
      this.callback[type] = thisBindedCallback;
    }
    return this.callback[type];
  }

  clickButtonCallback({ offsetX, offsetY }) {
    this.button.forEach(btn => {
      if (btn.contextInfo.isCollision(offsetX, offsetY)) {
        btn.callback.bind(this)();
      }
    });
  }

  clickCellCallback({ offsetX, offsetY }) {
    if (this.page === 'game') {
      const { x, y, cellSize, cellCount } = this.board;
      const [ cx, cy ] = [ Math.floor((offsetX - x) / cellSize), Math.floor((offsetY - y) / cellSize) ];
      if (this.board.isValid(cx, cy)
        && !this.board.getCell(cx, cy).isEnsured
        && this.board.getIdx(cx, cy) !== cellCount-1 ) {
        const cell = this.board.getCell(cx, cy);
        switch (cell.check) {
          case 0:
            cell.check = 1;
            cell.checkColor = TOMATO;
            this.board.updateRemainingMine();
            break;
          case 1:
            cell.check = 2;
            cell.checkColor = YELLOWGREEN;
            this.board.updateRemainingMine();
            break;
          case 2:
            cell.check = 0;
            cell.checkColor = '';
            break;
        }
        this.board.updateCell(cell);
        this.board.me.updateCanvas();
      }
    }
  }

  mousemoveCallback({ offsetX, offsetY }) {
    this.button.forEach(btn => {
      if (btn.contextInfo.isCollision(offsetX, offsetY)) {
        const tempInfo = btn.contextInfo;
        btn.contextInfo = btn.hoverContextInfo;
        this.fillRect(btn, true);
        this.fillText(btn);
        btn.contextInfo = tempInfo;
      } else {
        this.fillRect(btn, true);
        this.fillText(btn);
      }
    });
  }

  keydownCallback({ keyCode }) {

    if (this.page === 'game' || this.page === 'tutorial') {
      if (!this.board) return;
      const { me, xCount, yCount } = this.board;
      const { x, y } = me;
      switch (keyCode) {
        case 65: // 좌 A
          if (x > 0) {
            me.moveX(-1);
          }
          break;
  
        case 87: // 상 W
          if (y > 0) {
            me.moveY(-1);
          }
          break;
        
        case 68: // 우 D
          if (x < xCount-1) {
            me.moveX(1);
          }
          break;
  
        case 83: // 하 S
          if (y < yCount-1) {
            me.moveY(1);
          }
          break;
  
        case 49: // 아이템 1
          this.useItem1();
          break;
  
        case 50: // 아이템 2
          this.useItem2();
          break;
  
        case 51: // 아이템 3
          this.useItem3();
          break;
  
        case 82: // R
          this.showShape();
          break;
      }

    } else if (this.page === 'stageResult') {
      if (keyCode === 70) {  // F
        this.gameInfo.score += this.gameInfo.tempScore;
        this.gameInfo.tempScore = 0;
        this.paintPage();
      } 
    } else if (this.page === 'information') {
      if (keyCode === 70) {  // F
        if (this.gameInfo.bonus) {
          this.gameInfo.life += this.gameInfo.bonus.life ?? 0;
          this.gameInfo.item1 += this.gameInfo.bonus.item1 ?? 0;
          this.gameInfo.item2 += this.gameInfo.bonus.item2 ?? 0;
          this.gameInfo.item3 += this.gameInfo.bonus.item3 ?? 0;
        }
        this.paintPage();
      }
    } else if (this.page === 'leaderboard') {
      const { page, isLastPage, record } = this.leaderboardInfo;
      if (keyCode === 70) { // F
        this.page = 'main';
        this.leaderboardInfo.record = [];
        this.$leaderboard.hide();
      } else if (keyCode === 65) { // A
        if (page > 1) {
          this.leaderboardInfo.page--;
          this.leaderboardInfo.isLastPage = false;
          this.setLeaderboard();
        }
      } else if (keyCode === 68) { // D
        if (isLastPage) return;
        if (record.length > page * 10) {
          this.leaderboardInfo.page++;
          this.setLeaderboard();
        } else if (record.length === page * 10) {
          this.leaderboardInfo.page++;
          this.setLeaderboard();
        }
      }
    }
  }

  paintPage() {
    const procedure = GAME_PROCEDURE[this.gameInfo.procedure++];
    if (procedure) {
      const { type } = procedure;
      if (type === 'game') {
        this.paintGamePage(procedure);
      } else if (type === 'info') {
        this.showInformation(procedure);
      } else if (type === 'input') {
        this.showInputId();
      }
    } else {
      this.showGameResult();
    }
  }
}

//--------------------------------------------------------------------------------------------------
// 기타 클래스들

class ContextInfo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get x1() {
    return this.x - this.width/2;
  }

  get x2() {
    return this.x + this.width/2;
  }

  get y1() {
    return this.y - this.height/2;
  }

  get y2() {
    return this.y + this.height/2;
  }

  get font() {
    return `bold ${this.fontSize}px sans-serif`;
  }

  isCollision(x, y) {
    return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
  }
}

class Element {
  constructor(elem) {
    this.elem = document.getElementById(elem);
  }

  hide() {
    this.elem.classList.add('hidden');
  }

  show() {
    this.elem.classList.remove('hidden');
  }

  clear() {
    this.elem.innerHTML = '';
  }

  set top(value) {
    this.elem.style.top = `${value}%`;
  }

  set opacity(value) {
    this.elem.style.opacity = `${value}`;
  }

  get opacity() {
    return +this.elem.style.opacity;
  }

  set innerHTML(value) {
    this.elem.innerHTML = value;
  }

  get innerHTML() {
    return this.elem.innerHTML;
  }

  set font(value) {
    this.elem.style.font = `600 ${value}px sans-serif`;
  }

  set fontWeight(value) {
    this.elem.style.fontWeight = value;
  }

  set width(value) {
    this.elem.style.width = `${value}px`;
  }

  get width() {
    return +[...this.elem.style.width.trim()].slice(0, -2).join('');
  }

  set height(value) {
    this.elem.style.height = `${value}px`;
  }
  get height() {
    return +[...this.elem.style.height.trim()].slice(0, -2).join('');
  }

  set borderRadius(value) {
    this.elem.style.borderRadius = `${value}px`;
  }

  set color(value) {
    this.elem.style.color = value;
  }

  set backgroundColor(value) {
    this.elem.style.backgroundColor = value;
  }
}

class Rect {
  constructor(x, y) {
    this.contextInfo = new ContextInfo(x, y);
  }

  setFillInfo(width, height, fillColor = BLACK) {
    this.width = width;
    this.height = height ?? width;
    this.fillColor = fillColor;
    return this;
  }

  setStrokeInfo(strokeColor = BLACK, lineWidth = 1) {
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
    return this;
  }

  setTextInfo(text, fontSize, textColor = BLACK) {
    this.text = text;
    this.fontSize = fontSize;
    this.textColor = textColor;
    return this;
  }

  set width(value) {
    this.contextInfo.width = value;
  }

  get width() {
    return this.contextInfo.width;
  }

  set height(value) {
    this.contextInfo.height = value;
  }

  get height() {
    return this.contextInfo.height;
  }

  set fillColor(value) {
    this.contextInfo.fillColor = value;
  }

  get fillColor() {
    return this.contextInfo.fillColor;
  }

  set strokeColor(value) {
    this.contextInfo.strokeColor = value;
  }

  get strokeColor() {
    return this.contextInfo.strokeColor;
  }

  set lineWidth(value) {
    this.contextInfo.lineWidth = value;
  }

  get lineWidth() {
    return this.contextInfo.lineWidth;
  }

  set text(value) {
    this.contextInfo.text = value;
  }

  get text() {
    return this.contextInfo.text;
  }

  set fontSize(value) {
    this.contextInfo.fontSize = value;
  }

  get fontSize() {
    return this.contextInfo.fontSize;
  }

  set textColor(value) {
    this.contextInfo.textColor = value;
  }

  get textColor() {
    return this.contextInfo.textColor;
  }
}

class Button extends Rect {
  constructor(x, y, callback) {
    super(x, y);
    this.callback = callback;
    this.hoverContextInfo = this.contextInfo;
  }
};

// cell 클래스 선언
class Cell extends Rect {
  constructor(x, y, board) {
    super();
    this.x = x;
    this.y = y;
    this.board = board;
    this.canvas = board.canvas;
    this.initStatus();
    this.initCellInfo();
    this.initCheckInfo();
    this.initContextInfo();
  }

  get value() {
    if (this.type === 'ensuredMine') {
      return TEXT.ensuredMine;
    }
    switch (this.textType) {
      case 'normal':
        return this.number;
      case 'oddEven':
        return this.number % 2 ? '홀' : '짝';
      case 'high':
        return '▲';
      case 'low':
        return '▼';
    }
  }

  initStatus() {
    this.isDetected = false;
    this.isEnsured = false;
  }

  initCellInfo() {
    this.type = 'normal';
    this.hintType = 'normal';
    this.shape = [...new Array(9)].map((_, i) => i);
    this.textType = 'normal';
    this.number = 0;
    this.graphIndex = null;
  }

  initCheckInfo() {
    this.check = 0;
    this.checkColor = '';
  }

  initContextInfo() {
    const { x, y, cellSize } = this.board;
    this.contextInfo.x = x + (this.x + 0.5) * cellSize;
    this.contextInfo.y = y + (this.y + 0.5) * cellSize;
    this.setFillInfo(cellSize, cellSize, CHARCOAL);
    this.setTextInfo(this.value, cellSize/2, BLACK);
  }

  get isMine() {
    return this.type === 'mine' || this.type === 'ensuredMine';
  }

  getSurroundingCell(diameter = 1) {
    let range, offsetX, offsetY;
    if (diameter === 1) {
      range = [...new Array(9)].map((_, i) => i);
      [ offsetX, offsetY ] = [ OFFSET_X, OFFSET_Y ];
    } else if (diameter === 2) {
      range = [...new Array(25)].map((_, i) => i);
      [ offsetX, offsetY ] = [ OFFSET5_X, OFFSET5_Y ];
    }
    const cellArr = [];
    range.forEach(i => {
      const [dx, dy] = [this.x + offsetX[i], this.y + offsetY[i]];
      if (this.board.isValid(dx, dy)) {
        cellArr.push(this.board.getCell(dx, dy));
      }
    });
    return cellArr;
  } 

  stroke(strokeColor = BLACK, lineWidth = 1) {
    this.setStrokeInfo(strokeColor, lineWidth);
    this.canvas.strokeRect(this);
  }

  strokeText(strokeColor = BLACK, lineWidth = 1) {
    this.text = this.value;
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
    this.canvas.strokeText(this);
  }

  fill(fillColor) {
    if (this.check) {
      this.fillColor = this.checkColor;
    } else {
      this.fillColor = fillColor;
    }
    this.canvas.fillRect(this);
    if (this.hintType !== 'normal' && this.isDetected && this.type !== 'ensuredMine') {
      if (this.board.showShapeSwitch) {
        this.fillShape(colorMatch[this.hintType]);
      } else if (this.hintType === 'purple') {
        this.fillShape(PURPLE);
      }
    }
  }

  fillText() {
    this.text = this.value;
    this.canvas.fillText(this);
  }

  fillShape(fillColor) {
    let cellSize, offsetX, offsetY;
    if (this.hintType === 'red' || this.hintType === 'orange') {
      cellSize = this.board.cellSize / 5;
      offsetX = OFFSET5_X;
      offsetY = OFFSET5_Y;
    } else {
      cellSize = this.board.cellSize / 3;
      offsetX = OFFSET_X;
      offsetY = OFFSET_Y;
    }
    const cell = new Rect(this.x, this.y);
    cell.setFillInfo(cellSize, cellSize, fillColor);
    this.shape.forEach(i => {
      cell.contextInfo.x = this.contextInfo.x + offsetX[i] * cellSize;
      cell.contextInfo.y = this.contextInfo.y + offsetY[i] * cellSize;
      this.canvas.fillRect(cell);
    });
  }
   
}

class Me extends Rect {
  constructor(board) {
    super();
    this.board = board;
    this.canvas = board.canvas;
    this.movement = 0;
    this.isDead = false;
    this.initCoord();
    this.initContextInfo();
  }

  initCoord() {
    this.x = 0;
    this.y = 0;
  }

  initContextInfo() {
    const { x, y, cellSize } = this.board;
    this.contextInfo.x = x + 0.5 * cellSize;
    this.contextInfo.y = y + 0.5 * cellSize;
    this.setFillInfo(cellSize*3/4, cellSize*3/4, SKYBLUE_ALPHA);
    this.setStrokeInfo();
  }

  moveX(x) {
    this.board.updateCell([this.x, this.y]);
    this.x += x;
    this.contextInfo.x += this.board.cellSize * x;
    this.movement++;
    this.updateCanvas();
  }

  moveY(y) {
    this.board.updateCell([this.x, this.y]);
    this.y += y;
    this.contextInfo.y += this.board.cellSize * y;
    this.movement++;
    this.updateCanvas();
  }

  moveTo(x, y) {
    const { cellSize } = this.board;
    this.board.updateCell([this.x, this.y]);
    this.x = x;
    this.y = y;
    this.contextInfo.x = this.board.x + (x + 0.5) * cellSize;
    this.contextInfo.y = this.board.y + (y + 0.5) * cellSize;
    this.updateCanvas();
  }

  paint() {
    this.canvas.fillRect(this, true);
  }

  updateCanvas() {
    const cell = this.board.getCell(this.x, this.y);
    const offset = [0, 1, 2, 3, 5, 6, 7, 8];

    offset.forEach(i => {
      const [ dx, dy ] = [ this.x + OFFSET_X[i], this.y + OFFSET_Y[i] ];
      if (this.board.isValid(dx, dy)) {
        this.board.openCell(dx, dy);
        this.board.updateCell([dx, dy]);
      }
    });
    this.board.ensureCell(cell);
    this.board.clearCheck(cell);
    this.board.updateCell(cell);
    this.paint();

    if (cell.type === 'mine' || cell.type === 'ensuredMine') {
      this.mineExplosion();
    } else if (cell.type === 'destination') {
      if (this.canvas.page === 'tutorial') {
        alert(TEXT.destination);
        this.canvas.paintMainPage();
      } else if (this.canvas.page === 'game') {
        this.canvas.showStageResult();
      }
    }
  }

  mineExplosion() {
    this.board.updateCell([this.x, this.y]);
    this.moveTo(0, 0);
    this.canvas.showMsgBox(TEXT.msgBox01);
    if (this.canvas.page === 'game') {
      this.isDead = true;
      this.canvas.decreaseLife();
    }
  }
}

class Board {
  constructor(canvas, xCount, yCount, init = true, sizeValues) {
    this.canvas = canvas;
    this.xCount = xCount;
    this.yCount = yCount;
    this.cellCount = xCount * yCount;
    this.showShapeSwitch = canvas.gameInfo.shapeSwitch;
    this.isItemUsed = false;
    this.initSizeValue(sizeValues);
    this.initBoardSetting();
    if (init) {
      this.initCellProperty();
    }
  }

  initSizeValue(sizeValues) {
    if (sizeValues) {
      const { maxWidth, maxHeight, cellSize } = sizeValues;
      this.maxWidth = maxWidth;
      this.maxHeight = maxHeight;
      this.cellSize = cellSize;
    } else {
      this.maxWidth = this.canvas.width * BOARD_WIDTH_RATIO;
      this.maxHeight = this.canvas.height * BOARD_HEIGHT_RATIO;
      this.bottomBarHeight = this.canvas.height * BOARD_BOTTOM_GAP_RATIO;
      this.cellSize = Math.min(this.maxWidth / this.xCount, this.maxHeight*0.98 / this.yCount);
    }

    this.x = (this.canvas.width - this.cellSize * this.xCount) / 2;
    this.y = (this.maxHeight - this.cellSize * this.yCount) / 2;
    this.width = this.xCount * this.cellSize;
    this.height = this.yCount * this.cellSize;
    this.bottomHeight = this.canvas.height - this.maxHeight;
    this.bottomCenterY = this.canvas.height - this.bottomHeight / 2;
  }

  initBoardSetting() {
    this.cellArr = [...Array(this.yCount)].map((_, y) => [...Array(this.xCount)].map((_, x) => new Cell(x, y, this)));
    this.boardSetting = null;
    this.remainingMine = 0;
    this.accessable = [];
    this.minePlantable = this.getMinePlantable();
    this.shortest = 0;
    this.me = new Me(this);
  }

  initCellProperty() {
    [
      [0, 0], [0, 1], [0, 2],
      [1, 0], [1, 1], [1, 2],
      [2, 0], [2, 1], [2, 2]
    ].forEach(coord => this.ensureCell(...coord));
    const destCell = this.cellArr[this.yCount-1][this.xCount-1];
    destCell.type = 'destination';
    this.ensureCell(destCell.x, destCell.y);
    destCell.isDetected = false;
  }

  getMinePlantable() {
    const arr = this.cellArr.flat();
    arr.pop();
    arr.shift();
    return arr;
  }

  getXY(idx) {
    return [idx % this.xCount, Math.floor(idx / this.xCount)];
  }

  getIdx(x, y) {
    if (x instanceof Cell) {
      const cell = x;
      return cell.x + cell.y * this.xCount;
    }
    return x + y * this.xCount;
  }

  getCell(x, y = null) {
    if (y === null) {
      const [ dx, dy ] = this.getXY(x);
      return this.cellArr[dy][dx];
    }
    return this.cellArr[y][x];
  }

  isValid(x, y) {
    return x >= 0 && x < this.xCount && y >= 0 && y < this.yCount;
  }

  forEachCell(callback, ...args) {
    this.cellArr.forEach(
      row => row.forEach(cell => {
        callback.bind(this)(cell, ...args);
      })
    );
  }

  clearCheck(cell) {
    cell.check = 0;
    cell.checkColor = '';
    if(this.canvas.page === 'game') {
      this.updateRemainingMine();
    }
  }

  setAccessable() {
    const graph = [];
    const visited = new Array(this.cellCount).fill(false);
    
    const setGraph = () => {
      const stack = [0];
      while (stack.length) {
        const idx = stack.pop();
        if (!visited[idx]) {
          visited[idx] = true;
          const cell = this.getCell(idx);
          graph.push(cell);

          [1, 3, 5, 7].forEach(i => {
            const [ dx, dy ] = [ cell.x + OFFSET_X[i], cell.y + OFFSET_Y[i] ];
            const newIdx = this.getIdx(dx, dy);
            if (this.isValid(dx, dy)
                && !visited[newIdx]
                && this.getCell(dx, dy).type !== 'mine'
                && this.getCell(dx, dy).type !== 'destination') {
                  stack.push(newIdx);
            }
          });
        }
      }
    };

    setGraph();
    graph.push(this.getCell(this.cellCount-1));
    this.accessable = graph;
  }

  // 지뢰 배치 단계 1 - 시작점과 도착점을 제외한 칸에 지뢰를 지정된 개수만큼 랜덤하게 배치
  arrangeMine(mine) {
    let randArr = [...new Array(this.cellCount-2)].map((_, i) => i+1);
    while (mine--) {
      const randIdx = randRange(0, randArr.length-1);
      this.getCell(randArr.splice(randIdx, 1)[0]).type = 'mine';
    }
  }

  // 지뢰 배치 단계 2 - value가 9인 칸이 있다면, 주변포함 9칸 중 랜덤하게 하나 제거
  relaxMineDensity() {
    const removedMineArr = [];
    this.forEachCell(cell => {
      this.setNormalCellNumber(cell);
      if (cell.number === 9) {
        const rand = randRange(0, 8);
        const [ dx, dy ] = [ x + OFFSET_X[rand], y + OFFSET_Y[rand] ];
        const mine = this.getCell(dx, dy);
        mine.type = 'normal';
        removedMineArr.push(mine);
      }
    });
    return removedMineArr;
    // 어차피 게임판을 그리기 전에 updateCellProperty()를 실행하기 때문에 cell들의 value값은 정정하지 않고 놔둠
  }

  // 지뢰 배치 단계 3 - 인접한 safe칸들로 구성된 구간과 인접한 mine으로 구성된 구간을 분류
  getConnectedComponent() {
    const visited = new Array(this.cellCount).fill(false);
    const safeGraph = [];

    const getGraph = start => {
      const stack = [start];
      const graph = [];

      while (stack.length) {
        const idx = stack.pop();
        if (!visited[idx]) {
          visited[idx] = true;
          graph.push(idx);
          const cell = this.getCell(idx);
          cell.graphIndex = safeGraph.length;

          [1, 3, 5, 7].forEach(i => {
            const [ dx, dy ] = [ cell.x + OFFSET_X[i], cell.y + OFFSET_Y[i] ];
            if (this.isValid(dx, dy) && this.getCell(dx, dy).type !== 'mine') {
              const newIdx = this.getIdx(dx, dy);
              if (!visited[newIdx]) {
                stack.push(newIdx);
              }
            }
          });
        }
      }
      return graph;
    };
    
    visited.forEach((v, i) => {
      if (!v && this.getCell(i).type !== 'mine') {
        safeGraph.push(getGraph(i));
      }
    });
    return safeGraph;
  }

  // mineMap 생성
  getMineMap() {
    const mineMap = new Map();
    this.forEachCell(cell => {
      if (cell.type === 'mine') {
        let key = [];
        [1, 3, 5, 7].forEach(i => {
          const [ dx, dy ] = [ cell.x + OFFSET_X[i], cell.y + OFFSET_Y[i] ];
          if (this.isValid(dx, dy) && this.getCell(dx, dy).type !== 'mine') {
            const idx = this.getCell(dx, dy).graphIndex;
            key.push(idx);
          }
        });

        if (key.length > 0) {
          key = [...new Set(key)].sort((a, b) => a - b).join();
          if (mineMap.has(key)) {
            mineMap.get(key).push(cell);
          } else {
            mineMap.set(key, [cell]);
          }
        }
      }
    });

    const keys = [...mineMap.keys()];

    // 단 1개의 safe graph와 접하는 부분들은 제외
    keys.forEach(key => {
      if (key.length <= 2) {
        mineMap.delete(key);
      }
    });

    // subset 제거
    keys.forEach(key1 => {
      keys.forEach(key2 => {
        if (key1 !== key2) {
          const set1 = new Set([...key1.split(',')]);
          const set2 = new Set([...key1.split(','), ...key2.split(',')]);
          if (set1.size === set2.size) {
            mineMap.delete(key2);
          }
        }
      });
    });

    return mineMap;
  }

  // 제거되는 지뢰와 인접한 safe graph 찾기
  getAdjacentSafeCell(cell) {
    const idx = new Set();
    [1, 3, 5, 7].forEach(i => {
      const [ dx, dy ] = [ cell.x + OFFSET_X[i], cell.y + OFFSET_Y[i] ];
      if (this.isValid(dx, dy)) {
        const safeCell = this.getCell(dx, dy);
        if (safeCell.type !== 'mine') {
          idx.add(safeCell.graphIndex);
        }
      }
    });

    return [...idx];
  }

  getMineArr(graph) {
    const mineArr = new Set();
    graph.forEach(idx => {
      const cell = this.getCell(idx);
      [1, 3, 5, 7].forEach(i => {
        const [ dx, dy ] = [ cell.x + OFFSET_X[i], cell.y + OFFSET_Y[i] ];
        if (this.isValid(dx, dy)) {
          const targetCell = this.getCell(dx, dy);
          if (targetCell.type === 'mine') {
            mineArr.add(targetCell);
          }
        }
      });
    });

    return [...mineArr];
  }

  // 지뢰 배치 단계 4 - 안전 구역 연결
  connectSafeGraph() {
    const removedMineArr = [];
    while (true) {
      const safeGraph = this.getConnectedComponent();
      if (safeGraph.length === 1) break;

      // mineMap의 각각의 value에 속한 cell중 무작위로 하나 골라서 삭제
      // 삭제되면서 연결된 safe graph는 graphIndexArr에서 삭제
      const graphIndexArr = [...new Array(safeGraph.length)].map((_, i) => i);
      const mineMap = this.getMineMap();
      for (const value of mineMap.values()) {
        const rand = randRange(0, value.length-1);
        const removedMine = value.splice(rand, 1)[0];
        this.getAdjacentSafeCell(removedMine).forEach(idx => {
          if (graphIndexArr.includes(idx)) {
            graphIndexArr.splice(graphIndexArr.indexOf(idx), 1);
          }
        })
        removedMine.type = 'normal';
        removedMineArr.push(removedMine);
      }

      // graphIndexArr에 아직도 남아 있는 safe graph는 고립된 구역임.
      // 고립된 safe graph와 인접한 지뢰 중 무작위로 하나 삭제
      graphIndexArr.forEach(idx => {
        const mineArr = this.getMineArr(safeGraph[idx]);
        const rand = randRange(0, mineArr.length-1);
        const removedMine = mineArr.splice(rand, 1)[0];
        removedMine.type = 'normal';
        removedMineArr.push(removedMine);
      });
    }
    return removedMineArr;
  }

  // 지뢰 배치 단계 5 - 여분 지뢰 재배치
  relocateMine(mineArr) {
    let count = mineArr.length;
    const candidate = this.minePlantable.filter(cell => !mineArr.includes(cell)); // 제거된 지뢰 자리 제외

    const isPossible = () => {
      const visited = new Array(this.cellCount).fill(false);
      const stack = [0];
      let isPossible = false;

      while (stack.length) {
        const idx = stack.pop();
        if (idx === this.cellCount-1) {
          isPossible = true;
          break;
        }
        if (!visited[idx]) {
          visited[idx] = true;
          const cell = this.getCell(idx);
          [1, 3, 5, 7].forEach(i => {
            const [ dx, dy ] = [ cell.x + OFFSET_X[i], cell.y + OFFSET_Y[i] ];
            if (this.isValid(dx, dy)) {
              const newIdx = this.getIdx(dx, dy);
              if (this.getCell(newIdx).type !== 'mine') {
                stack.push(newIdx);
              }
            }
          });
        }
      }
      return isPossible;
    };

    while (candidate.length && count) {
      const rand = randRange(0, candidate.length-1);
      const cell = candidate.splice(rand, 1)[0];
      cell.type = 'mine';
      if (isPossible()) {
        count--;
      } else {
        cell.type = 'normal';
      }
    }
  }

  // 최단거리 구하기
  getShortest(start = 0) {
    const visited = new Array(this.cellCount).fill(false);
    const count = new Array(this.cellCount).fill(0);
    const queue = [start];
    
    while (queue.length) {
      const idx = queue.shift();
      if (idx === this.cellCount-1) {
        return count[idx];
      }
      if (!visited[idx]) {
        visited[idx] = true;
        const cell = this.getCell(idx);
        [1, 3, 5, 7].forEach(i => {
          const [ dx, dy ] = [ cell.x + OFFSET_X[i], cell.y + OFFSET_Y[i] ];
          if (this.isValid(dx, dy)) {
            const newIdx = this.getIdx(dx, dy);
            if (!visited[newIdx] && !this.getCell(newIdx).isMine) {
              queue.push(newIdx);
              count[newIdx] = count[idx] + 1;
            }
          }
        });
      }
    }
    return 0;
  }

  setBoard(mine) {
    const removedMineArr = [];
    this.arrangeMine(mine);
    removedMineArr.push(...this.relaxMineDensity());
    removedMineArr.push(...this.connectSafeGraph());
    this.relocateMine(removedMineArr);
    this.setAccessable();
    this.shortest = this.getShortest();
    this.updateCellProperty();
  }

  setNormalCellNumber(cell) {
    let count = 0;
    cell.shape.forEach(i => {
      const [ dx, dy ] = [ cell.x + OFFSET_X[i], cell.y + OFFSET_Y[i] ];
      if (this.isValid(dx, dy) && this.getCell(dx, dy).isMine) {
        count++;
      }
    });
    cell.number = count;
  }

  setSpecialCellNumber(cell) {
    let count = 0;
    let offsetX = OFFSET_X;
    let offsetY = OFFSET_Y;
    if (cell.hintType === 'red' || cell.hintType === 'orange') {
      offsetX = OFFSET5_X;
      offsetY = OFFSET5_Y;
    }
    cell.shape.forEach(i => {
      const [ dx, dy ] = [ cell.x + offsetX[i], cell.y + offsetY[i] ];
      if (this.isValid(dx, dy) && this.getCell(dx, dy).isMine) {
        count++;
      }
    });
    cell.number = count;
  }

  setProperty(cell) {
    if (cell.hintType === 'normal') {
      this.setNormalCellNumber(cell);
    } else {
      this.setSpecialCellNumber(cell);
    }
  }

  setSpecialHint() {
    if (!this.boardSetting) return;
    const candidate = [...this.minePlantable];
    RAINBOW.forEach(type => {
      let count = this.boardSetting[type] ?? 0;
      while (count--) {
        const rand = randRange(0, candidate.length-1);
        const cell = candidate.splice(rand, 1)[0];
        cell.hintType = type;
        cell.textColor = colorMatch[type];
        if (type === 'purple') {
          const shape = [...new Array(9)].map((_, i) => i);
          let range = randRange(1, 7);
          while (range) {
            const rand = randRange(0, shape.length-1);
            shape.splice(rand, 1);
            range--;
          }
          cell.shape = shape;
        } else {
          cell.shape = shapeMatch[type];
        }
      }
    });
  }

  setSpecialText() {
    if (!this.boardSetting) return;
    let { oddEven, highLow } = this.boardSetting;
    const candidate = [...this.minePlantable];

    while (oddEven) {
      const rand = randRange(0, candidate.length-1);
      const cell = candidate.splice(rand, 1)[0];
      cell.textType = 'oddEven';
      oddEven--;
    }
    while (candidate.length && highLow) {
      const rand = randRange(0, candidate.length-1);
      const cell = candidate.splice(rand, 1)[0];
      const numArr = cell.getSurroundingCell().map(surCell => surCell.number);
      if (cell.number === Math.max(...numArr)) {
        cell.textType = 'high';
        highLow--;
      } else if (cell.number === Math.min(...numArr)) {
        cell.textType = 'low';
        highLow--;
      }
    }
  }

  // 모든 cell의 value값 설정
  updateCellProperty() {
    this.setSpecialHint();
    this.forEachCell(this.setProperty);
    this.setSpecialText();
  }

  // 안전한 칸 표시
  ensureCell(x, y) {
    const cell = x instanceof Cell ? x : this.getCell(x, y);
    cell.isEnsured = true;
    this.openCell(x, y);
  }

  ensureWholeCell() {
    this.forEachCell(this.ensureCell);
    this.forEachCell(this.updateCell, true);
    this.paintBorder();
  }

  // 칸 공개
  openCell(x, y) {
    const cell = x instanceof Cell ? x : this.getCell(x, y);
    cell.isDetected = true;
  }

  // 전체 게임판 업데이트
  updateCanvas() {
    this.forEachCell(this.updateCell, true);
    this.paintBorder();
  }

  // 단일 셀 업데이트
  updateCell(cell, isCallback=false) {
    if (!(cell instanceof Cell)) {
      cell = this.getCell(...cell);
    }
    this.fillCell(cell);
    this.fillCellText(cell);
    if (!isCallback) {
      this.paintBorder();
    }
  }

  updateRemainingMine() {
    let mine = 0;
    this.forEachCell(v => {
      if (v.type === 'ensuredMine') {
        mine++;
      } else if (v.check === 1) {
        mine++;
      }
    });
    this.remainingMine = mine;
    this.canvas.paintBottomBar();
  }

  fillCell(cell) {
    if (cell.isEnsured) {
      switch (cell.type) {
        case 'normal':
          cell.fill(LIGHTGRAY);
          break;
        case 'mine':
          cell.type = 'ensuredMine';
          if(this.canvas.page === 'game') {
            this.updateRemainingMine();
          }
        case 'ensuredMine':
          cell.fill(TOMATO);
          break;
        case 'destination':
          cell.fill(YELLOWGREEN);
          break;
      }
    } else {
      cell.fill(CHARCOAL);
    }
  }

  fillCellText(cell) {
    if (cell.isDetected) {
      cell.fillText();
      if (cell.hintType !== 'normal' && cell.type !== 'ensuredMine') {
        cell.strokeText(cell.hintType !== 'navy' ? BLACK : WHITE_ALPHA);
      }
    }
  }

  paintBorder() {
    const line = new Rect(this.canvas.CENTER, this.y - this.cellSize);
    line.setStrokeInfo();
    line.setFillInfo(this.width, 0);
    for (let i = 0; i <= this.yCount; i++) {
      line.contextInfo.y += this.cellSize;
      this.canvas.strokeLine(line);
    }

    line.contextInfo.x = this.x - this.cellSize;
    line.contextInfo.y = this.y + this.height/2;
    line.setFillInfo(0, this.height);
    for (let i = 0; i <= this.xCount; i++) {
      line.contextInfo.x += this.cellSize;
      this.canvas.strokeLine(line);
    }
  }
}

//--------------------------------------------------------------------------------------------------
// main
let curCanvas;
const mainCanvas = new Canvas(document.getElementById('canvas'));
curCanvas = mainCanvas;
curCanvas.paintMainPage();