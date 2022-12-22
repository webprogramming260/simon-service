# simon-service

This deliverable demonstrates creating a web service that provides service endpoints and uses some third party endpoints. We use this to display inspirational quotes on the about page, and provide endpoints for getting and updating the scores.

We will use Node.js and Express to create our HTTP service.

You can view this application running here: [Example Simon Service](https://simon-service.cs260.click)

## Third party endpoints

The about.js file contains code for making calls to third party endpoints using fetch. We make one call to `picsum.photos` to get a random picture and another `quotable.io` to get a random quote. Once the endpoint asynchronously return, the DOM is updated with the requested data. Here is an example of the quote endpoint call.

```js
function displayQuote(data) {
  fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#quote');

      const quoteEl = document.createElement('p');
      quoteEl.classList.add('quote');
      const authorEl = document.createElement('p');
      authorEl.classList.add('author');

      quoteEl.textContent = data.content;
      authorEl.textContent = data.author;

      containerEl.appendChild(quoteEl);
      containerEl.appendChild(authorEl);
    });
}
```

## Service endpoint definitions

Here is our design for the two endpoints that Simon uses.

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

## Steps to convert Simon to a service

Converting Simon to a service involved the following steps.

1. Within the project directory run `npm init`. This configures the directory to work with **node.js**.
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

1. Modify the Simon application code to make service endpoint requests to our newly created HTTP service code.

   ```Javascript
   async function loadScores() {
     const response = await fetch("/simon-service/api/scores")
     const scores = await response.json()

     // Modify the DOM to display the scores
   ```

## Study this code

Get familiar with what the example code teaches.

- Clone the repository to your development environment.
  ```sh
  git clone https://github.com/webprogramming260/simon-service.git
  ```
- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it from a VS Code debug session.
- Make modifications to the code as desired. Experiment and see what happens.

## Make your own version

- Using VS Code, open the `simon` directory for the repository you used for the last Simon assignment.
- Modify the project to turn it into a web service. Refer to the example class project repository for guidance. Remember that you do not need to create an original work. Just focus on learning the concepts that the example project provides. However, you will learn more if you type everything out, and not just copy and paste the code.
- Set the footer link to point to your code repository. (e.g. https://github.com/yourname/simon)
- Periodically commit and push your code to your repository as you hit different milestones. (4 commits are required for full credit.)
- Periodically deploy to your production environment using a copy of the `deployService.sh` script found in the [example class project](https://github.com/webprogramming260/simon-javascript/blob/main/deployService.sh). Take some time to understand how it works.

  ```sh
  ./deployService.sh -k <yourpemkey> -h <yourdomain> -s simon -p 3000
  ```

  For example,

  ```sh
  ./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s simon -p 3000
  ```

  ⚠ **NOTE** - The deployment script for this project is different than pervious deployment scripts since needs a port to assign the service to. Each of the following projects will require a different port. When you use this script to deploy your start up project make sure you use a different port so that it does not conflict with the port used for the Simon project. Port 4000 is suggested.

- Update your `start up` repository README.md to record and reflect on what you learned.
- When you have completed your version. Do a final push of your code and deploy to your production environment using the `deployService.sh` script.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
- Submit the URL to your production environment for grading using the Canvas assignment page.

## Grading Rubric

- 20% - Project hosted from your production environment
- 30% - Working service endpoints
- 30% - Application using service endpoints
- 10% - At least four Git commits for the project (Initial, milestone, ..., milestone, final)
- 10% - Notes in your repository README.md about what you have learned
