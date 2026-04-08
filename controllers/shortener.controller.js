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
    const file = await readFile(path.join("public", "index1.html"));
     const links = await loadLinks();
    
    //console.log("links", links);
    const content = file.toString().replaceAll(
      "{{shortened_urls}}",
      links
        .map((item) => {
          const { shortCode, url } = item;

          const shortUrl = url.length > 30 ? `${url.slice(0, 30)}...` : url;

          return `
        <li>
          <a href="/${shortCode}" target="_blank">
            ${req.headers.host}/${shortCode}
          </a>
          - ${shortUrl}
        </li>
      `;
        })
        .join(""),
    );

    return res.send(content);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const postUrlShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    // Validation
    if (!url) {
      return res.status(400).send("URL is required");
    }

    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();

    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another");
    }

    // Save link
    // links[finalShortCode] = url;

    // await saveLinks(links);

    await saveLinks({ url, shortCode });

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
