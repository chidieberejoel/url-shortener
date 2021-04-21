import cors from "cors";
import helmet from "helmet";

import config from "../config";
import redirect from "./controller";

export default {
  init: (app) => {
    app.use(cors());
    app.use(
      helmet({
        contentSecurityPolicy:
          config.nodeEnv === "production" ? undefined : false,
      }),
    );
  },
  route: (app, express) => {
    app.use(express.json());
    app.get("/:shortUrl", redirect.redirect);
  },
};
