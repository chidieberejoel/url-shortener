import logger from "../config/winstonlog";
import UrlDB from "../dbs/UrlDB";

class getRedirect {
  static async redirect(req, res) {
    const { shortUrl } = req.params;
    if (!shortUrl) {
      return res.status(400).send({
        status: "error",
        message: "Short Url not provided",
      });
    }

    try {
      const instance = await UrlDB.findByUrl(shortUrl);
      if (!instance) {
        return res.status(404).send({
          status: "error",
          message: "URL not found",
        });
      }

      /*
      Since we allow URLs without protocols, Eg "backdrop.photo",
      we need to be able to redirect to the URL as an external URL
      by stripping the protocol and allowing the browser handle it.
      */

      const strippedUrl = instance.url.replace(/^https?:\/\/|ftp?:\/\//i, "");

      res.redirect(`//${strippedUrl}`);
      logger.info(`/${shortUrl} redirected to ${instance.url}, successfully`);
    } catch (err) {
      res.status(500).send(err);
      logger.warn(`Error redirecting to URL: ${err}`);
    }

    return true;
  }
}

export default getRedirect;
