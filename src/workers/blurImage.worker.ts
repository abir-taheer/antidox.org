import { Detection } from "../variables/detections.ts";

export const blurImageWorker = () => {
  /*
   * Example message
   *
   */

  self.onmessage = async (event) => {
    const detections = event.data.detections as Detection[];
    const blur = event.data.blurRadius as number;
    const imageDataBuffer = event.data.imageDataBuffer as ArrayBuffer;
    const width = event.data.width as number;
    const height = event.data.height as number;

    const imageData = new ImageData(
      new Uint8ClampedArray(imageDataBuffer),
      width,
      height,
    );

    const canvas = new OffscreenCanvas(width, height);

    const context = canvas.getContext("2d")!;
    context.putImageData(imageData, 0, 0);

    const blurCanvas = (canvas: OffscreenCanvas) => {
      const ctx = canvas.getContext("2d")!;

      let sum = 0;
      const delta = 5;
      const alpha_left = 1 / (2 * Math.PI * delta * delta);
      const getStep = () =>
        Math.random() > 0.5 ? 2 : Math.random() > 0.5 ? 2 : 3;

      for (let y = -blur; y <= blur; y += getStep()) {
        for (let x = -blur; x <= blur; x += getStep()) {
          const weight =
            alpha_left * Math.exp(-(x * x + y * y) / (2 * delta * delta));
          sum += weight;
        }
      }
      for (let y = -blur; y <= blur; y += getStep()) {
        for (let x = -blur; x <= blur; x += getStep()) {
          ctx.globalAlpha =
            ((alpha_left * Math.exp(-(x * x + y * y) / (2 * delta * delta))) /
              sum) *
            blur;
          ctx.drawImage(canvas, x, y);
        }
      }
      ctx.globalAlpha = 1;
    };

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
        canvas,
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

    const url = await canvas
      .convertToBlob({ type: "image/png", quality: 1 })
      .then((blob) => URL.createObjectURL(blob));

    postMessage({ url });
  };
};
