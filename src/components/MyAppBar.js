import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwitchUI from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CustomThemeContext } from './CustomThemeProvider';
import { Link } from '@reach/router';
import { v1 as uuid } from "uuid";
import { CookiesProvider, Cookies, useCookies } from 'react-cookie';
import axios from 'axios';
import queryString from 'query-string';
import { useState } from 'react'


require('dotenv').config();



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

  console.log("From Home : ", currentTheme);

  const id = uuid();
  const cookies = new Cookies();
  const userCookie = cookies.get('userCookie');
  const email = userCookie ? userCookie.email : null;
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [profileCheck, setProfileCheck] = useState(false);

  axios.get(`${API_URL}/checkauthor?` + queryString.stringify({ email }))
    .then((res) => {
      if (typeof (res.data.length) !== 'undefined') {
        setProfileCheck(true);
      }
      else {
        setProfileCheck(false);
      }
    })

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to="/">
          <Typography variant="h6" className={classes.title}>
            E-Book
            </Typography>
        </Link>
        <FormControlLabel
          style={{ marginLeft: '10%' }}
          control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
          label="Theme"
        />
        <Link to="/addprofile">
          <Typography variant="h6" className={classes.title}>
            Complate Profile
            </Typography>
        </Link>

        <Link to={profileCheck ? `/edit/${id}` : '/addprofile'}>
          <Typography variant="h6" className={classes.title}>
            Create New Book
            </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
