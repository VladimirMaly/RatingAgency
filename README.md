# Rating Agency
Website that uses, HTML CSS AngularJS 1, using bootstrap with glyphicons imported.
For the back end using Restful, Nodejs, express, mongoose with mongoDB as the database.

## Access
An instance of MongoDB must be running in the background to start our application.
Make sure that ```dbpath``` is configured on your system. 
```
mongod.exe --dbpath "c:\data\db"
mongod 
``` 
To start our application, you need to enter
```
npm install
npm start
```
The site will be accessible at [http://localhost:3000/](http://localhost:3000/).
The exact port is subject to change, you can find the exact port number in ```bin/www``` under ```PORT```.

## Testing/Adding json documents
To test our test script, you must your MongoDB configured in accordance to our mongoexport.
Make sure the server is running using ```mongod``` in another terminal, then import our set of predefined test data by
```bash
cd mongoexport
mongoimport --db rating_agency_db --collection reviews --file reviews.json
mongoimport --db rating_agency_db --collection stores --file stores.json
mongoimport --db rating_agency_db --collection users --file user.json
```
