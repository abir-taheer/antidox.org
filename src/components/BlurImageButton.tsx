import { Button, ButtonProps } from "@mui/joy";
import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { useBlurImage } from "../utils/useBlurImage.ts";
import { isBlurringImageAtom } from "../variables/isBlurringImage.ts";
import { resultUrlAtom } from "../variables/resultUrl.ts";
import { stepAtom } from "../variables/step.ts";

export type BlurImageButtonProps = Partial<ButtonProps>;

export const BlurImageButton = ({ ...buttonProps }: BlurImageButtonProps) => {
  const blur = useBlurImage();
  const [isBlurring, setIsBlurring] = useAtom(isBlurringImageAtom);
  const setResultUrl = useSetAtom(resultUrlAtom);
  const setStep = useSetAtom(stepAtom);

  const onClick = useCallback(() => {
    setIsBlurring(true);

    setTimeout(async () => {
      try {
        const canvas = blur();
        if (!canvas) {
          throw new Error("no canvas");
        }

        const blob = await canvas.convertToBlob({
          type: "image/png",
          quality: 1,
        });

        const url = URL.createObjectURL(blob);

        setResultUrl(url);
        setStep(3);
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert("error: " + e.message);
        }
      } finally {
        setIsBlurring(false);
      }

      setIsBlurring(false);
    }, 200);
  }, [blur, setIsBlurring, setResultUrl, setStep]);

  return <Button {...buttonProps} loading={isBlurring} onClick={onClick} />;
};
