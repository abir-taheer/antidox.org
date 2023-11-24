import { Button, ButtonProps } from "@mui/joy";
import * as faceapi from "face-api.js";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { detectionsAtom } from "../variables/detections.ts";
import { isLookingForFacesAtom } from "../variables/isLookingForFaces.ts";
import { minimumConfidenceAtom } from "../variables/minimumConfidence.ts";
import { offscreenImageAtom } from "../variables/offscreenCanvas.ts";
import { stepAtom } from "../variables/step.ts";

export type FindFacesButtonProps = {} & Omit<Partial<ButtonProps>, "onClick">;

export const FindFacesButton = ({ ...buttonProps }: FindFacesButtonProps) => {
  const minConfidence = useAtomValue(minimumConfidenceAtom);
  const offscreenImage = useAtomValue(offscreenImageAtom);
  const setDetections = useSetAtom(detectionsAtom);
  const isLookingForFaces = useAtomValue(isLookingForFacesAtom);
  const setIsLookingForFaces = useSetAtom(isLookingForFacesAtom);
  const setStep = useSetAtom(stepAtom);

  const onClick = useCallback(async () => {
    if (!offscreenImage) {
      alert("error, no image uploaded");
      return;
    }

    setIsLookingForFaces(true);

    // We put this in a setTimeout
    // so that the ui update to tell react about us loading the faces doesn't get blocked by tensorflow
    setTimeout(async () => {
      try {
        const faceDetections = await faceapi.detectAllFaces(
          offscreenImage,
          new faceapi.SsdMobilenetv1Options({
            minConfidence,
          }),
        );

        const detections = faceDetections.map((d) => {
          const values = [d.box.x, d.box.y, d.box.width, d.box.height].map(
            Math.floor,
          );

          const [x, y, width, height] = values;
          const confidence = Number(d.score.toFixed(3));
          const id = values.join("-");

          return {
            id,
            enabled: true,
            x,
            y,
            width,
            height,
            confidence,
          };
        });

        setDetections(detections);
        setStep(2);
      } finally {
        setIsLookingForFaces(false);
      }
    }, 100);
  }, [minConfidence, offscreenImage, setDetections, setIsLookingForFaces]);

  return (
    <Button
      {...buttonProps}
      onClick={onClick}
      //If there's nothing to find images of, do not allow button to be clicked
      disabled={!offscreenImage}
      loading={isLookingForFaces}
    />
  );
};
