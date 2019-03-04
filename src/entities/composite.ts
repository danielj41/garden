import { mat4 } from "gl-matrix";

import { Render } from "./types";

const renderCompositeLayer: Render = function*(state) {
  const matrix = mat4.create();
  mat4.translate(matrix, matrix, [0, 0, 0]);

  // all layers combined
  yield {
    framebuffer: {
      type: "domNode",
      id: "composite"
    },
    shader: {
      id: "combine",
      param: Object.entries(state.layers).map(([idLayer, { blendMode }]) => ({
        idFramebuffer: idLayer,
        mode: blendMode === "add" ? 0.5 : -5 // TODO: change to 1:-1 or enum or something
      }))
    },
    model: {
      id: "square" // TODO: Use rounded rectangle
    },
    modelMatrix: matrix
  };

  // single layer
  for (const idLayer in state.layers) {
    yield {
      framebuffer: {
        type: "domNode",
        id: idLayer
      },
      shader: {
        id: "combine",
        param: [
          {
            idFramebuffer: idLayer,
            mode: 1
          }
        ]
      },
      model: {
        id: "square"
      },
      modelMatrix: matrix
    };
  }
};

export default renderCompositeLayer;
