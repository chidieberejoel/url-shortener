import { isURL } from "validator";

const inputValidator = (param) => {
  let validate;

  try {
    validate = isURL(param);
  } catch (e) {
    validate = null;
  }
  return validate;
};

export default inputValidator;
