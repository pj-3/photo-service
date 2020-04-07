DROP DATABASE IF EXISTS listing;

CREATE DATABASE listing;

USE listing;



CREATE TABLE properties (
  id serial PRIMARY KEY,
  create_Date Date,
  update_Date Date,
  address varchar(300)
);

CREATE TABLE images (
  image_Id serial primary key,
  id_Property INTEGER REFERENCES properties (id),
  description varchar(300),
  url varchar(300)
);

CREATE TABLE users (
  user_Id serial primary key,
  user_Name varchar(100)
);


CREATE TABLE User_Liked_Images (
  id_User INTEGER REFERENCES users (user_Id),
  id_Image INTEGER REFERENCES images (image_Id)
)


