import React, {useCallback, useEffect, useState} from "react";
import {Button, CircularProgress, Collapse, Dialog, ImageListItem, ImageListItemBar} from "@mui/material";
import {Organization} from "../../main/database/modules/organization/Organization";
import AddOrgModalContent from "./AddOrgModalContent";
import {db} from "../../main/database";
import theme from "../theme";
import {BrokenImage} from "@mui/icons-material";
import {Alert} from "./Alert";

interface ParticipantBannerProps {
    participant: Organization,
    isSelected: boolean,
    onSelect: (id: string) => () => void,
    isShown: boolean
}


const ParticipantBanner = ({participant, isSelected, onSelect, isShown}: ParticipantBannerProps) => {

    const [image, setImage] = useState("");
    const [openModal, setOpen] = useState(false);
    const [openDeleteModal, setDelete] = useState(false),
        handleDelClose = () => setDelete(false),
        handleDelOpen = () => setDelete(true);

    useEffect(() => {

        const getImage = () => participant.getImage().then(img => {
            setImage('')
            if (img)
                setImage(img);
        });

        getImage();

    }, [participant]);

    const save = useCallback((name: string, description?: string, img?: string) => {

        if (!img) {
            db.socket.emit("deleteImage", id);
        }

        db.socket.emit("updateOrg", {
            name,
            description: description,
            image: img,
            id: id
        });

        setOpen(false);
    }, []);

    const promptDelete = useCallback(() => {
        handleDelOpen();
    }, []);

    const deleteItem = useCallback((itemID: string) => {
        if (!itemID) return;
        db.socket.emit("deleteOrg", itemID);
    }, []);

    const {name, description, id} = participant;

    return (
        <>

            <Collapse in={isShown} mountOnEnter unmountOnExit>
                <ImageListItem>

                    {
                        image ?
                            <img
                                onClick={() => setOpen(true)}
                                style={{
                                    border: isSelected ? "5px solid #98FF98" : undefined,
                                    height: "400px",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                    lineHeight: '100px',
                                    textAlign: 'center',
                                    fontSize: '50px'
                                }}
                                src={image}//?fit=crop&auto=format
                                srcSet={image}//?&fit=crop&auto=format&dpr=2 2x
                                alt={name}
                                loading="lazy"
                            />
                            :  <CircularProgress size={50}/>//<BrokenImage style={{fontSize: 450}} onClick={() => setOpen(true)}/>
                    }

                    <ImageListItemBar
                        title={name + ` (ID: ${id})`}
                        subtitle={description || ""}
                        actionIcon={<Button
                            onClick={onSelect(id)}>{isSelected ? "Remove" : "Select"}</Button>}
                    />
                </ImageListItem>
            </Collapse>


            <Dialog open={openModal} onClose={() => setOpen(false)}
                    maxWidth={"md"}
                    PaperProps={{style: {backgroundColor: theme.palette.background.default}}}>
                <AddOrgModalContent onSave={save} name={name} description={description}
                                    image={image}
                                    onDelete={promptDelete}/>
            </Dialog>

            <Alert title={'Delete Organization?'}
                   description={"Are you sue you want to delete this organization?"}
                   actions={[
                       {
                           text: 'Cancel',
                           onPress: () => void 0
                       },
                       {
                           text: 'Delete',
                           onPress: () => deleteItem(participant.id),
                       }
                   ]}
                   onClose={handleDelClose} isOpen={openDeleteModal}/>

        </>
    );
};

export default ParticipantBanner;
