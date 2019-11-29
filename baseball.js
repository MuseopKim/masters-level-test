// 3 Strike === 1 Out
// 4 Ball === 1 hit
// 난수가 짝수이면 스트라이크, 홀수이면 ball이다.

const match = {
  strike: 0,
  ball: 0,
  out: 0,
  hit: 0
};

match.makeJudgement = function() {
  let randomNumber = Math.floor(Math.random() * 100 + 1);

  if (randomNumber % 2 === 0) {
    this.strike++;
  } else {
    this.ball++;
  }
};

match.isOutOrHit = function() {
  if (this.strike === 3) {
    this.out++;
    this.strike = 0;
  }

  if (this.ball === 4) {
    this.hit++;
    this.ball = 0;
  }
};

function main() {
  for (let i = 0; i < 10; i++) {
    match.makeJudgement();
    console.log("strike : " + match.strike, "ball : " + match.ball);
    match.isOutOrHit();
  }
}

main();
