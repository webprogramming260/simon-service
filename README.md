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
   app.use('/api', apiRouter);
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
     const response = await fetch("/api/scores")
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
- Update the simon-server repository README.md to record and reflect on what you learned.
- When you have completed your version. Do a final push of your code.
- Create a `deploy.sh` script to deploy your appplication to your production environment.
- Make sure your project is visible from your production enviornment.
- Submit the URL to your project on the production environment (e.g. https://yourhostname/simon-server) for grading using the Canvas assignment page.

## Grading Rubric

- 30% - Project hosted from your production environment
- 30% - Working service endpoints
- 20% - Application using service endpoints
- 10% - At least four Git commits for the project (Initial, milestone, ..., milestone, final)
- 10% - Notes in your GitHub Pages README.md about what you have learned

# AWS Server

1. Get an account
1. Create an EC2 instance (a t3.micro should be fine)
1. Set up the security groups to let in ports 22, 80, and 443
1. Assign an elastic IP Address so you can shutdown your server without loosing the IP address
1. Puchase a domain name using Route53
1. Assign a DNS record to your server using Route53

# Caddy

Caddy is a web server that listens for incoming HTTP requests. Caddy then either serves up the requested static files or routes the request to another web server. This ability to route requests is called a `reverse proxy` and allows us to expose multiple web services (i.e. your project services) as a single external web service (i.e. Caddy).

## Install

In order to install Caddy,

1. Use ssh to get a console window on your server
1. Install Caddy using teh following commands.

   ```
   sudo apt update -y && apt upgrade -y

   sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https

   sudo curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg

   sudo curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list

   sudo apt update

   sudo apt install caddy
   ```

[Tutorial on installation](https://www.hostnextra.com/kb/how-to-install-caddy-on-ubuntu-20-04/)

## Important Caddy file locations

In your ssh console window to your server view the contents of the following locaitons so you can be familiar with how Caddy installed.

- **Caddy HTML files**: /usr/share/caddy
- **Caddy program**: /usr/bin/caddy
- **Caddy website configuration file**: /etc/caddy/`Caddyfile`

## Make it easy to know where your files are

We want to make it easy to get to the files we need to configure Caddy and so we are going to create some linux symbolic links in our user directory so that we can easily find them.

In your ssh console window to your server make sure you are in your home directory (`cd ~`) and then create a link to the `Caddyfile`.

```
ln -s /etc/caddy/Caddyfile Caddyfile
```

Give your user rights to the directory that Caddy uses to host HTML files and then create a link in your user directory for easy access.

```
sudo chown ubuntu /usr/share/caddy /usr/share/caddy/index.html

ln -s /usr/share/caddy public_html
```

## Modify the Caddyfile

The `Caddyfile` contains all of the information for controlling how Caddy hosts information.

We want to change the hostname in the `Caddyfile` so that Caddy will generate a certificate and handle HTTPS requests. You must have a DNS record pointing to your server before this change is made otherwise Caddy cannot verify that you own the server.

```
sudo vi ~/Caddyfile
```

Replace `:80` with your domain name.

```
:80 {
        root * /usr/share/caddy

        file_server
}
```

After saving the Caddy file restart Caddy

```
sudo service caddy restart
```
