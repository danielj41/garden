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

  function resizeCanvas() {
    if (
      canvas.width != canvas.clientWidth ||
      canvas.height != canvas.clientHeight
    ) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      console.log("resized canvas: " + canvas.width + ", " + canvas.height);
    }
  }

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
    resizeCanvas();
    renderScene(gl, store);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}
