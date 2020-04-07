const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const img = require('./images.js');

const writer = csvWriter();

// set the number of property
const propertyCount = 1000000;
const averageImageCountPerProperty = 10;
const userCount = 100000;

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


const propertiesGenerator = () => {
  writer.pipe(fs.createWriteStream('property.csv'));
  for (var i = 0; i < propertyCount; i++) {
    writer.write({
      id: i,
      dateCreated: randomDate(),
      dateUpdated: randomDate(),
      address: randomAddress()
    });
  }
  writer.end();
  console.log('property done');
};


const imagesGenerator = () => {
  writer.pipe(fs.createWriteStream('image.csv'));
  for (var i = 0; i < propertyCount * averageImageCountPerProperty; i++) {
    writer.write({
      image_id: i,
      id_Property: Math.floor(Math.random()* propertyCount),
      description : randomDescription(),
      url: img.getRandomImage()
    });
  }
  writer.end();
  console.log('image done');
};

const usersGenerator = () => {
  writer.pipe(fs.createWriteStream('user.csv'));
  for (var i = 0; i < userCount; i++) {
    writer.write({
      user_Id: i,
      user_Name: randomUser()
    });
  }
  writer.end();
  console.log('users done');
};


const usersLikedImagesGerator = () => {
  writer.pipe(fs.createWriteStream('usersLikedImages.csv'));
  for (var i = 0; i < userCount; i++) {
    let maxOfLiked = Math.floor(Math.random() * 5);
    for (var j = 0; j < maxOfLiked; j++) {
      writer.write({
        id_User: i,
        id_Image: Math.floor(Math.random() * (propertyCount * averageImageCountPerProperty))
      });
    }
  }
  console.log('userlikedimages done');
};

const ListingHouse = () => {
  let k = 0;
  let propertyId = 0;

  writer.pipe(fs.createWriteStream('listingHouse.csv'));
    for (var i = 0; i < propertyCount; i++) {
      let randomHouseAddress = randomAddress();
      let Date_updated = randomDate();
      let Date_created = randomDate();
      let total = Math.floor(Math.random() * (averageImageCountPerProperty - 1)) + 1;
      for (var j = 0; j < total; j++) {
        writer.write({
          house_Id: propertyId,
          address: randomHouseAddress,
          Date_updated: Date_updated,
          Date_created: Date_created,
          image_Id: k,
          photourl: img.getRandomImage(),
          photo_description: randomDescription()
        });
        k++;
      }
      propertyId ++;

      if(k % 10000 ===0) {
        console.log(k);
      }
    }
};


const ListingUser = () => {
  let k = 0;
  writer.pipe(fs.createWriteStream('ListingUser.csv'));
  for (var i = 0; i < userCount; i++) {
    let maxOfLiked = Math.floor(Math.random() * 5);
    let user = randomUser();
    for (var j = 0; j < maxOfLiked; j++) {
      writer.write({
        id: k,
        id_User: i,
        id_Image: Math.floor(Math.random() * (propertyCount * averageImageCountPerProperty)),
        user_Name: user
      });
      k++;
    }
  }
  console.log('ListingUser done');
};


// ListingUser ();
ListingHouse();
// imagesGenerator();
// propertiesGenerator();
// usersGenerator();
// usersLikedImagesGerator();
