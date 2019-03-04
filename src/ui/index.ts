import { Dispatch } from "redux";

import nodesSlice from "../state/nodes";

export function listen(dispatch: Dispatch) {
  document.querySelector(".single-layers").scrollLeft = window.innerWidth;
  Array.from(document.querySelectorAll(".layer")).forEach(
    (layerEl: HTMLDivElement) => {
      layerEl.addEventListener("click", (e: MouseEvent) => {
        const {
          left,
          right,
          bottom,
          top,
          width,
          height
        } = layerEl.getBoundingClientRect();

        const x = ((e.pageX - (left + right) / 2) / width) * 2;
        const y = -((e.pageY - (top + bottom) / 2) / height) * 2;

        const id = `${Math.floor(Math.random() * 10000000)}`; // TODO: GUID

        dispatch(
          nodesSlice.actions.create({
            id,
            idLayer: layerEl.id,
            x,
            y
          })
        );
      });
    }
  );
}
