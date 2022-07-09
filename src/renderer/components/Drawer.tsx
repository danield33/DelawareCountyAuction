import React, {useCallback, useState} from "react";
import {Drawer as MUIDrawer, List, ListItem, ListItemIcon, ListItemText, useTheme} from "@mui/material";
import {Menu, Monitor, SelectAll} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const Drawer = () => {

    const itemsList = [
        {
            text: "Display",
            icon: <Monitor color={"primary"}/>,
            navi: "/"
        },
        {
            text: "Choose Winner",
            icon: <SelectAll color={"primary"}/>,
            navi: "/selection"
        }
    ];

    const navigate = useNavigate(), {palette} = useTheme();
    const [isOpen, setOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setOpen(!isOpen);
    }, [isOpen]);

    const pressItem = useCallback((item: string) => () => {
        navigate(item);
        toggleOpen();
    }, [isOpen, navigate]);

    return (
        <>
            <Menu style={{margin: 20}} onClick={toggleOpen}/>
            <MUIDrawer open={isOpen} variant={"temporary"} onClose={toggleOpen}
                       PaperProps={{
                           sx: {
                               backgroundColor: palette.background.default
                           }
                       }}
            >
                <List>
                    {
                        itemsList.map(item => {
                            const {text, icon, navi} = item;

                            return (
                                <ListItem button key={text} onClick={pressItem(navi)}>

                                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                    <ListItemText primary={text}/>
                                </ListItem>
                            );
                        })
                    }
                </List>

            </MUIDrawer>
        </>

    );
};

export default Drawer;
