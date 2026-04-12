import { readFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import {
  getLinkByShortCode,
  loadLinks,
  saveLinks,
} from "../models/shortener.model.js";

export const getShortenerPage = async (req, res) => {
  try {
    const links = await loadLinks();

    return res.render("index", {
      links,
      host: req.host,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const postShortenLink = async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    // Validation
    if (!url) {
      return res.status(400).send("URL is required");
    }

    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    //const links = await loadLinks();
    const link = await getLinkByShortCode(finalShortCode);

    if (link) {
      return res
        .status(400)
        .send(
          `<h1>URL with that shortcode already exists,please choose another <a href="/">Go Back</a> </h1>`,
        );
    }

    // Save link
    // links[finalShortCode] = url;

    // await saveLinks(links);

    await saveLinks({ url, shortCode:finalShortCode });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await getLinkByShortCode(shortCode);

    // const links = await loadLinks();

    if (!link) {
      return res.status(404).send("404 error occurred");
    }

    return res.redirect(link.url);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
