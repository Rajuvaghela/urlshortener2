import express from "express";
import { getShortenerPage, postUrlShortener, redirectToShortLink } from "../controllers/shortener.controller.js";

const router = express.Router();


router.get("/",getShortenerPage);

router.post("/",postUrlShortener);


router.get("/:shortCode",redirectToShortLink);

export const shorterRoutes = router;
