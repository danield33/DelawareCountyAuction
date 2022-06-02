import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import electronLogo from "../../../static/electron.svg";
import { db } from "../../main/database";

export default function AuctionDisplay(): JSX.Element {

  const [orgIDs, setIDs] = useState<string[]>([]);

  useEffect(() => {
    db.socket.on("displayNewWinners", (winnerIDs: string[]) => {
      setIDs(winnerIDs);
      console.log(winnerIDs)
    });
  }, []);

  console.log(orgIDs)

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>



    </Container>
  );
}
