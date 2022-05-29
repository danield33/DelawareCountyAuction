import React from "react";
import { Drawer as MUIDrawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Inbox, Mail } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Drawer = (props: any) => {

  const itemsList = [
    {
      text: "Display",
      icon: <Inbox />,
      navi: '/'
    },
    {
      text: "Choose Winner",
      icon: <Mail />,
      navi: '/selection'
    }
  ];

  const navigate = useNavigate();

  return (
    <MUIDrawer open variant={"permanent"} style={{
      width: "190px"
    }}>

      <List>
        {
          itemsList.map(item => {
            const { text, icon, navi } = item;

            return (
              <ListItem button key={text} onClick={() => navigate(navi)}>

                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })
        }
      </List>

    </MUIDrawer>
  );
};

export default Drawer;
