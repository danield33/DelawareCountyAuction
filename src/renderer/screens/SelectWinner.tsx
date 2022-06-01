import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Collapse,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Modal,
  Backdrop,
  Fade,
  Box
} from "@mui/material";
import { db } from "../../main/database";
import { Organization } from "../../main/database/modules/organization/Organization";
import FloatingButtons from "../components/FloatingButtons";
import AddOrgModalContent from "../components/AddOrgModalContent";


function SelectWinner() {

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searched, setSearched] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

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
      <Collapse key={item.id} in={isSearchedFor} mountOnEnter unmountOnExit>
        <ImageListItem key={item.image} sx={{}}>
          <img
            style={{
              border: selected.has(item.id) ? "5px solid #98FF98" : undefined,
              height: "400px"
            }}
            src={`${item.image}?fit=crop&auto=format`}
            srcSet={`${item.image}?&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={item.name}
            actionIcon={<Button
              onClick={toggleSelected(item.id)}>{selected.has(item.id) ? "Remove" : "Select"}</Button>}
          />
        </ImageListItem>
      </Collapse>
    );
  }, [selected, searched]);

  const [organizations, setOrgs] = useState(db.organizations?.orgs ?? new Map());

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
          }} onChange={handleSearchFieldChange} type={'search'}/>
        </ImageListItem>
        {[...organizations.values()].map(renderItem)}
      </ImageList>

      <FloatingButtons onDelete={removeAll} onAdd={handleOpen} />

      <Modal open={modalOpen}
             aria-labelledby={'transition-modal-title'}
             aria-describedby={'transition-modal-description'}
             onClose={handleClose}
             BackdropComponent={Backdrop}
             BackdropProps={{
               timeout: 500
             }}
      >
        <Fade in={modalOpen}>
          <Box sx={styles.box}>

            <AddOrgModalContent/>

          </Box>
        </Fade>

      </Modal>


    </div>
  );
}

export default SelectWinner;


const styles = {
  box: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: 'background.default',
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  }
};
