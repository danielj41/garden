import { Env, StateUpdateTask } from "../render/types";

export function* defaultState(
  env: Env,
  key: string,
  defaultValue: any
): IterableIterator<StateUpdateTask> {
  const { state } = env;

  if (state[key] === undefined) {
    yield {
      type: "state-update",
      id: env.id,
      key,
      value: defaultValue
    };
  }
}

export function getState(env: Env, key: string, defaultValue: any) {
  const { state } = env;

  return state[key] === undefined ? defaultValue : state[key];
}

export function* setState(
  env: Env,
  key: string,
  value: any
): IterableIterator<StateUpdateTask> {
  yield {
    type: "state-update",
    id: env.id,
    key,
    value
  };
}
