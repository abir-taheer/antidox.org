import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { blurRadiusAtom } from "../variables/blurRadius.ts";
import { detectionsAtom } from "../variables/detections.ts";
import { offscreenImageAtom } from "../variables/offscreenCanvas.ts";
import WebWorker from "../workers/WebWorker.ts";
import { blurImageWorker } from "../workers/blurImage.worker.ts";

export const useBlurImage = () => {
  const image = useAtomValue(offscreenImageAtom);
  const detections = useAtomValue(detectionsAtom);
  const blurRadius = useAtomValue(blurRadiusAtom);

  const blurImage = useCallback(
    () =>
      new Promise<string>((resolve) => {
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

        const imageDataBuffer = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        ).data.buffer;

        const worker = new WebWorker(blurImageWorker);

        worker.onmessage = (event) => {
          resolve(event.data.url);
        };

        worker.postMessage(
          {
            imageDataBuffer,
            detections,
            blurRadius,
            width: image.width,
            height: image.height,
          },
          [imageDataBuffer],
        );

        return;
      }),
    [blurRadius, detections, image],
  );

  return blurImage;
};
