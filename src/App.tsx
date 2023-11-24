import {
  Container,
  CssVarsProvider,
  Divider,
  extendTheme,
  Stack,
} from "@mui/joy";
import { Provider } from "jotai";
import { FAQs } from "./components/FAQs.tsx";
import { Intro } from "./components/Intro.tsx";
import { Steps } from "./components/steps/Steps.tsx";
import { LoadedModelContext } from "./context/LoadedModelContext.tsx";
import { jotaiStore } from "./variables/store.ts";

const theme = extendTheme({
  fontFamily: {
    display: "'Josefin Sans', sans-serif",
    body: "'Josefin Sans', sans-serif",
  },
});

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <Provider store={jotaiStore}>
        <Container maxWidth={"lg"} sx={{ paddingTop: 6, paddingBottom: 6 }}>
          <Stack gap={4}>
            <Intro />
            <Divider />
            <FAQs />
            <Divider />
            <LoadedModelContext content={Steps} />
          </Stack>
        </Container>
      </Provider>
    </CssVarsProvider>
  );
}

export default App;
