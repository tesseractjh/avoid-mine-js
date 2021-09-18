const HELP = [

  {
    "title": "🎨 색깔 힌트",
    "content": [
      {
        "type": "example",
        "example": {
          "size": 2,
          "color": {
            "red": [10, 11, 12, 13, 14]
          },
          "value": 2,
          "mine": [6, 7, 8, 11, 13, 16, 17, 18],
        },
        "description": "빨간색 숫자는 이 숫자가 있는 칸과 양 옆 두 칸을 포함한 다섯 칸 내의 지뢰 개수를 의미합니다."
      },

      {
        "type": "example",
        "example": {
          "size": 2,
          "color": {
            "orange": [2, 7, 12, 17, 22]
          },
          "value": 2,
          "mine": [6, 7, 8, 11, 13, 16, 17, 18],
        },
        "description": "주황색 숫자는 이 숫자가 있는 칸과 위 아래 각각 두 칸을 포함한 다섯 칸 내의 지뢰 개수를 의미합니다."
      },

      {
        "type": "example",
        "example": {
          "size": 1,
          "color": {
            "yellow": [1, 3, 4, 5, 7]
          },
          "value": 4,
          "mine": [0, 1, 2, 3, 5, 6, 7, 8],
        },
        "description": "노란색 숫자는 이 숫자가 있는 칸과 상하좌우 각각 한 칸씩을 포함한 다섯 칸 내의 지뢰 개수를 의미합니다."
      },

      {
        "type": "example",
        "example": {
          "size": 1,
          "color": {
            "green": [0, 2, 4, 6, 8]
          },
          "value": 4,
          "mine": [0, 1, 2, 3, 5, 6, 7, 8],
        },
        "description": "초록색 숫자는 이 숫자가 있는 칸과 대각선 방향 각각 한 칸씩을 포함한 다섯 칸 내의 지뢰 개수를 의미합니다."
      },

      {
        "type": "example",
        "example": {
          "size": 1,
          "color": {
            "blue": [0, 2, 3, 4, 5, 6, 8]
          },
          "value": 6,
          "mine": [0, 1, 2, 3, 5, 6, 7, 8],
        },
        "description": "파란색 숫자는 이 숫자가 있는 칸을 중심으로 H 모양 7칸 내의 지뢰 개수를 의미합니다."
      },

      {
        "type": "example",
        "example": {
          "size": 1,
          "color": {
            "navy": [0, 1, 2, 4, 6, 7, 8]
          },
          "value": 6,
          "mine": [0, 1, 2, 3, 5, 6, 7, 8],
        },
        "description": "남색 숫자는 이 숫자가 있는 칸을 중심으로 工 모양 7칸 내의 지뢰 개수를 의미합니다."
      },

      {
        "type": "example",
        "example": {
          "size": 1,
          "color": {
            "purple": [0, 1, 4, 5, 6]
          },
          "value": 4,
          "mine": [0, 1, 2, 3, 5, 6, 7, 8],
        },
        "description": "보라색 숫자는 이 숫자가 있는 칸을 포함한 주변 9칸 중에서 랜덤으로 선택된 2 ~ 8칸 내의 지뢰 개수를 의미합니다."
      }
    ]
  },

  {
    "title": "📝 글자 힌트",
    "content": [
      {
        "type": "example",
        "example": {
          "size": 1,
          "value": '짝',
          "mine": [0, 1, 2, 3, 5, 6, 7, 8],
        },
        "description": "홀짝 힌트는 이 글자가 있는 칸을 포함한 주변 9칸 내에 있는 지뢰의 개수가 홀수 또는 짝수임을 의미합니다."
      },

      {
        "type": "example",
        "example": {
          "size": 1,
          "values": [ [1, 2], [2, 0], [4, '▲'], [5, 0], [7, 2], [8, 0] ],
          "mine": [0, 3, 6],
        },
        "description": "최대/최소 힌트는 이 칸의 숫자가 이 칸이 가리키는 범위 내 칸들의 숫자들 중 최댓값 이상이면 ▲, 최솟값 이하면 ▼를 표시합니다."
      },
      
    ]
  },

  {
    "title": "🧷 아이템",
    "content": [
      {
        "type": "text1",
        "text": "🔍",
        "description": "숫자 1키를 눌러 내 주변 2칸 이내에 있는 칸 중에서 공개되지 않은 무작위 칸의 힌트를 공개합니다."
      },

      {
        "type": "text1",
        "text": "🔭",
        "description": "숫자 2키를 눌러 내 주변 2칸 이내에 있는 칸 중에서 공개되지 않은 무작위 칸을 공개합니다. 공개된 칸이 지뢰면 지뢰를 표시하고, 공개된 칸이 지뢰가 아니라면 밟은 칸으로 변합니다."
      },

      {
        "type": "text1",
        "text": "📡",
        "description": "숫자 3키를 눌러 내 주변 1칸 이내에 있는 칸 중에서 아직 밟지 않은 칸들 중 무작위 칸을 공개합니다. 공개된 칸이 지뢰면 지뢰를 표시하고, 공개된 칸이 지뢰가 아니라면 밟은 칸으로 변합니다."
      },
    ]
  },

  {
    "title": "🏓 조작법",
    "content": [
      {
        "type": "text1",
        "text": "WASD",
        "description": "내 캐릭터를 움직일 수 있습니다."
      },

      {
        "type": "text1",
        "text": "123",
        "description": "아이템을 사용합니다."
      },

      {
        "type": "text1",
        "text": "R",
        "description": "숫자 힌트의 모양을 표시합니다."
      },

      {
        "type": "text1",
        "text": "F",
        "description": "창을 닫거나 다음 화면으로 넘어갈 수 있습니다."
      },

      {
        "type": "text1",
        "text": "Q",
        "description": "도움말 창을 엽니다."
      },
    ]
  },

  {
    "title": "기타",
    "content": [
      {
        "type": "example",
        "example": {
          "size": 1,
          "color2": {
            "TOMATO": [2],
            "YELLOWGREEN": [0, 1, 3, 4, 5, 6, 7, 8]
          },
          "values": [[0, 0], [1, 1], [2, 1], [3, 0], [4, 1], [5, 1], [6, 1], [7, 1], [8, 0]],
        },
        "description": "지뢰 유무를 키보드로 이동하여 밟기 전에 마우스 클릭으로 미리 표시할 수 있습니다. 칸을 한 번 클릭하면 빨간색, 두 번 클릭하면 초록색, 세 번 클릭하면 다시 사라집니다. 특정 색을 칠한 상태에서 마우스 클릭을 떼지 않고 드래그하여 여러 칸을 동시에 칠할 수 있습니다."
      },

    ]
  },

]