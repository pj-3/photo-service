Installing Dependencies
From within the root directory:

npm install
Usage
To Run App - Once Dependencies Installed
All occurs from within the root directory:


Seed your database with seeding script:
npm run seed


Build react app with script:
npm run react-dev


Run server:
npm run server-dev

Go to url http://localhost:2555/propertyID to view app

Endpoints
CREATE
Post check in/check out dates, price, and guest info for specific home.

POST /listing/
Sample Request
{
propertyID
"id": 1
"description" : "this house is pretty"
"photo" :
}

READ
Get id, image, and image property - id, description, imageurl.

GET /listing/:id
Sample Response
{
"id": 1
  image: {
    "id": 1-3
    "description": 'newly decorated bathroom'
    "imageurl": "http://image_url"
  }
}

UPDATE
Update image property - description and/or imageurl.

PUT /listing/

Sample Request
{
  "id": 1
  "image": {
    "imageID" : 1-3
    "description": "newly decorated bathroom"
    "photo": "btyeString" (which is convert to photo and store it into photourl(AWS))
  }
}


Sample Response
{
  "id": 1
  image :{
    "imageID: 1-3
    "description": "newly decorated bathroom""adults": 4
    "imageurl": "http:image_url"
  }
}


DELETE
Delete property image or all the images

DELETE /listing/
Sample Request
{
  "id": 1
}

DELETE /listing/photo
Sample Request
{
  "id": 1
  imageID: 1-3
}