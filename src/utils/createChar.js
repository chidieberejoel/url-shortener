import { customAlphabet } from "nanoid";

const generateSID = () => {
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    6,
  );
  let value = nanoid();

  // eslint-disable-next-line eqeqeq
  while (value == "graphiql") {
    value = nanoid();
  }

  return value;
};

export default generateSID;
