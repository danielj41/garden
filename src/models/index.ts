import square from "./square";

export { ModelBuffers } from "./create";

const models = {
  square: {
    id: "square" as "square",
    get: square
  }
};

export default models;
export type IdModel = keyof typeof models;

export type ModelLookup = {
  id: IdModel;
};
