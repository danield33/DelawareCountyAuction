import {ImageList} from "@mui/material";
import React, {useEffect, useState} from "react";
import {db} from "../../main/database";
import OrganizationDisplay from "../components/OrganizationDisplay";
import {screen} from "electron";


export default function AuctionDisplay(): JSX.Element {

    const [orgIDs, setIDs] = useState<string[]>(db.organizations?.winners ?? []);

    useEffect(() => {
        db.socket.on("displayNewWinners", (winnerIDs: string[]) => {
            setIDs(winnerIDs);
            db.organizations!.winners = winnerIDs;
        });
    }, []);

    const renderItem = (orgID: string, height?: number) => {

        const org = db.organizations?.orgs.get(orgID);
        if (height === undefined) {
            console.log(window.screen.height, 12)
            height = window.screen.height / 2 - 100
        }
        if (height != undefined && height < 0)
            height = undefined
        if (!org) return null;

        return (
            <OrganizationDisplay organization={org} height={height}/>
        );

    };


    return (

        <div style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            {//sx={{width: "100%", height: "100%", alignContent: "center", alignItems: "center"}}
                orgIDs.length > 2 ?
                    <ImageList>
                        {orgIDs.map((id) => renderItem(id))}
                    </ImageList>
                    : orgIDs.length === 2 ?
                        (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flex: 1,
                                height: '100%'
                            }}>
                                {renderItem(orgIDs[0], -1)}
                                {renderItem(orgIDs[1], -1)}
                            </div>
                        )
                        : orgIDs.length === 1 ?
                            (
                                <div>
                                    {renderItem(orgIDs[0], -1)}
                                </div>
                            )
                            : <h1 style={{alignSelf: "center"}}>Pending Results...</h1>
            }

        </div>

    );
}
