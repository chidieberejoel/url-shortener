/* eslint-disable no-unused-vars */
import { UserInputError } from "apollo-server-express";

import validate from "../utils/urlValidator";
import char from "../utils/createChar";
import testChar from "../utils/getChar";
import config from "../config";

const Mutation = {
  /**
   *
   * @param {String} url
   * @description - Gets URL, processes URL and returns a Short URL
   */
  shortenURL: async (_root, { url }, { UrlDB }) => {
    const errors = [];

    if (!validate(url)) {
      errors.push({
        message: "Input URL is invalid :/",
      });
    }

    if (url.length > 2048) {
      errors.push({ message: "Maximum Url length exceeded" });
    }

    if (errors.length > 0) {
      throw new UserInputError(
        "Failed to get ShortUrl due to validation error(s)",
        { errors },
      );
    }

    try {
      let shortUrl = char();
      const exists = await UrlDB.findByUrl(shortUrl);

      while (exists) {
        shortUrl = char();
        if (UrlDB.findByUrl(shortUrl)) break;
      }

      testChar.value = shortUrl;

      const data = await UrlDB.insert(url, shortUrl);

      return {
        data: `${config.hostUrl}/${data.shortUrl}`,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
};

export { Mutation as default };
