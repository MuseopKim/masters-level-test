// 3 Strike === 1 Out
// 4 Ball === 1 hit
// 난수가 짝수이면 스트라이크, 홀수이면 ball이다.

const match = {
  strike: 0,
  ball: 0,
  out: 0,
  hit: 0
};

function printCount() {
  const strikeCount = document.querySelector("#jsCountStrike");
  strikeCount.innerHTML = match.strike;

  const ballCount = document.querySelector("#jsCountBall");
  ballCount.innerHTML = match.ball;

  const outCount = document.querySelector("#jsCountOut");
  outCount.innerHTML = match.out;
}

function printJudgement(judgement) {
  const comment = document.querySelector("#jsComment");

  comment.innerHTML = judgement;
}

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

function playGame(e) {
  match.makeJudgement();
  match.isOutOrHit();
  printCount();
  if (match.out === 3) {
    const resetBtn = document.querySelector("#jsResetBtn");

    printFinalResult();
    e.target.style.display = "none";
    resetBtn.style.display = "inline-block";
  }
  console.log("strike : " + match.strike, "ball : " + match.ball);
}

function initGame() {
  match.strike = 0;
  match.ball = 0;
  match.out = 0;
  match.hit = 0;

  const comment = document.querySelector("#jsComment");
  comment.innerHTML = "첫 번째 타자가 타석에 입장했습니다.";
}

function resetGame(e) {
  initGame();

  const playBtn = document.querySelector("#jsPlayBtn");
  e.target.style.display = "none";
  playBtn.style.display = "inline-block";
  playBtn.addEventListener("click", playGame);

  const statsList = document.querySelector("#jsStatsList");
  statsList.style.display = "block";

  const finalResult = document.querySelector("#jsFinalResult");
  finalResult.style.display = "none";

  printCount();
}

function main() {
  const playBtn = document.querySelector("#jsPlayBtn");
  const resetBtn = document.querySelector("#jsResetBtn");

  playBtn.addEventListener("click", playGame);
  resetBtn.addEventListener("click", resetGame);
}

main();
