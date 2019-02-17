import defaultShader from "./default";
import combineShader from "./combine";

const shaders = {
  default: {
    id: "default" as "default",
    shader: defaultShader
  },
  combine: {
    id: "combine" as "combine",
    shader: combineShader
  }
};

export default shaders;
export type IdShader = keyof typeof shaders;
