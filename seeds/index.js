const mongoose = require("mongoose");
const Campground = require("../models/campground");
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DataBase Connected");
});
const price = Math.floor(Math.random()*20)+10;
const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seeDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/9407462',
      description:
        "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptates odit voluptatum, dicta exercitationem quae expedita commodi eligendi ipsa tempora libero, eaque fuga veritatis repellat temporibus iusto necessitatibus fugiat a!",
        price
    });
    await camp.save();
  }
};
seeDB().then(() => {
  mongoose.connection.close();
});
