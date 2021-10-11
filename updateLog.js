const UPDATE_LOG = [
  {
    "title": "2021년 9월",
    "log": [
      {
        "title": "9월 13일",
        "log": [
          {
            "title": "캐릭터의 알파값을 낮췄습니다. 이제 캐릭터가 밟고 있는 칸의 숫자 힌트를 볼 수 있습니다.",
            "log": []
          },
          {
            "title": "R키의 효과가 이제 더 이상 매 스테이지마다 초기화되지 않습니다.",
            "log": []
          },
          {
            "title": "R키의 효과가 이제 더 이상 색깔 표시에 가려지지 않습니다.",
            "log": []
          },
          {
            "title": "하단 바에 남은 지뢰 개수가 추가되었습니다.",
            "log": [
              "남은 지뢰 개수는 (현재 공개된 지뢰 개수)/(게임판 전체 지뢰 개수)로 표시됩니다.",
              "현재 공개된 지뢰 개수는 지뢰가 표시된 칸과 마우스 클릭으로 빨간색 색깔 표시를 한 칸 개수의 합과 같습니다."
            ]
          },
          {
            "title": "제한 시간이 30초 남았음을 알리는 효과음이 추가되었습니다.",
            "log": []
          }
        ]
      },

      {
        "title": "9월 15일 - 1",
        "log": [
          {
            "title": "순위표가 110등에서 더 이상 넘어가지 않던 버그를 수정하였습니다.",
            "log": []
          },
          {
            "title": "STAGE 14 클리어 후 3번 아이템(📡)이 3개 지급되던 버그를 수정하였습니다.",
            "log": []
          },
          {
            "title": "STAGE 20과 STAGE 30 클리어 보너스를 조정하였습니다.",
            "log": [
              "STAGE 20 보너스 🔭 +3 → 🔭 +4, 📡 +2 → 📡 +3",
              "STAGE 30 보너스 🔭 +2 → 🔭 +3, 📡 +1 → 📡 +2",
              "위에서 언급한 3번 아이템 지급 버그 때문에 이전 버전과 형평성을 맞추기 위해 보너스를 조정하였습니다."
            ]
          },
          {
            "title": "공백만으로 이름을 지을 수 있던 버그를 수정하였습니다.",
            "log": []
          },
          {
            "title": "STAGE 45 클리어 화면을 수정하였습니다.",
            "log": []
          },
          {
            "title": "메인 화면에 패치노트 버튼을 추가하였습니다.",
            "log": []
          },
          {
            "title": "기존의 게임을 [ 클래식 모드 ]로 명명하고, 새로운 모드인 [ 도전 모드 ]가 추가되었습니다.",
            "log": [
              "추가된 모드인 도전 모드는 단 하나의 목숨으로 아이템 없이 진행되는 모드입니다.",
              "도전 모드는 각각의 맵 하나만을 플레이하며, 맵별로 순위표에 점수가 기록됩니다.",
              "현재는 1개의 맵만 추가되었으며, 앞으로 계속 추가할 예정입니다."
            ]
          }
        ]
      },

      {
        "title": "9월 15일 - 2",
        "log": [
          {
            "title": "이전 패치가 적용되지 않은 상태로 플레이하면 기록이 저장되지 않는 버그를 수정했습니다.",
            "log": [
              "새벽 시간대에 패치를 진행했으나, 패치 진행 도중에 플레이 중인 일부 유저분들의 점수가 저장되지 않았습니다.",
              "앞으로는 패치를 진행하여도 패치 이전에 플레이 중이던 유저의 점수가 누락되지 않도록 하겠습니다.",
              "9월 15일 새벽 1시 ~ 2시 경 플레이 중이던 유저분들께 불편을 끼쳐드려 진심으로 사과의 말씀 드립니다."
            ]
          },
          {
            "title": "약간의 UI가 변경되었습니다.",
            "log": []
          }
        ]
      },

      {
        "title": "9월 16일",
        "log": [
          {
            "title": "도전 모드의 규칙을 변경하였습니다.",
            "log": [
              "도전 모드에서 아이템 사용이 제한적으로 허용됩니다.",
              "단 하나의 목숨으로 플레이하는 것은 동일하며, 아이템의 개수는 맵 선택 창에서 확인할 수 있습니다.",
              "도전 모드의 점수 산정 방식은 아이템 사용 여부와 무관합니다. 아이템을 사용하여도 점수에 불이익이 전혀 없습니다.",
              "도전 모드의 시작시 공개되는 칸의 범위는 클래식 모드의 3x3보다 큰 4x4입니다.",
              "아이템이 없으면 오히려 운 의존도가 높아집니다. 이는 지뢰피하기에서 추구하는 방향과 맞지 않아 불가피하게 규칙을 수정하게 되었습니다.",
              "규칙이 수정되었기 때문에 기존의 초급01 맵의 순위표는 초기화됩니다. 이 점 양해 부탁드립니다."
            ]
          },
          {
            "title": "도전 모드의 하단 바 UI를 변경하였습니다.",
            "log": [
              "하단 바에 아이템과 더불어 [🧩 공개된 칸 수]도 추가되었습니다.",
              "공개된 칸 수는 시작할 때 먼저 공개된 칸들과 직접 밟은 칸들, 2번과 3번 아이템으로 공개된 칸, 그리고 도착점을 포함합니다.",
              "이 수치는 움직임 최적화 점수를 결정하는 중요한 요소이며, 추후에 움직임 최적화 조건이 변경될 수도 있습니다."
            ]
          },
          {
            "title": "도전 모드에 신규 맵 5개를 추가하였습니다.",
            "log": []
          },
          {
            "title": "순위표 UI를 일부 변경하였습니다.",
            "log": [
              "도전 모드의 각각의 맵에 대하여 순위표를 열람할 수 있습니다."
            ]
          }
        ]
      },

      {
        "title": "9월 17일",
        "log": [
          {
            "title": "도전 모드에 신규 맵 3개를 추가하였습니다.",
            "log": []
          },
          {
            "title": "순위표 UI를 일부 변경하였습니다.",
            "log": [
              "1, 2, 3위가 각각 금메달, 은메달, 동메달 이모지로 표시됩니다.",
              "클래식 모드를 STAGE 45까지 모두 클리어하면 스테이지 대신 CLEAR 문구가 뜨도록 변경하였습니다.",
              "이제 클래식 모드 순위는 500위까지, 도전 모드 순위는 맵마다 50위까지 표시됩니다."
            ]
          }
        ]
      },

      {
        "title": "9월 18일",
        "log": [
          {
            "title": "클래식 모드의 라이프(💖)가 매 스테이지마다 5로 초기화되는 버그를 수정하였습니다.",
            "log": [
              "9월 16일 패치 이후부터 해당 버그가 생겼으며, 형평성에 크게 어긋나는 버그이기 때문에 9월 16일 패치 이후 클래식 모드를 플레이 했던 모든 기록들을 삭제하기로 결정했습니다.",
              "앞으로는 이러한 버그가 일어나지 않도록 좀 더 주의하겠습니다. 기록이 삭제된 모든 분들께 죄송하다는 말씀 드립니다."
            ]
          },
          {
            "title": "이제 공개된 지뢰 칸에 마우스를 대면 해당 칸의 힌트가 공개됩니다.",
            "log": [
              "시작할 때부터 공개된 지뢰 칸들과과 직접 밟아서 공개된 지뢰 칸들에 마우스를 올리면 원래 해당칸의 힌트가 공개됩니다.",
              "대신 기존에 지뢰 칸을 밟으면 해당 칸을 밟은 것으로 판정되어 지뢰 칸 주변의 힌트가 공개되었으나, 이제는 공개되지 않습니다."
            ]
          },
          {
            "title": "이제 마우스 클릭으로 색깔 표시를 할 때 드래그하여 여러 칸을 동시에 칠할 수 있습니다.",
            "log": [
              "마우스를 한 번 / 두 번 클릭한 상태에서 클릭을 떼지 않고 드래그하면 여러 칸을 빨간색 / 초록색으로 칠할 수 있습니다.",
              "마우스를 세 번 클릭한 상태에서 클릭을 떼지 않고 드래그하면 여러 칸의 색깔 표시를 제거할 수 있습니다."
            ]
          },
          {
            "title": "이제 마우스 휠로 효과음의 볼륨을 조절할 수 있습니다.",
            "log": []
          },
          {
            "title": "도움말 기능을 추가하였습니다.",
            "log": [
              "Q 키를 누르면 도움말 창이 열립니다.",
              "F 키를 눌러 닫을 수 있습니다."
            ]
          },
          {
            "title": "일부 UI를 변경하였습니다.",
            "log": [
              "색깔 힌트의 크기를 10% 증가시켰습니다",
              "도전 모드의 실패 화면에 위에서 아래로 내려오는 효과가 추가되었습니다."
            ]
          }
        ]
      },

      {
        "title": "9월 19일 - 1",
        "log": [
          {
            "title": "도전 모드에 신규 맵 2개를 추가하였습니다.",
            "log": []
          },
          {
            "title": "화면 우측 상단에 도움말 버튼을 추가하였습니다.",
            "log": [
              "도움말은 도움말 버튼을 클릭하거나 Q 키로 열 수 있습니다.",
              "도움말에 단축키에 대한 내용이 추가되었습니다."
            ]
          },
          {
            "title": "9월 16일 패치 이후 플레이된 75건의 클래식 모드 기록이 삭제되었습니다.",
            "log": [
              "기록이 삭제된 이유는 아래의 9월 18일 패치 내역을 참고하시기 바랍니다.",
              "기록이 삭제된 모든 분들께 진심으로 사과의 말씀 드립니다.",
              "주요 삭제 내역은 아래와 같습니다.",
              "충남, 최고점수 240841점 외 2건",
              "나도 생과부, 최고점수 226975점 1건",
              "스누라이프히부기, 최고점수 168366점 외 19건",
              "zsg, 최고점수 106428점 1건",
              "페르마, 최고점수 81483점 외 1건",
              "외대글캠 귤돼지, 최고점수: 63999점 외 6건",
              "외붕이가 탈환, 최고점수 62277점 외 1건",
              "간다, 최고점수 61895점 1건",
              "판수로, 최고점수 59736점 외 4건",
              "건축, 최고점수: 40813점 외 4건",
              "모현훕스, 최고점수 33337점 외 1건",
              "시나리오어떻게쓸것인가, 최고점수 31349점 외 1건",
              "소속써야하는겨 귤돼지, 최고점수 30141점 1건",
              "H, 최고점수 20771점 1건",
              "HUFS, 최고점수 18679점 외 6건"
            ]
          }
        ]
      },

      {
        "title": "9월 19일 - 2",
        "log": [
          {
            "title": "튜토리얼이 제대로 표시되지 않는 버그를 수정하였습니다.",
            "log": []
          }
        ]
      },

      {
        "title": "9월 20일",
        "log": [
          {
            "title": "도전 모드의 중급05 맵의 밸런스를 조정하였습니다.",
            "log": [
              "중급05 맵의 지뢰비율이 50%에서 37%로 감소하였습니다.",
              "중급05 맵에 홀짝 힌트가 생성되는 확률이 증가하였습니다."
            ]
          },
          {
            "title": "도전 모드에 신규 맵 1개를 추가하였습니다.",
            "log": []
          },
          {
            "title": "R키의 효과가 벽이 있는 칸에도 적용되는 버그를 수정하였습니다.",
            "log": []
          }
        ]
      },

      {
        "title": "9월 25일",
        "log": [
          {
            "title": "최대/최소 힌트의 정의를 변경하였습니다.",
            "log": [
              "범위 내 다른 칸들의 모든 숫자들보다 크면 ▲, 모든 숫자들보다 작으면 ▼를 표시합니다.",
              "범위 내 다른 칸들의 모든 숫자들의 최댓값과 같으면 △, 모든 숫자들의 최솟값과 같으면 ▽를 표시합니다.",
              "기존의 최대/최소 힌트는 지뢰를 유추하는데 영향력이 제한적이었습니다.",
              "이제 범위 내 숫자가 유일한 경우는 ▲▼, 중복되는 경우는 △▽로 표시하여 지뢰의 위치를 찾아내는데 더 도움이 되도록 하였습니다."
            ]
          },
          {
            "title": "새로운 모드 [ 생존 모드 ]가 추가되었습니다.",
            "log": [
              "생존 모드는 정해진 제한 시간 없이 최대한 오래 살아남는 방식의 모드입니다.",
              "생존 모드에서는 맵이 일정 시간마다 왼쪽으로 움직이며, 플레이어는 계속해서 오른쪽으로 나아가야 합니다.",
              "맵은 10초에 한 줄씩 왼쪽으로 밀려나며, 15줄 간격으로 맵이 움직이는 속도가 점점 빨라집니다.",
              "라이프(💖)를 모두 잃거나, 맨 왼쪽 칸에 있다가 맵이 움직여서 맵 밖으로 밀려나가게 되면 즉시 패배합니다.",
              "생존 모드에서는 각종 아이템들을 맵 내에서 획득할 수 있습니다."
            ]
          },
          {
            "title": "도전 모드에 신규 맵 1개를 추가하였습니다.",
            "log": []
          },
          {
            "title": "시작점과 도착점에 색깔 힌트가 적용되지 않던 버그를 수정하였습니다.",
            "log": []
          },
          {
            "title": "튜토리얼 화면의 일부가 제대로 표시되지 않던 버그를 수정하였습니다.",
            "log": []
          },
          {
            "title": "보라색 힌트의 모양을 표시하는 색을 더 연한 색으로 변경하였습니다.",
            "log": []
          }
        ]
      },

      {
        "title": "9월 28일",
        "log": [
          {
            "title": "생존 모드의 밸런스를 변경하였습니다.",
            "log": [
              "맵이 움직이는 속도가 기존에는 일정하게 5%씩 빨라졌으나, 이제는 8%, 7%, 6%, 5%, 4%씩 빨라지고 이 이후부터는 3%씩 일정하게 빨라집니다.",
              "맵의 힌트 난이도가 상승하는 속도를 완화하였습니다.",
              "📡[3] 아이템의 등장 확률이 증가하고, ⏪ 아이템의 등장 확률이 감소하였습니다."
            ]
          },
          {
            "title": "이제 버그제보 버튼을 누르면 현재 화면이 바뀌지 않고 새로운 창(탭)이 열립니다.",
            "log": []
          },
          {
            "title": "도움말의 일부 내용을 수정하였습니다.",
            "log": []
          }
        ]
      },

      {
        "title": "9월 29일",
        "log": [
          {
            "title": "시작점과 도착점에 글자 힌트가 적용되지 않던 버그를 수정하였습니다.",
            "log": []
          },
          {
            "title": "보라색 힌트의 모양이 전부 맵 바깥을 가리키는 경우가 발생하지 않도록 수정하였습니다.",
            "log": []
          },
          {
            "title": "도전 모드에 신규 맵 1개를 추가하였습니다.",
            "log": []
          }
        ]
      }

    ]
  },

  {
    "title": "2021년 10월",
    "log": [

      {
        "title": "10월 1일",
        "log": [
          {
            "title": "도전 모드에 신규 맵 2개를 추가하였습니다.",
            "log": [
              "고급04맵에 새로운 글자 힌트인 덧셈 힌트(+)가 추가되었습니다.",
              "덧셈 힌트는 현재 칸의 숫자가 이 칸을 제외한 범위 내 다른 숫자들의 합의 마지막 숫자와 같다는 의미입니다."
            ]
          }
        ]
      },

      {
        "title": "10월 4일",
        "log": [
          {
            "title": "순위표에서 도전 모드의 고급03 맵의 🔨[4] 아이템 잔량이 표시되지 않던 버그를 수정하였습니다.",
            "log": []
          }
        ]
      },

      {
        "title": "10월 12일",
        "log": [
          {
            "title": "도전 모드에 신규 맵 1개를 추가하였습니다.",
            "log": []
          },
          {
            "title": "홀짝 힌트의 글자 굵기가 감소되었습니다.",
            "log": []
          },
        ]
      }

    ]
  }
];