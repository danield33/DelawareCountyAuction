import React, { useCallback, useMemo, useState } from "react";
import { Button, Collapse, ImageList, ImageListItem, ImageListItemBar, TextField } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { db } from "../../main/database";
import { Organization } from "../../main/database/modules/organization/Organization";


function SelectWinner() {

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searched, setSearched] = useState("");

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

  const organizations = useMemo(() => db.organizations.orgs, [db.organizations]);

  return (
    <div style={{ display: "flex", flex: 1, width: "100%", padding: 20 }}>

      <ImageList sx={{ width: "100%", height: "100%" }}>
        <ImageListItem key="Subheader" cols={2}>
          <TextField id={"org-search"} label={"Search"} variant={"filled"} sx={{
            backgroundColor: "rgba(255,255,255,0.25)",
            color: "white"
          }} inputProps={{
            style: {
              color: "white"
            }
          }} onChange={handleSearchFieldChange} />
        </ImageListItem>
        {[...organizations.values()].map(renderItem)}
      </ImageList>

    </div>
  );
}

export default SelectWinner;
