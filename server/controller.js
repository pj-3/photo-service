const models = require('./models.js');

// get a listed property by _id
const get = (req, res) => {
  const id = req.query._id;
  models.get(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};



const post = (req, res) => {
  // property id
  const id = req.query._id;
  const imageID = req.query.imageID;
  const description = req.query.description;
  // photo?
  models.post(id, imageID, description, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};


const put = (req, res) => {
  // property id
  const id = req.query._id;
  const imageID = req.query.imageID;
  const description = req.query.description;
  // photo?
  models.put(id, imageID, description, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// const delete = (req, res) => {
//   const id = req.query._id;
//   const imageID = req.query.imageID;
//   const description = req.query.description;
//   // photo?
//   models.delete(id, imageID, description, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// }
module.exports = { get, post, put };
