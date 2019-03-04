import { mat4 } from "gl-matrix";

import nodesSlice, { Node } from "../state/nodes";
import { RenderTask } from "../renderer/types";

import { Render } from "./types";

const renderNodes: Render = function*(state) {
  const nodes = nodesSlice.selectors.getNodes(state);

  for (const node of Object.values(nodes)) {
    yield* renderNode(node);
  }
};

const renderNode = function*(node: Node): Iterable<RenderTask> {
  const matrix = mat4.create();
  mat4.translate(matrix, matrix, [node.x, node.y, 0]);

  const colors: { [idLayer: string]: number[] } = {
    l1: [0x47 / 0xff, 0xe5 / 0xff, 0xbc / 0xff, 1], // TODO: convert the literals to rgba instead of hex
    l2: [0xae / 0xff, 0xcf / 0xff, 0xdf / 0xff, 1],
    l3: [0x93 / 0xff, 0x74 / 0xff, 0x8a / 0xff, 1]
  };

  yield {
    framebuffer: {
      type: "texture",
      id: node.idLayer
    },
    shader: {
      id: "default",
      param: { color: colors[node.idLayer] }
    },
    model: {
      id: "square"
    },
    modelMatrix: matrix
  };
};

export default renderNodes;
