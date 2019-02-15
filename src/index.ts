// https://raw.githubusercontent.com/mdn/webgl-examples/gh-pages/tutorial/sample2/webgl-demo.js

import { configureStore } from "redux-starter-kit";
import { reducer } from "./state";
import nodesSlice from "./state/nodes";

import renderScene from "./renderer/render-scene";

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

  const store = configureStore({
    reducer: reducer
  });

  document.addEventListener("click", () => {
    store.dispatch(
      nodesSlice.actions.updatePosition({
        x: 0.1,
        y: 0.01,
        id: "1"
      })
    );
  });

  // Draw the scene
  const render = () => {
    renderScene(gl, store);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}
