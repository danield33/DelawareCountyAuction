import React, {useCallback, useState} from "react";
import {Box, Button, DialogActions, DialogContent, Fade, Grow, TextField} from "@mui/material";
import styled from "@emotion/styled";

const Input = styled("input")({
    display: "none"
});

interface AddOrgModalContentProps {
    onSave?: (name: string, description?: string, image?: string) => void;
    onDelete?: () => void;
    image?: string,
    name?: string,
    description?: string,
}

const AddOrgModalContent = ({onSave, image: img, name: n, description, onDelete}: AddOrgModalContentProps) => {

    const [image, setImage] = useState(img);
    const [name, setName] = useState(n);
    const [desc, setDesc] = useState(description);

    const uploadImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {

                setImage(e.target?.result?.toString() || "");

            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }, []);

    const save = useCallback(() => {

        if (!name) return alert("Please input a name");

        onSave?.(name, desc, image);
    }, [image, name, desc]);

    const removeImage = useCallback(() => {
        setImage(undefined);
    }, []);

    const deleteItem = useCallback(() => {
        onDelete?.();
    }, []);

    return (

        <>
            <DialogContent sx={{
                "& .MuiTextField-root": {m: 1}
            }}>

                <TextField required
                           id={"org-name"}
                           label={"Organization Name"}
                           variant={"standard"}
                           fullWidth
                           error={!name?.length}
                           value={name}
                           inputProps={{
                               style: styles.input
                           }} onChange={e => setName(e.target.value)}/>

                <TextField
                    fullWidth
                    inputProps={{
                        style: styles.input
                    }}
                    id="org-desc"
                    label="Description"
                    multiline
                    minRows={4}
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />

                <Grow in={Boolean(image)} timeout={1000}>
                    <div style={{overflow: "scroll"}}>
                        <img id={"target"} src={image?.toString()} alt={"Uploaded Image"} style={{objectFit: "cover"}}/>
                    </div>
                </Grow>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100%",
                    flexDirection: "column",
                    m: 1
                }}>
                    <label htmlFor={"contained-button-file"} style={{flex: 1, width: "100%"}}>
                        <Input accept={"image/*"} id={"contained-button-file"} multiple type={"file"}
                               onChange={uploadImage}/>
                        <Button sx={{flex: 1, width: "100%"}} variant={"contained"} component={"span"}>Upload
                            Image</Button>
                    </label>
                    <Fade in={Boolean(image)}>
                        <Button sx={{flex: 1}} variant={"outlined"} color={"error"}
                                onClick={removeImage}>Remove Image</Button>
                    </Fade>

                </Box>

            </DialogContent>

            <DialogActions>
                <Button onClick={save}>Save</Button>
                <Button color={"error"} onClick={deleteItem}>Delete</Button>
            </DialogActions>

        </>

    );
};

export default AddOrgModalContent;


const styles = {
    input: {
        color: "white"
    }
};
