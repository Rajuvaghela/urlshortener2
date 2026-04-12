import { db } from "../config/db-client.js";

//const shortenerCollection = db.collection("shorteners");

export const loadLinks = async () => {
  const [rows] = await db.execute(`select * from short_links`);
  return rows;
};

export const saveLinks = async ({ url, shortCode }) => {
  console.log(shortCode,url);
  const [result] = await db.execute(
    "insert into short_links(short_code,url) values(?,?)",
    [shortCode, url],
  );
  return result;
};

export const getLinkByShortCode = async (shortCode) => {
  const [rows] = await db.execute(
    `select * from short_links where short_code=?`,
    [shortCode],
  );

  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};
