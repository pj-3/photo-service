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
update_date: '2020-11-30',
create_date: '2020-12-02',
"image_Id": "1-4",
"photourl":"www.photo.com/1231",
"photo_description" :"new kitchen"
}
(image_Id = house_Id + photoId)
READ
Get id, image, and image property - id, description, imageurl.

GET /listing/:id
Sample Response
[{
"house_Id": 1,
update_date: '2020-11-30',
create_date: '2020-12-02',
"image_Id": "1-1",
"photourl":"www.photo.com/1231",
"photo_description" :"new kitchen"
},
{
"house_Id": 1,
update_date: '2020-11-30',
create_date: '2020-12-02',
"image_Id": "1-2",
"photourl":"www.photo.com/1231",
"photo_description" :"new TV"
},
{
"house_Id": 1,
update_date: '2020-11-30',
create_date: '2020-12-02',
"image_Id": "1-3",
"photourl":"www.photo.com/3",
"photo_description" :"new table"
},
{
"house_Id": 1,
update_date: '2020-11-30',
create_date: '2020-12-02',
"image_Id": "1-4",
"photourl":"www.photo.com/4",
"photo_description" :"new washer"
},
{
"house_Id": 1,
update_date: '2020-11-30',
create_date: '2020-12-02',
"image_Id": "1-5",
"photourl":"www.photo.com/5",
"photo_description" :"new bathroom"
}]

UPDATE
Update image property - description and/or imageurl.

PUT /listing/

Sample Request
{
  "house_id": 1
  "address" : "1259 kingston ave. Skokie,Illinois, 60086"
  "created_date" : 'date',
  "updated_date" : 'date',
  "photo_description" : "big house"
  "image_Id" : 1-3
  "photourl": "www.amazons3.com/samplephoto"

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
