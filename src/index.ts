// https://raw.githubusercontent.com/mdn/webgl-examples/gh-pages/tutorial/sample2/webgl-demo.js

import { createStore } from "redux";
import { reducer } from "./reducers";

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

  const store = createStore(reducer);

  document.addEventListener("click", () => {
    store.dispatch({ type: "NODE_UPDATE_POSITION", id: "1", x: 0.3, y: 0.1 });
  });

  // Draw the scene
  const render = () => {
    renderScene(gl, store);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}
