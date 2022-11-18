# simon-server

This demonstrates creating an HTTP server that provides service endpoints. We use this to provide endpoints for getting and updating the scores.

We will use Node.js and Express to create our HTTP server. This involves the following steps.

1. Create a project directory by cloning a new GitHub repository.
1. Within the directroy run `npm init`. This configures the directory to work with **node.js**.
1. Modify or create `.gitignore` to ignore `node_modules`.
1. Install the Express package by running `npm install express`. This will supply the Express HTTP server module.
1. Create a file named `index.js` in the root of the project. This is the entry point that **node.js** will call.
1. Add the basic Express JavaScript code needed to host the application static content and the desired endpoints.

   ```Javascript
   const express = require('express');
   const app = express();

   // Static content hosting our Simon client application
   app.use(express.static('application'));

   // Router for service endpoints
   var apiRouter = express.Router();
   app.use('/simon-server/api', apiRouter);
   apiRouter.get('/scores', (req, res) => {
     res.send(`high scores`);
   });
   apiRouter.post('/score', (req, res) => {
     res.send(`score submission`);
   });


   // JSON body parsing using built-in middleware
   app.use(express.json());

   app.listen(3000, () => {
     console.log(`Listening on port 3000`);
   });
   ```

1. Modify the simon-javascript application code to make service endpoint requests to our newly created HTTP server code.

   ```Javascript
   async function loadScores() {
     const response = await fetch("/simon-server/api/scores")
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

You can view this application running here: [Example Simon Server](https://demo.cs260.click/simon-server)

## Study this code

First, get familiar with what this code teaches.

- Clone this repository to your development machine.
- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it from a VS Code debug session.
- Make modifications to the code as desired. Experiment and see what happens.

## Make your own version

- Create a new GitHub repository named `simon-server`.
- Clone the repository to your development environment.
- In the `simon-server` repository create your own version of the project. Refer to the example class project repository if you get stuck.
- Periodically commit and push your code to your repository as you hit different milestones. (4 commits are required for full credit.)
- Change the footer link to point to your code repository. (e.g. https://github.com/yourname/simon-server)
- As you make improvements to your server you can deploy the changes by running `deploy.sh`. You can copy `deploy.sh` from the class project repository. Take some time to understand how it works.
  ```
  ./deploy.sh -k <yourpemkey> -h <yourdomain> -s simon-server -p 3000
  ```
- Update the simon-server repository README.md to record and reflect on what you are learning.
- When you have completed your version. Do a final push of your code and deploy your final version to your production environment.
- Make sure your project is visible from your production enviornment.
- Submit the URL to your project on the production environment (e.g. https://yourhostname/simon-server) for grading using the Canvas assignment page.

## Grading Rubric

- 20% - Project hosted from your production environment
- 30% - Working service endpoints
- 30% - Application using service endpoints
- 10% - At least four Git commits for the project (Initial, milestone, ..., milestone, final)
- 10% - Notes in your GitHub Pages README.md about what you have learned
