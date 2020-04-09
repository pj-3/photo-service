DROP KEYSPACE IF EXISTS Listing;

CREATE KEYSPACE Listing WITH replication = {'class': 'SimpleStrategy', 'replication_factor':1};

CREATE TABLE Listing.house (
   house_Id int,
   address text,
   Date_updated date,
   Date_created date,
   image_Id int,
   photourl text,
   photo_description text,
   PRIMARY KEY (house_Id,image_Id)
);

CREATE TABLE Listing.user (
  id int,
  user_Id int,
  liked_Image_url text,
  liked_Image_description text,
  user_Name text,
  PRIMARY KEY (user_Id, id)
);





-- COPY Listing.house (house_Id,address,Date_updated,Date_created,image_Id,photourl,photo_description) FROM '/Users/michellelao/desktop/SDCproject/Header-images/listingHouse.csv' WITH HEADER = TRUE ;

