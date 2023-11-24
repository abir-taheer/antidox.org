import { atom } from "jotai";
import { jotaiStore } from "./store.ts";
import { uploadedFileAtom } from "./uploadedFile.ts";

export type Detection = {
  id: string;
  enabled: boolean;

  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
};

export const detectionsAtom = atom<Detection[] | null>(null);

jotaiStore.sub(uploadedFileAtom, () => {
  jotaiStore.set(detectionsAtom, null);
});
