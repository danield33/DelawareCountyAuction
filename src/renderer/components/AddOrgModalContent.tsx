import React, {useCallback, useState} from "react";
import { Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

const Input = styled('input')({
  display: 'none'
})

const AddOrgModalContent = () => {

  const [image, setImage] = useState<string>();

  const uploadImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files[0]){
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }, []);

  return (
    <Box component={'form'}
         sx={{
           '& .MuiTextField-root': {m: 1, width: '25ch'},
         }}
         noValidate
    >

      <TextField id={'org-name'} label={'Organization Name'} variant={'standard'} inputProps={{
        style: styles.input
      }}/>

      <TextField
        inputProps={{
          style: styles.input
        }}
        id="org-desc"
        label="Description"
        multiline
        minRows={4}
      />

      <img id={'target'} src={image}/>

      <label htmlFor={'contained-button-file'}>
        <Input accept={"image/*"} id={"contained-button-file"} multiple type={'file'} onChange={uploadImage}/>
        <Button variant={'contained'} component={'span'}>Upload Image</Button>
      </label>

    </Box>
  );
};

export default AddOrgModalContent;


const styles = {
  input:{
    color: 'white'
  }
}
