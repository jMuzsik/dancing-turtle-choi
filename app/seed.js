var {db, Students, Campuses} = require('../db/models')

console.log(Students,Campuses)
const animalArr = [
  {
    id: 10,
    name: "cock",
    image: "https:cdn.pixabay.com/photo/2017/01/12/16/58/cock-1975153_640.jpg",
    quote: "im the cock, the best one ever, aint no competition, fight like none other, tough as this here beak, shatter your soul with one pop!",
    createdAt: "2017-10-19T17:04:31.001Z",
    updatedAt: "2017-10-19T17:05:02.846Z",
    campusId: 1
  },
  {
    id: 11,
    name: "chickie",
    image: "https:pixabay.com/get/e033b50b2df01c22d9584518a33219c8b66ae3d019b9154297f7c479/animal-964454_1920.jpg",
    quote: "im chickie, just born, this my egg, i shattered that thing with my boom ba boom ba loom, im a litte guy now, but wait, im'a be so tough this earth gonna shatter with my force one these days",
    createdAt: "2017-10-19T17:06:02.078Z",
    updatedAt: "2017-10-19T17:06:54.121Z",
    campusId: 1
  },
  {
    id: 7,
    name: "bell peppers",
    image: "https://pixabay.com/get/eb33b40728f4003ed1534705fb0938c9bd22ffd41cb1194596f2c579a6/colorful-2658001_1920.jpg",
    quote: "we the three bell peppers, we the crew you aint wanting to be messin with",
    createdAt: "2017-10-19T17:00:14.876Z",
    updatedAt: "2017-10-20T00:14:49.456Z",
    campusId: 2
  },
  {
    id: 8,
    name: "Rabbit and The Flower",
    image: "https://cdn.pixabay.com/photo/2017/03/03/10/02/tulip-2113684_640.jpg",
    quote: "im rabbit, and this here is flower, we the ones that got the plan, the actions, we the ones gonna be making the world go round",
    createdAt: "2017-10-19T17:01:30.533Z",
    updatedAt: "2017-10-20T00:27:27.138Z",
    campusId: 2
  },
  {
    id: 1,
    name: "Chicken",
    image: "https://cdn.pixabay.com/photo/2016/11/23/00/39/animal-1851494_640.jpg",
    quote: "I chicken the chicken the chicken magical chicken, eyes of steel",
    createdAt: "2017-10-19T16:52:09.908Z",
    updatedAt: "2017-10-20T00:31:10.646Z",
    campusId: 1
  },
  {
    id: 3,
    name: "Why can't I touch the floor???",
    image: "http://morewithlessdesign.com/wp-content/uploads/2016/04/WALL-CLOUD-08.jpg",
    quote: "philip, arthur, and kenny are in love with the way that the walls touch the floor",
    createdAt: "2017-10-19T14:25:35.482Z",
    updatedAt: "2017-10-20T00:42:25.671Z",
    campusId: 2
  },
  {
    id: 2,
    name: "horsey",
    image: "https://pixabay.com/get/eb36b50b2bfd073ed1534705fb0938c9bd22ffd41cb1194596f2c17ca0/horse-2344396_1920.jpg",
    quote: "I horse the horse I make the horsination of humanity horsified",
    createdAt: "2017-10-19T16:54:28.978Z",
    updatedAt: "2017-10-19T16:54:51.742Z",
    campusId: 1
  },
  {
    id: 4,
    name: "doggo",
    image: "https://pixabay.com/get/eb36b7082ffd063ed1534705fb0938c9bd22ffd41cb1194596f2c07aa4/dog-2367797_1920.jpg",
    quote: "I doggo mcdoggo, dogying and beginning the dognation of dogathon",
    createdAt: "2017-10-19T16:55:44.564Z",
    updatedAt: "2017-10-19T16:56:15.661Z",
    campusId: 1
  },
  {
    id: 5,
    name: "lionlionlion",
    image: "https://pixabay.com/get/eb35b20b20f5073ed1534705fb0938c9bd22ffd41cb1194596f2c379a7/lioness-2034816_1920.jpg",
    quote: "i lion, the lioness of the lion universe, you lion if you dont think i fine",
    createdAt: "2017-10-19T16:56:56.861Z",
    updatedAt: "2017-10-19T16:57:18.814Z",
    campusId: 1
  },
  {
    id: 6,
    name: "fishy",
    image: "https://pixabay.com/get/eb35b10621f3003ed1534705fb0938c9bd22ffd41cb1194596f2c27bae/fighting-fish-2009971_1920.jpg",
    quote: "i fishy mcfishson, i the fishiest fisher in the ocean of fishies",
    createdAt: "2017-10-19T16:59:01.039Z",
    updatedAt: "2017-10-19T16:59:19.284Z",
    campusId: 1
  },
  {
    id: 9,
    name: "birdy bird",
    image: "https://cdn.pixabay.com/photo/2016/12/16/22/56/seagull-1912489_640.jpg",
    quote: "im the bird, i fly high, catch the world go by, no one fly like i",
    createdAt: "2017-10-19T17:03:25.945Z",
    updatedAt: "2017-10-19T17:03:46.053Z",
    campusId: 1
  }
]

const placesArr = [
  {
    id: 2,
    name: "The Land of the Kitty Cat",
    image: "http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg",
    createdAt: "2017-10-19T16:13:31.246Z",
    updatedAt: "2017-10-20T00:35:02.925Z"
  },
  {
    id: 1,
    name: "Primordial Existence",
    image: "http://aasnova.org/wp-content/uploads/2015/10/fig19.jpg",
    createdAt: "2017-10-19T14:25:20.558Z",
    updatedAt: "2017-10-20T01:07:30.615Z"
  }
]


db.sync({force: true})
  .then(() => {
    return Campuses.bulkCreate(placesArr);
  })
  .then(function () {
    return Students.bulkCreate(animalArr);
  })
  .then(() => {
    console.log('finished inserting data')
  })
  .catch(console.error)

//   db.sync().then(() => {
//     console.log("db synced");
//     app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
//   });
// }


//   console.log("Dropped old data, now inserting data");
//   return Promise.map(Object.keys(data), function (name) {
//     return Promise.map(data[name], function (item) {
//       return db.model(name)
//       .create();
//     });
//   });
// })
// .then(function () {
//   console.log("Finished inserting data (press ctrl-c to exit)");
// })
// .catch(function (err) {
//   console.error('There was totally a problem', err, err.stack);
// });
