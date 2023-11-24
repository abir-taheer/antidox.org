import { LinearProgress, Stack, Typography } from "@mui/joy";
import * as faceapi from "face-api.js";
import { FC, useEffect, useState } from "react";

export type LoadedModelContextProps = {
  content: FC;
};

export const LoadedModelContext = ({ content }: LoadedModelContextProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    faceapi
      .loadSsdMobilenetv1Model("/models")
      .then(() => setLoaded(true))
      .catch(setError);
  }, []);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!loaded) {
    return (
      <Stack justifyContent={"center"} gap={4}>
        <LinearProgress />
        <Typography level={"title-md"} textAlign={"center"}>
          Loading Machine Learning Models
        </Typography>
      </Stack>
    );
  }

  const Content = content;

  return <Content />;
};
