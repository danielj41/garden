import square from "./square";

const models = {
  square: {
    id: "square" as "square",
    model: square
  }
};

export default models;
export type IdModel = keyof typeof models;
