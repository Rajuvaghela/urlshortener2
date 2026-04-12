import express from "express";
import { getShortenerPage, postShortenLink, redirectToShortLink } from "../controllers/shortener.controller.js";

const router = express.Router();


router.get("/",getShortenerPage);

router.post("/",postShortenLink);


router.get("/:shortCode",redirectToShortLink);

export const shorterRoutes = router;
