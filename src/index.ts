// https://raw.githubusercontent.com/mdn/webgl-examples/gh-pages/tutorial/sample2/webgl-demo.js

import renderScene from "./render/render-scene";
import movingSquare from "./entities/moving-square";

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

  const entities = [
    {
      state: {},
      render: movingSquare
    }
  ];

  // Draw the scene
  const render = () => {
    renderScene(gl, entities);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}
