import defaultShader from "./default";
import combineShader from "./combine";

export { ShaderProgramInfo } from "./create";

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
export type ShaderLookup =
  | {
      id: "default";
      param: null;
    }
  | {
      id: "combine";
      param: string[];
    };
