# masters-level-test

2020 Codesquad Masters Course Level Test
<br/>

## STEP-1

### 개요

1부터 100까지의 랜덤한 수를 발생시켜 스트라이크, 볼, 안타, 아웃으로 판정 되도록 하여 최종 결과인 안타 총 횟수를 도출하는 실행 과정을 만들어 보았습니다.
랜덤한 결과를 만드는 규칙은 다음과 같습니다.

- 1 에서 50 이하의 숫자면서 짝수일 경우 스트라이크, 홀수일 경우 볼 판정
- 51에서 100 이하의 숫자면서 짝수일 경우 안타, 홀수일 경우 아웃으로 판정

또한 자동 실행 방식이 아닌 사용자가 버튼을 통해 각 턴을 실행 하는 방식으로 구현하였고, 게임 종료 시에도 버튼을 사용하여 재실행이 가능하도록 하였습니다.
<br/>

### 동작 방식

1. 객체를 사용하여 각 스탯을 저장하는 속성과(Strike, Ball, Out, Hit - 초기 값 0) 각각의 속성 값을 변화 시키는 메소드를 선언 하였습니다.

```js
const match = {
  strike: 0,
  ball: 0,
  out: 0,
  hit: 0,
  makeJudgement: function() { ... }, // 랜덤 수를 만들어 홀수 또는 짝수를 판별하고, 그에 따라 판정을 발생 시킴
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

<br/>

## STEP-2

### 개요

사용자로부터 팀 정보를 입력 받아 저장한 뒤 데이터를 바탕으로 스트라이크, 볼, 아웃, 안타를 가려내어 승팀을 결정합니다.
선수와 팀 데이터를 객체에 저장하여 경기를 생성하고, 입력 된 선수들의 타율을 바탕으로 판정을 도출하여 승팀이 결정 되도록 하였습니다.
<br/>

### 동작 방식

1. 사용자가 초기 화면인 데이터 입력 창에 팀 정보를 기입하여 저장합니다. 이 때 객체를 생성하는 생성자 함수를 호출하여 팀 객체를 생성하게 됩니다. 팀 객체의 구성은 다음과 같습니다.

```js
// 데이터 저장 버튼을 클릭하면 팀 생성자 함수를 호출 합니다.
function Team(name, pitcher) {
  this.name = name;
  this.batterPlayers = [];
  this.pitcher = pitcher;
}

// 사용자 입력 값을 받아와 적합한지 검사한 뒤 객체에 추가 합니다.
Team.prototype.setBatter = function(num) { ... }

// 생성된 팀 객체 예시
{ name: Team Name, pitcher: Team Pitcher, batterPlayers: [{Batter 1}, {Batter 2}, {Batter 3}, ... ] }
```

2. 앞의 과정을 통해 두 팀을 모두 생성하면 생성된 팀 정보를 기반으로 match 객체에 경기 정보를 구성 합니다.

```js
// 입력된 팀1, 팀2 정보를 받아와 경기를 생성
match.setMatch = function(team1, team2) { ... }
```

3. 구성 된 경기 정보를 바탕으로 경기를 진행하며, 실행 버튼을 클릭하면 타율을 기반으로 하여 판정을(스트라이크, 볼, 아웃, 안타) 도출 합니다.

```js
//  타율을 매개변수로 받아 판정을 결정
function decideJudgement(hitAvrg) {
  ...

  return judgement;
}
```

4. 판정이 결정 되면 결정 된 판정을 매개로 스탯을 증가 시키는 메소드를 실행 합니다. 이때 증가 된 스탯으로 인해 3 아웃이 될 경우, 회초/회말과 공수전환, 또는 경기를 종료 시키는 함수를 호출 합니다.

```js
// 판정을 바탕으로 스탯에 반영
match.updateStats = function(judgement) { ... }


// 3 아웃시 경기를 종료 시킬지 여부를 확인하고, 조건이 충족 되면 경기 종료
function isFinish() { ... }


// 아닐 경우 라운드를 초기화
match.changeOffend = function() { ... }
```

5. 위 과정을 총 6라운드까지 반복하며, 모든 경기 종료시 최종 결과를 화면에 출력합니다.

```js
// 최종 경기 결과를 화면으로 출력
 function showResult() { ... }
```

6. 모든 메뉴 활성화와 기능 실행은 버튼 이벤트를 기반으로 진행 되며, 엔터로 게임을 진행하는 기능을 추가 하였습니다.

```js
function main() {
  const showInputBtn = document.querySelector("#jsShowInputBtn");
  showInputBtn.addEventListener("click", showAndHideBox);

  const showInfoBtn = document.querySelector("#jsShowInfoBtn");
  showInfoBtn.addEventListener("click", showAndHideBox);

  const showPlayBtn = document.querySelector("#jsShowPlayBtn");
  showPlayBtn.addEventListener("click", showAndHideBox);

  const saveBtn = document.querySelector("#jsTeamSave");
  saveBtn.addEventListener("click", saveData);

  const playBtn = document.querySelector("#jsPlayBtn");
  playBtn.addEventListener("click", playRound);

  const skipBtn = document.querySelector("#jsSkipBtn");
  skipBtn.addEventListener("click", skipRound);

  const resetBtn = document.querySelector("#jsResetBtn");
  resetBtn.addEventListener("click", function() {
    location.reload();
  });

  window.addEventListener("keypress", pressEnter);
}

main();
```

<br/>

## STEP-3

### 개요

STEP-2에서 구현한 기능들을 바탕으로 라인업과 경기 결과가 실시간으로 화면에 반영 되는 기능을 구현 하였습니다. STEP-2의 동작 방식에 몇 가지 값이 누적 되는 변수를(삼진, 투구, 안타) 추가 하였고, 각각의 값이 실시간으로 화면에 출력이 되도록 했습니다.
<br/>

### 동작 방식

1. 기존의 코드에서 값이 누적 되는 다음의 몇 가지 변수를 match 객체에 추가 하였습니다.

- 각 라운드의 회초/회말의 기록을 화면에 남기기 위해 해당 라운드에서만 누적 되다가 라운드 종료시 초기화 되는 변수
- 각 팀의 삼진, 안타, 투구 횟수를 관리하기 위한 변수

2. 각 팀의 라인업과 실시간 라운드 점수표, 판정, 현재 타자, 각 스탯을(스트라이크, 볼, 아웃) match 객체의 속성에서 받아와 화면에 출력 합니다.

```js
// 각 팀의 라인업을 경기 화면에 출력
function showLineUp() { ... }

// 코멘트, 경기 스탯을 실시간으로 노출
function printStats(num, player) { ... }
```

<br/>

## 개선해야 할 점

STEP을 진행할 수록 복잡해지면서 막코딩을 했던거 같습니다. 구현 못한 기능들도 있고 몇 가지 개선의 수준으로 고쳐질만한 코드가 아닌 심각한 스파게티 코드이지만, 코드를 쓰면서 가장 많이 느꼈던 것들만 몇 가지 간략히 적어 보려고 합니다.

### 객체를 전역에 선언하여 사용

함수나 메소드를 유기적으로 연결시키지 못해서 매개 변수와 리턴 값을 적절히 활용하지 못하였으며 전역에서 변수를 접근하도록 설계가 되어 있습니다. 이로 인해 전역에는 객체 하나만을 사용하였지만, 그 안에 무수히 많은 속성 값을 추가하면서 사실상 전역 변수를 남발한 것과 다름이 없는 코드가 되었습니다.

### 잘못 된 에러 처리

때때로 발생하는 에러 처리를 위해 조건문에 조건문을 중첩시키고 남발하였습니다. 다른 이유도 많았지만 이 때문에 15줄 이내로 마무리 짓지 못하는 함수가 많았습니다.

### 구현하지 못한 스킵 기능

경기를 실행하는 일련의 과정을 반복 시키기 위해 간단한 재귀 함수나 반복문을 사용 해봤지만 제대로 실행 되는 경우보다 프로그램이 죽어버리는 상황이 더 많았습니다. 스킵 기능을 구현 하기에는 많은 공부가 더 필요할 거 같습니다.
