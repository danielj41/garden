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

const initialState: Layers = {};

export default createSlice({
  slice: "layers",
  initialState,
  reducers: {}
});
