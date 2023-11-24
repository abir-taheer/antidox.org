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

    blur()
      .then((result) => {
        setResultUrl(result);
        setStep(3);
      })
      .finally(() => {
        setIsBlurring(false);
      });
  }, [blur, setIsBlurring, setResultUrl, setStep]);

  return <Button {...buttonProps} loading={isBlurring} onClick={onClick} />;
};
