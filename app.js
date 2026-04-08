import express from "express";

import path from "path";
import { fileURLToPath } from "url";
import { shorterRoutes } from "./routes/shortener.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(shorterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
