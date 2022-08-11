import {Box, Container, Grid, ImageList} from "@mui/material";
import React, {useEffect, useState} from "react";
import {db} from "../../main/database";
import OrganizationDisplay from "../components/OrganizationDisplay";

export default function AuctionDisplay(): JSX.Element {

    const [orgIDs, setIDs] = useState<string[]>(db.organizations?.winners ?? []);//

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
            // <Grid item xs={true} key={org.id}>
                <OrganizationDisplay organization={org}/>
            // </Grid>
        );

    };


    return (


        <Box sx={{
            height: '95vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            // overflow: 'hidden'
        }} >

            {orgIDs.map(renderItem)}

        </Box>

        // <Grid container spacing={{xs: 2}} sx={{height: '100%'}} columns={2}>
        //     {orgIDs.map(renderItem)}
        // </Grid>

        // <Container maxWidth={"xl"} sx={{display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'rows'}}>
        //
        //     {
        //         orgIDs.length ?
        //             // <ImageList sx={{width: "100%", height: "100%", alignContent: "center", alignItems: "center"}}>
        //                 orgIDs.map(renderItem)
        //             : <h1 style={{alignSelf: "center"}}>Pending Results...</h1>
        //     }
        //
        // </Container>

    );
}
