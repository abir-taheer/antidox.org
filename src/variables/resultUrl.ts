import { atom } from "jotai";
import { detectionsAtom } from "./detections.ts";
import { jotaiStore } from "./store.ts";

export const resultUrlAtom = atom<string | null>(null);

jotaiStore.sub(detectionsAtom, () => {
  jotaiStore.set(resultUrlAtom, null);
});
