import memoize from "fast-memoize";

export interface FramebufferInfo {
  framebuffer: WebGLFramebuffer;
  targetTexture?: WebGLTexture;
  getAspectRatio: () => number;
  use: () => void;
}

let index = 0;

// TODO: probably just import a singleton `gl` rather than memoizing everything
export const getFramebuffer = memoize(
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

        // Clear the canvas AND the depth buffer.
        gl.clearColor(0, id === "l2" ? 0.5 : 0, id === "l1" ? 0.5 : 0, 1); // clear to blue
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
    };
  }
);

export const getCanvas = memoize(
  (gl: WebGLRenderingContext): FramebufferInfo => {
    return {
      framebuffer: null,
      getAspectRatio: () => gl.canvas.clientWidth / gl.canvas.clientHeight,
      use: () => {
        // render to the canvas
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

        // Clear the canvas before we start drawing on it.

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
    };
  }
);
