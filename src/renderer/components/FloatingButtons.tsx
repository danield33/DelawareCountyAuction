import React from "react";
import { Box, Fab } from "@mui/material";
import { Add, ClearAll } from "@mui/icons-material";

interface FloatingButtonsProps{
  onAdd?: () => void;
  onDelete?: () => void;
}

const FloatingButtons = ({onAdd, onDelete}: FloatingButtonsProps) => {
  return (
    <Box sx={{
      "& > :not(style)": { m: 1 },
      position: "fixed",
      bottom: theme => theme.spacing(2),
      right: theme => theme.spacing(2)
    }}>
      <Fab color={"primary"} aria-label={"add"}>
        <Add onClick={onAdd}/>
      </Fab>

      <Fab color={"secondary"} aria-label={"remove-all"}>
        <ClearAll onClick={onDelete}/>
      </Fab>
    </Box>
  );
};

export default FloatingButtons;
