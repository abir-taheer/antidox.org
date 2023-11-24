import { Button } from "@mui/joy";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { resultUrlAtom } from "../../variables/resultUrl.ts";
import { stepAtom } from "../../variables/step.ts";
import { uploadedFileAtom } from "../../variables/uploadedFile.ts";

export const ResultStep = () => {
  const uploadedFile = useAtomValue(uploadedFileAtom);
  const resultUrl = useAtomValue(resultUrlAtom);
  const setStep = useSetAtom(stepAtom);

  useEffect(() => {
    if (!resultUrl) {
      return;
    }
  }, [resultUrl]);

  if (!resultUrl) {
    return null;
  }

  const filename = uploadedFile!.name.replace(/\.[^.]+$/, "");

  return (
    <>
      <img src={resultUrl} alt={uploadedFile!.name} />
      <a href={resultUrl} download={filename + "_blurred" + ".png"}>
        <Button fullWidth>Download Image</Button>
      </a>

      <Button variant={"outlined"} onClick={() => setStep(2)}>
        Go Back
      </Button>
    </>
  );
};
