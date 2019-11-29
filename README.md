# masters-level-test

2020 Codesquad Masters Course Level Test

## STEP-1

### 개요

1부터 100까지의 랜덤한 수를 발생시켜 홀수일 경우 Strike, 짝수일 경우 Ball로 판정 되도록 하여 최종 결과인 안타 횟수를 도출하는 실행 과정을 만들어 보았습니다.

또한 자동 실행 방식이 아닌 사용자가 버튼을 통해 각 턴을 실행 하는 방식으로 구현하였고, 게임 종료 시에도 버튼을 사용하여 재실행이 가능하도록 하였습니다.

### 동작 방식

1. 객체를 사용하여 각 스탯을 저장하는 속성과(Strike, Ball, Out, Hit - 초기 값 0) 각각의 속성 값을 변화 시키는 메소드를 선언 하였습니다.

```js
const match = {
  strike: 0,
  ball: 0,
  out: 0,
  hit: 0,
  makeJudgement: function() { ... }, // 랜덤 수를 만들어 홀수 또는 짝수를 판별하고, 그에 따라 Strike 또는 Ball을 발생 시킴
  isOutOrHit: function() { ... } // Strike와 Ball이 특정 횟수에 도달하면 Out과 Hit 증가
};
```

2. STEP-1 문제의 출력 예시 화면과 같이 객체에 저장 된 속성 값이 변하면 변화 된 스탯은 실시간으로 점수판에 반영 되며, 판정 결과 역시 실시간으로 확인할 수 있도록 함수를 사용 하였습니다.

```js
// 판정 결과를 화면에 출력
function printJudgement(judgement) { ... }

// 스트라이크, 볼, 아웃의 수를 실시간 점수판에 출력
function printCount() { ... }
```

3. 자동실행이 아닌 각 턴마다 사용자가 직접 실행할 수 있도록 실행 버튼을 만들어 클릭 이벤트를 추가 하였습니다. 또한 게임 종료 후 버튼을 통해 게임을 재시작 할 수 있습니다.

```js
// 버튼을 클릭 시 1회 실행
function playGame(e) { ... }

// 게임 종료 후 버튼을 클릭 시 모든 것을 처음 상태로 돌림
function resetGame(e) { ... }

// 메인 함수로 실행
function main() {
  const playBtn = document.querySelector("#jsPlayBtn");
  const resetBtn = document.querySelector("#jsResetBtn");

  playBtn.addEventListener("click", playGame);
  resetBtn.addEventListener("click", resetGame);
}

main();
```
