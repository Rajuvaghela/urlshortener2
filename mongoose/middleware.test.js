import mongoose from "mongoose";

//Step 1: to connect to the mongoDB server
try {
  await mongoose.connect("mongodb://127.0.0.1/mongoose_middleware");
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
  updatedAt: { type: Date, default: Date.now() },
});

userSchema.pre(
  ["updateOne", "updateMany", "findOneAndUpdate"],
  function () {
    this.set({ updatedAt: Date.now() });
    //next();
  },
);

//step 3 : creating a model
const Users = mongoose.model("user", userSchema);

// await Users.create({ name: "Raju", age: 31, email: "raju@gmail.com" });
// await Users.create({ name: "Amit", age: 30, email: "amit@gmail.com" });
// await Users.create({ name: "Laxmi", age: 26, email: "laxmi@gmail.com" });

await Users.updateOne({ name: "Raju" }, { $set: { age: 31 } });

process.exit();
