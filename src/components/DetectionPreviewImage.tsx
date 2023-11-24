import { useAtomValue } from "jotai";
import { HTMLProps, useEffect, useState } from "react";
import { Detection } from "../variables/detections.ts";
import { offscreenImageAtom } from "../variables/offscreenCanvas.ts";

export type DetectionPreviewImageProps = {
  detection: Detection;
} & Partial<HTMLProps<HTMLImageElement>>;

export const DetectionPreviewImage = ({
  detection,
  ...imageProps
}: DetectionPreviewImageProps) => {
  const offscreenImage = useAtomValue(offscreenImageAtom);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!offscreenImage) {
      return;
    }

    const offscreenCanvas = new OffscreenCanvas(
      detection.width,
      detection.height,
    );
    const ctx = offscreenCanvas.getContext("2d")!;

    ctx.drawImage(
      offscreenImage,
      detection.x,
      detection.y,
      detection.width,
      detection.height,
      0,
      0,
      detection.width,
      detection.height,
    );

    offscreenCanvas
      .convertToBlob({ type: "image/jpeg", quality: 0.8 })
      .then((blob) => {
        setSrc(URL.createObjectURL(blob));
      });
  }, [
    detection.height,
    detection.width,
    detection.x,
    detection.y,
    offscreenImage,
  ]);

  if (!src) {
    return null;
  }

  return <img src={src} alt={"face"} {...imageProps} />;
};
