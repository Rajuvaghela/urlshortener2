import mongoose from "mongoose";
import { required } from "zod/mini";

//Step 1: to connect to the mongoDB server
try {
  await mongoose.connect("mongodb://127.0.0.1/mongoose_database1");
  mongoose.set("debug", true);
} catch (error) {
  console.error(error);
  process.exit();
}

//Step 2 : create schema

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 5 },
  createdAt: { type: Date, default: Date.now() },
});


//step 3 : creating a model
const Users= mongoose.model("user",userSchema);

await Users.create({name:"Laxmi",age:26,email:"laxmi@gmail.com"});

process.exit();