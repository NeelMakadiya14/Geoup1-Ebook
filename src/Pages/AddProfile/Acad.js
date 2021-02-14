import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


export default function Acad() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Work Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="company"
            name="company"
            label="Company / University"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="location"
            name="location"
            label="Location"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="AboutYourself"
            name="AboutYourself"
            label="About Yourself"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="website"
            name="website"
            label="Website"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}