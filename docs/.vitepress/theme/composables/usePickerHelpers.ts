import { ref, watch } from "vue";
import { readHashParam, writeHashParam } from "./useHashParams";

/** Create a hash-synced ref for string picker fields (format, search, etc.). */
export function useHashParamRef(key: string, defaultValue: string) {
  const value = ref(readHashParam(key) ?? defaultValue);
  watch(value, (next) => writeHashParam(key, next, defaultValue));
  return value;
}

/** Toggle a string inside a Set and return the next Set instance. */
export function toggleStringInSet(source: ReadonlySet<string>, name: string): Set<string> {
  const next = new Set(source);
  if (next.has(name)) next.delete(name);
  else next.add(name);
  return next;
}
