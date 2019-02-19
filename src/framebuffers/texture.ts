import memoize from "fast-memoize";

import { FramebufferInfo } from "./types";

// TODO: probably just import a singleton `gl` rather than memoizing everything
export const getTexture = memoize(
  (gl: WebGLRenderingContext, id: string): FramebufferInfo => {
    // lazily create a new framebuffer `id` if it doesn't already exist

    // Create and bind the framebuffer
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

    // create to render to
    const targetTextureWidth = 256;
    const targetTextureHeight = 256;
    const targetTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, targetTexture);

    {
      // define size and format of level 0
      const level = 0;
      const internalFormat = gl.RGBA;
      const border = 0;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;
      const data: null = null;
      gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        internalFormat,
        targetTextureWidth,
        targetTextureHeight,
        border,
        format,
        type,
        data
      );

      // set the filtering so we don't need mips
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    // attach the texture as the first color attachment
    const level = 0;
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      attachmentPoint,
      gl.TEXTURE_2D,
      targetTexture,
      level
    );

    return {
      framebuffer: fb,
      targetTexture,
      getAspectRatio: () => targetTextureWidth / targetTextureHeight,
      use: () => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.bindTexture(gl.TEXTURE_2D, targetTexture);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);
        gl.disable(gl.SCISSOR_TEST);

        // Clear the canvas AND the depth buffer.
        gl.clearColor(0, id === "l2" ? 0.5 : 0, id === "l1" ? 0.5 : 0, 1); // clear to blue
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
    };
  }
);
