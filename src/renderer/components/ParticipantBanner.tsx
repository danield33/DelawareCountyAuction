import React, { useEffect, useState } from "react";
import { Button, Collapse, ImageListItem, ImageListItemBar } from "@mui/material";
import { Organization } from "../../main/database/modules/organization/Organization";

interface ParticipantBannerProps{
  participant: Organization,
  isSelected: boolean,
  onSelect: (id: string) =>  () => void,
  isShown: boolean
}

const ParticipantBanner = ({participant, isSelected, onSelect, isShown}: ParticipantBannerProps) => {

  const [image, setImage] = useState('');

  useEffect(() => {

    participant.getImage().then(img => {
      setImage(img);
    })

  }, [])

  return (
    <Collapse in={isShown} mountOnEnter unmountOnExit>
      <ImageListItem>
        <img
          style={{
            border: isSelected ? "5px solid #98FF98" : undefined,
            height: "400px"
          }}
          src={image}//?fit=crop&auto=format
          srcSet={image}//?&fit=crop&auto=format&dpr=2 2x
          alt={participant.name}
          loading="lazy"
        />
        <ImageListItemBar
          title={participant.name}
          subtitle={participant.description || ''}
          actionIcon={<Button
            onClick={onSelect(participant.id)}>{isSelected ? "Remove" : "Select"}</Button>}
        />
      </ImageListItem>
    </Collapse>
  );
};

export default ParticipantBanner;
