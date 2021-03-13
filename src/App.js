import React, { Suspense, lazy, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Loader from "./components/Loader";
import Home from "./Pages/Home/Home";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import GoogleLogin from 'react-google-login';
import Switch from "@material-ui/core/Switch";
import CustomThemeProvider from './components/CustomThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './Routes';
require('dotenv').config();

const cookies = new Cookies();

export default function App(){

//  const client_id=process.env.REACT_APP_CLIENT_ID ;
  const [cookie, setCookie] = useCookies(['']);
  const userCookie = cookies.get('userCookie');
  const [user, setUser] = useState(false);

  console.log(userCookie);

  const responseGoogle = (response)=>{
    console.log("Success");
    let authCookie={
      email:response.profileObj.email,
      name:response.profileObj.name,
      GID:response.googleId
    }
    console.log(authCookie);
    setCookie('userCookie',authCookie);
    setUser(true);
  }
  
  const fail = (res)=>{
    console.log("Failed ",res);
  }
  
  useEffect(() => {
    if (userCookie !== undefined) setUser(true);
  });



  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));



  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  console.log(client_id);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Button variant="contained" color="primary" onClick={()=>setUser(true)}>
        Coninue as Guest
      </Button>
      <h2>Or</h2>
      <GoogleLogin
        clientId={client_id}
        onSuccess={responseGoogle}
        onFailure={fail}
      >
        <strong>Sign in with Google</strong>
      </GoogleLogin>
    </div>
  );

  return (
            <div>
              <Routes/>
              <Modal
                open={!user}
                onClose={()=>{setUser(false)}}
              >
                {body}
              </Modal>
            </div>
      
  );
};
