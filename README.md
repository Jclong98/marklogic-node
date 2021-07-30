# marklogic-node

## Docker Setup
Run `docker-compose up -d` to start a marklogic container using the provided docker-compose.yml.

## Connecting to Marklogic

Change your connection info inside `connectionInfo.js` to point to your local marklogic container. Most likely all you'll need to do is change the IP to `localhost`.

To setup a new test-db database, run `npm run setup` and go into the marklogic admin panel at [localhost:8001](localhost:8001) and switch the authentication from **digest** to **basic**.

## Loading Documents

You can load data into the database after this by running `node createCollection.js` to create a **user** collection.

This collection has indexes on the following properties:
- id
- first_name
- last_name

## Clear your marklogic instance

If you've already got a marklogic test-db setup and want to clear it out, run `npm run wipe`.
g