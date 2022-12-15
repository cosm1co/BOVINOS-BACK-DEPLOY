import Bovine from "../models/Bovine.js"
import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";
import { bovinejson } from './json.js'

console.log("usersjson",bovinejson)
const bovineConverted = bovinejson.map(e => new Bovine(e))

//connect mongoose
mongoose
  .connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser:true
	})
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
  //save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically


let done = 0;

export const seedData = async () => {
  try {
    await Bovine.deleteMany({});
    
    for (let i = 0; i < bovineConverted.length; i++) {
        bovineConverted[i].save(function (err, result) {
        done++;
        // console.log(done)
      });
    }
    console.log("DONE!");
    // mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
  console.log("Mock data is seeded from seed script.");
};

seedData()


