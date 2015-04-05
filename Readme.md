# Application Details
### Basejump Example Page
[http://voteplex.herokuapp.com/](http://voteplex.herokuapp.com/)

### User Stories
* As an authenticated user, I should be able to keep my polls and come back later to access them.
* As an authenticated user, I should be able to share my polls with my friends.
* As an authenticated user, I should be able to see the aggregate results of my polls.
* As an authenticated user, I should be able to delete polls that I decide I don't want anymore.
* As an authenticated user, I should be able to create a poll with any number of possible items.
* As an unauthenticated user, I should not be able to vote.

### Bonus
* As an unauthenticated user, I should be able to see everyone's polls.
* As an unauthenticated or authenticated user, I should be able to see the in chart form (Could be implemented using Chart.js or Google Charts)
* As an authenticated user, if I don't like the options on a poll I can create a new option


----

# Getting setup in Cloud9
[http://c9.io](http://c9.io) combines a powerful online code editor with a full Ubuntu workspace in the cloud

# Installation
Let's get our environment ready for a new angular-fullstack application provided by yeoman.

### First Steps
* Open up [http://c9.io](http://c9.io) and sign in to your account.
* Click on `Create New Workspace` at the top right of the c9.io page.
* Click on the `Create a new workspace` in the dropdown after you select the button.
* Name your workspace to match your project name that you are working on.
* Choose Node.js in the selection area below the name field
* Click the `Create` button
* Wait for the workspace to finish processing and select it on the left sidebar, below the `Create New Workspace` button
* Click the `Start Editing` button.

### Inside the Cloud9 Integrated Development Environment (IDE)

In the lower right hand corner you should see a terminal window. In this window use the following commands. (Do not include the $ sign).

```
$ rm -rf *
$ npm install -g yo grunt grunt-cli generator-angular-fullstack
$ yo angular-fullstack
```

Answer the questions as shown below:

```
# Client

? What would you like to write scripts with? JavaScript
? What would you like to write markup with? HTML
? What would you like to write stylesheets with? CSS
? What Angular router would you like to use? ngRoute
? Would you like to include Bootstrap? Yes
? Would you like to include UI Bootstrap? Yes

# Server

? Would you like to use mongoDB with Mongoose for data modeling? Yes
? Would you scaffold out an authentication boilerplate? Yes
? Would you like to include additional oAuth strategies? Twitter
? Would you like to use socket.io? No

[?] May bower anonymously report usage statistics to improve the tool over time? (Y/n)  N
```

### Note
You may get an error similar to ```ERR! EEXIST, open ‘/home/ubuntu/.npm```. This is caused when Cloud9 runs out of memory and kills an install.

If you get this, simply rerun ```yo angular-fullstack```. You will then be asked a few questions regarding the re-install. Answer them as follows:

```
? Existing .yo-rc configuration found, would you like to use it? (Y/n) Y
? Overwrite client/favicon.ico? (Ynaxdh) Y
```

### Finish Installation
To finish the installation run the commands:

```
$ bower install && npm install
```

----

# Get Mongodb running
In your terminal execute the commands

```
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
$ ./mongod
```

You will want to open up a new terminal to work from by clicking on the `+` icon and select `New Terminal`

----

# Start the application

In the terminal window run the command:

```
$ grunt serve
```

Once you see the message `xdg-open: no method available for opening 'http://localhost:8080'` appear then you can open the internal Cloud9 browser. To launch the browser select `Preview` in the toolbar then select the dropdown option `Preview Running Application`.

----

# Create a repository
You need to be using a repository, [http://github.com](http://github.com) is a good choice for this. 

To turn your application into a repository run the commands

```
$ git init
$ git add .
$ git commit -am 'initial commit'
```

To create a new repository on Github, go to [http://github.com](http://github.com)

* Click on the `+` button next to your username in the upper-right hand side of your screen
* Select `New Repository`
* It will ask you for the Repository Name, type in your new project name here
* Click on the `Create repository` button.
* Under `...or push an existing repository from the command line` click the `Copy to clipboard` button.
* Paste in the commands on your clipboard into the Cloud9 terminal prompt.

This pushes your changes to your repository on Github. Check back on your Github profile to view your repositories to check if the changes were made.

----

# Publish to Heroku

If you do not already have an account, create an account at [http://heroku.com](http://heroku.com)

Before publishing it's best to close down mongo and grunt so help save memory usage while deploying. So use `control-c` in both terminals to shut them down.


```
$ npm install grunt-contrib-imagemin --save-dev
$ npm install --save-dev
$ heroku login
$ yo angular-fullstack:heroku
```

Answer the questions it will ask you like the following, replacing the `[name]` with your project name, which will be part of the URL.

```
? Name to deploy as (Leave blank for a random name): [name]
? On which region do you want to deploy ? US
```

Set the config flag for your Heroku environment to be running in production mode.

```
$ cd ~/workspace/dist
$ heroku config:set NODE_ENV=production
$ heroku addons:add mongolab
```

----

# After Deployment

### Github
To update your Github repository run the commands:

```
$ git add .
$ git commit -am 'Your commit message'
$ git push origin master
```

### Heroku
If you make changes after your deployment, you can run the commands listed to update your website hosted on Heroku.

```
$ grunt --force
$ grunt buildcontrol:heroku
```



Your app should now be viewable at http://[your app name].herokuapp.com