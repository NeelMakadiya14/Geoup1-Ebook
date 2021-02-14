import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';


export default function ProfilePic() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add Profile Pic
      </Typography>
      <Grid container spacing={3} style={{display:'flex', justifyContent:'center', margin: '5%'}}>
        <Button
            variant="contained"
            color="default"
            startIcon={<AddPhotoAlternateIcon />}
        >
            Add Image
        </Button>
      </Grid>
    </React.Fragment>
  );
}