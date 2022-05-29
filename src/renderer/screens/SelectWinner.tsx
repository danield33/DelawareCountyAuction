import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader
} from "@mui/material";
import { db } from "../../main/database";
import { Organization } from "../../main/database/modules/organization/Organization";


function SelectWinner() {

  const [selected, setSelected] = useState<string[]>([]);

  const addSelected = useCallback((item: string) => () =>  {
    selected.push(item);
    setSelected([...selected]);
  }, [selected])

  const organizations = useMemo(() => db.organizations.orgs, [db.organizations]);

  return (
    <div style={{display: "flex", flex: 1, width: '100%', padding: 20}}>

      <ImageList sx={{ width: '100%', height: '100%' }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Participants</ListSubheader>
        </ImageListItem>
        {[...organizations.values()].map((item: Organization) => (
          <ImageListItem key={item.image} sx={{
            borderColor: selected.includes(item.id) ? 'darkolivegreen' : undefined,
            borderWidth: 3
          }}>
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.name}
              actionIcon={<Button onClick={addSelected(item.id)}>Select</Button>}
            />
          </ImageListItem>
        ))}
      </ImageList>

    </div>
  );
}

export default SelectWinner;
