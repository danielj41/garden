import { getCanvasOverDOMNode } from "./canvas-over-dom-node";
import { getTexture } from "./texture";

export { FramebufferInfo } from "./types";

const framebuffers = {
  texture: {
    type: "texture" as "texture",
    get: getTexture
  },
  domNode: {
    type: "domNode" as "domNode",
    get: getCanvasOverDOMNode
  }
};

export default framebuffers;
export type FramebufferType = keyof typeof framebuffers;
