import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Link,
  Stack,
  Typography,
} from "@mui/joy";

export const QA = [
  ["What happens to my photos?"],
  ["How does the blurring work?"],
];

export const FAQs = () => {
  return (
    <Stack gap={2}>
      <Typography level={"title-lg"} textAlign={"center"} color={"neutral"}>
        FAQs
      </Typography>
      <AccordionGroup>
        <Accordion>
          <AccordionSummary>What happens to my photos?</AccordionSummary>

          <AccordionDetails>
            <Typography color={"neutral"} margin={2}>
              Your photos never leave your device. All the processing from the
              face detection to the blurring happens on your device. This also
              has the consequence that on older devices this app might be very
              slow or not work at all.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>It's taking a long time?</AccordionSummary>

          <AccordionDetails>
            <Typography color={"neutral"} margin={2}>
              Since all of the processing happens on your own device, it might
              take some time to find the faces or blur the image. If you have an
              older device you might find it taking especially long.
            </Typography>
            <Typography color={"neutral"} margin={2}>
              There's not much to be done in this situation except using the
              site from your computer or a device with a faster processor :(
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>How does the blurring work?</AccordionSummary>

          <AccordionDetails>
            <Typography color={"neutral"} margin={2}>
              For each of the faces we downscale that part of the image, so as
              to intentionally create a loss of detail. Then we apply a gaussian
              blur to the downsampled image and we use random increments when
              choosing pixels to use when calculating the averages for the blur
              in order to make the process more random and difficult to undo.
              Then we upscale the blurred image and paste it back into the
              original image.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            I don't trust you! Where's the code???
          </AccordionSummary>
          <AccordionDetails>
            <Typography color={"neutral"} margin={2}>
              Right here,{" "}
              <Link
                href={"https://github.com/abir-taheer/antidox.org"}
                target={"_blank"}
              >
                github.com/abir-taheer/antidox.org
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Stack>
  );
};
