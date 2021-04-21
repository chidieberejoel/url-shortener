import { randomBytes } from "crypto";
import config from "../config/index";

const roleName = `a${randomBytes(4).toString("hex")}`;

const opts = {
  roleName,
  default: config.development,
  options: {
    ...config.development,
    ...{
      user: roleName,
      password: roleName,
    },
  },
  dir: config.dir,
  direction: config.direction,
  schema: roleName,
};

export default opts;
