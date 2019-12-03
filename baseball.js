// 3 Strike === 1 Out
// 4 Ball === 1 hit
// 난수가 짝수이면 스트라이크, 홀수이면 ball이다.

const match = {
  strike: 0,
  ball: 0,
  out: 0,
  hit: 0
};

// 스트라이크, 볼, 아웃의 수를 실시간 점수판에 출력
function printCount() {
  const strikeCount = document.querySelector("#jsCountStrike");
  strikeCount.innerHTML = match.strike;

  const ballCount = document.querySelector("#jsCountBall");
  ballCount.innerHTML = match.ball;

  const outCount = document.querySelector("#jsCountOut");
  outCount.innerHTML = match.out;
}

// 판정 결과를 화면에 출력
function printJudgement(judgement) {
  const comment = document.querySelector("#jsComment");

  comment.innerHTML = judgement;
}

// 랜덤으로 스트라이크, 볼 중 하나의 판정을 결정
match.makeJudgement = function() {
  let randomNumber = Math.floor(Math.random() * 100 + 1);
  let judgement = "";

  if (randomNumber % 2 === 0) {
    judgement = "Strike!";
    printJudgement(judgement);
    this.strike++;
  } else {
    judgement = "Ball!";
    printJudgement(judgement);
    this.ball++;
  }
};

// 안타, 아웃을 확인
match.isOutOrHit = function() {
  let judgement = "";

  if (this.strike === 3) {
    this.out++;
    judgement = "아웃! 다음 타자가 타석에 입장 했습니다.";
    printJudgement(judgement);
    this.strike = 0;
  }

  if (this.ball === 4) {
    this.hit++;
    judgement = "안타! 다음 타자가 타석에 입장 했습니다.";
    printJudgement(judgement);
    this.ball = 0;
  }
};

// 3 아웃 이후 게임이 끝나면 최종 결과를 출력
function printFinalResult() {
  const comment = document.querySelector("#jsComment");
  const gameover = "Game Over";
  comment.innerHTML = gameover;

  const statsList = document.querySelector("#jsStatsList");
  statsList.style.display = "none";

  const finalResult = document.querySelector("#jsFinalResult");
  finalResult.style.display = "block";

  const hitCount = document.querySelector("#jsCountHit");
  hitCount.innerHTML = match.hit;
}

// 버튼을 클릭 시 1회 실행
function playGame(e) {
  match.makeJudgement();
  match.isOutOrHit();
  printCount();
  if (match.out === 3) {
    const resetBtn = document.querySelector("#jsResetBtn");

    printFinalResult();
    e.target.style.display = "none";
    resetBtn.style.display = "block";
    resetBtn.style.width = "100px";
    resetBtn.style.height = "30px";
  }
}

// 게임 실행시 모든 화면과 스코어를 초기화
function initGame() {
  match.strike = 0;
  match.ball = 0;
  match.out = 0;
  match.hit = 0;

  const comment = document.querySelector("#jsComment");
  comment.innerHTML = "첫 번째 타자가 타석에 입장했습니다.";
}

function main() {
  const playBtn = document.querySelector("#jsPlayBtn");
  const resetBtn = document.querySelector("#jsResetBtn");

  playBtn.addEventListener("click", playGame);
  resetBtn.addEventListener("click", function() {
    location.reload();
  });
}

main();
