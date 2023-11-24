import { Slider, Stack, Typography } from "@mui/joy";
import { useAtom, useAtomValue } from "jotai";
import { minimumConfidenceAtom } from "../../variables/minimumConfidence.ts";
import { uploadedFileAtom } from "../../variables/uploadedFile.ts";
import { FindFacesButton } from "../FindFacesButton.tsx";
import { UploadImageButton } from "../UploadImageButton.tsx";
import { UploadedImagePreview } from "../UploadedImagePreview.tsx";

export const SelectImageStep = () => {
  const file = useAtomValue(uploadedFileAtom);
  const [minConfidence, setMinConfidence] = useAtom(minimumConfidenceAtom);

  return (
    <>
      <Typography level={"body-md"} textAlign={"center"}>
        First, choose an image from your gallery
      </Typography>

      <UploadImageButton fullWidth variant={file ? "outlined" : undefined}>
        Select Image
      </UploadImageButton>

      {file && (
        <>
          <UploadedImagePreview />

          <Stack>
            <Typography level={"body-md"} textAlign={"center"}>
              Face Detection Sensitivity
            </Typography>
            <Slider
              aria-label="Face Detection Sensitivity"
              step={0.1}
              marks
              valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
              min={0.1}
              max={0.9}
              value={1 - minConfidence}
              onChange={(_, value) => setMinConfidence(1 - (value as number))}
              valueLabelDisplay="auto"
            />
          </Stack>

          <FindFacesButton>Find Faces In This Image</FindFacesButton>

          <Typography level={"body-sm"} textAlign={"center"}>
            This page might freeze for a second or two after you click the
            button while it runs the AI models on your device.
          </Typography>
        </>
      )}
    </>
  );
};
