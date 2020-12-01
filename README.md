# start-global-challenge
## Source code structure
src:
  - common -> contain common modules to support for the project.
    * error.code.js -> define error codes
    * error.js  -> error handler
    * logger.js
  - config
    * database.js
  - core -> context layer of apps.
    * star_global_challenge -> wishlist app.
      + migrations -> migration files created by sequelize cli.
      + models
        * mocks
        * index.js -> contain all of models.
        * wishlist_details.js
        * wishlist_item.js
        + wishlist.js
      + services
        * wishlist.js -> wishlist context.
    * star_global_challenge.js -> wishlist app context to communicate between apps.
  - test
    * core
      + star_global_challenge
        * services
          + wishlist.test.js -> wishlist context tests.
        * wishlist.test.js -> integration tests for wishlist app.
  - web -> web layer.
    * controllers
      + wishlist.js
    * routes
      + wishlist.js
    * router.js
  - app.js
  - middleware.js
## Setup
- edit .env.example to .env
- edit POSTGRES_PASSWORD in .env with right password

- edit db information (username, database, host, port) for dev and test env in src/config/database.js
- create 2 databases with name: star_global and star_global_test

- run 'npm install'

- run 'npm run migration.migrate'

- start app: 'npm start'

- test app: 'npm run test'

## Postman
- import star-global.postman_collection.json into your postman app to have api call examples
