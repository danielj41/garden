// https://raw.githubusercontent.com/mdn/webgl-examples/gh-pages/tutorial/sample2/webgl-demo.js

import init from "./init";

const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

export default (gl: WebGLRenderingContext) => init(gl, positions);
