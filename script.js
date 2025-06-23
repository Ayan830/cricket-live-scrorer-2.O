let runsA = 0, wicketsA = 0, foursA = 0, sixesA = 0;
let runsB = 0, wicketsB = 0, foursB = 0, sixesB = 0;
let balls = 0;

// Track selected batsmen
let strikerA = null, nonStrikerA = null;
let strikerB = null, nonStrikerB = null;

function addCustomRun(team, run) {
  if (team === 'A') {
    runsA += run;
    document.getElementById('runsA').textContent = runsA;
  } else {
    runsB += run;
    document.getElementById('runsB').textContent = runsB;
  }
  saveData();
}

function addFour(team) {
  if (team === 'A') {
    foursA++;
    runsA += 4;
    document.getElementById('foursA').textContent = foursA;
    document.getElementById('runsA').textContent = runsA;
  } else {
    foursB++;
    runsB += 4;
    document.getElementById('foursB').textContent = foursB;
    document.getElementById('runsB').textContent = runsB;
  }
  saveData();
}

function addSix(team) {
  if (team === 'A') {
    sixesA++;
    runsA += 6;
    document.getElementById('sixesA').textContent = sixesA;
    document.getElementById('runsA').textContent = runsA;
  } else {
    sixesB++;
    runsB += 6;
    document.getElementById('sixesB').textContent = sixesB;
    document.getElementById('runsB').textContent = runsB;
  }
  saveData();
}

function addWicket(team) {
  if (team === 'A' && wicketsA < 10) {
    wicketsA++;
    document.getElementById('wicketsA').textContent = wicketsA;
  } else if (team === 'B' && wicketsB < 10) {
    wicketsB++;
    document.getElementById('wicketsB').textContent = wicketsB;
  }
  saveData();
}

function addBall() {
  balls++;
  const overs = Math.floor(balls / 6) + "." + (balls % 6);
  document.getElementById('overs').textContent = overs;
  saveData();
}

function resetMatch() {
  if (!confirm("Are you sure you want to reset the match?")) return;

  runsA = runsB = wicketsA = wicketsB = balls = 0;
  foursA = foursB = sixesA = sixesB = 0;
  strikerA = nonStrikerA = strikerB = nonStrikerB = null;

  document.getElementById('runsA').textContent = '0';
  document.getElementById('wicketsA').textContent = '0';
  document.getElementById('foursA').textContent = '0';
  document.getElementById('sixesA').textContent = '0';

  document.getElementById('runsB').textContent = '0';
  document.getElementById('wicketsB').textContent = '0';
  document.getElementById('foursB').textContent = '0';
  document.getElementById('sixesB').textContent = '0';

  document.getElementById('overs').textContent = '0.0';

  document.getElementById('teamNameA').textContent = "Team A";
  document.getElementById('teamNameB').textContent = "Team B";
  document.getElementById('playersA').innerHTML = "<li>Player A1</li><li>Player A2</li>";
  document.getElementById('playersB').innerHTML = "<li>Player B1</li><li>Player B2</li>";

  document.getElementById('strikerNameA').textContent = '-';
  document.getElementById('nonStrikerNameA').textContent = '-';
  document.getElementById('strikerNameB').textContent = '-';
  document.getElementById('nonStrikerNameB').textContent = '-';

  localStorage.removeItem("gullyMatch");
}

function saveData() {
  const data = {
    runsA, wicketsA, foursA, sixesA,
    runsB, wicketsB, foursB, sixesB,
    balls,
    teamA: document.getElementById('teamNameA').textContent,
    teamB: document.getElementById('teamNameB').textContent,
    playersA: document.getElementById('playersA').innerHTML,
    playersB: document.getElementById('playersB').innerHTML,
    strikerA, nonStrikerA,
    strikerB, nonStrikerB
  };
  localStorage.setItem("gullyMatch", JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem("gullyMatch");
  if (saved) {
    const data = JSON.parse(saved);
    runsA = data.runsA || 0;
    wicketsA = data.wicketsA || 0;
    foursA = data.foursA || 0;
    sixesA = data.sixesA || 0;

    runsB = data.runsB || 0;
    wicketsB = data.wicketsB || 0;
    foursB = data.foursB || 0;
    sixesB = data.sixesB || 0;

    balls = data.balls || 0;

    document.getElementById('runsA').textContent = runsA;
    document.getElementById('wicketsA').textContent = wicketsA;
    document.getElementById('foursA').textContent = foursA;
    document.getElementById('sixesA').textContent = sixesA;

    document.getElementById('runsB').textContent = runsB;
    document.getElementById('wicketsB').textContent = wicketsB;
    document.getElementById('foursB').textContent = foursB;
    document.getElementById('sixesB').textContent = sixesB;

    document.getElementById('overs').textContent = Math.floor(balls / 6) + "." + (balls % 6);

    document.getElementById('teamNameA').textContent = data.teamA || "Team A";
    document.getElementById('teamNameB').textContent = data.teamB || "Team B";
    document.getElementById('playersA').innerHTML = data.playersA || "";
    document.getElementById('playersB').innerHTML = data.playersB || "";

    // Restore striker/non-striker
    strikerA = data.strikerA;
    nonStrikerA = data.nonStrikerA;
    strikerB = data.strikerB;
    nonStrikerB = data.nonStrikerB;

    updateStrikerDisplay('A');
    updateStrikerDisplay('B');
  }
}

function setStriker(team) {
  const index = document.getElementById('striker' + team).value;
  if (team === 'A') strikerA = index;
  else strikerB = index;
  updateStrikerDisplay(team);
  saveData();
}

function setNonStriker(team) {
  const index = document.getElementById('nonStriker' + team).value;
  if (team === 'A') nonStrikerA = index;
  else nonStrikerB = index;
  updateStrikerDisplay(team);
  saveData();
}

function updateStrikerDisplay(team) {
  const players = document.querySelectorAll('#players' + team + ' li');
  let strikerIndex = team === 'A' ? strikerA : strikerB;
  let nonStrikerIndex = team === 'A' ? nonStrikerA : nonStrikerB;

  strikerIndex = strikerIndex !== null ? parseInt(strikerIndex) : null;
  nonStrikerIndex = nonStrikerIndex !== null ? parseInt(nonStrikerIndex) : null;

  const strikerName = strikerIndex !== null && players[strikerIndex] ? players[strikerIndex].textContent : '-';
  const nonStrikerName = nonStrikerIndex !== null && players[nonStrikerIndex] ? players[nonStrikerIndex].textContent : '-';

  document.getElementById('strikerName' + team).textContent = strikerName + (strikerName !== '-' ? ' ⭐' : '');
  document.getElementById('nonStrikerName' + team).textContent = nonStrikerName + (nonStrikerName !== '-' ? ' ⭐' : '');
}

window.onload = loadData;
