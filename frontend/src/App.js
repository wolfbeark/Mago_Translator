import "./App.css";

import styled, { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Authentication from "./routes/Authentication";
import { WhiteTheme } from "./theme";
import Multi from "./routes/Multi";
const AppContainer = styled.div`
  width: 100vw;
  height: auto;
`;

function App() {
  return (
    <ThemeProvider theme={WhiteTheme}>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/multi" element={<Multi />} />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
