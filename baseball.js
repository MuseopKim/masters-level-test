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

function main() {
  for (let i = 0; i < 10; i++) {
    match.makeJudgement();
    console.log("strike : " + match.strike, "ball : " + match.ball);
  }
}

main();
