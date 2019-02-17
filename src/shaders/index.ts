import defaultShader from "./default";

const shaders = {
  default: {
    id: "default" as "default",
    shader: defaultShader
  }
};

export default shaders;
export type IdShader = keyof typeof shaders;
