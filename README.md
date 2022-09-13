# Wordle

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Explanation

### 프로젝트 구조

- commons : 공통으로 쓰일 법한 js 함수들
- components : 공통으로 쓰이거나, 분리할 수 있는 컴포넌트
- router : vue-router 관련
- static : 정적인 파일
- store : vuex 관련
- views : router별 메인 화면들

### 워들 구현 방법

- 입력

  - 마우스 클릭의 경우 각 버튼의 text 속성을 비교해서 입력
  - 키보드 입력의 경우 window에 keyup 이벤트를 이용하여 키보드 입력에 따라 입력

- 채점 및 출력
  - 입력횟수가 몇 번인지를 통해 몇 번째 줄의 답을 가져올지를 결정
  - 채점하기 전 글자 수가 맞는지 검증
  - 채점하기 전 실제 단어가 맞는지 검증(axios 사용), 이후에 채점이 이루어질 수 있도록 promise 사용하여 다음 단계 진행
  - 가져온 답과 정답을 대조
    - 녹색 칠을 우선하여 시행
    - 대조될 때마다 대조된 글자의 횟수를 감소시켜, 녹색과 노란색으로 색칠될 횟수를 결정
    - 그 외에는 회색
    - 색이 결정될 때마다, 글자와 색깔을 기반으로 키보드의 색을 변경

### 워들 생성 및 상태 관리 방법

- 워들 생성

  - 워들 생성한 것이 로컬에 저장되어야했고, home과 wordle에서 모두 사용되는 상태이므로 vuex 및 vuexPersistedState 사용
  - home에서 wordle 등록시 단어 길이 및 실제 단어가 맞는 지(axios) 검증
  - wordle 등록시 router에 드러나면 안 된다는 조건을 충족시키기 위해 단어마다 다르게 나오는 hash함수를 사용하여 값을 생성, 이 값을 기반으로 route
  - hash된 값으로 vuex에 실제 단어 및 시작한 시간과 끝낸 시간, 시도한 단어 등을 저장

- wordle 게임 내부 상태 관리
  - 진입시 기존에 플레이를 하던 중이었다면, 기존에 제출한 기록을 vuex에서 가져와 진행
    - 이 때 vuexPersistedState로 인해 localStorage에서 진행 상태 가져오게 됨
  - 답을 제출해 채점이 될 때마다, vuex의 해당 wordle에 기록
    - 최초의 답변 제출시에 게임 시작 시간을 기록
  - 매 답변마다 게임이 끝났는지 여부를 확인하여 만약 끝났다면 게임이 끝난 시간을 기록 및 도전한 횟수, 총 플레이한 wordle 횟수, wordle에서 이긴 횟수를 갱신
  - 게임이 끝나고 나면 상태창을 띄우고, vuex의 기록된 상태들을 기반으로 값 출력
