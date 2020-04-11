const db = require('../db');

// get listing by id
const get = (id, callback) => {
  // db.Listing.find({ _id: id }).exec((err, listing) => { callback(null, listing); });
};

const post = (id, imageID, description, callback) => {
 // object where id = id
};

const put = (id, imageID, description, callback) => {
  // object where id = id, object.image imageid = id, change either description or  photo
};

// const delete = (id, imageID, description, callback) => {
//   // delete
// };

module.exports = { get, post, put };
