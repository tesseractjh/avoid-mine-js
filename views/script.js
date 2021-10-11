'use strict';

class Canvas {
  constructor(canvas, init = true) {
    this.canvas = canvas;
    this.width = +canvas.clientWidth;
    this.height = +canvas.clientHeight;
    this.soundVolume = 100;
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
    this.mode = 'CLASSIC';
    this.checkStatus = 0;
    this.isHelpOpen = false;
    this.button = [];
    this.callback = [];
    this.sound = this.sound ?? {};
    this.board = null;
    this.gameInfo = {
      name: '',
      stage: 0,
      modeId: 0,
      life: 5,
      score: 0,
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      tempScore: 0,
      procedure: 0,
      shapeSwitch: false,
      timerSoundSwitch: false,
      bonus: null,
      log: []
    };
    this.leaderboardInfo = {
      page: 1,
      lastPage: 1,
      id: 0,
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
    this.survivalTimer = null;
    this.msgTimer = null;
    this.boxDropTimer = null;
  }

  initElement() {
    Modal.modalList = [];
    this.$container = new Modal('canvas-container');
    this.$msgBox = new Modal('msg-box');

    this.$gameResult = new Modal('game-result');
    this.$gameResult.$title = new Modal('game-result-title');
    this.$gameResult.$stage = new Modal('stage');
    this.$gameResult.$score = new Modal('score');
    this.$gameResult.$rank = new Modal('rank');
    this.$gameResult.$back = new Modal('back');
    this.$gameResult.$back.elem.setAttribute('width', `${this.canvas.height * BOARD_HEIGHT_RATIO}px`);
    this.$gameResult.$back.elem.setAttribute('height', `${this.TITLE_SIZE*3/2}px`);

    this.$stageResult = new Modal('stage-result');
    this.$stageResult.$title = new Modal('stage-result-title');
    this.$stageResult.$cellCount = new Modal('cell-count');
    this.$stageResult.$time = new Modal('remaining-time');
    this.$stageResult.$movementDiv = new Modal('movement-div');
    this.$stageResult.$moveOpt = new Modal('movement-optimization');
    this.$stageResult.$itemDiv = new Modal('item-div');
    this.$stageResult.$item = new Modal('reserved-item');
    this.$stageResult.$perfectClearDiv = new Modal('perfect-clear-div');
    this.$stageResult.$perfectClear = new Modal('perfect-clear');
    this.$stageResult.$totalScore = new Modal('total-score');
    this.$stageResult.$footer = new Modal('stage-result-footer');
    this.$stageResult.$timeText = new Modal('remaining-time-text');

    this.$information = new Modal('information');
    this.$information.$title = new Modal('information-title');
    this.$information.$header = new Modal('information-header');
    this.$information.$left = new Modal('information-left');
    this.$information.$right = new Modal('information-right');
    this.$information.$arrow = new Modal('arrow');
    this.$information.$article = new Modal('information-article');
    this.$information.$footer = new Modal('information-footer');

    this.$inputId = new Modal('input-id');
    this.$inputId.$title = new Modal('input-id-title');
    this.$inputId.$header = new Modal('input-id-header');
    this.$inputId.$input = new Modal('input-id-input');
    this.$inputId.$submit = new Modal('submit');
    this.$inputId.$submit.elem.setAttribute('width', `${this.canvas.height * BOARD_HEIGHT_RATIO}px`);
    this.$inputId.$submit.elem.setAttribute('height', `${this.TITLE_SIZE*3}px`);

    this.$leaderboard = new Modal('leaderboard');
    this.$leaderboard.$title = new Modal('leaderboard-title');
    this.$leaderboard.$list = new Modal('leaderboard-list');
    this.$leaderboard.$footer = new Modal('leaderboard-footer');
    this.$leaderboard.$mode01 = new Modal('leaderboard-mode01');
    this.$leaderboard.$mode02 = new Modal('leaderboard-mode02');
    this.$leaderboard.$classic = new Modal('classic-check');
    this.$leaderboard.$challenge = new Modal('challenge-check');
    this.$leaderboard.$survival = new Modal('survival-check');
    this.$leaderboard.$select = new Modal('leaderboard-select');
    this.appendComboBox();
    this.$leaderboard.elem.addEventListener('change', this.getCallback('change'));

    this.$updateLog = new Modal('update-log');
    this.$updateLog.$title = new Modal('update-log-title');
    this.$updateLog.$article = new Modal('update-log-article');
    this.$updateLog.$footer = new Modal('update-log-footer');

    this.$challenge = new Modal('challenge');
    this.$challenge.$title = new Modal('challenge-title');
    this.$challenge.$article = new Modal('challenge-article');
    this.$challenge.$footer = new Modal('challenge-footer');

    this.$challengeFail = new Modal('challenge-fail');

    this.$survivalResult = new Modal('survival-result');
    this.$survivalResult.$title = new Modal('survival-title');
    this.$survivalResult.$score = new Modal('survival-score');
    this.$survivalResult.$time = new Modal('survival-time');
    this.$survivalResult.$delay = new Modal('survival-delay');
    this.$survivalResult.$cellCount = new Modal('survival-cellCount');
    this.$survivalResult.$rank = new Modal('survival-rank');
    this.$survivalResult.$footer = new Modal('survival-footer');

    this.$nav = new Modal('nav');
    this.$nav.$help = new Modal('nav-help');

    this.$help = new Modal('help');
    this.$help.$title = new Modal('help-title');
    this.$help.$article = new Modal('help-article');
    this.$help.$footer = new Modal('help-footer');
  }

  initEventListener() {
    this.canvas.addEventListener('click', this.getCallback('clickButton'));
    this.canvas.addEventListener('mousemove', this.getCallback('buttonHover'));
    this.$nav.$help.elem.addEventListener('click', this.getCallback('clickHelp'));
    window.addEventListener('keydown', this.getCallback('keydown'));
  }

  initSound() {
    ['cannotUseItem', 'clear', 'explosion', 'fail',
    'item', 'shape', 'stopwatch', 'break',
    'acquisition', 'changeBoard']
      .forEach(sound => {
        const audio = new Audio();
        audio.src = `/sounds/${sound}.mp3`;
        audio.preload = 'auto';
        this.sound[sound] = audio;
      });
  }

  sendLogToServer() {
    const userInfo = this.crossMode('sendLog');
    fetch(`/log/${this.mode.toLowerCase()}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userInfo)
    })
  }

  sendChallengeFailLogToServer() {
    const { name, modeId } = this.gameInfo;
    const userInfo = { name, modeId };
    fetch('/log/challenge/fail', {
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

  setText(elem, text) {
    const textNode = document.createTextNode(text);
    elem.appendChild(textNode);
  }

  appendNodeWithText(elem, text) {
    const div = document.createElement('div');
    this.setText(div, text);
    div.classList.add('margin');
    elem.appendChild(div);
    return div;
  }

  setUpdateLog() {
    const wholeLog = document.createElement('ul');

    [...UPDATE_LOG].reverse().forEach(YM => {
      const { title, log } = YM;
      const yearMonthUl = document.createElement('ul');
      const li = document.createElement('li');
      const span = document.createElement('span');
      this.setText(span, title);
      span.classList.add('h1');

      [...log].reverse().forEach(date => {
        const { title, log } = date;
        const dateUl = document.createElement('ul');
        const li = document.createElement('li');
        const span = document.createElement('span');
        this.setText(span, title);
        span.classList.add('h2');

        log.forEach(note => {
          const { title, log } = note;
          const noteUl = document.createElement('ul');
          const li = document.createElement('li');
          const span = document.createElement('span');
          this.setText(span, title);
          span.classList.add('h3');

          log.forEach(description => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            this.setText(span, description);
            span.classList.add('h4');
            li.appendChild(span);
            li.classList.add('h4');
            noteUl.appendChild(li);
            noteUl.classList.add('h4');
          });

          li.appendChild(span);
          li.appendChild(noteUl);
          li.classList.add('h3');
          dateUl.appendChild(li);
        });

        li.appendChild(span);
        li.appendChild(dateUl);
        li.classList.add('h2');
        yearMonthUl.appendChild(li);
      });

      li.appendChild(span);
      li.appendChild(yearMonthUl);
      li.classList.add('h1');
      wholeLog.appendChild(li);
    });
    this.$updateLog.$article.elem.appendChild(wholeLog);
  }

  setColorBar(parent, colors) {
    const div = document.createElement('div');
    RAINBOW.forEach(color => {
      const square = document.createElement('div');
      if (color === 'purple') {
        square.classList.add('square-purple');
      } else {
        square.classList.add('square');
      }
      if (colors.includes(color)) {
        square.style.backgroundColor = colorMatch[color];
      }
      div.appendChild(square);
    });
    parent.appendChild(div);
  }

  setChallengeModeList() {
    MODE_CHALLENGE.forEach((chal, i) => {
      const { xCount, yCount, mine, boardSetting, selectInfo } = chal;
      const { time } = boardSetting;
      const colorType = RAINBOW.filter(color => boardSetting[color]);
      const textType = TEXT_HINT.filter(text => boardSetting[text]).map(v => textHintMatch[v]);
      const { name, item, difficulty } = selectInfo;
      const [ item1, item2, item3, item4 ] = item;
      const div = document.createElement('div');
      const top = document.createElement('div');
      const bottom = document.createElement('div');
      const left = document.createElement('div');
      const right = document.createElement('div');
      div.classList.add('challenge-mode');
      left.classList.add('inline-block');
      left.classList.add('align-right');
      right.classList.add('inline-block');
      right.classList.add('align-left');
      top.classList.add('align-center');
      top.classList.add('border-bottom');
      top.classList.add('margin');
      bottom.classList.add('align-center');
      bottom.classList.add('border-top');
      bottom.classList.add('margin');

      this.setText(top, `${name}`);

      this.appendNodeWithText(left, TEXT.challengeList01);
      this.appendNodeWithText(right, `${xCount}X${yCount}`);

      const minute = Math.floor(time / 60) ? `${Math.floor(time / 60)}분 ` : '';
      const second = time % 60 ? `${time % 60}초` : '';
      this.appendNodeWithText(left, TEXT.challengeList02);
      this.appendNodeWithText(right, `${minute}${second}`);

      this.appendNodeWithText(left, TEXT.challengeList03);
      this.appendNodeWithText(right, `${Math.floor(mine * 100 / (xCount * yCount))}%`);

      this.appendNodeWithText(left, TEXT.challengeList04);
      if (colorType.length) {
        const colorBar = document.createElement('div');
        this.setColorBar(colorBar, colorType);
        right.appendChild(colorBar);
      } else {
        this.appendNodeWithText(right, '없음');
      }

      this.appendNodeWithText(left, TEXT.challengeList05);
      this.appendNodeWithText(right, `${textType.length ? textType.join(', ') : '없음'}`);

      this.appendNodeWithText(left, TEXT.challengeList06);
      const itemText = this.appendNodeWithText(right, `
      ${item1 ? TEXT.challengeList07 + item1 + ' ' : ''}
      ${item2 ? TEXT.challengeList08 + item2 + ' ' : ''}
      ${item3 ? TEXT.challengeList09 + item3 + ' ' : ''}
      ${item4 ? TEXT.challengeList10 + item4 : ''}
      `);
      if (item4) {
        itemText.style.fontSize = '20px';
      }

      this.setText(bottom, `난이도 ${TEXT.challengeList11.repeat(difficulty)}`);

      [top, left, right, bottom].forEach(elem => div.appendChild(elem));
      div.addEventListener('click', this.getGamePage('CHALLENGE').bind(this));
      div.addEventListener('click', (() => function () {
        this.gameInfo.modeId = i;
        this.$challenge.hide();
      })().bind(this));
      this.$challenge.$article.elem.appendChild(div);
    })
  }

  setHelpList() {
    HELP.forEach(doc => {
      const { title, content } = doc;
      const div = document.createElement('div');
      this.setText(div, title);
      div.classList.add('grid-item-title');
      this.$help.$article.elem.appendChild(div);
      content.forEach(obj => {
        const { type, example, text, description, src } = obj;
        const leftDiv = document.createElement('div');
        const rightDiv = document.createElement('div');

        switch (type) {
          case 'example':
            const { size, color, color2, value, values, mine } = example;
            let divList;
            if (size === 1) {
              leftDiv.classList.add('grid-example-size1');
              divList = [...new Array(9)].map((_, i) => {
                const div = document.createElement('div');
                div.classList.add('cell1');
                if (i % 3 === 2) {
                  div.classList.add('cell-right');
                }
                if (i > 5) {
                  div.classList.add('cell-bottom');
                }
                if (value && i === 4) {
                  this.setText(div, value);
                }
                return div;
              });
            } else if (size === 2) {
              leftDiv.classList.add('grid-example-size2');
              divList = [...new Array(25)].map((v, i) => {
                const div = document.createElement('div');
                div.classList.add('cell2');
                if (i % 5 === 4) {
                  div.classList.add('cell-right');
                }
                if (i > 19) {
                  div.classList.add('cell-bottom');
                }
                if (value && i === 12) {
                  this.setText(div, value);
                }
                return div;
              });
            }
            if (color) {
              for (const [ key, value ] of Object.entries(color)) {
                value.forEach(idx => {
                  divList[idx].style.backgroundColor = colorMatch[key];
                });
              }
            } else if (color2) {
              for (const [ key, value ] of Object.entries(color2)) {
                value.forEach(idx => {
                  divList[idx].style.backgroundColor = key;
                });
              }
            }
            if (values) {
              values.forEach(cell => {
                const [ idx, val ] = cell;
                this.setText(divList[idx], val);
              })
            }
            if (mine) {
              mine.forEach(idx => this.setText(divList[idx], '💣'));
            }
            divList.forEach(div => leftDiv.appendChild(div));
            this.setText(rightDiv, description);
            leftDiv.classList.add('grid-item-example');
            rightDiv.classList.add('grid-item-description1');
            break;
          
          case 'text1':
            this.setText(leftDiv, text);
            this.setText(rightDiv, description);
            leftDiv.classList.add('grid-item-text1');
            rightDiv.classList.add('grid-item-description1');
            break;

          case 'text2':
            this.setText(leftDiv, text);
            this.setText(rightDiv, description);
            leftDiv.classList.add('grid-item-text2');
            rightDiv.classList.add('grid-item-description2');
            break;

          case 'image':
            const img = document.createElement('img');
            img.src = `/images/${src}`;
            img.style.width = '220px';
            img.style.height = '220px';
            img.style.border = '2px solid black';
            leftDiv.appendChild(img);
            this.setText(rightDiv, description);
            leftDiv.classList.add('grid-item-text1');
            rightDiv.classList.add('grid-item-description1');

        }
        this.$help.$article.elem.appendChild(leftDiv);
        this.$help.$article.elem.appendChild(rightDiv);
      });
    });
  }

  initHead() {
    this.$leaderboard.$list.innerHTML = this.crossMode('initHead');
  }

  appendToList(users) {
    const { page } = this.leaderboardInfo;
    const $fragment = document.createDocumentFragment();
    users.forEach((user, ranking) => this.createUserInfo($fragment, user, (page - 1) * 10 + ranking + 1));
    this.$leaderboard.$list.elem.appendChild($fragment);
  }

  setLeaderboard(id) {
    this.page = 'fetching';
    const { page, record } = this.leaderboardInfo;

    if (record.length > (page - 1) * 10) { // record가 커버 가능한 목록 이동
      this.initHead();
      this.crossMode('grid');
      this.appendToList(record.slice((page - 1) * 10, page * 10));
      this.$leaderboard.show();
      this.page = 'leaderboard';
    } else { // GET요청
      let param = id ?? '';
      if (param !== '') {
        param = '/' + param;
      }
      fetch(`/${this.mode.toLowerCase()}${param}`)
      .then(res => res.json())
      .then(users => {
        this.leaderboardInfo.record = users;
        const curList = users.slice((page - 1) * 10, page * 10);
        this.leaderboardInfo.lastPage = Math.floor((users.length - 1) / 10) + 1;
        this.initHead();
        this.crossMode('grid');
        this.appendToList(curList);
        this.$leaderboard.show();
        this.page = 'leaderboard';
      })
      .catch(console.error);
    }
  }

  postLeaderBoard(userInfo) {
    const [ $elem, param ] = this.crossMode('post');
    $elem.show();
    this.elementDropEffect($elem);
    fetch(`/${this.mode.toLowerCase()}${param}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userInfo)
    })
      .catch(console.error);
  }

  createUserInfo(fragment, user, ranking) {
    const keys = this.crossMode('userInfo', user, ranking);
    keys.forEach(v => {
      const div = document.createElement('div');
      const text = document.createTextNode(v);
      div.appendChild(text);
      div.classList.add('border-bottom2');
      fragment.appendChild(div);
    });
  }

  saveLog() {
    const { itemInfo, accessable, shortest, ensuredCellCount, isAllEnsured, mine } = this.board;
    const { time } = this.board.boardSetting;
    const { movement, deathCount } = this.board.me;
    const { stage, life, item1, item2, item3, item4, tempScore } = this.gameInfo;
    const log = {
      stage, time, movement, itemInfo, isAllEnsured,
      life, item1, item2, item3, item4, deathCount,
      shortest, mine,
      ensuredCell: ensuredCellCount,
      score: tempScore,
      accessableLength: accessable.length
    };
    this.gameInfo.log.push(log);
  }

  appendComboBox() {
    const select = document.createElement('select');
    MODE_CHALLENGE.forEach((chal, i) => {
      const { name } = chal.selectInfo;
      const option = document.createElement('option');
      this.setText(option, name);
      option.value = i;
      if (i === 0) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    select.addEventListener('change', this.getCallback('change'));
    select.classList.add('select');
    this.$leaderboard.$select.comboBox = select;
    this.$leaderboard.$select.elem.appendChild(select);
  }

  setMovementDiv() {
    const { $moveOpt } = this.$stageResult;
    const { accessable, shortest } = this.board;
    const { movement } = this.board.me;
    let rank;
    let movementRatio;
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

    return movementRatio;
  }

  setItemDiv() {
    const { $item } = this.$stageResult;
    const { isItemUsed } = this.board.itemInfo;
    let itemRatio;
    if (!isItemUsed) {
      itemRatio = RESERVED_ITEM_RATIO
      $item.color = YELLOWGREEN;
      $item.innerHTML = `CLEAR +${Math.floor(itemRatio*100-100)}%`;
    } else {
      itemRatio = 1;
      $item.color = BLACK;
      $item.innerHTML = 'FAIL';
    }
    this.$stageResult.$itemDiv.show();
    return itemRatio;
  }

  setPerfectClearDiv() {
    const { $perfectClear } = this.$stageResult;
    const { isAllEnsured } = this.board;
    const { deathCount } = this.board.me;
    let perfectClearRatio;
    if (deathCount === 0 && isAllEnsured) {
      perfectClearRatio = PERFECT_CLEAR_RATIO;
      $perfectClear.color = YELLOWGREEN;
      $perfectClear.innerHTML = `CLEAR x${perfectClearRatio}`;
    } else {
      perfectClearRatio = 1;
      $perfectClear.color = BLACK;
      $perfectClear.innerHTML = 'FAIL';
    }
    this.$stageResult.$perfectClearDiv.show();
    return perfectClearRatio;
  }

  getTutorialPage(number) {
    const page = TUTORIAL[`tutorial0${number}`];
    return function() {
      this.paintTutorialPage(page);
    };
  }

  getSelectGameTypePage() {
    return function() {
      this.paintSelectGameTypePage();
    }
  }

  getChallengeModePage() {
    return function() {
      this.showChallengeMode();
    }
  }

  getMainPage() {
    return function() {
      this.paintMainPage();
    }
  }

  getGamePage(mode) {
    return function() {
      this.mode = mode;
      this.board = new Board(this, 1, 1, false); // 임시 board. 실제 게임판 x
      this.paintPage();
      this.canvas.removeEventListener('click', this.getCallback('clickButton'));
      this.canvas.addEventListener('mousedown', this.getCallback('startPaint'));
      this.canvas.addEventListener('mouseup', this.getCallback('finishPaint'));
      this.canvas.addEventListener('mousemove', this.getCallback('mineProperty', true));
      this.canvas.addEventListener('mousewheel', this.getCallback('wheel', true));
    }
  }

  getLeaderboardPage() {
    return function() {
      this.showLeaderBoard();
    }
  }

  getUpdateLogPage() {
    return function() {
      this.showUpdateLog();
    }
  }

  playSound(sound) {
    new Promise(resolve => resolve(this.sound[sound].pause()))
      .then(() => {
        this.sound[sound].currentTime = 0;
        this.sound[sound].play();
      });
  }

  decreaseLife() {
    if (this.gameInfo.life === 0) {
      this.board.ensureWholeCell();
      this.crossMode('fail');
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
      hover, caption, innerText,
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

    if (innerText) {
      const inner = new Rect(x, y + fontSize * 3/4);
      inner.setTextInfo(innerText, fontSize/4);
      inner.fontWeight = 500;
      button.innerText = inner;
    }

    if (caption) {
      const bottomText = new Rect(x, y + height*3/4);
      bottomText
        .setFillInfo(this.width, fontSize/2, BACKGROUND_COLOR)
        .setTextInfo(caption, fontSize/2, WHITE);
      bottomText.fontWeight = 500;
      button.caption = bottomText;
    }

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
    clearInterval(this.survivalTimer);
    clearInterval(this.msgTimer);
    clearInterval(this.boxDropTimer);
  }

  clearModal() {
    this.$msgBox.hide();
    this.$gameResult.hide();
    this.$stageResult.hide();
    this.$stageResult.$itemDiv.hide();
    this.$information.hide();
    this.$information.$left.clear();
    this.$information.$right.clear();
    this.$information.$article.clear();
    this.$information.$arrow.clear();
    this.$inputId.hide();
    this.$leaderboard.hide();
    this.$updateLog.hide();
    this.$challenge.hide();
    this.$challenge.$article.clear();
    this.$challengeFail.hide();
    this.$survivalResult.hide();
    Modal.modalList.forEach(modal => {
      if (modal.elem.classList.contains('drop')) {
        modal.top = 0;
        modal.opacity = 0;
      }
    });
  }

  paintAllButton() {
    this.button.forEach(btn => {
      this.fillRect(btn, true);
      this.fillText(btn);
      if (btn.innerText) {
        this.fillText(btn.innerText);
      }
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
    const title = new Rect(this.CENTER, this.TITLE_SIZE * 2);
    title.setTextInfo(TEXT.mainTitle, this.TITLE_SIZE);
    this.fillText(title);
  }

  paintMainButton() {
    const [ x, width, height, fontSize ] = [
      this.CENTER, this.FONT_SIZE * 7, this.FONT_SIZE * 2, this.FONT_SIZE
    ];
    this.createButton(BUTTON.tutorial, {
        x,
        y: this.TITLE_SIZE * 4,
        width,
        height,
        fontSize,
        page: this.getTutorialPage(1)
    });
    this.createButton(BUTTON.start, {
      x,
      y: this.TITLE_SIZE * 6,
      fontSize,
      width,
      height,
      page: this.getSelectGameTypePage()
    });
    this.createButton(BUTTON.leaderboard, {
      x,
      y: this.TITLE_SIZE * 8,
      fontSize,
      width,
      height,
      page: this.getLeaderboardPage()
    });
    this.createButton(BUTTON.updateLog, {
      x,
      y: this.TITLE_SIZE * 10,
      fontSize,
      width,
      height,
      page: this.getUpdateLogPage()
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
    const { me, meX, meY, ensured, open } = boardInfo;
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
    if (open) {
      open.forEach(coord => {
        const [ x, y ] = coord;
        board.openCell(x, y);
      })
    }
    board.getCell(2, 2).type = 'ensuredMine';
    board.setWholeCellProperty();
    board.updateCanvas();
    if (me) {
      board.me.moveTo(meX ?? 0, meY ?? 0);
    }
  }

  paintSelectGameTypePage() {
    this.clearPage();
    this.page = 'selectGame';
    this.paintSelectGameTypeTitle();
    this.paintSelectGameTypeButton();
  }

  paintSelectGameTypeTitle() {
    const title = new Rect(this.CENTER, this.TITLE_SIZE * 2);
    title.setTextInfo(TEXT.selectGameTitle, this.TITLE_SIZE);
    this.fillText(title);
  }

  paintSelectGameTypeButton() {
    const [ x, width, height, fontSize ] = [
      this.CENTER, this.FONT_SIZE * 7, this.FONT_SIZE * 7 / 4, this.FONT_SIZE
    ];
    this.createButton(BUTTON.modeClassic, {
        x,
        y: this.TITLE_SIZE * 4,
        width,
        height,
        fontSize,
        page: this.getGamePage('CLASSIC')
    });
    this.createButton(BUTTON.modeChallenge, {
      x,
      y: this.TITLE_SIZE * 6,
      fontSize,
      width,
      height,
      page: this.getChallengeModePage()
    });
    this.createButton(BUTTON.modeSurvival, {
      x,
      y: this.TITLE_SIZE * 8,
      fontSize,
      width,
      height,
      page: this.getGamePage('SURVIVAL')
    });
    this.createButton(BUTTON.backToMainPage, {
      x,
      y: this.TITLE_SIZE * 10,
      fontSize,
      width,
      height,
      page: this.getMainPage()
    });
    this.paintAllButton();
  }

  paintGameBoard({ xCount, yCount, mine, boardSetting }) {
    let board;
    if (this.mode === 'SURVIVAL') {
      board = new SurvivalBoard(this, xCount, yCount);
    } else {
      board = new Board(this, xCount, yCount);
    }
    this.board = board;
    board.boardSetting = { mine, ...boardSetting };
    const { start, destination } = board.boardSetting.specialCells ?? {} ;
    board.setStartAndDestination(start, destination);
    board.setBoard(mine);
    board.updateCanvas();
    board.me.updateCanvas();
  }

  paintInfoBoard(boardInfo, $div, widthRatio = 2/5, heightRatio = 3/5) {
    const { xCount, yCount, tomato, yellowgreen, ensured, open, mine, block, me, showShape } = boardInfo;
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

    ensured?.forEach(([ x, y, value, hintType, shape ]) => {
      const cell = tempBoard.getCell(x, y);
      tempBoard.ensureCell(x, y);
      cell.number = value;
      cell.hintType = hintType ?? 'normal';
      if (hintType !== 'normal') {
        cell.shape = shape ?? shapeMatch[hintType];
      }
      cell.textColor = hintType ? colorMatch[hintType] : BLACK;
    });

    open?.forEach(([ x, y, value ]) => {
      const cell = tempBoard.getCell(x, y);
      tempBoard.openCell(x, y);
      cell.number = value;
    });

    mine?.forEach(([ x, y ]) => {
      const cell = tempBoard.getCell(x, y);
      cell.type = 'ensuredMine';
      tempBoard.ensureCell(x, y);
    });

    block?.forEach(([ x, y ]) => {
      const cell = tempBoard.getCell(x, y);
      cell.isBlocked = true;
    });

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

    tempBoard.updateCanvas();

    if (me) {
      const [ x, y ] = me;
      tempBoard.me.moveTo(x, y);
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
    if (stageInfo.selectInfo) {
      stageInfo.selectInfo.item.forEach((v, i) => this.gameInfo[`item${i+1}`] = v);
    }
    this.clearPage();
    this.clearTimer();
    this.clearModal();
    this.crossMode('ready');
    this.paintGameBoard(stageInfo);
    this.paintBottomBar();
    this.gameTimer = setInterval(this.setTimer.bind(this), 1000);
  }

  paintSurvivalModeGamePage(initialValue) {
    this.page = 'game';
    this.clearPage();
    this.clearTimer();
    this.clearModal();
    this.crossMode('ready');
    this.paintGameBoard(initialValue);
    this.paintBottomBar();
    this.gameTimer = setInterval(this.setCountUpTimer.bind(this), 1000);
  }

  paintBottomBar() {
    const { life } = this.gameInfo;
    const { bottomBarHeight, bottomCenterY } = this.board;
    const { time } = this.board.boardSetting;
    const [ width, height ] = [ this.crossMode('barWidth'), bottomBarHeight ];
    const background = new Rect(this.CENTER, bottomCenterY);
    background
      .setFillInfo(width, height, WHITE)
      .setStrokeInfo();
    this.fillRect(background, true);

    this.paintDivisionLine(background);
    
    const { bottomValues, textType, lifeIdx, timeIdx, multi, plus } = this.crossMode('paintBar');

    const fontSize = bottomBarHeight/4;
    const [ topY, bottomY ] = [ bottomCenterY - bottomBarHeight/5, bottomCenterY + bottomBarHeight/5 ];
    bottomValues.forEach((value, idx) => {
      const top = new Rect(this.CENTER + width*(idx*multi + plus), topY);
      top.setTextInfo(TEXT[`${textType}${idx+1}`], fontSize);
      this.fillText(top);

      let textColor = BLACK;
      if ((idx === lifeIdx && life === 0) || (idx === timeIdx && time < 30)) {
        textColor = TOMATO;
      }
      const bottom = new Rect(this.CENTER + width*(idx*multi + plus), bottomY);
      bottom.setTextInfo(value, fontSize, textColor);
      this.fillText(bottom);
    });
  }

  paintDivisionLine(box) {
    const x = box.contextInfo.x - box.width / 2;
    const y = box.contextInfo.y;
    const count = this.crossMode('paintLine');
    for (let i=0; i<count; i++) {
      const line = new Rect(x + box.width*(i+1)/(count+1), y);
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
      this.crossMode('fail');
    }
  }

  setCountUpTimer() {
    this.board.boardSetting.time++;
    this.crossMode('score', 1);
    this.paintBottomBar();
  }

  setSurvivalTimer() {
    if (this.board.boardSetting.time < 29) return;
    const { cellArr, nextBoard, cellArrItem, nextBoardItem, me } = this.board;
    cellArr.forEach((row, y) => {
      row.shift();
      const lastCell = nextBoard[y].shift();
      row.push(lastCell);
      lastCell.setX(this.board.xCount - 1);
      row.forEach((cell, x) => {
        if (x < this.board.xCount - 1) {
          cell.setX(x);
          if (nextBoard[y][x]) {
            nextBoard[y][x].setX(x);
          }
        }
      });
      nextBoard[y].push(null);
    });

    const firstItems = cellArrItem.filter(item => item.x === 0);
    firstItems?.forEach(item => cellArrItem.splice(cellArrItem.indexOf(item), 1));
    cellArrItem.forEach(item => item.setX(item.x-1));

    const lastItems = nextBoardItem.filter(item => item.x === 0);
    lastItems?.forEach(item => {
      nextBoardItem.splice(nextBoardItem.indexOf(item), 1);
      cellArrItem.push(item);
      item.setX(this.board.xCount - 2);
    });
    nextBoardItem.forEach(item => item.setX(item.x-1));

    this.board.forEachCell(this.board.setProperty);
    this.board.correctHighLow();
    this.board.updateCanvas();

    if (me.x === 0) {
      clearInterval(this.survivalTimer);
      this.crossMode('fail');
    } else {
      me.moveX(-1);
      me.updateCanvas();
    }

    this.crossMode('score', Math.floor((100000 / this.board.curDelay)**2));

    if (this.board.nextBoard[0][0] === null) {
      const { xCount, yCount } = this.board;
      this.board.setNextBoardSetting();
      const { mine } = this.board.boardSetting;
      this.board.nextBoard = [...Array(yCount)].map((_, y) => [...Array(xCount)].map((_, x) => new Cell(x, y, this.board)));
      this.board.setNextBoard(mine);
    }

    this.finishPaintCallback();
    this.paintBottomBar();
    this.playSound('changeBoard');
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
  
    if (sound) {
      this.playSound(sound);
    }
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
    this.clearModal();
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

  showGameResult(isClear = false) {
    this.initPage('gameResult');
    const { stage, score } = this.gameInfo;
    const { $title, $stage, $score, $rank, $back } = this.$gameResult;

    this.$gameResult.backgroundColor = WHITE_ALPHA;
    this.$gameResult.font = this.TITLE_SIZE;
    this.$gameResult.width = this.board.maxWidth;
    this.$gameResult.height = this.height;

    if (!isClear) {
      $title.innerHTML = 'GAME OVER';
      this.playSound('fail');
    } else {
      $title.innerHTML = '🎉 GAME CLEAR 🎉';
      this.gameInfo.stage++;
      this.playSound('clear');
    }

    $stage.innerHTML = stage;
    $score.innerHTML = `${score}점`;
    const rank = getRank(score, 'CLASSIC');
    $rank.innerHTML = rank;

    const tempCanvas = new Canvas($back.elem, false);
    $back.elem.addEventListener('click', tempCanvas.getCallback('clickButton'));
    $back.elem.addEventListener('mousemove', tempCanvas.getCallback('buttonHover'));
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
          this.canvas.removeEventListener('mousemove', this.getCallback('buttonHover'));
          originalCanvas.clearPage();
          originalCanvas.clearModal();
          originalCanvas.clearTimer();
          originalCanvas.initValues();
          originalCanvas.canvas.addEventListener('click', originalCanvas.getCallback('clickButton'));
          originalCanvas.paintMainPage();
        };
      })()
    });
    tempCanvas.paintAllButton();

    const userInfo = {
      name: this.gameInfo.name,
      score: this.gameInfo.score,
      stage: this.gameInfo.stage,
      log: this.gameInfo.log
    }

    this.postLeaderBoard(userInfo);
    this.canvas.removeEventListener('mousedown', this.getCallback('startPaint'));
    this.canvas.removeEventListener('mouseup', this.getCallback('finishPaint'));
    this.canvas.removeEventListener('mousemove', this.getCallback('mineProperty', true));
    this.canvas.removeEventListener('mousewheel', this.getCallback('wheel', true));
  }

  showStageResult() {
    this.initPage('stageResult');
    const { ensuredCellCount } = this.board;
    const { time } = this.board.boardSetting;
    const { stage } = this.gameInfo;
    const { $title, $cellCount, $time, $totalScore, $footer } = this.$stageResult;

    this.$stageResult.backgroundColor = WHITE_ALPHA;
    this.$stageResult.font = this.FONT_SIZE;
    this.$stageResult.width = this.board.maxWidth;
    this.$stageResult.height = this.height;

    $title.innerHTML = `STAGE ${stage} 결과`;
    $cellCount.innerHTML = ensuredCellCount * CELL_COUNT_SCORE;
    $time.innerHTML = time * REMAINING_TIME_SCORE;
    $footer.innerHTML = 'F를 누르면 다음 스테이지로 이동합니다.';
  
    let movementRatio = 1;
    if (stage > 5) {
      movementRatio = this.setMovementDiv();
    }
  
    let itemRatio = 1;
    if (stage > 1) {
      itemRatio = this.setItemDiv();
    }
  
    let perfectClearRatio = 1;
    if (stage > 4) {
      perfectClearRatio = this.setPerfectClearDiv();
    }
  
    this.gameInfo.tempScore = Math.floor(
      (ensuredCellCount * CELL_COUNT_SCORE + time * REMAINING_TIME_SCORE)
      * movementRatio
      * itemRatio
      * perfectClearRatio
    );
    $totalScore.innerHTML = this.gameInfo.tempScore;
    
    this.playSound('clear');
    this.saveLog();
    this.sendLogToServer();
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
    this.$information.fontWeight = 600;
    this.$information.width = this.board.maxWidth;
    this.$information.height = this.height;

    $title.innerHTML = title ?? '';
    $title.font = this.FONT_SIZE;
    $header.innerHTML = header ?? '';
    $footer.innerHTML = footer ?? '';
    $footer.font = this.FONT_SIZE * 2/5;

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
    $submit.elem.addEventListener('mousemove', tempCanvas.getCallback('buttonHover'));
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
          const value = $input.elem.value.trim();
          if (value.length > 0
            && !/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/.test(value)) {
            this.canvas.removeEventListener('click', tempCanvas.getCallback('clickButton'));
            this.canvas.removeEventListener('mousemove', tempCanvas.getCallback('buttonHover'));
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
    const { $title } = this.$leaderboard;

    this.$leaderboard.backgroundColor = WHITE_ALPHA;
    this.$leaderboard.font = this.FONT_SIZE/2;
    this.$leaderboard.width = this.width * BOARD_WIDTH_RATIO;
    this.$leaderboard.height = this.height;
    this.$leaderboard.fontWeight = 500;

    $title.font = this.FONT_SIZE;

    this.setLeaderboard();
  }

  showUpdateLog() {
    this.initPage('updateLog');
    const { $footer } = this.$updateLog;

    this.$updateLog.backgroundColor = WHITE_ALPHA;
    this.$updateLog.font = this.FONT_SIZE;
    this.$updateLog.width = this.width * BOARD_WIDTH_RATIO;
    this.$updateLog.height = this.height;

    $footer.font = this.FONT_SIZE/2;

    this.setUpdateLog();
    this.$updateLog.show();
  }

  showChallengeMode() {
    this.initPage('challenge');
    const { $footer } = this.$challenge;

    this.$challenge.backgroundColor = WHITE_ALPHA;
    this.$challenge.font = this.FONT_SIZE;
    this.$challenge.width = this.width * BOARD_WIDTH_RATIO;
    this.$challenge.height = this.height;

    $footer.font = this.FONT_SIZE/2;

    this.setChallengeModeList();
    this.$challenge.show();
  }

  showChallengeResult() {
    this.initPage('challengeResult');
    const { item1, item2, item3, item4 } = this.gameInfo;
    if (this.board.boardSetting.block) {
      this.board.setAccessable(true);
    }
    const { itemInfo, accessable, shortest, ensuredCellCount, isAllEnsured, mine } = this.board;
    const { time } = this.board.boardSetting;
    const { movement } = this.board.me
    const { $title, $cellCount, $time, $totalScore, $footer } = this.$stageResult;
    const cellCount = ensuredCellCount;
  
    this.$stageResult.backgroundColor = WHITE_ALPHA;
    this.$stageResult.font = this.FONT_SIZE;
    this.$stageResult.width = this.board.maxWidth;
    this.$stageResult.height = this.height;

    $title.innerHTML = `🎉 도전 모드 클리어 🎉`;
    $cellCount.innerHTML = cellCount * CELL_COUNT_SCORE;
    $time.innerHTML = time * REMAINING_TIME_SCORE;
    $footer.innerHTML = 'F를 누르면 메인 화면으로 이동합니다.';
  
    const movementRatio = this.setMovementDiv();
    const perfectClearRatio = this.setPerfectClearDiv();
  
    this.gameInfo.tempScore = Math.floor(
      (cellCount * CELL_COUNT_SCORE + time * REMAINING_TIME_SCORE)
      * movementRatio
      * perfectClearRatio
    );
    $totalScore.innerHTML = this.gameInfo.tempScore;
    
    this.playSound('clear');
    this.sendLogToServer();

    const userInfo = {
      name: this.gameInfo.name,
      score: this.gameInfo.tempScore,
      time: this.board.boardSetting.time,
      accessableLength: accessable.length,
      ensuredCell: ensuredCellCount,
      movement, item1, item2, item3, item4,
      mine, shortest, itemInfo, isAllEnsured
    }

    this.postLeaderBoard(userInfo);
    this.canvas.removeEventListener('mousedown', this.getCallback('startPaint'));
    this.canvas.removeEventListener('mouseup', this.getCallback('finishPaint'));
    this.canvas.removeEventListener('mousemove', this.getCallback('mineProperty', true));
    this.canvas.removeEventListener('mousewheel', this.getCallback('wheel', true));
  }

  showChallengeFail() {
    this.initPage('challengeFail');

    this.$challengeFail.backgroundColor = WHITE_ALPHA;
    this.$challengeFail.font = this.FONT_SIZE;
    this.$challengeFail.width = this.board.maxWidth;
    this.$challengeFail.height = this.height;

    this.playSound('fail');
    this.sendChallengeFailLogToServer();
    this.$challengeFail.show();
    this.elementDropEffect(this.$challengeFail);
    this.canvas.removeEventListener('mousedown', this.getCallback('startPaint'));
    this.canvas.removeEventListener('mouseup', this.getCallback('finishPaint'));
    this.canvas.removeEventListener('mousemove', this.getCallback('mineProperty', true));
    this.canvas.removeEventListener('mousewheel', this.getCallback('wheel', true));
  }

  showSurvivalResult() {
    this.initPage('survivalResult');
    const { score } = this.gameInfo;
    const { time } = this.board.boardSetting;
    const [ minute, second ] = [ Math.floor(time/60), time%60 ];
    const { curDelay, itemInfo } = this.board;
    const { touchedCount } = this.board.me;
    const { $title, $score, $time, $delay, $cellCount, $rank, $footer } = this.$survivalResult;

    this.$survivalResult.backgroundColor = WHITE_ALPHA;
    this.$survivalResult.font = this.FONT_SIZE;
    this.$survivalResult.width = this.board.maxWidth;
    this.$survivalResult.height = this.height;

    this.playSound('fail');

    $title.font = this.TITLE_SIZE;
    $footer.font = this.FONT_SIZE/2;
    $score.innerHTML = `${score}점`;
    $time.innerHTML = `${minute}분 ${second}초`;
    const delay = Math.floor(curDelay / 100)/10;
    $delay.innerHTML = `${delay}초`;
    $cellCount.innerHTML = `${touchedCount}`;
    const rank = getRank(score, 'SURVIVAL');
    $rank.innerHTML = rank;


    const userInfo = {
      name: this.gameInfo.name,
      cellCount: touchedCount,
      score, time, delay, itemInfo
    }

    this.postLeaderBoard(userInfo);

    this.canvas.removeEventListener('mousedown', this.getCallback('startPaint'));
    this.canvas.removeEventListener('mouseup', this.getCallback('finishPaint'));
    this.canvas.removeEventListener('mousemove', this.getCallback('mineProperty', true));
    this.canvas.removeEventListener('mousewheel', this.getCallback('wheel', true));
  }

  showHelp() {
    const { $title } = this.$help;

    this.$help.backgroundColor = WHITE_ALPHA;
    this.$help.font = this.FONT_SIZE/2;
    this.$help.width = this.width * BOARD_WIDTH_RATIO;
    this.$help.height = this.height;

    $title.font = this.FONT_SIZE;

    this.setHelpList();
    this.$help.show();
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
        .filter(cell => !cell.isDetected && !cell.isBlocked);
      if (cellArr.length) {
        const rand = randRange(0, cellArr.length-1);
        const ensuredCell = cellArr[rand];
        board.openCell(ensuredCell.x, ensuredCell.y);
        board.updateCell(ensuredCell);
        this.gameInfo.item1--;
        board.itemInfo.item1++;
        board.itemInfo.isItemUsed = true;
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
        .filter(cell => !cell.isDetected && cell.type !== 'destination' && !cell.isBlocked);
      if (cellArr.length) {
        const rand = randRange(0, cellArr.length-1);
        const safeCell = cellArr[rand];
        board.ensureCell(safeCell.x, safeCell.y);
        board.updateCell(safeCell);
        this.gameInfo.item2--;
        board.itemInfo.item2++;
        board.itemInfo.isItemUsed = true;
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
        .filter(cell => !cell.isEnsured && cell.type !== 'destination' && !cell.isBlocked);
      if (cellArr.length) {
        const rand = randRange(0, cellArr.length-1);
        const safeCell = cellArr[rand];
        board.ensureCell(safeCell.x, safeCell.y);
        board.updateCell(safeCell);
        this.gameInfo.item3--;
        board.itemInfo.item3++;
        board.itemInfo.isItemUsed = true;
        this.paintBottomBar();
        this.showMsgBox(TEXT.msgBox06, YELLOWGREEN, 'item');
      } else {
        this.showMsgBox(TEXT.msgBox08, TOMATO, 'cannotUseItem');
      }
    } else {
      this.showMsgBox(TEXT.msgBox07, TOMATO, 'cannotUseItem');
    }
  }

  useItem4() {
    const { board } = this;
    const { me } = board;
    if (this.gameInfo.item4 > 0) {
      const cellArr = board.getCell(me.x, me.y).getRangeCell(OFFSET4_X, OFFSET4_Y)
        .filter(cell => cell.isBlocked);
      if (cellArr.length) {
        const rand = randRange(0, cellArr.length-1);
        const brokenCell = cellArr[rand];
        brokenCell.isBlocked = false;
        board.openCell(brokenCell.x, brokenCell.y);
        if (brokenCell.isEnsured) {
          board.clearCheck(brokenCell);
        }
        board.updateCell(brokenCell);
        this.gameInfo.item4--;
        board.itemInfo.item4++;
        board.itemInfo.isItemUsed = true;
        this.paintBottomBar();
        this.showMsgBox(TEXT.msgBox11, YELLOWGREEN, 'break');

        if (this.gameInfo.item4 === 0 && this.mode !== 'SURVIVAL' && !this.board.isPossible) {
          this.board.ensureWholeCell();
          this.crossMode('fail');
        }

      } else {
        this.showMsgBox(TEXT.msgBox13, TOMATO, 'cannotUseItem');
      }
    } else {
      this.showMsgBox(TEXT.msgBox12, TOMATO, 'cannotUseItem');
    }
  }

  getCallback(type, throttling = false, delay = 30) {
    if (!this.callback[type]) {
      if (throttling) {
        const callback = this[`${type}Callback`].bind(this);
        const thisBindedThrottlingCallback = (() => {
          let timer;
          return e => {
            if (!timer) {
              timer = setTimeout((function() {
                timer = null;
                callback(e);
              }).bind(this), delay);
            }
          };
        })();
        this.callback[type] = thisBindedThrottlingCallback;
      } else {
        const thisBindedCallback = this[`${type}Callback`].bind(this);
        this.callback[type] = thisBindedCallback;
      }
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

  startPaintCallback({ offsetX, offsetY }) {
    if (this.page !== 'game') return;

    const { x, y, cellSize } = this.board;
    const [ cx, cy ] = [ Math.floor((offsetX - x) / cellSize), Math.floor((offsetY - y) / cellSize) ];
    if (!this.board.isValid(cx, cy)) return;
    const cell = this.board.getCell(cx, cy);
    if(!cell.isEnsured && cell || cell.isBlocked) {
      switch (cell.check) {
        case 0:
          cell.check = 1;
          cell.checkColor = TOMATO;
          this.checkStatus = 1;
          break;
        case 1:
          cell.check = 2;
          cell.checkColor = YELLOWGREEN;
          this.checkStatus = 2;
          break;
        case 2:
          cell.check = 0;
          cell.checkColor = '';
          this.checkStatus = 0;
          break;
      }
      this.board.updateRemainingMine();
      this.board.updateCell(cell);
      this.board.me.updateCanvas();
      this.canvas.addEventListener('mousemove', this.getCallback('paintCell'));
    }
  }

  finishPaintCallback() {
    this.canvas.removeEventListener('mousemove', this.getCallback('paintCell'));
  }

  clickHelpCallback() {
    if (!this.isHelpOpen) {
      this.isHelpOpen = true;
      this.showHelp();
    }
  }

  buttonHoverCallback({ offsetX, offsetY }) {
    this.button.forEach(btn => {
      if (btn.contextInfo.isCollision(offsetX, offsetY)) {
        const tempInfo = btn.contextInfo;
        btn.contextInfo = btn.hoverContextInfo;
        this.fillRect(btn, true);
        this.fillText(btn);
        if (btn.innerText) {
          this.fillText(btn.innerText);
        }
        btn.contextInfo = tempInfo;
        if (btn.caption) {
          this.fillRect(btn.caption);
          this.fillText(btn.caption);
        }
      } else {
        this.fillRect(btn, true);
        this.fillText(btn);
        if (btn.innerText) {
          this.fillText(btn.innerText);
        }
        if (btn.caption) {
          const { y } = btn.caption.contextInfo;
          const { fontSize } = btn.caption;
          this.ctx.clearRect(0, y - fontSize/2, this.width, y + fontSize/2);
        }
      }
    });
  }

  paintCellCallback({ offsetX, offsetY }) {
    if (this.page !== 'game') return;

    const { x, y, cellSize } = this.board;
    const [ cx, cy ] = [ Math.floor((offsetX - x) / cellSize), Math.floor((offsetY - y) / cellSize) ];
    if (!this.board.isValid(cx, cy)) return;
    const cell = this.board.getCell(cx, cy);
    if(!cell.isEnsured || cell.isBlocked) {
      switch (this.checkStatus) {
        case 0:
          cell.check = 0;
          cell.checkColor = '';
          break;
        case 1:
          cell.check = 1;
          cell.checkColor = TOMATO;
          break;
        case 2:
          cell.check = 2;
          cell.checkColor = YELLOWGREEN;
          break;
      }
      this.board.updateRemainingMine();
      this.board.updateCell(cell);
      this.board.me.updateCanvas();
    }
  }

  minePropertyCallback({ offsetX, offsetY }) {
    if (this.page !== 'game') return;

    const { x, y, cellSize } = this.board;
    const [ cx, cy ] = [ Math.floor((offsetX - x) / cellSize), Math.floor((offsetY - y) / cellSize) ];
    if (this.board.isValid(cx, cy)) {
      if (this.board.selectedCell) {
        this.board.selectedCell.isSelected = false;
        this.board.selectedCell = null;
      }
      const cell = this.board.getCell(cx, cy);
      if (cell.isSelected) return;
      if (this.board.getCell(cx, cy).type === 'ensuredMine') {
        cell.isSelected = true;
        this.board.selectedCell = cell;
      }
      this.board.updateCanvas();
      this.board.me.updateCanvas();
    }
  }

  wheelCallback({ wheelDelta }) {
    if (this.page !== 'game') return;
    if (wheelDelta > 0 && this.soundVolume < 100) {
      this.soundVolume += 5;
    } else if (wheelDelta < 0 && this.soundVolume > 0) {
      this.soundVolume -= 5;
    }
    [...Object.values(this.sound)].forEach(audio => audio.volume = this.soundVolume/100);
    this.showMsgBox(`효과음 볼륨: ${this.soundVolume}`, SKYBLUE, false);
  }

  keydownCallback({ keyCode }) {

    if (keyCode === 81 && !this.isHelpOpen) { // Q
      this.isHelpOpen = true;
      this.showHelp();
      return;
    } else if (keyCode === 70 && this.isHelpOpen) { // F
      this.isHelpOpen = false;
      this.$help.hide();
      this.$help.$article.clear();
      return;
    }

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

        case 52: // 아이템 4
          this.useItem4();
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
      const { page, lastPage } = this.leaderboardInfo;
      if (keyCode === 70) { // F
        this.page = 'main';
        this.mode = 'CLASSIC';
        this.leaderboardInfo.record = [];
        this.leaderboardInfo.page = 1;
        this.$leaderboard.$challenge.elem.checked = false;
        this.$leaderboard.$classic.elem.checked = true;
        this.$leaderboard.$list.elem.classList.add('classic-grid');
        this.$leaderboard.$list.elem.classList.remove('challenge-grid1');
        this.$leaderboard.$list.elem.classList.remove('challenge-grid2');
        this.$leaderboard.$list.elem.classList.remove('survival-grid');
        this.$leaderboard.$select.hide();
        this.$leaderboard.hide();
      } else if (keyCode === 65) { // A
        if (page > 1) {
          this.leaderboardInfo.page--;
          this.setLeaderboard();
        }
      } else if (keyCode === 68) { // D
        if (lastPage > page) {
          this.leaderboardInfo.page++;
          const id = this.crossMode('id');
          this.setLeaderboard(id);
        }
      }
    } else if (this.page === 'updateLog') {
      if (keyCode === 70) { // F
        this.page = 'main';
        this.$updateLog.hide();
        this.$updateLog.$article.clear();
      }
    } else if (this.page === 'challenge') {
      if (keyCode === 70) { // F
        this.page = 'selectGame';
        this.$challenge.hide();
        this.$challenge.$article.clear();
      }
    } else if (this.page === 'challengeResult') {
      if (keyCode === 70) { // F
        this.page = 'main';
        this.clearPage();
        this.clearModal();
        this.clearTimer();
        this.initValues();
        this.canvas.addEventListener('click', this.getCallback('clickButton'));
        this.paintMainPage();
      }
    } else if (this.page === 'challengeFail') {
      if (keyCode === 70) { // F
        this.page = 'main';
        this.clearPage();
        this.clearModal();
        this.clearTimer();
        this.initValues();
        this.canvas.addEventListener('click', this.getCallback('clickButton'));
        this.paintMainPage();
      } else if (keyCode === 82) { // R
        this.clearPage();
        this.clearModal();
        this.clearTimer();
        const modeId = this.gameInfo.modeId;
        this.initValues();
        this.gameInfo.modeId = modeId;
        this.getGamePage('CHALLENGE').bind(this)();
      }
    } else if (this.page === 'survivalResult') {
      if (keyCode === 70) { // F
        this.page = 'main';
        this.clearPage();
        this.clearModal();
        this.clearTimer();
        this.initValues();
        this.canvas.addEventListener('click', this.getCallback('clickButton'));
        this.paintMainPage();
      }
    }
  }

  changeCallback({ target }) {
    if (this.page !== 'leaderboard') return;

    const { tagName } = target;
    this.leaderboardInfo.page = 1;
    this.leaderboardInfo.record = [];

    if (tagName === 'INPUT') {
      if (this.$leaderboard.$classic.elem.checked) {
        this.mode = 'CLASSIC';
        this.setLeaderboard();
      } else if (this.$leaderboard.$challenge.elem.checked) {
        this.mode = 'CHALLENGE';
        this.$leaderboard.$select.comboBox.options[0].selected = true;
        this.leaderboardInfo.id = 0;
        this.setLeaderboard(0);
      } else if (this.$leaderboard.$survival.elem.checked) {
        this.mode = 'SURVIVAL';
        this.setLeaderboard();
      }
    } else if (tagName === 'SELECT') {
      const { options } = target;
      this.leaderboardInfo.id = options.selectedIndex;
      this.setLeaderboard(this.leaderboardInfo.id);
    }
  }

  crossMode(status, ...args) {
    if (this.mode === 'CLASSIC') {
      switch (status) {
        case 'sendLog': {
          const { name, stage, tempScore, score } = this.gameInfo;
          return {
            name, stage, tempScore,
            score: score + tempScore
          };
        }

        case 'initHead': {
          return TEXT.classicHead;
        }

        case 'userInfo': {
          const [ user, idx ] = args;
          const { name, score } = user;
          let ranking = idx;
          switch (idx) {
            case 1:
              ranking = '🥇';
              break;
            case 2:
              ranking = '🥈';
              break;
            case 3:
              ranking = '🥉';
              break;
          }
          const rank = getRank(score, 'CLASSIC');
          const stage = user.stage < 46 ? user.stage : 'CLEAR';
          return [ ranking, name, score, rank, stage ];
        }

        case 'post':
          return [ this.$gameResult, '' ];

        case 'grid':
          this.$leaderboard.$list.elem.classList.remove('challenge-grid1');
          this.$leaderboard.$list.elem.classList.remove('challenge-grid2');
          this.$leaderboard.$list.elem.classList.remove('survival-grid');
          this.$leaderboard.$list.elem.classList.add('classic-grid');
          this.$leaderboard.$select.hide();
          break;

        case 'paintLine':
          return 7;

        case 'paintBar': {
          const { stage, life, score, item1, item2, item3 } = this.gameInfo;
          const { remainingMine, mine } = this.board;
          const { time } = this.board.boardSetting;
          const [ minute, second ] = [ Math.floor(time/60), time%60 ];
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
          const textType = 'bottomBar0';
          const lifeIdx = 2;
          const timeIdx = 4;
          const multi = 1/8;
          const plus = -7/16;
          return { bottomValues, textType, lifeIdx, timeIdx, multi, plus };
        }

        case 'barWidth':
          return this.width/2;

        case 'ready':
          break;

        case 'fail':
          this.showGameResult();
          break;

        case 'clear':
          this.showGameResult(true);
          break;

        case 'procedure':
          return MODE_CLASSIC[this.gameInfo.procedure++];

        case 'id':
          return undefined;

        case 'explosion':
          const [ me ] = args;
          me.mineExplosion();
          break;
      }
    } else if (this.mode === 'CHALLENGE') {
      switch (status) {
        case 'sendLog': {
          const { name, tempScore, modeId } = this.gameInfo;
          return { name, tempScore, modeId };
        }

        case 'initHead': {
          if (BLOCK_MAPS.includes(this.leaderboardInfo.id)) {
            return TEXT.challengeHead02;
          }
          return TEXT.challengeHead01;
        }

        case 'userInfo': {
          const [ user, idx ] = args;
          const { name, score, time, ensuredCell, movement, item1, item2, item3, item4 } = user;
          let ranking = idx;
          switch (idx) {
            case 1:
              ranking = '🥇';
              break;
            case 2:
              ranking = '🥈';
              break;
            case 3:
              ranking = '🥉';
              break;
          }
          const userInfo = [ ranking, name, score, time, ensuredCell, movement, item1, item2, item3 ];
          if (BLOCK_MAPS.includes(this.leaderboardInfo.id)) {
            userInfo.push(item4);
          }
          return userInfo;
        }

        case 'post':
          return [ this.$stageResult, '/' + this.gameInfo.modeId ];

        case 'grid':
          if (BLOCK_MAPS.includes(this.leaderboardInfo.id)) {
            this.$leaderboard.$list.elem.classList.remove('challenge-grid1');
            this.$leaderboard.$list.elem.classList.add('challenge-grid2');
          } else {
            this.$leaderboard.$list.elem.classList.add('challenge-grid1');
            this.$leaderboard.$list.elem.classList.remove('challenge-grid2');
          }
          this.$leaderboard.$list.elem.classList.remove('classic-grid');
          this.$leaderboard.$list.elem.classList.remove('survival-grid');
          this.$leaderboard.$select.show();
          break;

        case 'paintLine':
          const { block } = this.board.boardSetting;
          if (block) return 7;
          return 6;

        case 'paintBar': {
          const { block } = this.board.boardSetting;
          const { item1, item2, item3, item4 } = this.gameInfo;
          const { remainingMine, mine, ensuredCellCount } = this.board;
          const { time } = this.board.boardSetting;
          const [ minute, second ] = [ Math.floor(time/60), time%60 ];
          const { movement } = this.board.me;
          if (block) {
            const bottomValues = [
              `${ensuredCellCount}칸`,
              `${movement}회`,
              `${remainingMine}/${mine}`,
              `${minute}:${second<10 ? '0'+second : second}`,
              `${item1}개`,
              `${item2}개`,
              `${item3}개`,
              `${item4}개`
            ];
            const textType = 'bottomBarCh0';
            const timeIdx = 3;
            const multi = 1/8;
            const plus = -7/16;
            return { bottomValues, textType, timeIdx, multi, plus };
          } else {
            const bottomValues = [
              `${ensuredCellCount}칸`,
              `${movement}회`,
              `${remainingMine}/${mine}`,
              `${minute}:${second<10 ? '0'+second : second}`,
              `${item1}개`,
              `${item2}개`,
              `${item3}개`
            ];
            const textType = 'bottomBarCh0';
            const timeIdx = 3;
            const multi = 1/7;
            const plus = -6/14;
            return { bottomValues, textType, timeIdx, multi, plus };
          }
        }

        case 'barWidth':
          return this.width/2;

        case 'ready':
          this.gameInfo.life = 0;
          break;

        case 'fail':
          this.showChallengeFail();
          break;

        case 'clear':
          this.showChallengeResult();
          break;

        case 'procedure':
          return getProcedure(this.gameInfo.modeId)[this.gameInfo.procedure++];

        case 'id':
          return this.leaderboardInfo.id;

        case 'explosion':
          const [ me ] = args;
          me.mineExplosion();
          break;
      }
    } else if (this.mode === 'SURVIVAL') {
      switch (status) {
        case 'initHead': {
          return TEXT.survivalHead;
        }

        case 'userInfo': {
          const [ user, idx ] = args;
          const { name, score, time, delay, cellCount } = user;
          let ranking = idx;
          switch (idx) {
            case 1:
              ranking = '🥇';
              break;
            case 2:
              ranking = '🥈';
              break;
            case 3:
              ranking = '🥉';
              break;
          }
          const rank = getRank(score, 'SURVIVAL');
          const minute = Math.floor(time / 60);
          const sec = time % 60;
          const second = sec > 10 ? sec : '0' + sec;
          return [ ranking, name, score, rank, `${minute}:${second}`, `${delay}s`, cellCount ];
        }

        case 'post':
          return [ this.$survivalResult, '' ];

        case 'grid':
          this.$leaderboard.$list.elem.classList.remove('classic-grid');
          this.$leaderboard.$list.elem.classList.remove('challenge-grid1');
          this.$leaderboard.$list.elem.classList.remove('challenge-grid2');
          this.$leaderboard.$select.hide();
          this.$leaderboard.$list.elem.classList.add('survival-grid');
          break;

        case 'paintLine':
          return 8;

        case 'paintBar': {
          const { life, score, item1, item2, item3, item4 } = this.gameInfo;
          const { curDelay } = this.board;
          const { touchedCount } = this.board.me;
          const { time } = this.board.boardSetting;
          const [ minute, second ] = [ Math.floor(time/60), time%60 ];
          const bottomValues = [
            `${score}점`,
            `${touchedCount}`,
            `${life}`,
            `${Math.floor(curDelay / 100)/10}초`,
            `${minute}:${second<10 ? '0'+second : second}`,
            `${item1}개`,
            `${item2}개`,
            `${item3}개`,
            `${item4}개`
          ];
          const textType = 'bottomBarSur0';
          const lifeIdx = 2;
          const multi = 1/9;
          const plus = -8/18;
          return { bottomValues, textType, lifeIdx, multi, plus };
        }

        case 'barWidth':
          return this.width*2/3;

        case 'ready':
          this.gameInfo.life = 3;
          this.gameInfo.item1 = 5;
          this.gameInfo.item2 = 3;
          this.gameInfo.item3 = 1;
          this.gameInfo.item4 = 3;
          break;

        case 'fail':
          this.showSurvivalResult();
          break;

        case 'procedure':
          return MODE_SURVIVAL[this.gameInfo.procedure++];

        case 'explosion':
          const [ me ] = args;
          me.mineExplosion(me.prevX, me.prevY);
          break;

        case 'score':
        const [ score ] = args;
        this.gameInfo.score += score;
      }
    }
  }

  paintPage() {
    const procedure = this.crossMode('procedure');
    if (procedure) {
      const { type } = procedure;
      if (type === 'game') {
        this.paintGamePage(procedure);
      } else if (type === 'info') {
        this.showInformation(procedure);
      } else if (type === 'input') {
        this.showInputId();
      } else if (type === 'survival') {
        this.paintSurvivalModeGamePage(procedure);
      }
    } else {
      this.crossMode('clear');
    }
  }
}

//--------------------------------------------------------------------------------------------------
// 기타 클래스들

class ContextInfo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fontWeight = 700;
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
    return `${this.fontWeight} ${this.fontSize}px sans-serif`;
  }

  isCollision(x, y) {
    return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
  }
}

class Modal {
  constructor(elem) {
    this.elem = document.getElementById(elem);
    Modal.modalList.push(this);
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

  set fontWeight(value) {
    this.contextInfo.fontWeight = value;
  }

  get fontWeight() {
    return this.contextInfo.fontWeight;
  }
}

class Button extends Rect {
  constructor(x, y, callback) {
    super(x, y);
    this.callback = callback;
    this.caption = null;
    this.innerText = null;
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
    if (this.type === 'ensuredMine' && !this.isSelected) {
      return TEXT.ensuredMine;
    }
    switch (this.textType) {
      case 'normal':
        return this.number;
      case 'oddEven':
        return this.number % 2 ? '홀' : '짝';
      case 'highest':
        return '▲';
      case 'lowest':
        return '▼';
      case 'high':
        return '△'
      case 'low':
        return '▽'
      case 'plus':
        return '+';
    }
  }

  initStatus() {
    this.isDetected = false;
    this.isEnsured = false;
    this.isBlocked = false;
    this.isSelected = false;
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

  setX(value) {
    this.x = value;
    const { x, y, cellSize } = this.board;
    this.contextInfo.x = x + (this.x + 0.5) * cellSize;
    this.contextInfo.y = y + (this.y + 0.5) * cellSize;
  }


  get isMine() {
    return this.type === 'mine' || this.type === 'ensuredMine';
  }

  getRangeCell(offsetX, offsetY) {
    const cellArr = [];
    offsetX.forEach((_, i) => {
      const [ dx, dy ] = [ this.x + offsetX[i], this.y + offsetY[i] ];
      if (this.board.isValid(dx, dy)) {
        cellArr.push(this.board.getCell(dx, dy));
      }
    });
    return cellArr;
  }

  getSurroundingCell(type = 1) {
    let range, offsetX, offsetY;

    switch (type) {
      case 1:
        range = [...new Array(9)].map((_, i) => i);
        [ offsetX, offsetY ] = [ OFFSET_X, OFFSET_Y ];
        break;
      
      case 2:
        range = [...new Array(25)].map((_, i) => i);
        [ offsetX, offsetY ] = [ OFFSET5_X, OFFSET5_Y ];
        break;

      case 3:
        if (['red', 'orange'].includes(this.hintType)) {
          range = this.shape.filter(idx => idx !== 12);
          [ offsetX, offsetY ] = [ OFFSET5_X, OFFSET5_Y ];
        } else {
          range = this.shape.filter(idx => idx !== 4);
          [ offsetX, offsetY ] = [ OFFSET_X, OFFSET_Y ];
        }
        break;

      case 4:
        if (this.y > 0 && this.y < this.board.yCount - 1) {
          range = [7, 8, 9, 12, 13, 14, 17, 18, 19];
        } else if (this.y === 0) {
          range = [12, 13, 14, 17, 18, 19, 22, 23, 24];
        } else {
          range = [2, 3, 4, 7, 8, 9, 12, 13, 14];
        }
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

  strokeCross() {
    const { x, y, cellSize } = this.board;
    const { ctx } = this.canvas;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = 1;

    const [ cx1, cy1 ] = [ x + this.x * cellSize , y + (this.y + 1) * cellSize ];
    const [ cx2, cy2 ] = [ x + (this.x + 1) * cellSize , y + this.y * cellSize ];
    ctx.beginPath();
    ctx.moveTo(cx1, cy1);
    ctx.lineTo(cx2, cy2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx2, cy1);
    ctx.lineTo(cx1, cy2);
    ctx.closePath();
    ctx.stroke();
  }

  strokeText(strokeColor = BLACK, lineWidth = 1) {
    this.text = this.value;
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
    if (this.textType === 'oddEven') {
      this.fontWeight = 600;
    } else {
      this.fontWeight = 700;
    }
    this.canvas.strokeText(this);
  }

  fill(fillColor) {
    if (this.check) {
      this.fillColor = this.checkColor;
    } else {
      this.fillColor = fillColor;
    }
    this.canvas.fillRect(this);
    if (this.hintType !== 'normal'
      && !this.isBlocked
      && (this.isDetected && this.type !== 'ensuredMine' || this.isSelected)) {
      if (this.board.showShapeSwitch && this.hintType !== 'purple') {
        this.fillShape(colorMatch[this.hintType]);
      } else if (this.hintType === 'purple') {
        this.fillShape(LIGHTPURPLE);
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
    this.touchedCount = 0;
    this.deathCount = 0;
    this.initCoord();
    this.initContextInfo();
  }

  initCoord() {
    this.x = 0;
    this.y = 0;
    this.prevX = 0;
    this.prevY = 0;
  }

  initContextInfo() {
    const { x, y, cellSize } = this.board;
    this.contextInfo.x = x + (this.x + 0.5) * cellSize;
    this.contextInfo.y = y + (this.y + 0.5) * cellSize;
    this.setFillInfo(cellSize*3/4, cellSize*3/4, SKYBLUE_ALPHA);
    this.setStrokeInfo();
  }

  moveX(x) {
    if (this.board.getCell(this.x + x, this.y).isBlocked) return;
    this.prevX = this.x;
    this.prevY = this.y;
    this.board.updateCell([this.x, this.y]);
    this.x += x;
    this.movement++;
    this.updateCanvas();
  }

  moveY(y) {
    if (this.board.getCell(this.x, this.y + y).isBlocked) return;
    this.prevX = this.x;
    this.prevY = this.y;
    this.board.updateCell([this.x, this.y]);
    this.y += y;
    this.movement++;
    this.updateCanvas();
  }

  moveTo(x, y) {
    this.board.updateCell([this.x, this.y]);
    this.x = x;
    this.y = y;
    this.updateCanvas();
  }

  paint() {
    const { x, y, cellSize } = this.board;
    this.contextInfo.x = x + (this.x + 0.5) * cellSize;
    this.contextInfo.y = y + (this.y + 0.5) * cellSize;
    this.canvas.fillRect(this, true);
  }

  updateCanvas() {
    const cell = this.board.getCell(this.x, this.y);
    const offset = [0, 1, 2, 3, 5, 6, 7, 8];

    if (!cell.isMine) {
      offset.forEach(i => {
        const [ dx, dy ] = [ this.x + OFFSET_X[i], this.y + OFFSET_Y[i] ];
        if (this.board.isValid(dx, dy)) {
          this.board.openCell(dx, dy);
          this.board.updateCell([dx, dy]);
        }
      });
    }
    if (!cell.isEnsured) {
      this.touchedCount++;
      this.canvas.crossMode('score', 50);
      this.board.ensureCell(cell);
    }

    if (this.canvas.mode === 'SURVIVAL') {
      const { cellArrItem } = this.board;
      cellArrItem.forEach(item => {
        const { x, y } = item;
        if ((this.x === x || this.x === x + 1) && (this.y === y || this.y === y + 1)) {
          item.acquireItem();
        }
      });
    }

    if (this.canvas.page === 'game') {
      this.canvas.paintBottomBar();
    }

    this.board.updateCell(cell);
    this.paint();

    if (cell.type === 'mine' || cell.type === 'ensuredMine') {
      this.canvas.crossMode('explosion', this);
    } else if (cell.type === 'destination') {
      if (this.canvas.page === 'tutorial') {
        alert(TEXT.destination);
        this.canvas.paintMainPage();
      } else if (this.canvas.page === 'game') {
        if (this.canvas.mode === 'CLASSIC') {
          this.canvas.showStageResult();
        } else if (this.canvas.mode === 'CHALLENGE') {
          this.canvas.showChallengeResult();
        }
      }
    }
  }

  mineExplosion(x = 0, y = 0) {
    this.board.updateCell([this.x, this.y]);
    this.moveTo(x, y);
    this.canvas.showMsgBox(TEXT.msgBox01);
    if (this.canvas.page === 'game') {
      this.deathCount += 1;
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
    this.start = 0;
    this.destination = this.cellCount - 1;
    this.showShapeSwitch = canvas.gameInfo.shapeSwitch;
    this.itemInfo = { isItemUsed: false, item1: 0, item2: 0, item3: 0, item4: 0 };
    this.selectedCell = null;
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
    this.curArr = 'cellArr';
    this.boardSetting = null;
    this.remainingMine = 0;
    this.accessable = [];
    this.shortest = 0;
    this.me = new Me(this);
  }

  initCellProperty() {
    [
      [0, 0], [0, 1], [0, 2],
      [1, 0], [1, 1], [1, 2],
      [2, 0], [2, 1], [2, 2]
    ].forEach(coord => this.ensureCell(...coord));
    if (this.canvas.mode === 'CHALLENGE') {
      [
        [0, 3], [1, 3], [2, 3],
        [3, 0], [3, 1], [3, 2], [3, 3]
      ].forEach(coord => this.ensureCell(...coord));
    }
    const destCell = this.cellArr[this.yCount-1][this.xCount-1];
    destCell.type = 'destination';
    this.ensureCell(destCell.x, destCell.y);
    destCell.isDetected = false;
  }

  get mine() {
    let mine = 0;
    this.forEachCell(v => {
      if (v.isMine) {
        mine++;
      }
    });
    return mine;
  }

  get ensuredCellCount() {
    let count = 0;
    this.forEachCell(cell => {
      if (cell.isEnsured && cell.type !== 'ensuredMine') {
        count++;
      }
    });
    return count;
  }

  get isAllEnsured() {
    const { block } = this.boardSetting;
    if (!block) return this.accessable.every(cell => cell.isEnsured);
    this.setAccessable(true);
    return this.accessable.every(cell => cell.isEnsured);
  }

  get isPossible() {
    const visited = new Array(this.cellCount).fill(false);
    const stack = [this.start];
    let isPossible = false;

    while (stack.length) {
      const idx = stack.pop();
      if (idx === this.destination) {
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
            if (!this.getCell(newIdx).isMine && !this.getCell(newIdx).isBlocked) {
              stack.push(newIdx);
            }
          }
        });
      }
    }
    return isPossible;
  }

  get minePlantable() {
    return this[this.curArr]
      .flat()
      .filter(cell => cell !== this.getCell(this.start) && cell !== this.getCell(this.destination));
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
    const arr = this[this.curArr];
    if (y === null) {
      const [ dx, dy ] = this.getXY(x);
      return arr[dy][dx];
    }
    return arr[y][x];
  }

  isValid(x, y) {
    return x >= 0 && x < this.xCount && y >= 0 && y < this.yCount;
  }

  forEachCell(callback, ...args) {
    this[this.curArr].forEach(
      row => row.forEach(cell => {
        callback.bind(this)(cell, ...args);
      })
    );
  }

  clearCheck(cell) {
    const prevCheck = cell.check;
    cell.check = 0;
    cell.checkColor = '';
    if(prevCheck > 0 && this.canvas.page === 'game') {
      this.updateRemainingMine();
    }
  }

  setAccessable(hasBlock = false) {
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
                && !this.getCell(dx, dy).isMine
                && this.getCell(dx, dy).type !== 'destination'
                && (!hasBlock || hasBlock && !this.getCell(dx, dy).isBlocked)) {
                  stack.push(newIdx);
            }
          });
        }
      }
    };

    setGraph();
    graph.push(this.getCell(this.destination));
    this.accessable = graph;
  }

  // 지뢰 배치 단계 1 - 시작점과 도착점을 제외한 칸에 지뢰를 지정된 개수만큼 랜덤하게 배치
  arrangeMine(mine) {
    let randArr = [...new Array(this.cellCount)]
      .map((_, i) => i)
      .filter(idx => idx !== this.start && idx !== this.destination);
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
        const [ dx, dy ] = [ cell.x + OFFSET_X[rand], cell.y + OFFSET_Y[rand] ];
        const mine = this.getCell(dx, dy);
        mine.type = 'normal';
        removedMineArr.push(mine);
      }
    });
    return removedMineArr;
    // 어차피 게임판을 그리기 전에 setWholeCellProperty()를 실행하기 때문에 cell들의 value값은 정정하지 않고 놔둠
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

    while (candidate.length && count) {
      const rand = randRange(0, candidate.length-1);
      const cell = candidate.splice(rand, 1)[0];
      cell.type = 'mine';
      if (this.isPossible) {
        count--;
      } else {
        cell.type = 'normal';
      }
    }
  }

  // 최단거리 구하기
  getShortest() {
    const visited = new Array(this.cellCount).fill(false);
    const count = new Array(this.cellCount).fill(0);
    const queue = [this.start];
    
    while (queue.length) {
      const idx = queue.shift();
      if (idx === this.destination) {
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

  setStartAndDestination(start, destination) {
    this.start = start ?? this.start;
    this.destination = destination ?? this.destination;
  }

  setBoard(mine, isSurvival = false) {
    const [ x, y ] = this.getXY(this.start);
    this.me.moveTo(x, y);
    const removedMineArr = [];
    this.arrangeMine(mine);
    removedMineArr.push(...this.relaxMineDensity());
    removedMineArr.push(...this.connectSafeGraph());
    this.relocateMine(removedMineArr);
    if (!isSurvival) {
      this.setAccessable();
      this.shortest = this.getShortest();
    }
    this.setWholeCellProperty();
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
    const candidate = [...this[this.curArr].flat()];
    RAINBOW.forEach(type => {
      let count = this.boardSetting[type] ?? 0;
      while (count--) {
        const rand = randRange(0, candidate.length-1);
        const cell = candidate.splice(rand, 1)[0];
        cell.hintType = type;
        cell.textColor = colorMatch[type];
        cell.fontSize = this.cellSize * 0.55;
        if (type === 'purple') {
          this.setPurpleShape(cell);
          let validShapeCount = cell.getSurroundingCell(3).length;
          while (validShapeCount === 0) {
            this.setPurpleShape(cell);
            validShapeCount = cell.getSurroundingCell(3).length;
          }
        } else {
          cell.shape = shapeMatch[type];
        }
      }
    });
  }

  setPurpleShape(cell) {
    const shape = [...new Array(9)].map((_, i) => i);
    let range = randRange(1, 7);
    while (range--) {
      const rand = randRange(0, shape.length-1);
      shape.splice(rand, 1);
    }
    cell.shape = shape;
  }

  setSpecialText() {
    if (!this.boardSetting) return;
    let { oddEven, highLow, plus } = this.boardSetting;
    const candidate = this[this.curArr].flat();

    while (oddEven--) {
      const rand = randRange(0, candidate.length-1);
      const cell = candidate.splice(rand, 1)[0];
      cell.textType = 'oddEven';
    }

    while (candidate.length && highLow) {
      const rand = randRange(0, candidate.length-1);
      const cell = candidate.splice(rand, 1)[0];
      const numArr = cell.getSurroundingCell(3).map(surCell => surCell.number);
      const max = Math.max(...numArr);
      const min = Math.min(...numArr);

      if (cell.number === max) {
        cell.textType = 'high';
        highLow--;
      } else if (cell.number > max) {
        cell.textType = 'highest';
        highLow--;
      } else if (cell.number === min) {
        cell.textType = 'low';
        highLow--;
      } else if (cell.number < min) {
        cell.textType = 'lowest';
        highLow--;
      }
    }

    if (plus) {
      this.forEachCell(cell => {
        const lastNum = cell.getSurroundingCell(3)
          .map(surCell => surCell.number)
          .reduce((acc, num) => acc + num, 0) % 10;
        if (cell.number === lastNum) {
          cell.textType = 'plus';
        }
      });
    }
  }

  setBlock() {
    if (!this.boardSetting) return;
    const { block } = this.boardSetting;
    if (!block) return;

    let [ randBlock, fixedBlock ] = block;

    fixedBlock.forEach(coord => {
      const [ x, y ] = this.getXY(coord);
      const cell = this.getCell(x, y)
      cell.isBlocked = true;
    });

    const candidate = [...this.minePlantable].filter(cell => !cell.isBlocked);
    while (randBlock) {
      const rand = randRange(0, candidate.length-1);
      const cell = candidate.splice(rand, 1)[0];
      cell.isBlocked = true;
      randBlock--;
    }
  }

  setWholeCellProperty() {
    this.setSpecialHint();
    this.forEachCell(this.setProperty);
    this.setSpecialText();
    this.setBlock();
  }

  // 안전한 칸 표시
  ensureCell(x, y) {
    const cell = x instanceof Cell ? x : this.getCell(x, y);
    cell.isEnsured = true;
    this.openCell(x, y);
    this.clearCheck(cell);
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
  updateCell(cell, isCallback = false) {
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
    if (cell.isBlocked) {
      cell.fill(DARK_CHARCOAL);
      cell.strokeCross();
    } else if (cell.isEnsured) {
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
    if (!cell.isBlocked && cell.isDetected) {
      cell.fillText();
      if (cell.hintType !== 'normal' && (cell.type !== 'ensuredMine' || cell.isSelected)) {
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

class SurvivalBoard extends Board {
  constructor(canvas, xCount, yCount) {
    super(canvas, xCount, yCount, false);
    this.nextBoard = [...Array(this.yCount)].map((_, y) => [...Array(this.xCount)].map((_, x) => new Cell(x, y, this)));
    this.cellArrItem = [];
    this.nextBoardItem = [];
    this.curDelay = SURVIVAL_DELAY;
    this.nextDelay = SURVIVAL_DELAY;
    this.delayRatio = SURVIVAL_INIT_RATIO;
  }

  initCellProperty() {
    const startCell = this.getCell(this.start);
    startCell.getSurroundingCell(4).forEach(cell => this.ensureCell(cell));
  }

  replaceBoard() {
    if (this.canvas.survivalTimer) {
      clearInterval(this.canvas.survivalTimer);
    }
    const newStart = this.destination - (this.destination % this.xCount);
    const newDestination = randRange(1, 7) * 15 - 1;
    this.setStartAndDestination(newStart, newDestination);
    this.curArr = 'nextBoard';
  }

  restoreBoard() {
    this.curArr = 'cellArr';
    this.curDelay = this.nextDelay;
    this.canvas.survivalTimer = setInterval(this.canvas.setSurvivalTimer.bind(this.canvas), this.curDelay);
    this.nextDelay = Math.floor(this.curDelay*this.delayRatio);
    if (this.delayRatio < SURVIVAL_FINAL_RATIO) {
      this.delayRatio = (Math.floor(this.delayRatio * 100) + 1)/100;
    }
  }

  setNextBoardSetting() {
    const procedure = this.canvas.crossMode('procedure');
    const { mine, boardSetting, isFinalSetting } = procedure;
    const { time } = this.boardSetting;
    this.boardSetting = { mine, time, ...boardSetting };
    if (isFinalSetting) {
      this.canvas.gameInfo.procedure--;
    }
  }

  setNextBoard(mine) {
    this.replaceBoard();
    const removedMineArr = [];
    this.arrangeMine(mine);
    removedMineArr.push(...this.relaxMineDensity());
    removedMineArr.push(...this.connectSafeGraph());
    this.relocateMine(removedMineArr);
    this.setWholeCellProperty();
    this.setItem();
    this.restoreBoard();
  }

  setBoard(mine) {
    super.setBoard(mine, true);
    this.initCellProperty();
    this.setItem(true);
    this.setNextBoardSetting();
    this.setNextBoard(mine);
  }

  setItem(isFirstBoard = false) {
    const { xCount, yCount } = this;
    let { itemDrop } = this.boardSetting;
    let candidate = [...Array((xCount - 1) * (yCount - 1))].map((_, i) => i);
    if (isFirstBoard) {
      candidate = candidate.filter(idx => idx % (xCount - 1) > 2);
    }
    while (itemDrop--) {
      const randIdx = randRange(0, candidate.length-1);
      const idx = candidate.splice(randIdx, 1)[0];
      const [ x, y ] = [ idx % (xCount - 1), Math.floor(idx / (xCount - 1)) ];
      this[this.curArr+'Item'].push(new Item(x, y, this));
    }
  }

  updateItem() {
    this[this.curArr+'Item'].forEach(item => item.paint());
  }

  updateCanvas() {
    super.updateCanvas();
    this.updateItem();
  }

  updateCell(cell, isCallback = false) {
    super.updateCell(cell, isCallback);
    this.updateItem();
  }

  correctHighLow() {
    this.forEachCell(cell => {
      if (['high', 'low', 'highest', 'lowest'].includes(cell.textType)) {
        const numArr = cell.getSurroundingCell(3).map(surCell => surCell.number);
        const max = Math.max(...numArr);
        const min = Math.min(...numArr);
        if (cell.number === max) {
          cell.textType = 'high';
        } else if (cell.number > max) {
          cell.textType = 'highest';
        } else if (cell.number === min) {
          cell.textType = 'low';
        } else if (cell.number < min) {
          cell.textType = 'lowest';
        } else {
          cell.textType = 'normal';
        }
      }
    });
  }
}

class Item extends Rect {
  constructor(x, y, board) {
    super();
    this.x = x;
    this.y = y;
    this.board = board;
    this.canvas = board.canvas;
    this.initValue();
    this.initContextInfo();
  }

  initValue() {
    const rand = Math.random();
    if (rand < 120/300) {
      this.value = 'item1';
    } else if (rand < 180/300) {
      this.value = 'item2';
    } else if (rand < 230/300) {
      this.value = 'item4';
    } else if (rand < 265/300) {
      this.value = 'item3';
    } else if (rand < 295/300) {
      this.value = 'life';
    } else {
      this.value = 'slow';
    }
  }

  initContextInfo() {
    const { x, y, cellSize } = this.board;
    this.contextInfo.x = x + (this.x + 1) * cellSize;
    this.contextInfo.y = y + (this.y + 1) * cellSize;
    this.setTextInfo(this.value, cellSize/3, BLACK);
  }

  setX(value) {
    this.x = value;
    const { x, y, cellSize } = this.board;
    this.contextInfo.x = x + (this.x + 1) * cellSize;
    this.contextInfo.y = y + (this.y + 1) * cellSize;
  }

  fillText() {
    this.text = itemMatch[this.value];
    this.canvas.fillText(this);
  }

  paint() {
    this.fillText();
  }

  acquireItem() {
    if (this.value === 'slow') {
      this.board.curDelay = Math.floor(this.board.curDelay*1.1);
      this.board.nextDelay = Math.floor(this.board.nextDelay*1.1);
      if (this.canvas.survivalTimer) {
        clearInterval(this.canvas.survivalTimer);
        this.canvas.survivalTimer = setInterval(this.canvas.setSurvivalTimer.bind(this.canvas), this.board.curDelay);
      }
    } else {
      this.canvas.gameInfo[this.value]++;
    }
    this.board.cellArrItem.splice(this.board.cellArrItem.indexOf(this), 1);
    this.board.updateCanvas();
    this.canvas.paintBottomBar();
    this.canvas.playSound('acquisition');
  }
}

//--------------------------------------------------------------------------------------------------
// main

let mainCanvas = new Canvas(document.getElementById('canvas'));
mainCanvas.paintMainPage();
mainCanvas = null;