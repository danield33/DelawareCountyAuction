import { Container, ImageList } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../main/database";
import OrganizationDisplay from "../components/OrganizationDisplay";

export default function AuctionDisplay(): JSX.Element {

  const [orgIDs, setIDs] = useState<string[]>(db.organizations?.winners ?? []);

  useEffect(() => {
    db.socket.on("displayNewWinners", (winnerIDs: string[]) => {
      setIDs(winnerIDs);
      db.organizations!.winners = winnerIDs;
    });
  }, []);

  const renderItem = (orgID: string) => {

    const org = db.organizations?.orgs.get(orgID);
    if (!org) return null;

    return (
      <OrganizationDisplay organization={org} />
    );

  };


  return (

    <Container maxWidth={"lg"}>

      {
        orgIDs.length ?
          <ImageList sx={{ width: "100%", height: "100%", alignContent: "center", alignItems: "center" }}>
            {orgIDs.map(renderItem)}
          </ImageList>
          : <h1 style={{ alignSelf: "center" }}>Pending Results...</h1>
      }

    </Container>

  );
}
