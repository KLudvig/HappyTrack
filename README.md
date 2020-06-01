# HappyTrack
A tracker to visualize and analyze your happiness over time and the reasons behind it. Created with React, Node.js and MongoDB.

## Install
First, install all dependencies. There are two package.json files, one for frontend and one for backend.

First install frontend dependencies.
```
yarn install
```

Then install backend dependencies
```
cd client 
yarn install
```

Lastly, make sure mongoDB is installed. Add your database in the .env_sample file, and rename the file to .env (for example: 'mongodb://127.0.0.1:27017')
```
MONGO_DB="YOUR_DATABASE_HERE"
```

## Run
Make sure mongoDB is running.

Start the server. Open up the terminal, then type in:
```bash
nodemon server.js
```
Then start React. Open up a new terminal window. Go to the client folder:
```
cd client
```
Then start React:
```
yarn start
```