import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwitchUI from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CustomThemeContext } from './CustomThemeProvider';
import { Link } from '@reach/router';

const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  }))

export default function MyAppBar() {

    const classes = useStyles();

    const { currentTheme, setTheme } = useContext(CustomThemeContext);
    const isDark = Boolean(currentTheme === 'dark');

    const handleThemeChange = (event) => {
        const { checked } = event.target
        if (checked) {
          setTheme('dark')
        } else {
          setTheme('light')
        }
      }
  
    console.log("From Home : ",currentTheme);

    return (
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" className={classes.title}>
              E-Book
            </Typography>
          </Link>
          <FormControlLabel
            style={{marginLeft:'10%'}}
            control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
            label="Theme"
          />
          <Link to="/addprofile">
            <Typography variant="h6" className={classes.title}>
              Complate Profile
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    )
}
