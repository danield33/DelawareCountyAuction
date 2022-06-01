import React, { useCallback, useState } from "react";
import { Box, Button, Fade, Grow, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { db } from "../../main/database";

const Input = styled("input")({
  display: "none"
});

const AddOrgModalContent = () => {

  const [image, setImage] = useState<string | ArrayBuffer>();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const uploadImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImage(e.target?.result || undefined);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }, []);

  const save = useCallback(() => {
    db.socket.emit("addNewOrg", {
      name,
      description: desc,
      image
    });
  }, [image, name, desc]);

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
                  onClick={() => setImage(undefined)}>Remove</Button>
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
