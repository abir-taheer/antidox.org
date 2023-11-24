import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { detectionsAtom } from "../variables/detections.ts";
import { offscreenImageAtom } from "../variables/offscreenCanvas.ts";
import { useCanvasGaussianBlur } from "./useCanvasGaussianBlur.ts";

export const useBlurImage = () => {
  const blurCanvas = useCanvasGaussianBlur();
  const image = useAtomValue(offscreenImageAtom);
  const detections = useAtomValue(detectionsAtom);

  const blurImage = useCallback(() => {
    if (!image) {
      alert("error, no image uploaded");
      return;
    }

    if (!detections) {
      alert("error, no faces loaded");
      return;
    }

    const canvas = new OffscreenCanvas(image.width, image.height);
    const context = canvas.getContext("2d")!;

    context.drawImage(image, 0, 0);

    detections.forEach((detection) => {
      if (!detection.enabled) {
        return;
      }

      let targetWidth = detection.width;

      if (targetWidth > 200) {
        targetWidth = 200;
      }

      const scaleFactor = detection.width / targetWidth;
      const targetHeight = Math.floor(detection.height / scaleFactor);

      const box = new OffscreenCanvas(targetWidth, targetHeight);
      const boxContext = box.getContext("2d")!;

      boxContext.drawImage(
        image,
        detection.x,
        detection.y,
        detection.width,
        detection.height,
        0,
        0,
        targetWidth,
        targetHeight,
      );

      blurCanvas(box);

      // An intermediary to resize back to original dimensions
      const fullSizeBox = new OffscreenCanvas(
        detection.width,
        detection.height,
      );

      const fullSizeBoxContext = fullSizeBox.getContext("2d")!;
      fullSizeBoxContext.drawImage(
        box,
        0,
        0,
        targetWidth,
        targetHeight,
        0,
        0,
        detection.width,
        detection.height,
      );

      context.putImageData(
        fullSizeBoxContext.getImageData(
          0,
          0,
          detection.width,
          detection.height,
        ),
        detection.x,
        detection.y,
        0,
        0,
        detection.width,
        detection.height,
      );
    });

    return canvas;
  }, [detections, blurCanvas, image]);

  return blurImage;
};
