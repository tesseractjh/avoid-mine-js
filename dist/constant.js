const _0x278a29=_0x3bb1;function _0x3bb1(_0x2d09d1,_0x4fa717){const _0x4cdeab=_0x4cde();return _0x3bb1=function(_0x3bb159,_0x3384cd){_0x3bb159=_0x3bb159-0x11b;let _0x3f6f02=_0x4cdeab[_0x3bb159];return _0x3f6f02;},_0x3bb1(_0x2d09d1,_0x4fa717);}(function(_0x271e6e,_0x2f4837){const _0x9bfa14=_0x3bb1,_0x408514=_0x271e6e();while(!![]){try{const _0x2de851=-parseInt(_0x9bfa14(0x18a))/0x1*(parseInt(_0x9bfa14(0x136))/0x2)+-parseInt(_0x9bfa14(0x132))/0x3+parseInt(_0x9bfa14(0x1a0))/0x4+-parseInt(_0x9bfa14(0x19a))/0x5+parseInt(_0x9bfa14(0x187))/0x6*(-parseInt(_0x9bfa14(0x19b))/0x7)+-parseInt(_0x9bfa14(0x1a4))/0x8*(-parseInt(_0x9bfa14(0x12b))/0x9)+parseInt(_0x9bfa14(0x1b4))/0xa;if(_0x2de851===_0x2f4837)break;else _0x408514['push'](_0x408514['shift']());}catch(_0x27253a){_0x408514['push'](_0x408514['shift']());}}}(_0x4cde,0x60168));const BACKGROUND_COLOR='rgb(\x2090,\x20\x2096,\x20116)',BLACK=_0x278a29(0x199),WHITE=_0x278a29(0x11d),CHARCOAL=_0x278a29(0x182),INVERTED_CHARCOAL=_0x278a29(0x138),LIGHTGRAY=_0x278a29(0x14a),YELLOWGREEN='rgb(154,\x20205,\x20\x2050)',INVERTED_YELLOWGREEN='rgb(101,\x20\x2050,\x20205)',TOMATO=_0x278a29(0x11c),INVERTED_TOMATO=_0x278a29(0x179),SKYBLUE=_0x278a29(0x1b2),INVERTED_SKYBLUE=_0x278a29(0x158),RED=_0x278a29(0x190),ORANGE=_0x278a29(0x1a2),YELLOW=_0x278a29(0x1c2),GREEN='rgb(\x20\x200,\x20255,\x20\x20\x200)',BLUE=_0x278a29(0x13a),INVERTED_BLUE=_0x278a29(0x168),NAVY=_0x278a29(0x178),PURPLE=_0x278a29(0x1ab),WHITE_ALPHA=_0x278a29(0x1c3),WHITE_ALPHA2=_0x278a29(0x15f),RED_ALPHA=_0x278a29(0x163),ORANGE_ALPHA=_0x278a29(0x196),YELLOW_ALPHA=_0x278a29(0x148),GREEN_ALPHA=_0x278a29(0x176),BLUE_ALPHA='rgba(\x2051,\x20153,\x20255,\x200.75)',NAVY_ALPHA=_0x278a29(0x1aa),PURPLE_ALPHA=_0x278a29(0x121),SKYBLUE_ALPHA=_0x278a29(0x140),colorMatch={'red':RED,'orange':ORANGE,'yellow':YELLOW,'green':GREEN,'blue':BLUE,'navy':NAVY,'purple':PURPLE,[RED]:RED_ALPHA,[ORANGE]:ORANGE_ALPHA,[YELLOW]:YELLOW_ALPHA,[GREEN]:GREEN_ALPHA,[BLUE]:BLUE_ALPHA,[NAVY]:NAVY_ALPHA,[PURPLE]:PURPLE_ALPHA},RAINBOW=[_0x278a29(0x162),_0x278a29(0x16c),'yellow',_0x278a29(0x12a),'blue',_0x278a29(0x11f),'purple'],TEXT_HINT=[_0x278a29(0x19d),_0x278a29(0x1ac)],shapeMatch={'red':[0xa,0xb,0xc,0xd,0xe],'orange':[0x2,0x7,0xc,0x11,0x16],'yellow':[0x1,0x3,0x4,0x5,0x7],'green':[0x0,0x2,0x4,0x6,0x8],'blue':[0x0,0x2,0x3,0x4,0x5,0x6,0x8],'navy':[0x0,0x1,0x2,0x4,0x6,0x7,0x8]},textHintMatch={'oddEven':'홀짝','highLow':'▲▼'},BOARD_WIDTH_RATIO=0x2/0x3,BOARD_HEIGHT_RATIO=0.85,BOARD_BOTTOM_GAP_RATIO=0.12,CELL_COUNT_SCORE=0x32,REMAINING_TIME_SCORE=0x1,MOVEMENT_GOOD_RATIO=1.1,MOVEMENT_GREAT_RATIO=1.2,MOVEMENT_EXCELLENT_RATIO=1.3,MOVEMENT_PERFECT_RATIO=1.5,RESERVED_ITEM_RATIO=1.25,PERFECT_CLEAR_RATIO=0x2,RANK_S=0x3d090,RANK_A=0x30d40,RANK_B=0x186a0,RANK_C=0xc350,RANK_D=0x2710,getRank=_0x8e78c3=>{if(_0x8e78c3>RANK_S)return'S';else{if(_0x8e78c3>RANK_A)return'A';else{if(_0x8e78c3>RANK_B)return'B';else{if(_0x8e78c3>RANK_C)return'C';else return _0x8e78c3>RANK_D?'D':'F';}}}},OFFSET_X=[-0x1,0x0,0x1,-0x1,0x0,0x1,-0x1,0x0,0x1],OFFSET_Y=[-0x1,-0x1,-0x1,0x0,0x0,0x0,0x1,0x1,0x1],OFFSET5_X=[-0x2,-0x1,0x0,0x1,0x2,-0x2,-0x1,0x0,0x1,0x2,-0x2,-0x1,0x0,0x1,0x2,-0x2,-0x1,0x0,0x1,0x2,-0x2,-0x1,0x0,0x1,0x2],OFFSET5_Y=[-0x2,-0x2,-0x2,-0x2,-0x2,-0x1,-0x1,-0x1,-0x1,-0x1,0x0,0x0,0x0,0x0,0x0,0x1,0x1,0x1,0x1,0x1,0x2,0x2,0x2,0x2,0x2],randRange=(_0x1cb817,_0x365cad)=>{const _0x103f1=_0x278a29;return Math['floor'](Math[_0x103f1(0x19e)]()*(_0x365cad-_0x1cb817+0x1))+_0x1cb817;},TEXT={'mainTitle':_0x278a29(0x1b8),'selectGameTitle':_0x278a29(0x167),'mainButton01':_0x278a29(0x14b),'mainButton02':_0x278a29(0x193),'mainButton03':'순위표','mainButton04':_0x278a29(0x14c),'modeClassic':'클래식\x20모드','modeChallenge':'도전\x20모드','backToMainPage':_0x278a29(0x15e),'tutorialButton01':'이전','tutorialButton02':'다음','backButton':_0x278a29(0x146),'submitButton':'확인','tutorial01':_0x278a29(0x13f),'tutorial02':_0x278a29(0x127),'tutorial03':_0x278a29(0x17e),'tutorial04':_0x278a29(0x1a8),'tutorial05':'숫자\x203키를\x20누르면\x20파란색\x20네모\x20주변에\x20아직\x20밟지\x20않은\x20칸들\x0a중\x20무작위로\x20하나를\x20공개하는\x20아이템을\x20사용할\x20수\x20있습니다.','tutorial06':_0x278a29(0x161),'tutorial07':_0x278a29(0x1a7),'bottomBar01':_0x278a29(0x194),'bottomBar02':'점수','bottomBar03':'💖','bottomBar04':'💣','bottomBar05':'⏱','bottomBar06':_0x278a29(0x13b),'bottomBar07':_0x278a29(0x1ba),'bottomBar08':'📡[3]','bottomBarCh01':'🧩','bottomBarCh02':'🏃','bottomBarCh03':'💣','bottomBarCh04':'⏱','bottomBarCh05':'🔍[1]','bottomBarCh06':'🔭[2]','bottomBarCh07':_0x278a29(0x16e),'challengeList01':_0x278a29(0x126),'challengeList02':_0x278a29(0x14f),'challengeList03':_0x278a29(0x130),'challengeList04':'🎨\x20색깔힌트:\u3000','challengeList05':_0x278a29(0x1b5),'challengeList06':_0x278a29(0x134),'challengeList07':'🔍','challengeList08':'🔭','challengeList09':'📡','challengeList10':'⭐','destination':'도착!\x20메인화면으로\x20이동합니다.','ensuredMine':'💣','msgBox01':_0x278a29(0x171),'msgBox02':_0x278a29(0x13d),'msgBox03':_0x278a29(0x172),'msgBox04':'🔭[2]\x20아이템을\x20사용했습니다','msgBox05':'🔭[2]\x20아이템이\x20없습니다!','msgBox06':_0x278a29(0x186),'msgBox07':'📡[3]\x20아이템이\x20없습니다!','msgBox08':_0x278a29(0x139),'msgBox09':_0x278a29(0x191),'msgBox10':_0x278a29(0x1a1),'clickCell01':'색깔\x20표시','clickCell02':_0x278a29(0x13c),'clickCell03':_0x278a29(0x1b1),'introduceItem101':_0x278a29(0x13b),'introduceItem102':_0x278a29(0x1b7),'introduceItem103':_0x278a29(0x12f),'introduceItem201':'🔭[2]','introduceItem202':_0x278a29(0x1a3),'introduceItem203':_0x278a29(0x1c1),'introduceItemL01':_0x278a29(0x16e),'introduceItemL02':'숫자\x203키를\x20눌러\x20내\x20주변\x201칸\x20이내에\x20있는\x20칸\x20중에서<br>아직\x20밟지\x20않은\x20칸을\x20공개합니다.\x20만약\x20그\x20칸이\x20지뢰가\x20아니면<br>색칠하여\x20지뢰가\x20아님을\x20표시하고,\x20지뢰라면\x20지뢰를\x20표시합니다.','introduceItemL03':_0x278a29(0x16a),'perfectClear01':'퍼펙트\x20클리어','perfectClear02':_0x278a29(0x1bf),'movementOpt01':_0x278a29(0x195),'movementOpt02':_0x278a29(0x1be),'stage10Bonus01':_0x278a29(0x184),'stage10Bonus02':'💖\x20+3<br>🔍[1]\x20+10<br>🔭[2]\x20+5<br>📡[3]\x20+3','stage20Bonus01':'STAGE\x2020\x20클리어\x20보너스','stage20Bonus02':_0x278a29(0x123),'stage30Bonus01':'STAGE\x2030\x20클리어\x20보너스','stage30Bonus02':'💖\x20+2<br>🔍[1]\x20+5<br>🔭[2]\x20+3<br>📡[3]\x20+2','stage40Bonus01':_0x278a29(0x1af),'stage40Bonus02':_0x278a29(0x183),'stageBonusHeader':_0x278a29(0x19f),'newHintTitle':_0x278a29(0x128),'newHintRed':_0x278a29(0x17b),'newHintOrange':_0x278a29(0x144),'newHintYellow':_0x278a29(0x192),'newHintGreen':_0x278a29(0x12e),'newHintBlue':'<span\x20style=\x22color:rgb(51,\x20153,\x20255);\x22\x20class=\x22stroke\x22>파란색\x20숫자</span>는\x20H자\x20모양\x207칸\x20내의\x20지뢰\x20개수를\x20의미합니다.','newHintNavy':_0x278a29(0x169),'newHintPurple':_0x278a29(0x159),'showShape01':'색깔\x20힌트\x20모양\x20표시','showShape02':'앞으로\x20새로운\x20색깔\x20힌트가\x20계속\x20등장할\x20것입니다.<br>모양이\x20헷갈린다면\x20R키를\x20눌러\x20각\x20색깔\x20힌트의\x20모양을\x20확인할\x20수\x20있습니다.<br>R키를\x20한\x20번\x20더\x20누르면\x20해제할\x20수\x20있습니다.','oddEven01':'홀짝\x20힌트','oddEven02':_0x278a29(0x12c),'highLow01':_0x278a29(0x143),'highLow02':_0x278a29(0x189),'pressH':_0x278a29(0x1bd),'classicHead':_0x278a29(0x156),'challengeHead':_0x278a29(0x1b6)},BUTTON={'tutorial':{'text':TEXT[_0x278a29(0x153)],'fillColor':YELLOWGREEN,'hover':{'fillColor':INVERTED_YELLOWGREEN,'textColor':WHITE}},'start':{'text':TEXT[_0x278a29(0x149)],'fillColor':TOMATO,'hover':{'fillColor':INVERTED_TOMATO,'textColor':WHITE}},'leaderboard':{'text':TEXT[_0x278a29(0x16b)],'fillColor':SKYBLUE,'hover':{'fillColor':INVERTED_SKYBLUE,'textColor':WHITE}},'updateLog':{'text':TEXT['mainButton04'],'fillColor':BLUE,'hover':{'fillColor':INVERTED_BLUE,'textColor':WHITE}},'modeClassic':{'text':TEXT[_0x278a29(0x175)],'fillColor':YELLOWGREEN,'hover':{'fillColor':INVERTED_YELLOWGREEN,'textColor':WHITE},'caption':_0x278a29(0x1ae)},'modeChallenge':{'text':TEXT[_0x278a29(0x1c5)],'fillColor':TOMATO,'hover':{'fillColor':INVERTED_TOMATO,'textColor':WHITE},'caption':_0x278a29(0x18c)},'backToMainPage':{'text':TEXT['backToMainPage'],'textColor':WHITE,'fillColor':CHARCOAL,'hover':{'fillColor':INVERTED_CHARCOAL,'textColor':BLACK}},'prev':{'text':TEXT['tutorialButton01'],'fillColor':TOMATO,'hover':{'fillColor':INVERTED_TOMATO,'textColor':WHITE}},'next':{'text':TEXT[_0x278a29(0x145)],'fillColor':TOMATO,'hover':{'fillColor':INVERTED_TOMATO,'textColor':WHITE}},'back':{'text':TEXT['backButton'],'fillColor':YELLOWGREEN,'hover':{'fillColor':INVERTED_YELLOWGREEN,'textColor':WHITE}},'submit':{'text':TEXT[_0x278a29(0x1c4)],'fillColor':SKYBLUE,'hover':{'fillColor':INVERTED_SKYBLUE,'textColor':WHITE}}},tutorialClearPage=function(_0x415e04){const _0x2ef9e9=_0x278a29;this[_0x2ef9e9(0x122)]['clearRect'](0x0,0x0,this[_0x2ef9e9(0x155)],this[_0x2ef9e9(0x1a5)][_0x2ef9e9(0x12d)]),this[_0x2ef9e9(0x185)](_0x415e04);},TUTORIAL={'tutorial01':{'next':0x2,'board':{},'bottomText':{'text':TEXT[_0x278a29(0x15b)],'linebreak':!![]},'timer':{'getTimer':function(){const _0x2e34ae=()=>{const _0x5679b2=_0x3bb1;tutorialClearPage[_0x5679b2(0x177)](this)({}),this[_0x5679b2(0x1a5)]['getCell'](0x0,0x0)['stroke'](NAVY,0xa),this[_0x5679b2(0x1a5)][_0x5679b2(0x157)](0x4,0x4)[_0x5679b2(0x1c0)](NAVY,0xa);},_0x87c5d9=()=>{const _0x376a90=_0x3bb1;tutorialClearPage[_0x376a90(0x177)](this)({});};let _0x4f6b6e=0x2;return()=>{switch(_0x4f6b6e){case 0x2:_0x2e34ae();break;case 0x1:_0x87c5d9();break;}--_0x4f6b6e===0x0&&(_0x4f6b6e=0x2);};},'delay':0x1f4}},'tutorial02':{'prev':0x1,'next':0x3,'board':{},'bottomText':{'text':TEXT[_0x278a29(0x154)],'linebreak':!![]},'timer':{'getTimer':function(){const _0x3bac45=()=>{const _0x2dbb94=_0x3bb1;tutorialClearPage['bind'](this)({}),this[_0x2dbb94(0x1a5)][_0x2dbb94(0x157)](0x1,0x1)['stroke'](NAVY,0xa);},_0x61bea9=()=>{const _0x1d9fff=_0x3bb1;tutorialClearPage[_0x1d9fff(0x177)](this)({});const _0x369c7f=this[_0x1d9fff(0x1a5)]['getCell'](0x0,0x0),_0x351a1b=this['board'][_0x1d9fff(0x157)](0x2,0x2);this[_0x1d9fff(0x1b9)](_0x369c7f,_0x351a1b,NAVY,0xa),this[_0x1d9fff(0x1a5)]['getCell'](0x2,0x2)[_0x1d9fff(0x1c0)](ORANGE,0xa);},_0x479655=()=>{const _0x167182=_0x3bb1;tutorialClearPage[_0x167182(0x177)](this)({}),this[_0x167182(0x1a5)][_0x167182(0x157)](0x0,0x1)[_0x167182(0x1c0)](NAVY,0xa);},_0x1232bd=()=>{const _0x1a8a25=_0x3bb1;tutorialClearPage[_0x1a8a25(0x177)](this)({});const _0x4995cb=this[_0x1a8a25(0x1a5)][_0x1a8a25(0x157)](0x0,0x0),_0x245d44=this['board'][_0x1a8a25(0x157)](0x1,0x2);this[_0x1a8a25(0x1b9)](_0x4995cb,_0x245d44,NAVY,0xa);};let _0x4d8c06=0xc;return()=>{switch(_0x4d8c06){case 0xc:case 0xa:case 0x8:_0x3bac45();break;case 0xb:case 0x9:case 0x7:_0x61bea9();break;case 0x6:case 0x4:case 0x2:_0x479655();break;case 0x5:case 0x3:case 0x1:_0x1232bd();break;}--_0x4d8c06===0x0&&(_0x4d8c06=0xc);};},'delay':0x258}},'tutorial03':{'prev':0x2,'next':0x4,'board':{'me':!![]},'bottomText':{'text':TEXT[_0x278a29(0x181)],'linebreak':!![]},'timer':{'getTimer':function(){const _0x2865cd=()=>{const _0x14f3e7=_0x3bb1;this[_0x14f3e7(0x1a5)]['me'][_0x14f3e7(0x164)](0x1);},_0x193223=()=>{const _0x3dbb08=_0x3bb1;this['board']['me'][_0x3dbb08(0x16d)](0x1);},_0x4e3517=()=>{const _0x2aea48=_0x3bb1;tutorialClearPage[_0x2aea48(0x177)](this)({});const _0x4bb79=this[_0x2aea48(0x1a5)][_0x2aea48(0x157)](0x0,0x0),_0x53b167=this[_0x2aea48(0x1a5)][_0x2aea48(0x157)](0x2,0x2);this['strokeCells'](_0x4bb79,_0x53b167,NAVY,0xa);},_0x385026=()=>{tutorialClearPage['bind'](this)({});};let _0x150326=0xb;return()=>{const _0xbf43dd=_0x3bb1;switch(_0x150326){case 0xb:tutorialClearPage[_0xbf43dd(0x177)](this)({'me':!![]});break;case 0xa:case 0x9:case 0x8:_0x2865cd();break;case 0x7:case 0x6:_0x193223();break;case 0x4:case 0x2:_0x4e3517();break;case 0x3:case 0x1:_0x385026();break;}--_0x150326===0x0&&(_0x150326=0xb);};},'delay':0x1f4}},'tutorial04':{'prev':0x3,'next':0x5,'board':{'me':!![]},'bottomText':{'text':TEXT['tutorial04'],'linebreak':!![]},'timer':{'getTimer':function(){const _0x243ecc=()=>{const _0x224860=_0x3bb1;this[_0x224860(0x1a5)]['me']['moveX'](0x1);},_0x5f3838=()=>{const _0x1078c9=_0x3bb1;this['board']['me'][_0x1078c9(0x164)](-0x1);},_0x3784a2=()=>{const _0x4b08a6=_0x3bb1;this[_0x4b08a6(0x1a5)]['me'][_0x4b08a6(0x16d)](0x1);},_0x2f8a6a=()=>{const _0x47d0f8=_0x3bb1;this[_0x47d0f8(0x1a5)]['me'][_0x47d0f8(0x16d)](-0x1);};let _0x390bdb=0x11;return animation=()=>{const _0x3b37ae=_0x3bb1;switch(_0x390bdb){case 0x11:tutorialClearPage[_0x3b37ae(0x177)](this)({'me':!![]});break;case 0xd:case 0xc:case 0x6:case 0x5:case 0x1:_0x243ecc();break;case 0x9:_0x5f3838();break;case 0x10:case 0xf:case 0xe:case 0xb:case 0x3:case 0x2:_0x3784a2();break;case 0xa:case 0x8:case 0x7:case 0x4:_0x2f8a6a();break;}--_0x390bdb===0x0&&clearInterval(animation);};},'delay':0x7d}},'tutorial05':{'prev':0x4,'next':0x6,'board':{'me':!![],'meX':0x4,'meY':0x2,'ensured':[[0x0,0x3],[0x1,0x3],[0x2,0x3],[0x2,0x4],[0x3,0x0],[0x3,0x1],[0x3,0x2],[0x3,0x3],[0x4,0x2]],'detected':[[0x0,0x4],[0x1,0x4],[0x3,0x4],[0x4,0x0],[0x4,0x1],[0x4,0x3]]},'bottomText':{'text':TEXT['tutorial05'],'linebreak':!![]}},'tutorial06':{'prev':0x5,'next':0x7,'board':{'me':!![],'meX':0x4,'meY':0x2,'ensured':[[0x0,0x3],[0x1,0x3],[0x2,0x3],[0x2,0x4],[0x3,0x0],[0x3,0x1],[0x3,0x2],[0x3,0x3],[0x4,0x2]],'detected':[[0x0,0x4],[0x1,0x4],[0x3,0x4],[0x4,0x0],[0x4,0x1],[0x4,0x3]]},'bottomText':{'text':TEXT[_0x278a29(0x1b0)],'linebreak':!![]}},'tutorial07':{'board':{'me':!![]},'bottomText':{'text':TEXT[_0x278a29(0x135)],'linebreak':!![]},'addition':function(){const _0x48d64f=_0x278a29;this[_0x48d64f(0x19c)]=_0x48d64f(0x150);}}},MODE_CLASSIC=[{'type':'input'},{'type':_0x278a29(0x151),'layout':_0x278a29(0x129),'title':TEXT[_0x278a29(0x17d)],'half1':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x4,'safe':[[0x0,0x0,0x0],[0x0,0x1,0x0],[0x0,0x2,0x1],[0x1,0x0,0x1],[0x1,0x1,0x1],[0x1,0x2,0x1],[0x1,0x3,0x1]],'ensured':[[0x0,0x3,0x1],[0x2,0x0,0x1],[0x2,0x1,0x1],[0x2,0x2,0x0],[0x2,0x3,0x0]],'me':[0x1,0x2]},'half2':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x4,'tomato':[[0x0,0x3],[0x2,0x0]],'yellowgreen':[[0x2,0x1],[0x2,0x2],[0x2,0x3]],'safe':[[0x0,0x0,0x0],[0x0,0x1,0x0],[0x0,0x2,0x1],[0x1,0x0,0x1],[0x1,0x1,0x1],[0x1,0x2,0x1],[0x1,0x3,0x1]],'ensured':[[0x0,0x3,0x1],[0x2,0x0,0x1],[0x2,0x1,0x1],[0x2,0x2,0x0],[0x2,0x3,0x0]],'me':[0x1,0x2]},'arrow':!![],'header':TEXT[_0x278a29(0x14e)],'footer':TEXT[_0x278a29(0x120)]},{'type':_0x278a29(0x1ad),'xCount':0x6,'yCount':0x6,'mine':0x4,'boardSetting':{'time':0x96}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x129),'title':TEXT[_0x278a29(0x174)],'half1':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x4,'safe':[[0x0,0x1,0x1],[0x1,0x0,0x1],[0x1,0x1,0x1]],'me':[0x0,0x0]},'half2':{'type':'board','xCount':0x3,'yCount':0x4,'safe':[[0x0,0x1,0x1],[0x1,0x0,0x1],[0x1,0x1,0x1]],'ensured':[[0x1,0x2,0x3]],'me':[0x0,0x0]},'arrow':!![],'header':TEXT['introduceItem102'],'footer':TEXT[_0x278a29(0x166)],'bonus':{'item1':0xa}},{'type':_0x278a29(0x1ad),'xCount':0x6,'yCount':0x6,'mine':0x5,'boardSetting':{'time':0x96}},{'type':'info','layout':'leftRight','title':TEXT['introduceItem201'],'half1':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x4,'safe':[[0x0,0x1,0x1],[0x1,0x0,0x1],[0x1,0x1,0x1]],'me':[0x0,0x0]},'half2':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x4,'safe':[[0x0,0x1,0x1],[0x1,0x0,0x1],[0x1,0x1,0x1],[0x1,0x2,0x3]],'me':[0x0,0x0]},'arrow':!![],'header':TEXT['introduceItem202'],'footer':TEXT['introduceItem203'],'bonus':{'item2':0x5}},{'type':'game','xCount':0x6,'yCount':0x6,'mine':0x6,'boardSetting':{'time':0x96}},{'type':'info','layout':_0x278a29(0x129),'title':TEXT[_0x278a29(0x15a)],'half1':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x4,'safe':[[0x0,0x0,0x0],[0x0,0x1,0x1],[0x1,0x0,0x1],[0x1,0x1,0x1]],'ensured':[[0x0,0x2,0x3],[0x1,0x2,0x4],[0x2,0x0,0x1],[0x2,0x1,0x1],[0x2,0x1,0x3],[0x2,0x2,0x3]],'me':[0x1,0x1]},'half2':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x4,'safe':[[0x0,0x0,0x0],[0x0,0x1,0x1],[0x1,0x0,0x1],[0x1,0x1,0x1],[0x2,0x1,0x1]],'ensured':[[0x0,0x2,0x3],[0x1,0x2,0x4],[0x2,0x0,0x1],[0x2,0x1,0x3],[0x2,0x2,0x3]],'me':[0x1,0x1]},'arrow':!![],'header':TEXT[_0x278a29(0x11b)],'footer':TEXT[_0x278a29(0x133)],'bonus':{'item3':0x3}},{'type':'game','xCount':0x6,'yCount':0x6,'mine':0x7,'boardSetting':{'time':0x96}},{'type':_0x278a29(0x151),'layout':'article','title':TEXT['perfectClear01'],'article':{'type':'text','text':TEXT[_0x278a29(0x198)]},'footer':TEXT['pressH']},{'type':_0x278a29(0x1ad),'xCount':0x7,'yCount':0x6,'mine':0x8,'boardSetting':{'time':0x96}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT[_0x278a29(0x18f)],'article':{'type':_0x278a29(0x131),'text':TEXT[_0x278a29(0x152)]},'footer':TEXT[_0x278a29(0x1bc)]},{'type':_0x278a29(0x1ad),'xCount':0x5,'yCount':0x5,'mine':0x8,'boardSetting':{'time':0xb4}},{'type':_0x278a29(0x1ad),'xCount':0x5,'yCount':0x6,'mine':0x9,'boardSetting':{'time':0xb4}},{'type':'game','xCount':0x5,'yCount':0x7,'mine':0x9,'boardSetting':{'time':0xb4}},{'type':_0x278a29(0x1ad),'xCount':0x5,'yCount':0x8,'mine':0xa,'boardSetting':{'time':0xb4}},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x5,'mine':0xa,'boardSetting':{'time':0xb4}},{'type':'info','layout':_0x278a29(0x18b),'title':TEXT[_0x278a29(0x15c)],'article':{'type':_0x278a29(0x131),'text':TEXT['stage10Bonus02']},'header':TEXT['stageBonusHeader'],'bonus':{'life':0x3,'item1':0xa,'item2':0x5,'item3':0x3}},{'type':_0x278a29(0x151),'layout':'article','title':TEXT[_0x278a29(0x18e)],'article':{'type':_0x278a29(0x1a5),'xCount':0x7,'yCount':0x3,'safe':[[0x2,0x1,0x1],[0x3,0x1,0x2,'red'],[0x5,0x1,0x3]],'mine':[[0x1,0x1],[0x4,0x1]]},'header':TEXT[_0x278a29(0x188)],'footer':TEXT[_0x278a29(0x1bc)]},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x6,'mine':0xc,'boardSetting':{'time':0xd2,'red':0x3}},{'type':_0x278a29(0x1ad),'xCount':0x7,'yCount':0x7,'mine':0xc,'boardSetting':{'time':0xd2,'red':0x3}},{'type':'game','xCount':0x7,'yCount':0x7,'mine':0xd,'boardSetting':{'time':0xd2,'red':0x4}},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x7,'mine':0xe,'boardSetting':{'time':0xd2,'red':0x4}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT[_0x278a29(0x18e)],'article':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x5,'safe':[[0x1,0x1,0x1],[0x1,0x2,0x2,'orange'],[0x1,0x4,0x3]],'mine':[[0x1,0x0],[0x1,0x3]]},'header':TEXT['newHintOrange'],'footer':TEXT[_0x278a29(0x1bc)]},{'type':_0x278a29(0x151),'layout':_0x278a29(0x129),'title':TEXT[_0x278a29(0x1c6)],'half1':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x5,'safe':[[0x0,0x0,0x0,_0x278a29(0x162)],[0x1,0x0,0x1],[0x2,0x0,0x0],[0x1,0x1,0x2],[0x2,0x1,0x2],[0x0,0x2,0x2],[0x1,0x2,0x1,_0x278a29(0x16c)],[0x1,0x3,0x3],[0x2,0x3,0x2],[0x0,0x4,0x2],[0x2,0x4,0x1]],'mine':[[0x0,0x1],[0x2,0x2],[0x0,0x3],[0x1,0x4]]},'half2':{'type':'board','xCount':0x3,'yCount':0x5,'safe':[[0x0,0x0,0x0,_0x278a29(0x162)],[0x1,0x0,0x1],[0x2,0x0,0x0],[0x1,0x1,0x2],[0x2,0x1,0x2],[0x0,0x2,0x2],[0x1,0x2,0x1,'orange'],[0x1,0x3,0x3],[0x2,0x3,0x2],[0x0,0x4,0x2],[0x2,0x4,0x1]],'mine':[[0x0,0x1],[0x2,0x2],[0x0,0x3],[0x1,0x4]],'showShape':!![]},'arrow':!![],'header':TEXT[_0x278a29(0x18d)],'footer':TEXT[_0x278a29(0x1bc)]},{'type':_0x278a29(0x1ad),'xCount':0x9,'yCount':0x7,'mine':0xf,'boardSetting':{'time':0xd2,'red':0x3,'orange':0x2}},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0x6,'mine':0xf,'boardSetting':{'time':0xf0,'red':0x2,'orange':0x4}},{'type':'game','xCount':0xd,'yCount':0x5,'mine':0x10,'boardSetting':{'time':0xf0,'red':0x2,'orange':0x5}},{'type':_0x278a29(0x1ad),'xCount':0xb,'yCount':0x6,'mine':0x10,'boardSetting':{'time':0xf0,'red':0x2,'orange':0x5}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x129),'title':TEXT[_0x278a29(0x160)],'half1':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x3,'safe':[[0x0,0x1,0x2],[0x0,0x2,0x0],[0x1,0x1,'홀'],[0x1,0x2,0x1],[0x2,0x0,0x1],[0x2,0x1,0x2]],'mine':[[0x0,0x0],[0x1,0x0],[0x2,0x2]]},'half2':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x3,'safe':[[0x0,0x1,'짝'],[0x0,0x2,'짝'],[0x1,0x1,0x3],[0x1,0x2,0x1],[0x2,0x0,0x1],[0x2,0x1,'짝']],'mine':[[0x0,0x0],[0x1,0x0],[0x2,0x2]]},'header':TEXT[_0x278a29(0x165)],'footer':TEXT[_0x278a29(0x1bc)]},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x8,'mine':0x13,'boardSetting':{'time':0xf0,'red':0x3,'orange':0x5,'oddEven':0x1}},{'type':'game','xCount':0x8,'yCount':0x8,'mine':0x13,'boardSetting':{'time':0xf0,'red':0x2,'orange':0x3,'oddEven':0x2}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT['stage20Bonus01'],'article':{'type':'text','text':TEXT[_0x278a29(0x17f)]},'header':TEXT['stageBonusHeader'],'bonus':{'life':0x3,'item1':0x7,'item2':0x4,'item3':0x3}},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x8,'mine':0x13,'boardSetting':{'time':0xf0,'red':0x2,'orange':0x2,'oddEven':0x3}},{'type':_0x278a29(0x1ad),'xCount':0x9,'yCount':0x8,'mine':0x15,'boardSetting':{'time':0xf0,'red':0x3,'orange':0x3,'oddEven':0x4}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT['newHintTitle'],'article':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x3,'safe':[[0x2,0x0,0x1],[0x1,0x1,0x2,'yellow'],[0x2,0x1,0x2],[0x1,0x2,0x3]],'mine':[[0x0,0x0],[0x1,0x0],[0x0,0x1],[0x0,0x2],[0x2,0x2]]},'header':TEXT[_0x278a29(0x147)],'footer':TEXT[_0x278a29(0x1bc)]},{'type':'game','xCount':0x9,'yCount':0x8,'mine':0x15,'boardSetting':{'time':0xf0,'red':0x2,'orange':0x2,'yellow':0x5,'oddEven':0x2}},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0x8,'mine':0x18,'boardSetting':{'time':0xf0,'red':0x2,'orange':0x2,'yellow':0x6,'oddEven':0x4}},{'type':'game','xCount':0x9,'yCount':0x9,'mine':0x18,'boardSetting':{'time':0x10e,'red':0x3,'orange':0x3,'yellow':0x4,'oddEven':0x4}},{'type':'game','xCount':0x9,'yCount':0x9,'mine':0x18,'boardSetting':{'time':0x10e,'red':0x2,'orange':0x2,'yellow':0x5,'oddEven':0x5}},{'type':_0x278a29(0x151),'layout':'article','title':TEXT['newHintTitle'],'article':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x3,'safe':[[0x2,0x0,0x1],[0x1,0x1,0x3,'green'],[0x2,0x1,0x2],[0x1,0x2,0x3]],'mine':[[0x0,0x0],[0x1,0x0],[0x0,0x1],[0x0,0x2],[0x2,0x2]]},'header':TEXT[_0x278a29(0x142)],'footer':TEXT[_0x278a29(0x1bc)]},{'type':'game','xCount':0x9,'yCount':0x9,'mine':0x18,'boardSetting':{'time':0x10e,'red':0x2,'orange':0x2,'yellow':0x2,'green':0x4,'oddEven':0x2}},{'type':'game','xCount':0x9,'yCount':0x9,'mine':0x18,'boardSetting':{'time':0x10e,'red':0x1,'orange':0x1,'yellow':0x2,'green':0x6,'oddEven':0x2}},{'type':'game','xCount':0xa,'yCount':0x9,'mine':0x1b,'boardSetting':{'time':0x10e,'red':0x1,'orange':0x1,'yellow':0x3,'green':0x5,'oddEven':0x3}},{'type':'game','xCount':0xa,'yCount':0x9,'mine':0x1b,'boardSetting':{'time':0x10e,'red':0x2,'orange':0x2,'yellow':0x2,'green':0x5,'oddEven':0x4}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT['stage30Bonus01'],'article':{'type':_0x278a29(0x131),'text':TEXT[_0x278a29(0x14d)]},'header':TEXT[_0x278a29(0x1b3)],'bonus':{'life':0x2,'item1':0x5,'item2':0x3,'item3':0x2}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x129),'title':TEXT[_0x278a29(0x17a)],'half1':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x6,'safe':[[0x1,0x0,0x3],[0x0,0x1,0x2],[0x1,0x1,0x5],[0x2,0x1,0x3],[0x0,0x3,0x2],[0x1,0x3,0x3],[0x2,0x3,0x2],[0x0,0x4,0x1],[0x1,0x4,0x1],[0x2,0x4,0x1],[0x0,0x5,0x1],[0x2,0x5,0x1]],'mine':[[0x0,0x0],[0x2,0x0],[0x0,0x2],[0x1,0x2],[0x2,0x2],[0x1,0x5]]},'half2':{'type':'board','xCount':0x3,'yCount':0x6,'safe':[[0x1,0x0,0x3],[0x0,0x1,0x2],[0x1,0x1,'▲'],[0x2,0x1,0x3],[0x0,0x3,0x2],[0x1,0x3,0x3],[0x2,0x3,0x2],[0x0,0x4,0x1],[0x1,0x4,'▼'],[0x2,0x4,0x1],[0x0,0x5,0x1],[0x2,0x5,0x1]],'mine':[[0x0,0x0],[0x2,0x0],[0x0,0x2],[0x1,0x2],[0x2,0x2],[0x1,0x5]]},'header':TEXT[_0x278a29(0x170)],'footer':TEXT['pressH']},{'type':'game','xCount':0xa,'yCount':0x9,'mine':0x1b,'boardSetting':{'time':0x12c,'red':0x1,'orange':0x1,'yellow':0x2,'green':0x2,'oddEven':0x2,'highLow':0x3}},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0x9,'mine':0x1b,'boardSetting':{'time':0x12c,'red':0x1,'orange':0x1,'yellow':0x2,'green':0x3,'oddEven':0x1,'highLow':0x4}},{'type':_0x278a29(0x1ad),'xCount':0xb,'yCount':0x9,'mine':0x1d,'boardSetting':{'time':0x12c,'red':0x2,'orange':0x2,'yellow':0x3,'green':0x3,'oddEven':0x3,'highLow':0x4}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT[_0x278a29(0x18e)],'article':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x3,'safe':[[0x2,0x0,0x2],[0x1,0x1,0x3,_0x278a29(0x125)],[0x0,0x2,0x2],[0x2,0x2,0x2]],'mine':[[0x0,0x0],[0x1,0x0],[0x0,0x1],[0x2,0x1],[0x1,0x2]]},'header':TEXT[_0x278a29(0x141)],'footer':TEXT['pressH']},{'type':_0x278a29(0x1ad),'xCount':0xb,'yCount':0x9,'mine':0x1d,'boardSetting':{'time':0x12c,'red':0x2,'orange':0x2,'yellow':0x2,'green':0x2,'blue':0x4,'oddEven':0x2,'highLow':0x2}},{'type':'game','xCount':0xa,'yCount':0xa,'mine':0x1e,'boardSetting':{'time':0x12c,'red':0x1,'orange':0x1,'yellow':0x2,'green':0x2,'blue':0x6,'oddEven':0x4,'highLow':0x2}},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0xa,'mine':0x1e,'boardSetting':{'time':0x168,'red':randRange(0x1,0x2),'orange':randRange(0x1,0x2),'yellow':randRange(0x1,0x3),'green':randRange(0x1,0x3),'blue':randRange(0x3,0x5),'oddEven':randRange(0x3,0x5),'highLow':randRange(0x2,0x4)}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT[_0x278a29(0x18e)],'article':{'type':'board','xCount':0x3,'yCount':0x3,'safe':[[0x1,0x0,0x3],[0x2,0x0,0x2],[0x1,0x1,0x2,_0x278a29(0x11f)],[0x0,0x2,0x2],[0x2,0x2,0x2]],'mine':[[0x0,0x0],[0x0,0x1],[0x2,0x1],[0x1,0x2]]},'header':TEXT[_0x278a29(0x180)],'footer':TEXT[_0x278a29(0x1bc)]},{'type':'game','xCount':0xa,'yCount':0xa,'mine':0x1e,'boardSetting':{'time':0x168,'red':randRange(0x1,0x2),'orange':randRange(0x1,0x2),'yellow':randRange(0x1,0x2),'green':randRange(0x1,0x2),'blue':randRange(0x1,0x2),'navy':randRange(0x5,0x6),'oddEven':randRange(0x2,0x4),'highLow':randRange(0x1,0x3)}},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0xa,'mine':0x1e,'boardSetting':{'time':0x168,'red':randRange(0x1,0x3),'orange':randRange(0x1,0x3),'yellow':randRange(0x1,0x3),'green':randRange(0x1,0x3),'blue':randRange(0x1,0x3),'navy':randRange(0x4,0x6),'oddEven':randRange(0x3,0x5),'highLow':randRange(0x2,0x4)}},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0xa,'mine':0x1e,'boardSetting':{'time':0x168,'red':randRange(0x2,0x3),'orange':randRange(0x2,0x3),'yellow':randRange(0x3,0x4),'green':randRange(0x3,0x4),'blue':randRange(0x4,0x5),'navy':randRange(0x4,0x5),'oddEven':randRange(0x5,0x6),'highLow':randRange(0x3,0x5)}},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0xa,'mine':0x1e,'boardSetting':{'time':0x168,'red':randRange(0x2,0x3),'orange':randRange(0x2,0x3),'yellow':randRange(0x3,0x4),'green':randRange(0x3,0x4),'blue':randRange(0x4,0x5),'navy':randRange(0x4,0x5),'oddEven':randRange(0x5,0x7),'highLow':randRange(0x4,0x6)}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT[_0x278a29(0x137)],'article':{'type':_0x278a29(0x131),'text':TEXT[_0x278a29(0x124)]},'header':TEXT[_0x278a29(0x1b3)],'bonus':{'life':0x1,'item1':0x3,'item2':0x1,'item3':0x1}},{'type':_0x278a29(0x151),'layout':_0x278a29(0x18b),'title':TEXT[_0x278a29(0x18e)],'article':{'type':_0x278a29(0x1a5),'xCount':0x3,'yCount':0x3,'safe':[[0x0,0x0,0x2],[0x1,0x1,0x0,_0x278a29(0x13e),[0x0,0x4,0x6,0x8]],[0x0,0x2,0x2],[0x2,0x2,0x2]],'mine':[[0x1,0x0],[0x2,0x0],[0x0,0x1],[0x2,0x1],[0x1,0x2]]},'header':TEXT['newHintPurple'],'footer':TEXT['pressH']},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0xa,'mine':0x23,'boardSetting':{'time':0x1a4,'red':randRange(0x1,0x3),'orange':randRange(0x1,0x3),'yellow':randRange(0x3,0x4),'green':randRange(0x3,0x4),'blue':randRange(0x4,0x5),'navy':randRange(0x4,0x5),'purple':randRange(0x3,0x4),'oddEven':randRange(0x4,0x6),'highLow':randRange(0x4,0x6)}},{'type':_0x278a29(0x1ad),'xCount':0xc,'yCount':0xa,'mine':0x2a,'boardSetting':{'time':0x1e0,'red':randRange(0x1,0x3),'orange':randRange(0x1,0x3),'yellow':randRange(0x3,0x4),'green':randRange(0x3,0x4),'blue':randRange(0x3,0x4),'navy':randRange(0x3,0x4),'purple':randRange(0x4,0x6),'oddEven':randRange(0x5,0x7),'highLow':randRange(0x5,0x6)}},{'type':_0x278a29(0x1ad),'xCount':0xe,'yCount':0xa,'mine':0x31,'boardSetting':{'time':0x1e0,'red':randRange(0x2,0x5),'orange':randRange(0x2,0x5),'yellow':randRange(0x4,0x5),'green':randRange(0x4,0x5),'blue':randRange(0x4,0x5),'navy':randRange(0x4,0x5),'purple':randRange(0x6,0x8),'oddEven':randRange(0x6,0x8),'highLow':randRange(0x5,0x6)}},{'type':_0x278a29(0x1ad),'xCount':0x10,'yCount':0xa,'mine':0x3c,'boardSetting':{'time':0x258,'red':randRange(0x2,0x5),'orange':randRange(0x2,0x5),'yellow':randRange(0x4,0x6),'green':randRange(0x4,0x6),'blue':randRange(0x4,0x6),'navy':randRange(0x4,0x6),'purple':randRange(0x6,0x8),'oddEven':randRange(0x6,0x8),'highLow':randRange(0x5,0x6)}},{'type':'game','xCount':0x14,'yCount':0xa,'mine':0x5a,'boardSetting':{'time':0x384,'red':randRange(0x4,0x7),'orange':randRange(0x4,0x7),'yellow':randRange(0x5,0x7),'green':randRange(0x5,0x7),'blue':randRange(0x6,0x7),'navy':randRange(0x6,0x7),'purple':randRange(0x7,0xa),'oddEven':randRange(0xa,0xc),'highLow':randRange(0x8,0xb)}}],getProcedure=_0x14443a=>{const _0x4db57d=_0x278a29;return[{'type':_0x4db57d(0x197)},MODE_CHALLENGE[_0x14443a]];},MODE_CHALLENGE=[{'type':'game','xCount':0x8,'yCount':0x8,'mine':0x14,'boardSetting':{'time':0x5a},'selectInfo':{'name':'초급\x2001','difficulty':0x1,'item':[0x5,0x3,0x1]}},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x8,'mine':0x14,'boardSetting':{'time':0x5a,'red':randRange(0x2,0x3),'orange':randRange(0x2,0x3)},'selectInfo':{'name':_0x278a29(0x16f),'difficulty':0x1,'item':[0x5,0x3,0x1]}},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x8,'mine':0x14,'boardSetting':{'time':0x64,'red':randRange(0x2,0x4),'orange':randRange(0x2,0x4),'oddEven':randRange(0x2,0x3)},'selectInfo':{'name':_0x278a29(0x11e),'difficulty':0x1,'item':[0x5,0x3,0x1]}},{'type':_0x278a29(0x1ad),'xCount':0x9,'yCount':0x9,'mine':0x1a,'boardSetting':{'time':0x6e,'red':randRange(0x2,0x4),'orange':randRange(0x2,0x4),'yellow':randRange(0x2,0x3),'oddEven':randRange(0x3,0x4)},'selectInfo':{'name':_0x278a29(0x1a9),'difficulty':0x1,'item':[0x5,0x3,0x1]}},{'type':_0x278a29(0x1ad),'xCount':0x9,'yCount':0x9,'mine':0x1a,'boardSetting':{'time':0x6e,'yellow':randRange(0x4,0x5),'green':randRange(0x4,0x5)},'selectInfo':{'name':'초급\x2005','difficulty':0x1,'item':[0x5,0x3,0x1]}},{'type':_0x278a29(0x1ad),'xCount':0x9,'yCount':0x9,'mine':0x1a,'boardSetting':{'time':0x78,'yellow':randRange(0x8,0xb),'green':randRange(0x8,0xb),'oddEven':randRange(0x4,0x7)},'selectInfo':{'name':_0x278a29(0x17c),'difficulty':0x1,'item':[0x5,0x3,0x1]}},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x8,'mine':0x17,'boardSetting':{'time':0x87,'red':0x1f,'orange':0x1f},'selectInfo':{'name':_0x278a29(0x1a6),'difficulty':0x2,'item':[0x5,0x3,0x1]}},{'type':_0x278a29(0x1ad),'xCount':0x8,'yCount':0x8,'mine':0x17,'boardSetting':{'time':0x96,'blue':0x1f,'navy':0x1f},'selectInfo':{'name':_0x278a29(0x15d),'difficulty':0x2,'item':[0x5,0x3,0x1]}},{'type':_0x278a29(0x1ad),'xCount':0xa,'yCount':0xa,'mine':0x23,'boardSetting':{'time':0xd2,'red':randRange(0x2,0x4),'orange':randRange(0x2,0x4),'yellow':randRange(0x3,0x5),'green':randRange(0x3,0x5),'blue':randRange(0x3,0x5),'navy':randRange(0x3,0x5),'oddEven':randRange(0x4,0x6)},'selectInfo':{'name':_0x278a29(0x1bb),'difficulty':0x2,'item':[0xa,0x5,0x2]}}],VERSION=0x64;[colorMatch,RAINBOW,OFFSET_X,OFFSET_Y,OFFSET5_X,OFFSET5_Y,TEXT,BUTTON,TUTORIAL,MODE_CLASSIC,MODE_CHALLENGE][_0x278a29(0x173)](_0x528efc=>Object['freeze'](_0x528efc));function _0x4cde(){const _0x2ce799=['rgba(255,\x20128,\x20\x20\x200,\x200.75)','input','perfectClear02','rgb(\x20\x200,\x20\x20\x200,\x20\x20\x200)','869680rYoKWc','21cmytAl','page','oddEven','random','F를\x20눌러\x20보너스를\x20받으세요!','37876ppyjSi','색깔\x20힌트의\x20지뢰\x20범위를\x20표시합니다.','rgb(255,\x20128,\x20\x20\x200)','숫자\x202키를\x20눌러\x20주변\x202칸\x20이내에\x20있는\x20칸\x20중에서<br>공개되지\x20않은\x20무작위\x20칸을\x20공개할\x20수\x20있습니다.<br>만약\x20그\x20칸이\x20지뢰가\x20아니면\x20숫자\x20힌트를,\x20지뢰라면\x20지뢰를\x20표시합니다.','152YGTvEy','board','중급\x2001','파란색\x20네모를\x20WASD키로\x20조작하여\x20움직일\x20수\x20있습니다.\x0a도착점까지\x20직접\x20들어가보세요!','숫자\x20힌트로는\x20여기까지가\x20한계입니다.\x0a이렇게\x20운에\x20의존해야\x20하는\x20상황이\x20종종\x20발생할\x20것입니다.','초급\x2004','rgba(\x20\x200,\x20\x20\x200,\x20128,\x200.75)','rgb(127,\x20\x20\x200,\x20255)','highLow','game','스테이지를\x20하나씩\x20클리어하며\x20지뢰피하기\x20룰을\x20익힐\x20수\x20있는\x20기본\x20모드','STAGE\x2040\x20클리어\x20보너스','tutorial06','F를\x20누르면\x20게임을\x20시작합니다.','rgb(135,\x20206,\x20235)','stageBonusHeader','11536640HqsvGC','📝\x20글자힌트:\u3000','<div\x20class=\x22border-bottom\x22>순위</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>이름</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>점수</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>⏱</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>🧩</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>🏃</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>🔍</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>🔭</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>📡</div>','숫자\x201키를\x20눌러\x20내\x20주변\x202칸\x20이내에\x20있는\x20칸\x20중에서<br>공개되지\x20않은\x20무작위\x20칸의\x20숫자\x20힌트를\x20공개할\x20수\x20있습니다.','💣\x20지뢰피하기\x20💣','strokeCells','🔭[2]','중급\x2003','pressH','F를\x20누르면\x20다음\x20스테이지로\x20이동합니다.','최대한\x20적게\x20움직이세요!<br>STAGE\x206부터는\x20움직임을\x20최소화하면\x20보너스\x20점수를\x20얻습니다.','밟을\x20수\x20있는\x20모든\x20칸을\x20다\x20밟으세요!<br>STAGE\x205부터는\x20한\x20번도\x20죽지\x20않고<br>모든\x20안전한\x20칸을\x20밟으면\x20보너스\x20점수를\x20얻습니다.','stroke','F를\x20눌러\x20🔭\x205개를\x20받으세요!','rgb(255,\x20255,\x20\x20\x200)','rgba(255,\x20255,\x20255,\x200.95)','submitButton','modeChallenge','showShape01','introduceItemL02','rgb(255,\x20\x2099,\x20\x2071)','rgb(255,\x20255,\x20255)','초급\x2003','navy','clickCell03','rgba(127,\x20\x20\x200,\x20255,\x200.75)','ctx','💖\x20+3<br>🔍[1]\x20+7<br>🔭[2]\x20+4<br>📡[3]\x20+3','stage40Bonus02','blue','🧩\x20맵\x20크기:\u3000','칸에\x20적힌\x20숫자는\x20해당\x20칸과\x20주변\x208칸을\x20포함한\x0a9칸\x20내에\x20존재하는\x20지뢰의\x20개수입니다.','새로운\x20힌트','leftRight','green','60471CBubFg','일부\x20칸의\x20숫자\x20힌트가\x20홀짝\x20힌트로\x20전환됩니다.<br>1,\x203,\x205,\x207,\x209는\x20\x22홀\x22로,<br>0,\x202,\x204,\x206,\x208은\x20\x22짝\x22으로\x20표시됩니다.','maxHeight','<span\x20style=\x22color:rgb(0,\x20255,\x200);\x22\x20class=\x22stroke\x22>초록색\x20숫자</span>는\x20대각선\x204칸과\x20자기\x20자신을\x20포함한<br>X자\x20모양\x205칸\x20내의\x20지뢰\x20개수를\x20의미합니다.','F를\x20눌러\x20🔍\x2010개를\x20받으세요!','💣\x20지뢰비율:\u3000','text','659718mxsxiV','introduceItemL03','🧷\x20아이템:\u3000','tutorial07','84306ewEDzw','stage40Bonus01','rgb(185,\x20185,\x20185)','더\x20이상\x20공개할\x20수\x20있는\x20칸이\x20없습니다!','rgb(\x2051,\x20153,\x20255)','🔍[1]','칸을\x20클릭하여\x20색깔\x20표시를\x20할\x20수\x20있습니다.<br>한\x20번\x20누르면\x20빨간색,\x20두\x20번\x20누르면\x20초록색,\x20세\x20번\x20누르면\x20사라집니다.<br>눈으로만\x20추측하면\x20실수하기\x20쉽습니다.\x20색깔\x20표시를\x20적극적으로\x20활용하세요!','🔍[1]\x20아이템을\x20사용했습니다','purple','지뢰피하기는\x20좌측\x20상단\x20시작점에서\x20우측\x20하단\x20도착점까지\x0a지뢰를\x20피해서\x20도달하면\x20승리하는\x20게임입니다.','rgba(135,\x20206,\x20235,\x200.75)','newHintBlue','newHintGreen','최대/최소\x20힌트','<span\x20style=\x22color:rgb(255,\x20128,\x200);\x22\x20class=\x22stroke\x22>주황색\x20숫자</span>는\x20위\x20아래\x202칸과\x20자기\x20자신을\x20포함한<br>세로\x205칸\x20내의\x20지뢰\x20개수를\x20의미합니다.','tutorialButton02','메인\x20화면으로\x20돌아가기','newHintYellow','rgba(255,\x20255,\x20\x20\x200,\x200.75)','mainButton02','rgb(220,\x20220,\x20220)','게임설명','패치노트','stage30Bonus02','clickCell02','⏱\x20제한시간:\u3000','tutorial','info','movementOpt02','mainButton01','tutorial02','width','<div\x20class=\x22border-bottom\x22>순위</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>이름</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>점수</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>랭크</div>\x0a\x20\x20<div\x20class=\x22border-bottom\x22>스테이지</div>','getCell','rgb(120,\x20\x2049,\x20\x2020)','<span\x20style=\x22color:rgb(127,\x200,\x20255);\x22\x20class=\x22stroke\x22>보라색\x20숫자</span>는\x202~8칸의\x20무작위\x20모양\x20내의\x20지뢰\x20개수를\x20의미합니다.<br>어떤\x20모양인지는\x20숫자가\x20밝혀질\x20때\x20표시됩니다.','introduceItemL01','tutorial01','stage10Bonus01','중급\x2002','메인\x20메뉴','rgba(255,\x20255,\x20255,\x200.70)','oddEven01','이\x20외에도\x20숫자\x201키,\x202키로\x20무작위\x20칸을\x20공개하는\x0a아이템을\x20사용할\x20수\x20있고\x20횟수\x20제한이\x20있습니다.','red','rgba(255,\x20\x20\x200,\x20\x20\x200,\x200.75)','moveX','oddEven02','introduceItem103','게임\x20선택','rgb(204,\x20102,\x20\x20\x200)','<span\x20style=\x22color:rgb(0,\x2050,\x20128);\x22>남색\x20숫자</span>는\x20工자\x20모양\x207칸\x20내의\x20지뢰\x20개수를\x20의미합니다.','F를\x20눌러\x20📡\x203개를\x20받으세요!','mainButton03','orange','moveY','📡[3]','초급\x2002','highLow02','지뢰를\x20밟았습니다!','🔍[1]\x20아이템이\x20없습니다!','forEach','introduceItem101','modeClassic','rgba(\x20\x200,\x20255,\x20\x20\x200,\x200.75)','bind','rgb(\x20\x200,\x20\x20\x200,\x20128)','rgb(\x2020,\x20175,\x20207)','highLow01','<span\x20style=\x22color:red;\x22\x20class=\x22stroke\x22>빨간색\x20숫자</span>는\x20양\x20옆\x202칸과\x20자기\x20자신을\x20포함한<br>가로\x205칸\x20내의\x20지뢰\x20개수를\x20의미합니다.','초급\x2006','clickCell01','파란색\x20네모를\x20움직이면\x20주변\x20칸들의\x20숫자가\x20공개됩니다.\x0a시작점\x20근처\x20칸들의\x20숫자와\x20지뢰는\x20시작할\x20때\x20공개됩니다.','stage20Bonus02','newHintNavy','tutorial03','rgb(\x2070,\x20\x2070,\x20\x2070)','💖\x20+1<br>🔍[1]\x20+3<br>🔭[2]\x20+1<br>📡[3]\x20+1','STAGE\x2010\x20클리어\x20보너스','paintTutorialBoard','📡[3]\x20아이템을\x20사용했습니다','753834hprDVw','newHintRed','일부\x20칸의\x20숫자\x20힌트가\x20최대/최소\x20힌트로\x20전환됩니다.<br>범위\x20내\x20숫자들의\x20최댓값보다\x20크거나\x20같다면\x20▲,<br>범위\x20내\x20숫자들의\x20최솟값보다\x20작거나\x20같다면\x20▼으로\x20표시됩니다.','3RNQWrh','article','단\x20하나의\x20목숨으로\x20개별\x20맵\x20클리어에\x20도전하는\x20모드','showShape02','newHintTitle','movementOpt01','rgb(255,\x20\x20\x200,\x20\x20\x200)','색깔\x20힌트의\x20지뢰\x20범위를\x20표시를\x20해제합니다.','<span\x20style=\x22color:rgb(255,\x20255,\x200);\x22\x20class=\x22stroke\x22>노란색\x20숫자</span>는\x20상하좌우\x204칸과\x20자기\x20자신을\x20포함한<br>십자가\x20모양\x205칸\x20내의\x20지뢰\x20개수를\x20의미합니다.','게임시작','STAGE','움직임\x20최적화'];_0x4cde=function(){return _0x2ce799;};return _0x4cde();}