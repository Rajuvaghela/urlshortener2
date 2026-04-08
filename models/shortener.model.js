// import { readFile, writeFile, mkdir } from "fs/promises";
// import path from "path";

// const DATA_DIR = path.join("express", "data");
// //const DATA_FILE = path.join(DATA_DIR, "links.json");

// // Load links
// export const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     // If file or folder doesn't exist → create it
//     if (error.code === "ENOENT") {
//       await mkdir(DATA_DIR, { recursive: true });
//       await writeFile(DATA_FILE, JSON.stringify({}, null, 2));
//       return {};
//     }
//     throw error;
//   }
// };

// // Save links
// export const saveLinks = async (links) => {
//   await mkdir(DATA_DIR, { recursive: true });

//   await writeFile(
//     DATA_FILE,
//     JSON.stringify(links, null, 2) // pretty format
//   );
// };


import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";


const db= dbClient.db(env.MONGODB_DATABASE_NAME);

const shortenerCollection= db.collection("shorteners");

export const loadLinks  =async () =>{
  return shortenerCollection.find().toArray();
};

export const saveLinks = async (link)=>{
 
  return shortenerCollection.insertOne(link);
};

export const getLinkByShortCode = async (shortCode) => {
  return shortenerCollection.findOne({shortCode:shortCode});
}