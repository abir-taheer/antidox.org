import {
  Button,
  Checkbox,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
  Slider,
  Stack,
  Typography,
} from "@mui/joy";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { blurRadiusAtom } from "../../variables/blurRadius.ts";
import { detectionsAtom } from "../../variables/detections.ts";
import { stepAtom } from "../../variables/step.ts";
import { BlurImageButton } from "../BlurImageButton.tsx";
import { DetectionPreviewImage } from "../DetectionPreviewImage.tsx";

export const SelectFaces = () => {
  const [detections, setDetections] = useAtom(detectionsAtom);
  const setStep = useSetAtom(stepAtom);
  const [blurRadius, setBlurRadius] = useAtom(blurRadiusAtom);

  useEffect(() => {
    if (!detections) {
      setStep(1);
    }
  }, [detections, setStep]);

  if (!detections) {
    return null;
  }

  return (
    <>
      <Typography level={"body-md"} textAlign={"center"}>
        Then, choose any faces to exclude
      </Typography>

      <Stack sx={{ minHeight: 200 }} justifyContent={"center"}>
        {!detections.length && (
          <Typography color={"warning"} textAlign={"center"}>
            No Faces Found
          </Typography>
        )}

        <List
          variant="outlined"
          sx={{
            borderRadius: "sm",
          }}
        >
          {detections.map((detection, index) => (
            <>
              <ListItem>
                <Stack direction={"row"} gap={4}>
                  <ListItemDecorator
                    sx={{
                      width: 100,
                      height: 100,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <DetectionPreviewImage
                      detection={detection}
                      key={detection.id}
                      style={{
                        height: 100,
                        objectFit: "contain",
                        borderRadius: 8,
                      }}
                    />
                  </ListItemDecorator>

                  <Stack gap={2}>
                    <Typography level={"body-sm"}>
                      Face Confidence: {(detection.confidence * 100).toFixed(1)}
                      %
                    </Typography>
                    <Checkbox
                      label="Blur This Face"
                      variant="outlined"
                      checked={detection.enabled}
                      onClick={() => {
                        const copy = [...detections];
                        copy[index].enabled = !copy[index].enabled;
                        setDetections(copy);
                      }}
                    />
                  </Stack>
                </Stack>
              </ListItem>

              {index + 1 < detections.length && (
                <ListDivider inset={"startDecorator"} />
              )}
            </>
          ))}
        </List>
      </Stack>

      <Stack>
        <Typography level={"body-md"} textAlign={"center"}>
          Blur Radius
        </Typography>
        <Slider
          aria-label="Blurring Radius"
          step={5}
          marks
          min={10}
          max={50}
          value={blurRadius}
          onChange={(_, value) => setBlurRadius(value as number)}
          valueLabelDisplay="auto"
        />
        <Typography level={"body-sm"} textAlign={"center"}>
          The larger the radius, the longer it might take to blur the image.
        </Typography>
      </Stack>

      <BlurImageButton>Blur Faces</BlurImageButton>

      <Button variant={"outlined"} onClick={() => setStep(1)}>
        Go Back
      </Button>
    </>
  );
};
