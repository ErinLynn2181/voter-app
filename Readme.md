# Getting setup in Cloud9
[http://c9.io](http://c9.io) combines a powerful online code editor with a full Ubuntu workspace in the cloud

# Installation
Let's get our environment ready for a new angular-fullstack application provided by yeoman.

```
$ rm -rf *
$ nvm use v0.11.14
$ nvm alias default 0.11.14
$ npm install -g yo grunt-cli generator-angular-fullstack
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

[?] May bower anonymously report usage statistics to improve the tool over time? (Y/n)  Y
```

### Note
You may get an error similar to ```ERR! EEXIST, open ‘/home/ubuntu/.npm```. This is caused when Cloud9 runs out of memory and kills an install.

If you get this, simply rerun ```yo angular-fullstack```. You will then be asked a few questions regarding the re-install. Answer them as follows:

```
? Existing .yo-rc configuration found, would you like to use it? (Y/n) Y
? Overwrite client/favicon.ico? (Ynaxdh) N
```


# Get Mongodb running
In your terminal execute the commands

```
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
$ ./mongod
```

You will want to open up a new terminal to work from by clicking on the `+` icon and select `New Terminal`


# Start the application
To start the application just execute the below command then in the toolbar select `Preview` -> `Preview Running Application`

It may take a few browser refreshes to get going.

```
$ grunt serve
```

# Publish to Heroku

If you do not already have an account, create an account at [http://heroku.com](http://heroku.com)

## Automatic Publish
You can automatically publish to heroku using the angular-fullstack tool.

```
$ heroku login
$ yo angular-fullstack:heroku
```

Answer the questions it will ask you like the following, replacing the `[name]` with your project name, which will be part of the URL.

```
? Name to deploy as (Leave blank for a random name): [name]
? On which region do you want to deploy ? US
```

To push updates you can run:

```
$ grunt
$ grunt buildcontrol:heroku
```

## Manual Publish

Open your .gitignore file and remove the lines with `node_modules` and `client/bower_components`

```
$ git add .
$ git commit -am 'including modules'
$ NODE_ENV=production node dist/server/app.js
$ heroku create [your app name] --stack cedar
$ heroku config:set NODE_ENV=production
$ git push heroku master
$ heroku ps:scale web=1
```

Now that you are already setup anytime you want to push changes just run `git push heroku master`

## Install Mongo Addon
Login to [http://heroku.com](http://heroku.com) and click on the `My Apps`

Once in that page, find the new app you just created and click on `Get more add ons...`

Inside the add ons page select `Mongolab` and in the dropdown select your new app then click on `Add Sandbox for Free`

When you have finished adding the add on, click on `Apps` on the top of the page and then click the `MongoLab` add on to go into the admin ui.

Inside the add on click on `Users` then select `Add database user`

Fill in the details and click on `Create`

Save the username, password, and the mongo connection under `To connect using a driver via the standard URI` it should look like a `mongodb://` url.

Back inside your terminal in Cloud9 execute the command and replace the details in brackets with the information you saved in the previous step.

```
$ heroku config:set PROD_MONGODB=mongodb://[username]:[password]@[connection string]
```