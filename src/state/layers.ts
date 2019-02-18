import { createSlice } from "redux-starter-kit";

interface Layers {
  [id: string]: Layer;
}

type BlendMode = "add" | "subtract";

export interface Layer {
  blendMode: BlendMode;
  orientation: number;
  order: number;
}

const initialState: Layers = {
  l1: {
    blendMode: "add",
    orientation: 0,
    order: 0
  },
  l2: {
    blendMode: "add",
    orientation: 0,
    order: 0
  }
};

export default createSlice({
  slice: "layers",
  initialState,
  reducers: {}
});
