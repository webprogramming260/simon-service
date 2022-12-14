# simon-service

This demonstrates creating an HTTP service that provides service endpoints. We use this to provide endpoints for getting and updating the scores.

We will use Node.js and Express to create our HTTP service. This involves the following steps.

1. Create a project directory by cloning a new GitHub repository.
1. Within the directory run `npm init`. This configures the directory to work with **node.js**.
1. Modify or create `.gitignore` to ignore `node_modules`.
1. Install the Express package by running `npm install express`. This will supply the Express HTTP server module.
1. Create a file named `index.js` in the root of the project. This is the entry point that **node.js** will call.
1. Add the basic Express JavaScript code needed to host the application static content and the desired endpoints.

   ```Javascript
    const express = require("express");
    const app = express();

    // The service name and port. We use these to partition it from other running services when running in the production environment.
    const serviceName = "simon-server";
    const port = 3000;

    // JSON body parsing using built-in middleware
    app.use(express.json());

    // Server up the application's static content
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

    // Return the application's default page if the path is unknown
    app.use((_req, res) => {
      res.sendFile('index.html', { root: 'application' });
    });

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
   ```

1. Modify the simon-javascript application code to make service endpoint requests to our newly created HTTP service code.

   ```Javascript
   async function loadScores() {
     const response = await fetch("/simon-service/api/scores")
     const scores = await response.json()

     // Modify the DOM to display the scores
   ```

## Service endpoint definitions

**GetScores** - Get the latest high scores.

```sh
curl -X GET /api/scores

#Response
{ "scores":[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]}
```

**SubmitScore** - Submit a score for consideration in the list of high scores.

```sh
curl -X POST /api/score -d '{"name":"Harvey", "score":"337", "date":"2022/11/20"}'

#Response
{ "scores":[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]}
```

You can view this application running here: [Example Simon Service](https://simon-service.cs260.click)

## Study this code

First, get familiar with what this code teaches.

- Clone this repository to your development machine.
  ```sh
  git clone https://github.com/webprogramming260/simon-service.git
  ```
- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it from a VS Code debug session.
- Make modifications to the code as desired. Experiment and see what happens.

## Make your own version

- Create a new GitHub repository named `simon-service`.
- Clone the repository to your development environment.
- In the `simon-service` repository create your own version of the project. Refer to the example class project repository if you get stuck.
- Periodically commit and push your code to your repository as you hit different milestones. (4 commits are required for full credit.)
- Change the footer link to point to your code repository. (e.g. https://github.com/yourname/simon-service)
- Periodically deploy to your production environment using a copy of the `deploy.sh` script found in the [example class project](https://github.com/webprogramming260/simon-service/blob/main/deploy.sh). Take some time to understand how it works.

  ```sh
  ./deploy.sh -k <yourpemkey> -h <yourdomain> -s simon-service -p 3001
  ```

  ⚠ **NOTE** - The deployment script for this project is different than pervious deployment scripts since needs a port to assign the service to. Each of the following projects will require a different port.

- Update the simon-service repository README.md to record and reflect on what you are learning.
- When you have completed your version. Do a final push of your code and deploy your final version to your production environment.
- Make sure your project is visible from your production environment (e.g. https://simon-service.yourhostname).
- Submit the URL to your project on the production environment for grading using the Canvas assignment page.

## Grading Rubric

- 20% - Project hosted from your production environment
- 30% - Working service endpoints
- 30% - Application using service endpoints
- 10% - At least four Git commits for the project (Initial, milestone, ..., milestone, final)
- 10% - Notes in your repository README.md about what you have learned
