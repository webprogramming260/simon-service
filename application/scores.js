function loadScores() {
  let scores = [{ name: "Lee", score: 377, date: "1970/02/19" }];
  const scoresText = localStorage.getItem("scores");
  if (scoresText) {
    scores = JSON.parse(scoresText);
  }

  const tableBodyEl = document.querySelector("#scores");

  for (const [i, score] of scores.entries()) {
    const positionTdEl = document.createElement("td");
    const nameTdEl = document.createElement("td");
    const scoreTdEl = document.createElement("td");
    const dateTdEl = document.createElement("td");

    positionTdEl.textContent = i + 1;
    nameTdEl.textContent = score.name;
    scoreTdEl.textContent = score.score;
    dateTdEl.textContent = score.date;

    const rowEl = document.createElement("tr");
    rowEl.appendChild(positionTdEl);
    rowEl.appendChild(nameTdEl);
    rowEl.appendChild(scoreTdEl);
    rowEl.appendChild(dateTdEl);

    tableBodyEl.appendChild(rowEl);
  }
}

loadScores();
