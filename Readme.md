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

```
$ rm -rf *
$ npm install -g yo grunt grunt-cli generator-angular-fullstack
$ yo angular-fullstack
$ bower install && npm install
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
To start the application just execute the below command then in the toolbar select `Preview` -> `Preview Running Application`

It may take a few browser refreshes to get going.

```
$ grunt serve
```

----

# Create a repository
You need to be using a repository, [http://github.com](http://github.com) is a good choice for this.

To turn your application into a repository run the commands

```
$ git init
$ git add .
$ git commit -am 'initial commit'
```

----

# Publish to Heroku

If you do not already have an account, create an account at [http://heroku.com](http://heroku.com)

Before publishing it's best to close down mongo and grunt so help save memory usage while deploying. So use `control-c` in both terminals to shut them down.


```
$ npm install grunt-contrib-imagemin --save-dev
$ npm install --save-dev
$ heroku login
$ yo angular-fullstack:heroku
$ cd dist
$ heroku config:set NODE_ENV=production
```

Answer the questions it will ask you like the following, replacing the `[name]` with your project name, which will be part of the URL.

```
? Name to deploy as (Leave blank for a random name): [name]
? On which region do you want to deploy ? US
```

To push updates you can run:

```
$ grunt --force
$ grunt buildcontrol:heroku
```


Now that you are already setup anytime you want to push changes just run `git push heroku master`

## Install Mongo Addon
Login to [http://heroku.com](http://heroku.com) and click on the `My Apps`

Once in that page, find the new app you just created and click on `Get more add ons...`

Inside the add ons page select `MongoLab` and in the dropdown select your new app then click on `Add Sandbox for Free`

When you have finished adding the add on, click on `Apps` on the top of the page and then click the `MongoLab` add on to go into the admin ui.

Inside the add on click on `Users` then select `Add database user`

Fill in the details and click on `Create`

Save the username, password, and the mongo connection under `To connect using a driver via the standard URI` it should look like a `mongodb://` url.

Back inside your terminal in Cloud9 execute the command and replace the details in brackets with the information you saved in the previous step.

```
$ cd dist
$ heroku config:set PROD_MONGODB=mongodb://[username]:[password]@[connection string]
```

----

# Final
Do one last push to get everything up to date.

```
$ grunt --force
$ grunt buildcontrol:heroku
```

Your app should now be viewable at http://[your app name].herokuapp.com