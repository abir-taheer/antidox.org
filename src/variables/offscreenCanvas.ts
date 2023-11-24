import { atom } from "jotai";
import { jotaiStore } from "./store.ts";
import { uploadedFileAtom } from "./uploadedFile.ts";

export const offscreenImageAtom = atom<null | HTMLImageElement>(null);

jotaiStore.sub(uploadedFileAtom, () => {
  const file = jotaiStore.get(uploadedFileAtom);
  if (!file) {
    jotaiStore.set(offscreenImageAtom, null);
    return;
  }

  const image = new Image();
  image.src = URL.createObjectURL(file);

  image.onload = () => {
    // at this point it should know the width and height of the uploaded image, we can safely return the value
    jotaiStore.set(offscreenImageAtom, image);
  };
});
