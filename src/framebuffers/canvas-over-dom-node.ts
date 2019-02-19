import memoize from "fast-memoize";

import { FramebufferInfo } from "./types";

export const getCanvasOverDOMNode = memoize(
  (gl: WebGLRenderingContext, elemId: string): FramebufferInfo => {
    return {
      framebuffer: null,
      getAspectRatio: () => {
        const el = document.getElementById(elemId);
        const { width, height } = el.getBoundingClientRect();
        return width / height;
      },
      use: () => {
        // render to the canvas
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // Tell WebGL how to convert from clip space to pixels
        const el = document.getElementById(elemId);
        const { left, top, width, height } = el.getBoundingClientRect();
        gl.enable(gl.SCISSOR_TEST);
        gl.viewport(left, gl.canvas.height - top - height, width, height);
        gl.scissor(left, gl.canvas.height - top - height, width, height);

        gl.clearColor(1.0, 1.0, 1.0, 0.0); // Clear to transparent
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

        // Clear the canvas before we start drawing on it.

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
    };
  }
);
