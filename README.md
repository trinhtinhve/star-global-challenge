# start-global-challenge
# Source code structure
# Installation
- run npm install to install dependencies before follow steps below.
## Create database
- edit create_db.example.js to create_db.js
- edit create_db.js file with your credentials to connect to your db.
- run: npm run create_db to create your db for first time

## Configuration and Env variables
- edit .env.example to .env
- edit POSTGRES_PASSWORD in .env with right password
- edit db information in config/default.json

## Start app
- run: npm start
