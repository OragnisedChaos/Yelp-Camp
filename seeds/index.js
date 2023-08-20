const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "649b295ba7bda338200963af",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry:{
        type: 'Point', coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      image: [
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045167/Yelpcamp/hranf2qdtfu4na5ruvmr.jpg",
          filename: "Yelpcamp/hranf2qdtfu4na5ruvmr",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045170/Yelpcamp/gdkrwoosjkkpuuqhyud1.jpg",
          filename: "Yelpcamp/gdkrwoosjkkpuuqhyud1",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045172/Yelpcamp/xdhsg2pcumoq14evcdbb.jpg",
          filename: "Yelpcamp/xdhsg2pcumoq14evcdbb",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045178/Yelpcamp/iknihfcqrpxrhnfbiuhi.jpg",
          filename: "Yelpcamp/iknihfcqrpxrhnfbiuhi",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045180/Yelpcamp/eezpdcpco3lo69tdh6ag.jpg",
          filename: "Yelpcamp/eezpdcpco3lo69tdh6ag",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045185/Yelpcamp/yxpyihwhedvszyubttnx.jpg",
          filename: "Yelpcamp/yxpyihwhedvszyubttnx",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045187/Yelpcamp/vrreflppu38rmlvj5six.jpg",
          filename: "Yelpcamp/vrreflppu38rmlvj5six",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045190/Yelpcamp/x7hwg7lxfbvrrzsrbpgo.jpg",
          filename: "Yelpcamp/x7hwg7lxfbvrrzsrbpgo",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045192/Yelpcamp/dfkb6xqxoeh8vzddjp0o.jpg",
          filename: "Yelpcamp/dfkb6xqxoeh8vzddjp0o",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045204/Yelpcamp/d86oj6klmivvlvc7qcvn.jpg",
          filename: "Yelpcamp/d86oj6klmivvlvc7qcvn",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045207/Yelpcamp/xvuxpctqzyxjoenti3j4.jpg",
          filename: "Yelpcamp/xvuxpctqzyxjoenti3j4",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045218/Yelpcamp/dof8iwebq9isybudfvac.jpg",
          filename: "Yelpcamp/dof8iwebq9isybudfvac",
        },
        {
          url: "https://res.cloudinary.com/dtv7yz7m4/image/upload/v1688045219/Yelpcamp/wkk0bzqiwn2ooxpstxoq.jpg",
          filename: "Yelpcamp/wkk0bzqiwn2ooxpstxoq",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
