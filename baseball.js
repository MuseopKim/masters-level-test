const match = {};

function Team(name, pitcher) {
  this.name = name;
  this.batterPlayers = [];
  this.pitcher = pitcher;
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
  const teamPitcher = document.querySelector("#jsTeam1PitcherName").value;

  const team1 = new Team(teamName, teamPitcher);

  team1.setBatter(1);

  return team1;
}

function setTeam2() {
  const teamName = document.querySelector("#jsTeam2Name").value;
  const teamPitcher = document.querySelector("#jsTeam2PitcherName").value;

  const team2 = new Team(teamName, teamPitcher);
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
  this.round = 1;
  this.isSecondHalf = false;
  this.currentNum = 0;
  this.offendTeam = team1;

  this.strike = 0;
  this.ball = 0;
  this.out = 0;
  this.hit = 0;

  team1.score = 0;
  team2.score = 0;

  // 경기 코멘트 초기화
  const comment = document.querySelector("#jsComment");
  comment.innerHTML =
    team1.name + " VS " + team2.name + "의 시합을 시작합니다.";
};

function saveData() {
  const team1 = setTeam1();
  console.log(team1);

  const team2 = setTeam2();
  console.log(team2);

  match.setMatch(team1, team2);

  const inputBox = document.querySelector("#jsInputBox");
  const infoBox = document.querySelector("#jsInfoBox");

  showInfo();

  inputBox.style.display = "none";
  infoBox.style.display = "block";
}

function decideJudgement(hitAvrg) {
  const randomNum = Math.random();
  let judgement = "";

  if (randomNum < 0.1) {
    judgement = "out";
  } else if (randomNum < (1 - hitAvrg) / 2 - 0.05) {
    judgement = "strike";
  } else if (randomNum < ((1 - hitAvrg) / 2 - 0.05) * 2) {
    judgement = "ball";
  } else {
    judgement = "hit";
  }

  return judgement;
}

match.changeOffend = function() {
  if (this.isSecondHalf) {
    this.round++;
    this.offendTeam = this.team1;
  } else {
    this.offendTeam = this.team2;
  }
  this.isSecondHalf = !this.isSecondHalf;

  this.currentNum = 0;
  this.resetStats();
};

function setFinish() {
  const playBox = document.querySelector("#jsPlayBox");
  playBox.style.display = "none";

  const resultBox = document.querySelector("#jsResultBox");
  resultBox.style.display = "block";
}

function isFinish() {
  if (match.round === 5 && match.isSecondHalf) {
    if (match.team1Score < match.team2Score) {
      setFinish();
      console.log("Game Over");
    } else {
      match.resetStats();
      match.changeOffend();
    }
  } else if (match.round === 6 && match.isSecondHalf) {
    setFinish();
  } else {
    match.resetStats();
    match.changeOffend();
  }
}

match.updateStats = function(judgement) {
  const commentBox = document.querySelector("#jsJudgement");
  const offendTeam = this.offendTeam;

  let comment = "";

  if (judgement === "strike") {
    this.strike++;
    comment = "스트라이크!";
  } else if (judgement === "ball") {
    this.ball++;
    comment = "볼!";
  } else if (judgement === "out") {
    this.out++;
    this.currentNum === 8 ? (this.currentNum = 0) : this.currentNum++;
    comment = "아웃!";
  } else if (judgement === "hit") {
    this.hit++;
    this.currentNum === 8 ? (this.currentNum = 0) : this.currentNum++;
    comment = "안타!";
  }
  if (this.out === 3) {
    isFinish();
  } else if (this.strike === 3) {
    this.strike = 0;
    this.out++;
    this.currentNum === 8 ? (this.currentNum = 0) : this.currentNum++;
    comment = "삼진 아웃!";
    if (this.out === 3) {
      isFinish();
    }
  } else if (this.ball === 4) {
    this.ball = 0;
    this.hit++;
    this.currentNum === 8 ? (this.currentNum = 0) : this.currentNum++;
    comment = "4볼 안타!";
  }
  if (this.hit >= 4) {
    offendTeam.score++;
  }
  commentBox.innerHTML = comment;
};

function judgeStats(hitAvrg) {
  const judgement = decideJudgement(hitAvrg);
  match.updateStats(judgement);
}

// 1. 코멘트
// 2. 현재 선수
// 3. 판정

function printStats(num, player) {
  const comment = document.querySelector("#jsComment");
  const playerInfo = document.querySelector("#jsPlayerInfo");
  const countStrike = document.querySelector("#jsCountStrike");
  const countBall = document.querySelector("#jsCountBall");
  const countHit = document.querySelector("#jsCountHit");
  const countOut = document.querySelector("#jsCountOut");
  let firstOrSecondHalf = match.isSecondHalf ? "회말" : "회초";

  comment.innerHTML =
    match.round + firstOrSecondHalf + " " + match.offendTeam.name + " 공격";

  playerInfo.innerHTML = num + 1 + "번 " + player.name;

  countStrike.innerHTML = match.strike;
  countBall.innerHTML = match.ball;
  countHit.innerHTML = match.hit;
  countOut.innerHTML = match.out;
}

function showResult() {
  const team1Name = document.querySelector("#jsTableTeam1Name");
  const team2Name = document.querySelector("#jsTableTeam2Name");
  const team1Score = document.querySelector("#jsTableTeam1Score");
  const team2Score = document.querySelector("#jsTableTeam2Score");

  team1Name.innerHTML = match.team1.name;
  team2Name.innerHTML = match.team2.name;

  team1Score.innerHTML = match.team1.score;
  team2Score.innerHTML = match.team2.score;
}

function playRound() {
  const currentTeam = match.offendTeam;
  const currentNum = match.currentNum;
  const currentPlayer = currentTeam.batterPlayers[currentNum];
  const hitAverage = currentPlayer.average;

  judgeStats(hitAverage);
  printStats(currentNum, currentPlayer);
  showResult();

  console.log(currentPlayer);
  console.log(
    `Strike: ${match.strike}`,
    `Ball: ${match.ball}`,
    `Hit: ${match.hit}`,
    `Out: ${match.out}`
  );
  console.log(`Team1 : ${match.team1.score}`, `Team2 : ${match.team2.score}`);
  console.log(match.round);
}

function showInfo() {
  // 팀 1 정보 입력
  const team1 = match.team1;
  const team1Name = document.querySelector("#jsInfoTeam1Name");
  const team1PlayerName = document.querySelectorAll(".jsInfoTeam1PlayerName");
  const team1PlayerAvrg = document.querySelectorAll(".jsInfoTeam1PlayerAvrg");
  const team1PitcherName = document.querySelector("#jsInfoTeam1PitcherName");

  team1Name.innerHTML = team1.name;

  for (let i = 0; i < team1PlayerName.length; i++) {
    const player = team1.batterPlayers[i];
    team1PlayerName[i].innerHTML = player.name;
    team1PlayerAvrg[i].innerHTML = player.average;
  }

  team1PitcherName.innerHTML = team1.pitcher;

  // 팀 2 정보 입력
  const team2 = match.team2;
  const team2Name = document.querySelector("#jsInfoTeam2Name");
  const team2PlayerName = document.querySelectorAll(".jsInfoTeam2PlayerName");
  const team2PlayerAvrg = document.querySelectorAll(".jsInfoTeam2PlayerAvrg");
  const team2PitcherName = document.querySelector("#jsInfoTeam2PitcherName");

  team2Name.innerHTML = team2.name;

  for (let i = 0; i < team2PlayerName.length; i++) {
    const player = team2.batterPlayers[i];
    team2PlayerName[i].innerHTML = player.name;
    team2PlayerAvrg[i].innerHTML = player.average;
  }

  team2PitcherName.innerHTML = team2.pitcher;
}

function showAndHideBox(e) {
  const infoBox = document.querySelector("#jsInfoBox");
  const playBox = document.querySelector("#jsPlayBox");
  const inputBox = document.querySelector("#jsInputBox");

  if (e.target.id === "jsShowInputBtn") {
    infoBox.style.display = "none";
    playBox.style.display = "none";
    inputBox.style.display = "block";
  } else if (e.target.id === "jsShowInfoBtn") {
    if (match.team1) {
      playBox.style.display = "none";
      inputBox.style.display = "none";
      infoBox.style.display = "block";
      showInfo();
    } else {
      alert("팀 정보를 먼저 입력 해주세요.");
    }
  } else if (e.target.id === "jsShowPlayBtn") {
    inputBox.style.display = "none";
    infoBox.style.display = "none";
    playBox.style.display = "block";
  }
}

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

  const resetBtn = document.querySelector("#jsResetBtn");
  resetBtn.addEventListener("click", function() {
    location.reload();
  });
}

main();
