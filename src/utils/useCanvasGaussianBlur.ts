import { useAtomValue } from "jotai/index";
import { useCallback } from "react";
import { blurRadiusAtom } from "../variables/blurRadius.ts";

export const useCanvasGaussianBlur = () => {
  const blur = useAtomValue(blurRadiusAtom);

  return useCallback(
    (canvas: OffscreenCanvas) => {
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
    },
    [blur],
  );
};
