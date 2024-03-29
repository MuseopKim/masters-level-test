const match = {};

// 팀 생성자 함수
function Team(name, pitcher) {
  this.name = name;
  this.batterPlayers = [];
  this.pitcher = pitcher;
}

// 팀에 선수를 등록
Team.prototype.addPlayer = function(name, avrg) {
  const average = Number(avrg).toFixed(3);

  this.batterPlayers.push({
    num: this.batterPlayers.length + 1,
    name: name,
    average: average
  });
};

// 사용자 입력 값을 받아와 적합한지 검사한 뒤 객체에 추가
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
    const average = Number(batterAvrg);

    if (batterName.length === 0) {
      batterNames[i].focus();
      alert("이름을 입력 해주세요.");
      break;
    }

    if (batterAvrg.length === 5 && average > 0.1 && average < 0.5) {
      this.addPlayer(batterName, average);
    } else {
      alert("0.1에서 0.5 사이의 수를 소숫점 이하 세자리까지 입력 하세요.");
      batterAvrgs[i].focus();
      break;
    }
  }
};

// 사용자가 입력한 팀 이름, 투수 이름을 받아와 팀 1을 생성
function setTeam1() {
  const inputTeamName = document.querySelector("#jsTeam1Name");
  const inputTeamPitcher = document.querySelector("#jsTeam1PitcherName");
  const teamName = inputTeamName.value;
  const teamPitcher = inputTeamPitcher.value;

  if (!teamName) {
    alert("팀명을 입력 해주세요.");
    inputTeamName.focus();
  } else if (!teamPitcher) {
    alert("투수명을 입력 해주세요.");
    teamPitcher.focus();
  } else {
    const team1 = new Team(teamName, teamPitcher);
    team1.setBatter(1);
    return team1;
  }
}

// 사용자가 입력한 팀 이름, 투수 이름을 받아와 팀 2를 생성
function setTeam2() {
  const inputTeamName = document.querySelector("#jsTeam2Name");
  const inputTeamPitcher = document.querySelector("#jsTeam2PitcherName");
  const teamName = inputTeamName.value;
  const teamPitcher = inputTeamPitcher.value;

  if (!teamName) {
    alert("팀명을 입력 해주세요.");
    inputTeamName.focus();
  } else if (!teamPitcher) {
    alert("투수명을 입력 해주세요.");
    teamPitcher.focus();
  } else {
    const team2 = new Team(teamName, teamPitcher);
    team2.setBatter(2);
    return team2;
  }
}

// 현재 회차의 스탯을 초기화
match.resetStats = function() {
  this.strike = 0;
  this.ball = 0;
  this.out = 0;
  this.hit = 0;
  this.score = 0;
};

// 입력된 팀1, 팀2 정보를 받아와 경기를 생성
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
  this.score = 0;

  team1.score = 0;
  team2.score = 0;

  team1.threeStrike = 0;
  team1.hit = 0;
  team1.countPlay = 0;

  team2.threeStrike = 0;
  team2.hit = 0;
  team2.countPlay = 0;

  // 경기 코멘트 초기화
  const comment = document.querySelector("#jsComment");
  comment.innerHTML =
    team1.name + " VS " + team2.name + "의 시합을 시작합니다.";
};

// 저장된 정보를 바탕으로 팀과 선수 정보를 출력
function showInfo() {
  // 팀 1 정보 출력
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

  // 팀 2 정보 출력
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

// 각 팀의 라인업을 경기 화면에 출력
function showLineUp() {
  const team1PlayerName = document.querySelectorAll(".jsPlayTeam1PlayerName");
  const team2PlayerName = document.querySelectorAll(".jsPlayTeam2PlayerName");
  const team1PitcherName = document.querySelector("#jsPlayTeam1PitcherName");
  const team2PitcherName = document.querySelector("#jsPlayTeam2PitcherName");
  const team1 = match.team1;
  const team2 = match.team2;

  for (let i = 0; i < 9; i++) {
    team1PlayerName[i].innerHTML = team1.batterPlayers[i].name;
    team2PlayerName[i].innerHTML = team2.batterPlayers[i].name;
  }

  team1PitcherName.innerHTML = team1.pitcher;
  team2PitcherName.innerHTML = team2.pitcher;
}

// 클릭시 생성한 팀, 경기를 저장
function saveData() {
  const team1 = setTeam1();
  const team2 = setTeam2();

  match.setMatch(team1, team2);

  const inputBox = document.querySelector("#jsInputBox");
  const infoBox = document.querySelector("#jsInfoBox");
  const showInputBtn = document.querySelector("#jsShowInputBtn");
  const scoreTeam1Name = document.querySelector("#jsScoreTeam1Name");
  const scoreTeam2Name = document.querySelector("#jsScoreTeam2Name");

  showInfo();
  showLineUp();

  showInputBtn.innerHTML = "처음으로 돌아가기";
  showInputBtn.removeEventListener("click", showAndHideBox);
  showInputBtn.addEventListener("click", function() {
    location.reload();
  });
  inputBox.style.display = "none";
  infoBox.style.display = "block";
  infoBox.style.width = "800px";

  scoreTeam1Name.innerHTML = team1.name;
  scoreTeam2Name.innerHTML = team2.name;
}

// 버튼 클릭에 따라 화면 변화를 통제
function showAndHideBox(e) {
  const infoBox = document.querySelector("#jsInfoBox");
  const playBox = document.querySelector("#jsPlayBox");
  const inputBox = document.querySelector("#jsInputBox");
  let isFilled;
  if (!match.team1) {
    isFilled = false;
  } else {
    for (let i = 0; i < 9; i++) {
      if (!match.team1.batterPlayers[i] || !match.team2.batterPlayers[i]) {
        isFilled = false;
      } else {
        isFilled = true;
      }
    }
  }
  if (e.target.id === "jsShowInputBtn") {
    infoBox.style.display = "none";
    playBox.style.display = "none";
    inputBox.style.display = "block";
    inputBox.style.width = "800px";
  } else if (e.target.id === "jsShowInfoBtn") {
    if (isFilled) {
      playBox.style.display = "none";
      inputBox.style.display = "none";
      infoBox.style.display = "block";
      infoBox.style.width = "800px";
      showInfo();
    } else {
      alert("팀 정보를 먼저 입력 해주세요.");
    }
  } else if (e.target.id === "jsShowPlayBtn") {
    if (isFilled) {
      inputBox.style.display = "none";
      infoBox.style.display = "none";
      playBox.style.display = "block";
      playBox.style.width = "800px";
    } else {
      alert("팀 정보를 먼저 입력 해주세요.");
    }
  }
}

// 경기 진행중 타율을 매개변수로 받아 판정을 결정
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

// 회말 시에 공수를 전환
match.changeOffend = function() {
  const team1PlayerName = document.querySelectorAll(".jsPlayTeam1PlayerName");
  const team2PlayerName = document.querySelectorAll(".jsPlayTeam2PlayerName");

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

// 경기 종료시 결과화면을 출력
function setFinish() {
  const playBox = document.querySelector("#jsPlayBox");
  playBox.style.display = "none";

  const resultBox = document.querySelector("#jsResultBox");
  resultBox.style.display = "block";

  const menu = document.querySelector("#jsMenuBox");
  menu.style.display = "none";
}

// 3 아웃시 경기를 종료 시킬지 여부를 결정
function isFinish() {
  if (match.round === 6 && !match.isSecondHalf) {
    if (match.team1.score < match.team2.score) {
      setFinish();
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

// 판정을 바탕으로 스탯에 반영
match.updateStats = function(judgement) {
  const commentBox = document.querySelector("#jsJudgement");
  const offendTeam = this.offendTeam;
  let defendTeam;
  if (offendTeam === this.team1) {
    defendTeam = this.team2;
  } else {
    defendTeam = this.team1;
  }

  let comment = "";

  if (judgement === "strike") {
    this.strike++;
    comment = "스트라이크!";
  } else if (judgement === "ball") {
    this.ball++;
    comment = "볼!";
  } else if (judgement === "out") {
    this.strike = 0;
    this.ball = 0;
    this.out++;
    this.currentNum === 8 ? (this.currentNum = 0) : this.currentNum++;
    comment = "아웃!";
  } else if (judgement === "hit") {
    this.strike = 0;
    this.ball = 0;
    this.hit++;
    offendTeam.hit++;
    if (this.hit >= 4) {
      offendTeam.score++;
      this.score++;
      if (this.isSecondHalf) {
        const roundScore = document.querySelectorAll(".jsTeam2RoundScore");
        roundScore[match.round - 1].innerHTML = match.score;
      } else {
        const roundScore = document.querySelectorAll(".jsTeam1RoundScore");
        roundScore[match.round - 1].innerHTML = match.score;
      }
    }
    this.currentNum === 8 ? (this.currentNum = 0) : this.currentNum++;
    comment = "안타!";
  }

  defendTeam.countPlay++;

  if (this.out === 3) {
    isFinish();
  } else if (this.strike === 3) {
    this.strike = 0;
    this.ball = 0;
    offendTeam.threeStrike++;
    this.out++;
    this.currentNum === 8 ? (this.currentNum = 0) : this.currentNum++;
    comment = "삼진 아웃!";
    if (this.out === 3) {
      isFinish();
    }
  }
  if (this.ball === 4) {
    this.strike = 0;
    this.ball = 0;
    this.hit++;
    offendTeam.hit++;
    this.currentNum === 8 ? (this.currentNum = 0) : this.currentNum++;
    comment = "4볼 안타!";
    if (this.hit >= 4) {
      offendTeam.score++;
      this.score++;
      if (this.isSecondHalf) {
        const roundScore = document.querySelectorAll(".jsTeam2RoundScore");
        roundScore[match.round - 1].innerHTML = match.score;
      } else {
        const roundScore = document.querySelectorAll(".jsTeam1RoundScore");
        roundScore[match.round - 1].innerHTML = match.score;
      }
    }
  }
  commentBox.innerHTML = comment;
};

// 판정을 실행
function judgeStats(hitAvrg) {
  const judgement = decideJudgement(hitAvrg);
  match.updateStats(judgement);
}

// 코멘트, 경기 스탯을 실시간으로 노출
function printStats(num, player) {
  const comment = document.querySelector("#jsComment");
  const playerInfo = document.querySelector("#jsPlayerInfo");
  const countStrike = document.querySelector("#jsCountStrike");
  const countBall = document.querySelector("#jsCountBall");
  const countOut = document.querySelector("#jsCountOut");
  const team1CountPlay = document.querySelector("#jsCountTeam1Play");
  const team2CountPlay = document.querySelector("#jsCountTeam2Play");
  const team1ThreeStrike = document.querySelector("#jsCountTeam1ThreeStrike");
  const team2ThreeStrike = document.querySelector("#jsCountTeam2ThreeStrike");
  const team1CountHit = document.querySelector("#jsCountTeam1Hit");
  const team2CountHit = document.querySelector("#jsCountTeam2Hit");
  const team1 = match.team1;
  const team2 = match.team2;

  let firstOrSecondHalf = match.isSecondHalf ? "회말" : "회초";

  comment.innerHTML =
    match.round + firstOrSecondHalf + " " + match.offendTeam.name + " 공격";

  playerInfo.innerHTML = num + 1 + "번 " + player.name;

  countStrike.innerHTML = match.strike;
  countBall.innerHTML = match.ball;
  countOut.innerHTML = match.out;

  team1CountPlay.innerHTML = team1.countPlay;
  team2CountPlay.innerHTML = team2.countPlay;

  team1ThreeStrike.innerHTML = team1.threeStrike;
  team2ThreeStrike.innerHTML = team2.threeStrike;

  team1CountHit.innerHTML = team1.hit;
  team2CountHit.innerHTML = team2.hit;
}

// 최종 경기 결과 출력
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

// 버튼을 클릭하면 투구를 실행
function playRound() {
  const currentTeam = match.offendTeam;
  const currentNum = match.currentNum;
  const currentPlayer = currentTeam.batterPlayers[currentNum];
  const hitAverage = currentPlayer.average;
  const team1Score = document.querySelector("#jsTeam1TotalScore");
  const team2Score = document.querySelector("#jsTeam2TotalScore");

  judgeStats(hitAverage);
  printStats(currentNum, currentPlayer);
  showResult();

  team1Score.innerHTML = match.team1.score;
  team2Score.innerHTML = match.team2.score;
}

function pressEnter(e) {
  let isFilled;
  if (e.key === "Enter") {
    if (!match.team1) {
      isFilled = false;
    } else {
      for (let i = 0; i < 9; i++) {
        if (!match.team1.batterPlayers[i] || !match.team2.batterPlayers[i]) {
          isFilled = false;
        } else {
          isFilled = true;
        }
      }
    }
    if (isFilled) {
      playRound();
    } else {
      this.alert("팀 정보를 먼저 입력 해주세요.");
    }
  }
}

// 사용자가 입력한 라운드만큼 스킵을 진행 : 미구현
function skipRound() {
  const skipValue = document.querySelector("#jsSkipInput").value;
  const skipUntil = Number(skipValue);

  if (skipUntil < match.round) {
    alert("현재 라운드 이상으로 입력 해주세요.");
  } else if (skipUntil > 6) {
    alert("마지막 라운드는 6라운드 입니다. 다시 입력 해주세요.");
  } else {
    const skip = setInterval(function() {
      playRound();

      if (match.round > skipUntil) {
        clearInterval(skip);
      }
    }, 10);
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

  window.addEventListener("keypress", pressEnter);
}

main();
