import { Box, CssBaseline, ThemeProvider, Theme } from "@mui/material";
import React from "react";
import theme from "./theme";
import AuctionDisplay from "./screens/AuctionDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectWinner from "./screens/SelectWinner";
import Drawer from "./components/Drawer";

export default function App(): JSX.Element {

  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <main>
            <BrowserRouter>
              <div style={{display: 'flex'}}>
              <Drawer/>
              <Routes>
                <Route path={"/"} element={<AuctionDisplay/>}/>
                <Route path={"/selection"} element={<SelectWinner/>}/>
              </Routes>
              </div>
            </BrowserRouter>
        </main>
      </Box>
    </ThemeProvider>
  );
}
