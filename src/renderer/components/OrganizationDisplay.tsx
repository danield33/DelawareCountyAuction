import React, {useEffect, useState} from "react";
import {Organization} from "../../main/database/modules/organization/Organization";
import {BrokenImage} from "@mui/icons-material";
import {ImageListItem, ImageListItemBar} from "@mui/material";
import {ipcMain} from "electron";

interface OrganizationDisplayProps {
    organization: Organization;
    height: number | undefined;
    showDescription: boolean;
}

function OrganizationDisplay({organization, height, showDescription}: OrganizationDisplayProps) {

    const [image, setImage] = useState("");

    useEffect(() => {

        const getImage = () => organization.getImage().then(img => {
            setImage(img);
        });

        getImage();

    }, [organization]);

    const {description, name, id} = organization;

    return (
        <ImageListItem sx={{flex: 1}}>

            {
                image ?
                    <img
                        style={{
                            objectFit: "contain",
                            height: height
                        }}
                        src={image}//?fit=crop&auto=format
                        srcSet={image}//?&fit=crop&auto=format&dpr=2 2x
                        alt={name}
                        loading="lazy"
                    />
                    : <BrokenImage style={{fontSize: 450}}/>
            }

            {
                showDescription ?
                    <ImageListItemBar
                        title={name + ` (ID: ${id})`}
                        subtitle={description || ""}
                    />
                    : null
            }
        </ImageListItem>
    );
}

export default OrganizationDisplay;
