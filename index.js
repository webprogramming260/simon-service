const express = require("express");
const app = express();

// The service name and port. We use these to partition it from other running services when running in the production environment.
const serviceName = "simon-new";
const port = 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Server up the applications static content
app.use(`/${serviceName}`, express.static("application"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/${serviceName}/api`, apiRouter);

// GetScores
apiRouter.get("/scores", (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post("/score", (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

// Redirect back to the home page if the path is unknown
app.use((_req, res) => {
  res.redirect(`/${serviceName}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
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
