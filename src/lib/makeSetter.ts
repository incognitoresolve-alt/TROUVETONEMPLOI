/** Shared single-field updater for a form section backed by one `onChange(nextValue)` callback. */
export function makeSetter<T>(value: T, onChange: (value: T) => void) {
  return <K extends keyof T>(key: K, v: T[K]) => onChange({ ...value, [key]: v });
}
