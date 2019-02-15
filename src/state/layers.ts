import { createSlice } from "redux-starter-kit";

interface Layers {
  [id: string]: Layer;
}

type BlendMode = "add" | "subtract";

interface Layer {
  blendMode: BlendMode;
  orientation: number;
  order: number;
}

const initialState: Layers = {};

export const layers = createSlice({
  slice: "layers",
  initialState,
  reducers: {}
});
