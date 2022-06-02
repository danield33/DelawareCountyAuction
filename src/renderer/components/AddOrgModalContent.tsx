import React, { useCallback, useState } from "react";
import { Box, Button, Fade, Grow, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { db } from "../../main/database";

const Input = styled("input")({
  display: "none"
});

interface AddOrgModalContentProps {
  onSave?: (name: string, description?: string, image?: string) => void;
  image?: string,
  name?: string,
  description?: string,
}

const AddOrgModalContent = ({ onSave, image: img, name: n, description }: AddOrgModalContentProps) => {

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

    if(!name) return alert('Please input a name');

    onSave?.(name, desc, image);
  }, [image, name, desc]);

  const removeImage = useCallback(() => {
    setImage(undefined);
  }, []);

  return (
    <Box component={"form"}
         sx={{
           "& .MuiTextField-root": { m: 1 },
           display: "flex",
           flex: 1,
           flexDirection: "column",
           alignContent: "center",
           justifyContent: "center"
         }}
         noValidate
    >

      <TextField required
                 id={"org-name"}
                 label={"Organization Name"}
                 variant={"standard"}
                 fullWidth
                 error={!name?.length}
                 value={name}
                 inputProps={{
                   style: styles.input
                 }} onChange={e => setName(e.target.value)} />

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
        <div style={{ maxHeight: 300, overflow: "scroll" }}>
          <img id={"target"} src={image?.toString()} alt={"Uploaded Image"} />
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
        <label htmlFor={"contained-button-file"} style={{ flex: 1, width: "100%" }}>
          <Input accept={"image/*"} id={"contained-button-file"} multiple type={"file"} onChange={uploadImage} />
          <Button sx={{ flex: 1, width: "100%" }} variant={"contained"} component={"span"}>Upload Image</Button>
        </label>
        <Fade in={Boolean(image)}>
          <Button sx={{ flex: 1 }} variant={"outlined"} color={"error"}
                  onClick={removeImage}>Remove</Button>
        </Fade>

      </Box>

      <Button variant={"outlined"} onClick={save}>Save</Button>

    </Box>
  );
};

export default AddOrgModalContent;


const styles = {
  input: {
    color: "white"
  }
};
