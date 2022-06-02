import React, { useCallback, useEffect, useState } from "react";
import { Backdrop, Box, Fade, ImageList, ImageListItem, Modal, TextField } from "@mui/material";
import { db } from "../../main/database";
import { Organization } from "../../main/database/modules/organization/Organization";
import FloatingButtons from "../components/FloatingButtons";
import AddOrgModalContent from "../components/AddOrgModalContent";
import ParticipantBanner from "../components/ParticipantBanner";


function SelectWinner() {

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searched, setSearched] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);
  const [organizations, setOrgs] = useState(db.organizations?.orgs ?? new Map());


  useEffect(() => {
    db.socket.on("dataUpdate", (data: any) => {
      db.init(data);
      const map = db.organizations?.orgs ?? new Map();
      setOrgs(map);
    });
  }, []);

  const toggleSelected = useCallback((item: string) => () => {
    if (!selected.has(item)) {
      selected.add(item);
      setSelected(new Set(selected));
    } else {
      selected.delete(item);
      setSelected(new Set(selected));
    }
  }, [selected]);

  const handleSearchFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearched(text);
  }, [searched]);

  const removeAll = useCallback(() => {
    setSelected(new Set());
  }, []);

  const renderItem = useCallback((item: Organization) => {

    const isSearchedFor = item.name.toLowerCase().includes(searched.toLowerCase());
    if (!isSearchedFor) return null;

    return (
      <ParticipantBanner participant={item} isSelected={selected.has(item.id)}
                         onSelect={toggleSelected}
                         isShown={isSearchedFor} key={item.id} />
    );
  }, [selected, searched]);

  const createNew = useCallback((name: string, description?: string, image?: string) => {

    db.socket.emit('addNewOrg', {
      name,
      description: description,
      image: image
    });
    handleClose();

  }, []);


  return (
    <div style={{ display: "flex", flex: 1, width: "100%", padding: 20, flexDirection: "column" }}>

      <ImageList sx={{ width: "100%", height: "100%" }}>
        <ImageListItem key="Subheader" cols={2}>
          <TextField id={"org-search"} label={"Search"} variant={"filled"} sx={{
            backgroundColor: "rgba(255,255,255,0.25)",
            color: "white"
          }} inputProps={{
            style: {
              color: "white"
            }
          }} onChange={handleSearchFieldChange} type={"search"} />
        </ImageListItem>
        {[...organizations.values()].map(renderItem)}
      </ImageList>

      <FloatingButtons onDelete={removeAll} onAdd={handleOpen} />

      <Modal open={modalOpen}
             aria-labelledby={"transition-modal-title"}
             aria-describedby={"transition-modal-description"}
             onClose={handleClose}
             BackdropComponent={Backdrop}
             BackdropProps={{
               timeout: 500
             }}
             style={{
               overflow: 'scroll'
             }}
      >
        <Fade in={modalOpen}>
          <Box sx={styles.box}>
            <AddOrgModalContent onSave={createNew} />
          </Box>
        </Fade>

      </Modal>


    </div>
  );
}

export default SelectWinner;


export const styles = {
  box: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.default",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  }
};
