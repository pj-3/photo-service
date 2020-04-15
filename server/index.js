require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const client = require('./connection.js');
const controller = require('./controller.js');


const app = express();
const port = 80;

// serve static page
app.use('/', express.static(__dirname + '/../client/dist'));


// lifted CORS policy
// get listing by id
app.get('/listing/', cors(), (req, res) => {
  const query = `SELECT * from Listing.house WHERE house_Id = ${req.query.house_Id}`;
  client.execute(query)
    .then((result) => res.send(result.rows));
  // controller.get(req, res);
});

// serve the html file with the listing number
app.get('/*', cors(), (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

// app.post('/listing/', cors(), (req, res) => {
//   const request = req.query;
//   const query = `INSERT INTO Listing.house (house_Id, address, Date_updated, Date_created, image_Id, photourl, photo_description) VALUES (${request.house_Id}, "${request.address}", ${request.Date_updated}, ${request.Date_created}, ${request.image_Id}, ${request.photourl}, ${request.photo_description})`;
//   client.execute(query)
//     .then((result) => res.end('server post success'));
// });

// app.put('/listing/', cors(), (req, res) => {
//   const request = req.query;
//   const query = `UPDATE Listing.house SET address = "${request.address}", Date_updated = ${request.Date_updated}, image_ID = ${image_Id}, photourl = ${request.photourl}, photo_description = ${request.photo_description}
//   WHERE house_Id = ${request.house_Id} IF EXISTS;`;
//   client.execute(query)
//   .then((result) => res.end('server update success'));
// });

// app.delete('/listing/', cors(), (req, res) => {
//   const query = `DELETE FROM Listing.house
//   WHERE house_Id = ${req.query.house_Id} IF EXISTS`;
//   client.execute(query)
//   .then((result) => res.end('server deleted success'));
// });


// app.delete('/listing/photo', cors(), (req, res) => {
//   const query = `DELETE FROM Listing.house
//   WHERE image_Id = ${req.query.image_Id} IF EXISTS`;
//   client.execute(query)
//   .then((result) => console.log('server deleted success'));
// });



app.listen(port, () => console.log(`Listening to port ${port}!`));
