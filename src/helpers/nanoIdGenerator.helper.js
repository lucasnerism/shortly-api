import { nanoid } from "nanoid";

const generateId = () => {
  return nanoid(8);
};

export default generateId;