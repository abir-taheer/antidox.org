import { Card, Stack, Step, StepIndicator, Stepper } from "@mui/joy";
import { useAtom } from "jotai";
import { stepAtom } from "../../variables/step.ts";
import { ResultStep } from "./ResultStep.tsx";
import { SelectFaces } from "./SelectFaces.tsx";
import { SelectImageStep } from "./SelectImage.tsx";

export const Steps = () => {
  const [step, setStep] = useAtom(stepAtom);

  return (
    <Card>
      <Stack gap={2}>
        <Stepper sx={{ width: "100%" }}>
          <Step
            onClick={() => setStep(1)}
            completed={step > 1}
            orientation={"vertical"}
            indicator={
              <StepIndicator variant={step === 1 ? "solid" : "outlined"}>
                1
              </StepIndicator>
            }
          >
            Image
          </Step>

          <Step
            completed={step > 2}
            orientation={"vertical"}
            indicator={
              <StepIndicator variant={step === 2 ? "solid" : "outlined"}>
                2
              </StepIndicator>
            }
          >
            Faces
          </Step>
          <Step
            orientation={"vertical"}
            indicator={
              <StepIndicator variant={step === 3 ? "solid" : "outlined"}>
                3
              </StepIndicator>
            }
          >
            Result
          </Step>
        </Stepper>

        {step === 1 && <SelectImageStep />}
        {step === 2 && <SelectFaces />}
        {step === 3 && <ResultStep />}
      </Stack>
    </Card>
  );
};
