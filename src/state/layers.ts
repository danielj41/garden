import { createSlice } from "redux-starter-kit";

interface Layers {
  [id: string]: Layer;
}

type BlendMode = "add" | "subtract";

export interface Layer {
  blendMode: BlendMode;
}

const initialState: Layers = {
  l1: {
    blendMode: "subtract"
  },
  l2: {
    blendMode: "add"
  },
  l3: {
    blendMode: "add"
  }
};

export default createSlice({
  slice: "layers",
  initialState,
  reducers: {}
});
