import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/routes";
import { CyclesContextProvider } from "./providers/CyclesProvider";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>

        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
