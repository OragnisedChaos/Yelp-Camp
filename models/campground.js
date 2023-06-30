const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
// https://res.cloudinary.com/dtv7yz7m4/image/upload/w_300/v1688050397/Yelpcamp/kgcw2j1v0pynodvpdkms.jpg

const ImageSchema = new Schema({
  url:String,
  filename:String
})
ImageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload','/upload/w_200')
})
const CampgroundSchema = new Schema({
  title: String,
  image: [ ImageSchema],
  geometry:{
      type: {
        type: String, 
        enum: ['Point'], 
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    location:String,
  price: Number,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
