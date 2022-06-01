import React, { useCallback, useEffect, useState } from "react";
import { Backdrop, Box, Button, Collapse, Fade, ImageListItem, ImageListItemBar, Modal } from "@mui/material";
import { Organization } from "../../main/database/modules/organization/Organization";
import AddOrgModalContent from "./AddOrgModalContent";
import { styles } from "../screens/SelectWinner";
import { db } from "../../main/database";

interface ParticipantBannerProps {
  participant: Organization,
  isSelected: boolean,
  onSelect: (id: string) => () => void,
  isShown: boolean
}


const ParticipantBanner = ({ participant, isSelected, onSelect, isShown }: ParticipantBannerProps) => {

  const [image, setImage] = useState("");
  const [openModal, setOpen] = useState(false);

  useEffect(() => {

    participant.getImage().then(img => {
      setImage(img);
    });

  }, []);

  const save = useCallback((name: string, description?: string, img?: string) => {

    if(!img){
      db.socket.emit('deleteImage', id);
    }

      db.socket.emit('updateOrg', {
      name,
      description: description,
      image: img,
      id: id
    });

    setOpen(false);
  }, []);

  const { name, description, id } = participant;

  return (
    <>

      <Collapse in={isShown} mountOnEnter unmountOnExit>
        <ImageListItem>
          <img
            onClick={() => setOpen(true)}
            style={{
              border: isSelected ? "5px solid #98FF98" : undefined,
              height: "400px"
            }}
            src={image}//?fit=crop&auto=format
            srcSet={image}//?&fit=crop&auto=format&dpr=2 2x
            alt={name}
            loading="lazy"
          />
          <ImageListItemBar
            title={name}
            subtitle={description || ""}
            actionIcon={<Button
              onClick={onSelect(id)}>{isSelected ? "Remove" : "Select"}</Button>}
          />
        </ImageListItem>
      </Collapse>

      <Modal open={openModal}
             aria-labelledby={"transition-modal-title"}
             aria-describedby={"transition-modal-description"}
             onClose={() => setOpen(false)}
             BackdropComponent={Backdrop}
             BackdropProps={{
               timeout: 500
             }}>
        <Fade in={openModal}>
          <Box sx={styles.box}>
            <AddOrgModalContent onSave={save} name={name} description={description} image={image}/>
          </Box>
        </Fade>

      </Modal>
    </>
  );
};

export default ParticipantBanner;
