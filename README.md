# HappyTrack
A tracker to visualize and analyze your happiness over time and the reasons behind it. Created with React, Node.js and MongoDB.

## Install
First, install all dependencies. There are two package.json files, one for Frontend and one for Backend.

Install Backend dependencies:
```
yarn install
```

Install Fronted dependencies in the client folder:
```
cd client 
yarn install
```

Lastly, add your database in the .env_sample file, and rename the file to .env (example: 'mongodb://127.0.0.1:27017/happyTrack')
```
MONGO_DB="YOUR_DATABASE_HERE"
```

## Run
Make sure mongoDB is running.

Start the server. Open up the terminal, then type in:
```bash
nodemon server.js
```
Then start React. Open up a new terminal window. Go to the client folder and then start:
```
cd client
yarn start
```