import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import React, {useEffect} from "react";
import theme from "./theme";
import AuctionDisplay from "./screens/AuctionDisplay";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SelectWinner from "./screens/SelectWinner";
import Drawer from "./components/Drawer";
import {db} from "../main/database";
import {PORT} from "../main/constants";


export default function App(): JSX.Element {

    useEffect(() => {
        fetch(PORT + "/getData", {mode: "cors"}).then(async (res) => {
            const data: any = await res.json();
            db.init(data);
        });
    }, []);


    return (
        // Setup theme and css baseline for the Material-UI app
        // https://mui.com/customization/theming/
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                sx={{
                    backgroundColor: (theme) => theme.palette.background.default
                }}
            >
                <main>
                    <BrowserRouter>
                        <div style={{display: "flex"}}>
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
