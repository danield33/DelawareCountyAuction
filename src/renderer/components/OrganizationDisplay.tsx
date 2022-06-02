import React, { useEffect, useState } from "react";
import { Organization } from "../../main/database/modules/organization/Organization";
import { BrokenImage } from "@mui/icons-material";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import { db } from "../../main/database";

interface OrganizationDisplayProps{
  organization: Organization;
}

function OrganizationDisplay({organization}: OrganizationDisplayProps) {

  const [image, setImage] = useState("");

  useEffect(() => {

    const getImage = () => organization.getImage().then(img => {
      setImage(img);
    });

    getImage();

  }, []);

  const {description, name} = organization;

  return (
    <ImageListItem>

      {
        image ?
          <img
            style={{
              objectFit: "contain",
              height: 400
            }}
            src={image}//?fit=crop&auto=format
            srcSet={image}//?&fit=crop&auto=format&dpr=2 2x
            alt={name}
            loading="lazy"
          />
          : <BrokenImage style={{fontSize: 450}}/>
      }

      <ImageListItemBar
        title={name}
        subtitle={description || ""}
      />
    </ImageListItem>
  );
}

export default OrganizationDisplay;
