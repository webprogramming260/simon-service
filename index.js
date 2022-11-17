const express = require("express");
const app = express();

// JSON body parsing using built-in middleware
app.use(express.json());

// Server up the applications static content
app.use(express.static("application"));

// Router for service endpoints
var apiRouter = express.Router();
app.use("/api", apiRouter);

// GetScores
apiRouter.get("/scores", (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post("/score", (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}
