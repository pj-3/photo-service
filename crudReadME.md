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
"house_Id": 1,
"house_description" : "this house is pretty",
update_date: 'date',
create_date: 'date',
  "images" : {
     "image_Id": 1-4,
     "photo":"phtobyte",
     "image_description" :"new kitchen"
  }
}

READ
Get id, image, and image property - id, description, imageurl.

GET /listing/:id
Sample Response
{
"house_Id": 1,
"house_description" : "this house is pretty",
"created_date" : 'date',
"updated_date" : 'date',
  "image": {
    "image_Id": 1-3,
    "image_description": 'newly decorated bathroom',
    "imageurl": "http://image_url"
  }

}

UPDATE
Update image property - description and/or imageurl.

PUT /listing/

Sample Request
{
  "house_id": 1
  "created_date" : 'date',
  "updated_date" : 'date',
  "house_description" : "big house"
  "image": {
    "image_Id" : 1-3
    "photo_description": "newly decorated bathroom"
    "photo": "btyeString" (which is convert to photo and store it into photourl(AWS))
  }
}


Sample Response
{
  "house_Id": 1
  "created_date" : 'date',
  "updated_date" : 'date',
  "house_description" : "big house"
  "image" :{
    "image_Id: 1-3
    "photo_description": "newly decorated bathroom""adults": 4
    "image_url": "http:image_url"
  }
}


DELETE
Delete property image or all the images

DELETE /listing/
Sample Request
{
  "house_id": 1
}

DELETE /listing/photo
Sample Request
{
  "house_Id": 1
  "image_Id": 1-3
}
