/*
 팀 정보 입력을 받는다.
 players = [{
     name: name1
     average: average1
 }, 
 {name: name2
  average: average2
 }, ...]
}
*/

const match = {};

function Team(name, fitcher) {
  this.name = name;
  this.batterPlayers = [];
  this.fitcher = fitcher;
}

Team.prototype.addPlayer = function(name, avrg) {
  const average = Number(avrg).toFixed(3);

  if (average > 0.1 && average < 0.5) {
    this.batterPlayers.push({
      num: this.batterPlayers.length + 1,
      name: name,
      average: average
    });
    // } else {
    //   alert("0.1부터 0.5 사이의 값을 입력 해주세요.");
    // }
  }
};

Team.prototype.setBatter = function(num) {
  let batterNames;
  let batterAvrgs;
  if (num === 1) {
    batterNames = document.querySelectorAll(".jsTeam1BatterName");
    batterAvrgs = document.querySelectorAll(".jsTeam1BatterAvrg");
  } else if (num === 2) {
    batterNames = document.querySelectorAll(".jsTeam2BatterName");
    batterAvrgs = document.querySelectorAll(".jsTeam2BatterAvrg");
  }

  for (let i = 0; i < 9; i++) {
    const batterName = batterNames[i].value;
    const batterAvrg = batterAvrgs[i].value;
    this.addPlayer(batterName, batterAvrg);
  }
};

// 1. 사용자가 정보를 입력
// 2. 버튼을 클릭하면 정보를 가져옴 (객체 생성 => 피쳐 입력 => 배터들 입력)

function setTeam1() {
  const teamName = document.querySelector("#jsTeam1Name").value;
  const teamFitcher = document.querySelector("#jsTeam1FitcherName").value;

  const team1 = new Team(teamName, teamFitcher);

  team1.setBatter(1);

  return team1;
}

function setTeam2() {
  const teamName = document.querySelector("#jsTeam2Name").value;
  const teamFitcher = document.querySelector("#jsTeam2FitcherName").value;

  const team2 = new Team(teamName, teamFitcher);
  team2.setBatter(2);

  return team2;
}

match.resetStats = function() {
  console.log(this);
  this.strike = 0;
  this.ball = 0;
  this.out = 0;
  this.hit = 0;
};

match.setMatch = function(team1, team2) {
  this.team1 = team1;
  this.team2 = team2;
  this.team1Score = 0;
  this.team2Score = 0;
  this.round = 1;
  this.isSecondHalf = false;
  this.currentNum = 0;
  this.offendTeam = team1;
};

function saveData() {
  const team1 = setTeam1();
  console.log(team1);

  const team2 = setTeam2();
  console.log(team2);

  match.setMatch(team1, team2);
}

// 1. 팀 1이 공격을 한다.
// 2. 안타나 아웃이 나면 다음 타자로 넘어간다.
// 3. 9번까지 돌아간 뒤 1번으로 다시 돌아간다.
// 4. 3 Out이면 1회 초가 끝나고 1회 말로 넘어간다.
// 5. 1회 말로 넘어가면 팀 2가 공격을 한다.

match.judgeStats = function(hitAvrg) {
  const randomNum = Math.random();
  console.log(randomNum);
  let comment = "";

  if (randomNum < 0.1) {
    this.currentNum++;
    this.out++;
    comment = "아웃!";
  } else if (randomNum < (1 - hitAvrg) / 2 - 0.05) {
    this.strike++;
  } else if (randomNum < ((1 - hitAvrg) / 2 - 0.05) * 2) {
    this.ball++;
  } else {
    this.currentNum++;
    this.hit++;
    comment = "안타!";
  }
  console.log(comment);
};

match.isOutOrHit = function() {
  let comment = "";
  if (this.strike === 3) {
    comment = "삼진 아웃!";
    this.strike = 0;
    this.out++;
  } else {
    comment = "스트라이크!";
  }

  if (this.ball === 4) {
    comment = "안타!";
    this.ball = 0;
    this.hit++;
  } else {
    comment = "볼!";
  }
};

function playRound() {
  match.resetStats();
  const currentTeam = match.offendTeam;
  const currentNum = match.currentNum;
  const currentPlayer = currentTeam.batterPlayers[currentNum];
  const hitAverage = currentPlayer.average;

  match.judgeStats(hitAverage);
  match.isOutOrHit();

  console.log(currentPlayer);
}

function main() {
  const saveBtn = document.querySelector("#jsTeamSave");
  saveBtn.addEventListener("click", saveData);

  const playBtn = document.querySelector("#jsPlayBtn");
  playBtn.addEventListener("click", playRound);
}

main();
