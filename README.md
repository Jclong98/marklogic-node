# marklogic-node

If you've already got a marklogic test-db setup and want to clear it out, run `npm run wipe`

To setup a new test-db database, run `npm run setup` and go into the marklogic admin panel and switch the authentication from **digest** to **basic**

You can load data into the database after this by running `node createCollection.js` to create a **user** collection

This collection has indexes on the following properties:
- id
- first_name
- last_name