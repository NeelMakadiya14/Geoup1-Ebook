import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SwitchUI from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CustomThemeContext } from "./CustomThemeProvider";
import { Link } from "@reach/router";
import { v1 as uuid } from "uuid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { CookiesProvider, Cookies, useCookies } from "react-cookie";
import axios from "axios";
import queryString from "query-string";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import { GoogleOutlined } from "@ant-design/icons";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown, Nav } from "react-bootstrap";
import Font, { Text } from "react-font";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MyAppBar(props) {
  const classes = useStyles();

  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === "dark");

  const handleThemeChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("normal");
    }
  };

  console.log("From Home : ", currentTheme);

  const id = uuid();

  const [cookie, setCookie] = useCookies([""]);
  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");
  console.log("MYAPPBAR...");
  const [isAuthor, setAuthor] = React.useState(false);

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const client_id = process.env.REACT_APP_CLIENT_ID;

  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (userCookie !== undefined) {
      const email = userCookie.email;
      axios
        .get(`${API_URL}/checkauthor?` + queryString.stringify({ email }))
        .then((res) => {
          console.log(res.data);
          res.data ? setAuthor(true) : setAuthor(false);
          console.log("Value : ", isAuthor);
        })
        .catch((err) => console.log(err));
    }
  }, [props.render]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logout = (e) => {
    //const { cookies } = this.props;
    cookies.remove("userCookie");
    window.location.href = "/";
    // return false;
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthor ? (
        <MenuItem
          component={Link}
          to={`profile/${userCookie ? userCookie.GID : ""}`}
          onClick={handleMenuClose}
        >
          My Profile
        </MenuItem>
      ) : null}

      <MenuItem component={Link} to="/editprofile" onClick={handleMenuClose}>
        {" "}
        Edit Profile{" "}
      </MenuItem>
      <MenuItem onClick={handleMenuClose} onClick={logout}>
        Logout
      </MenuItem>
    </Menu>
  );

  const responseGoogle = (response) => {
    console.log(response);
    let authCookie = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      GID: response.googleId,
    };
    console.log(authCookie);
    setCookie("userCookie", authCookie);
    props.setRender(!props.render);
  };

  const fail = (res) => {
    console.log("Failed ", res);
  };

  function handleClick(){
    <GoogleLogin
        clientId={client_id}
        onSuccess={responseGoogle}
        onFailure={fail}
      >
       
      </GoogleLogin>
  }   

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Font family="Viga">
            <Button
              size="medium"
              href="/"
              style={{
                color: "white",
                fontSize: "20px",
                fontFamily: "Viga",
                fontStyle: "italic",
              }}
            >
              eBook
            </Button>
          </Font>

          <FormControlLabel
            style={{ marginLeft: "5%" }}
            control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
            label="Theme"
          />

          <div style={{ marginLeft: "auto", marginRight: "20px" }}>
            {userCookie == undefined ? null : isAuthor ? (
              <Button
                size="large"
                href={`/edit/${id}`}
                style={{ paddingRight: "20px", color: "white" }}
              >
                Create New Book
              </Button>
            ) : (
              <Button
                size="large"
                href="/editprofile"
                style={{ paddingRight: "20px", color: "white" }}
              >
                Create New Book
              </Button>
            )}

            {userCookie === undefined ? (
              <GoogleLogin
                clientId={client_id}
                buttonText=""
                onSuccess={responseGoogle}
                onFailure={fail}
                size="medium"
                href="/"
                render={(renderProps) => (
                  <GoogleOutlined
                    onClick={renderProps.onClick}
                    disabled= {false}    //disabled={renderProps.disabled}
                    style={{ fontSize: "30px" }}
                    
                  />
                )}
              >
               
                {/* <Link to="/"> </Link> */}
              </GoogleLogin>
            ) : (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                size="large"
              >
                <AccountCircle />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

