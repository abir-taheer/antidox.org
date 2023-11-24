import { Container, Grid, Stack, Typography } from "@mui/joy";
import { useCallback, useLayoutEffect, useState } from "react";

const originalPrefix = "F**k";
const targetPrefix = "Resist";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Intro = () => {
  const [prefix, setPrefix] = useState(originalPrefix);

  const typeWriter = useCallback(async () => {
    let value = originalPrefix;
    const initialDelay = 1000;

    const timePerLetter = 100;
    const midDelay = 500;

    await sleep(initialDelay);

    while (value.length > 0) {
      value = value.slice(0, -1);
      setPrefix(value);
      await sleep(timePerLetter);
    }

    await sleep(midDelay);

    while (value.length < targetPrefix.length) {
      value += targetPrefix[value.length];
      setPrefix(value);
      await sleep(timePerLetter);
    }
  }, []);

  useLayoutEffect(() => {
    typeWriter();
  }, [typeWriter]);

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Stack gap={4}>
            <Typography level={"h1"} textAlign={"center"} className={"title"}>
              AntiDox
            </Typography>

            <Typography level={"body-lg"} textAlign={"center"}>
              {prefix} zionist bullying tactics.
            </Typography>

            <Typography level={"body-sm"} textAlign={"center"}>
              Use AI to blur out the faces from your photos before you post
              them.
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={12} md={6} justifyContent={"center"} alignItems={"center"}>
          <Stack flexDirection={"row"} justifyContent={"center"}>
            <img
              src={"/in-action.gif"}
              alt={"the process in action"}
              style={{
                height: "auto",
                width: 400,
                maxWidth: "80%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
