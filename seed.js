const cassandra = reuqire('./index.js');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const img = require('./images.js');

const writer = csvWriter();

// set the number of property
const propertyCount = 10000000;
const averageImageCountPerProperty = 3;
const userCount = 10000000;
const MAXHOMES = 5000000;
const randomUser = () => {
  const userNameList = [
    'Time', 'Past', 'Future', 'Dev',
    'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
    'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
    'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
    'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
    'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
    'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
    'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
    'Gun', 'Assault','Recon','Trap','Trapper','Redeem','Code',
    'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
    'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
    'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
    'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
    'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
    'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
    'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
    'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
    'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
    'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
    'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
    'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
  ];
  let index = Math.floor(Math.random() * userNameList.length);

  return userNameList[index]
}

const randomAddress = () => {
  return faker.address.streetAddress() + ' ' + faker.address.city() + ',' + faker.address.state() + ' ' + faker.address.zipCode();
};
const randomUserId = () => {
  return Math.floor(Math.random() *  userCount)
};

const randomImageId = () => {
  return Math.floor(Math.random() *  averageImageCountPerProperty)
};

// do it after property is finish inserting
let image_PropertyId = () => {
  return Math.floor(Math.round() * propertyCounter)
};

const url = img.getRandomImage();

const randomDescription = ()  => {
  const nouns = ['bird', 'clock', 'boy', 'plastic', 'duck', 'teacher', 'old lady', 'professor', 'hamster', 'dog'];
  const verbs = ['kicked', 'ran', 'flew', 'dodged', 'sliced', 'rolled', 'died', 'breathed', 'slept', 'killed'];
  const adjectives = ['beautiful', 'lazy', 'professional', 'lovely', 'dumb', 'rough', 'soft', 'hot', 'vibrating', 'slimy'];
  const adverbs = ['slowly', 'elegantly', 'precisely', 'quickly', 'sadly', 'humbly', 'proudly', 'shockingly', 'calmly', 'passionately'];
  const preposition = ['down', 'into', 'up', 'on', 'upon', 'below', 'above', 'through', 'across', 'towards'];
  let rand1 = Math.floor(Math.random() * 10);
  let rand2 = Math.floor(Math.random() * 10);
  let rand3 = Math.floor(Math.random() * 10);
  let rand4 = Math.floor(Math.random() * 10);
  let rand5 = Math.floor(Math.random() * 10);
  let rand6 = Math.floor(Math.random() * 10);
  let content = 'The ' + adjectives[rand1] + ' ' + nouns[rand2] + ' ' + adverbs[rand3] + ' ' + verbs[rand4] + ' because some ' + nouns[rand1] + ' ' + adverbs[rand1] + ' ' + verbs[rand1] + ' ' + preposition[rand1] + ' a ' + adjectives[rand2] + ' ' + nouns[rand5] + ' which, became a ' + adjectives[rand3] + ', ' + adjectives[rand4] + ' ' + nouns[rand6] + '.';

  return content;
};

const randomDate = () => {
  let dayDate = Math.floor(Math.random() * 27) +1;
  let month = Math.floor(Math.random() * 3) + 1;
  if (month < 10) {
    month = '0' + month;
  }
  if (dayDate < 10) {
    dayDate = '0' + dayDate;
  }

  let year = '2020';
  return year + '-' + month + '-' + dayDate;
};

const writeProperty = fs.createWriteStream('property.csv');
const propertiesGenerator = (writer, encoding, callback) => {
  writeProperty.write('id, dateCreated, dateUpdated, address' + '\n', 'utf8');
  let propertyCounter = propertyCount;
  let id = 0;
  const write = () => {
    let ok = true;
    do {
      propertyCounter--;
      const dateCreated = randomDate();
      const dateUpdated = randomDate();
      const address = randomAddress();
      if (propertyCounter === 0) {
        writer.write(`${id},${dateCreated},${dateUpdated},"${address}"\n`, encoding, callback);
        id++;
      } else {
        ok = writer.write(`${id},${dateCreated},${dateUpdated},"${address}"\n`, encoding);
        id++;
      }
      if (id % 100000 === 0) {
        console.log('from property', id);
      }
    } while (propertyCounter > 0 && ok);
    if (propertyCounter > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

const writeImage = fs.createWriteStream('image.csv');
const imagesGenerator = (writer, encoding, callback) => {
  // writer.pipe(fs.createWriteStream('image.csv'));
  writeImage.write('image_id, property_id, description, url' + '\n', 'utf8');
  let id = 0;
  // 10M * 10
  let imageCounter = propertyCount * averageImageCountPerProperty;
  const write = () => {
    let ok = true;
    do {
      imageCounter--;
      let randomPropertyId = Math.floor(Math.random()* propertyCount);
      let randomPhotoDescription = randomDescription();
      let randomImage = img.getRandomImage();
      if (imageCounter === 0) {
        writer.write(`${id},${randomPropertyId},"${randomPhotoDescription}",${randomImage}\n`, encoding, callback);
        id++;
      } else {
        ok = writer.write(`${id},${randomPropertyId},"${randomPhotoDescription}",${randomImage}\n`, encoding);
        id++;
      }
      if (id %100000 === 0) {
        console.log('image' , id);
      }
    } while (imageCounter > 0 && ok);
    if (imageCounter > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

const writeUser = fs.createWriteStream('user.csv')
const usersGenerator = (writer, encoding, callback) => {
  // writer.pipe(fs.createWriteStream('user.csv'));
  writeUser.write('user_Id, user_Name' + '\n', 'utf8');
  let id = 0;
  let userCounter = userCount;
  const write = () =>{
    let ok = true;
    do {
      let randomUserName = randomUser();
      userCounter--;
      if (userCounter === 0) {
        writer.write(`${id},${randomUserName}\n`, encoding, callback);
        id++;
      } else {
        ok = writer.write(`${id},${randomUserName}\n`, encoding);
        id++;
      }
      if (id % 100000 === 0) {
        console.log(id);
      }
    } while (userCounter > 0 && ok);
    if (userCounter > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

const writeUserLikeImage = fs.createWriteStream('usersLikedImages.csv');

const usersLikedImagesGerator = (writer, encoding, callback) => {
  writeUserLikeImage.write(`id_User, id_Image` + '\n', 'utf8');
  let id = 0;
  let userCounter = userCount;
  const write = () => {
    let ok = true;
    do {
      userCounter--;
      const maxOfLiked = Math.floor(Math.random() * 5);
      for (var j=0; j < maxOfLiked; j++) {
        let randomLikedImageId = Math.floor(Math.random() * (propertyCount * averageImageCountPerProperty));
        if (userCounter === 0) {
          writer.write(`${id},${randomLikedImageId}\n`, encoding, callback);
        } else {
          ok = writer.write(`${id},${randomLikedImageId}\n`, encoding);
        }
      }
      id++;
      if (id % 100000 === 0) {
        console.log(id);
      }
    } while (userCounter > 0 && ok);
    if (userCounter > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

const writeListingHouse = fs.createWriteStream('listingHouse.csv');
const ListingHouse = (writer, encoding, callback) => {
  writeListingHouse.write('house_id, address, Date_updated, Date_created, image_id, photourl, photo_description' + '\n', 'utf8');
  let k = 0;
  let propertyId = 0;
  let propertyCounter = propertyCount;
  const write = () => {
    let ok = true;
// writer.pipe(fs.createWriteStream('listingHouse.csv'));
    do {
      propertyCounter--;
      const randomHouseAddress = randomAddress();
      const DateUpdated = randomDate();
      const DateCreated = randomDate();
      const total = Math.floor(Math.random() * (averageImageCountPerProperty - 1)) + 1;
      for (var j = 0; j < total; j++) {
        const randomImage = img.getRandomImage();
        const randomDescriptionHouse = randomDescription();
        if (propertyCounter === 0) {
          writer.write(`${propertyId},"${randomHouseAddress}",${DateUpdated},${DateCreated},${k},${randomImage},"${randomDescriptionHouse}"\n`, encoding, callback);
          k++;
        } else {
          ok = writer.write(`${propertyId},"${randomHouseAddress}",${DateUpdated},${DateCreated},${k},${randomImage},"${randomDescriptionHouse}"\n`, encoding);
          k++;
        }
      }
      propertyId++;

      if (k % 10000 === 0) {
        console.log(k);
      }
    } while (propertyCounter > 0 && ok);
    if (propertyCounter > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

// issue image number not consistent
// fixed ... need to debug
const writeListingUser = fs.createWriteStream('ListingUser.csv');
const ListingUser = (writer, encoding, callback) => {
  writeListingUser.write('id, id_User, liked_image_url, liked_image_description, user_Name' + '\n', 'utf8');
  let k = 0;
  let id = 0;
  let userCounter = userCount;
  const write = () => {
    let ok = true;
  // writer.pipe(fs.createWriteStream('ListingUser.csv'));
    do {
      id++;
      userCounter--;
      let maxOfLiked = Math.floor(Math.random() * 5);
      let user = randomUser();
      for (var j = 0; j < maxOfLiked; j++) {
        let randomImageUrl = img.getRandomImage();
        let randomPhotoDescription = randomDescription();
        if (userCounter === 0) {
          writer.write(`${k},${id},${randomImageUrl},"${randomPhotoDescription}",${user}\n`, encoding, callback);
          k++;
        } else {
          ok = writer.write(`${k},${id},${randomImageUrl},"${randomPhotoDescription}",${user}\n`, encoding);
          k++;
        }
      }
      if (k % 10000 === 0) {
        console.log(k);
      }
    } while (userCounter > 0 && ok);
    if (userCounter > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

cassandra.client();



// ListingUser(writeListingUser, 'utf8', () => {
//   writer.end();
// });
// ListingHouse(writeListingHouse,'utf8', () => {
//   writer.end()
// });
// imagesGenerator(writeImage, 'utf8', () => {
//   writer.end();
// });
// propertiesGenerator(writeProperty, 'utf8', () => {
//   writer.end();
// });
// usersGenerator(writeUser, 'utf8', ()=>{
//         writer.end();
// });
// usersLikedImagesGerator(writeUserLikeImage, 'utf8', () => {
//   writer.end();
// });
