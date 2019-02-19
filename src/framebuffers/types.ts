export interface FramebufferInfo {
  framebuffer: WebGLFramebuffer;
  targetTexture?: WebGLTexture;
  getAspectRatio: () => number;
  use: () => void;
}
