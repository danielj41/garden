// https://raw.githubusercontent.com/mdn/webgl-examples/gh-pages/tutorial/sample2/webgl-demo.js

import defaultShader from "./shaders/default";
import square from "./models/square";
import renderScene from "./render/render-scene";

main();

//
// Start here
//
function main() {
  const canvas: HTMLCanvasElement = document.querySelector("#gl-canvas");
  const gl = canvas.getContext("webgl");

  // If we don't have a GL context, give up now

  if (!gl) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  const programInfo = defaultShader(gl);

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = square(gl);

  // Draw the scene
  renderScene(gl, programInfo, buffers);
}
