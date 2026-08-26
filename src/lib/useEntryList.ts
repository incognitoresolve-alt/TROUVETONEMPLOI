interface WithId {
  id: string;
}

/** Shared add/update/remove logic for a `{id}`-keyed array backed by a single `onChange(nextArray)` callback. */
export function useEntryList<T extends WithId>(value: T[], onChange: (value: T[]) => void, makeEmpty: () => T) {
  function update(id: string, patch: Partial<T>) {
    onChange(value.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function remove(id: string) {
    onChange(value.filter((item) => item.id !== id));
  }

  function add() {
    onChange([...value, makeEmpty()]);
  }

  return { update, remove, add };
}
