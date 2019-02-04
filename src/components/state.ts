export default function(env: any, name: string, defaultValue: any) {
  const { state } = env;

  if (!state[name]) {
    state[name] = defaultValue;
  }

  return [state[name], (newValue: any) => (state[name] = newValue)];
}
