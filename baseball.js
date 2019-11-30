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

function Match(team1, team2) {
  this.team1 = team1;
  this.team2 = team2;
}

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

function setMatch() {
  const team1 = setTeam1();
  console.log(team1);

  const team2 = setTeam2();
  console.log(team2);

  const match = new Match(team1, team2);

  console.log(match);

  return match;
}

function main() {
  const saveBtn = document.querySelector("#jsTeamSave");
  const match = saveBtn.addEventListener("click", setMatch);

  console.log(match);
}

main();
