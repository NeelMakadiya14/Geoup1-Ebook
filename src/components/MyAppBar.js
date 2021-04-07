import React, { useContext, useEffect, useState, Fragment } from "react";
import { fade,makeStyles } from "@material-ui/core/styles";
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
import Font, { Text } from "react-font";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from "react-avatar";
import { useNavigate } from "@reach/router";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { StayPrimaryLandscape } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";



const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  search: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  },
  dropdown: {
    color: "white",
  },
  place: {
    color: "secondary",
  },
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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
          to={`profile/${userCookie ? userCookie.email : ""}`}
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
    axios
      .post(`${API_URL}/addreader`, authCookie)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    props.setRender(!props.render);
  };

  const fail = (res) => {
    console.log("Failed ", res);
  };

  function handleClick() {
    <GoogleLogin
      clientId={client_id}
      onSuccess={responseGoogle}
      onFailure={fail}
    ></GoogleLogin>;
  }


  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [pic,setPic]=useState("");
  const loading = open && options.length === 0;
  const CloudName = process.env.REACT_APP_CLOUD_NAME;
  const navigate = useNavigate();

  const gotoProfile = (option) =>{
    axios
        .get(`${API_URL}/authorlist?name=${option}`)
        .then((res) => {
          console.log(res.data[0].email);
          navigate(`/profile/${res.data[0].email}`);
          window.location.reload();
        })
  }
 
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      var option;
      axios
        .get(`${API_URL}/authorlist?name=${inputValue}`)
        .then((res) => {
          option = res.data;
          console.log(option);
          
          if (active) {
            setOptions(Object.keys(option).map((key) =>
             option[key].Fname+ " " + option[key].Lname));
             setPic(Object.keys(option).map((key) =>
             option[key].picUrl));
          }

        })
        .catch((err) => {
          console.error(err);
        });
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue, setInputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);



  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("normal");
    }
  };

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

          {/* <FormControlLabel
            style={{ marginLeft: "5%" }}
            control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
            label="Theme"
          /> */}

        <Autocomplete className={classes.search}
            id="asynchronous-demo"
            style={{ width: 450, marginLeft:"100px"}}
            
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            disableClearable
            forcePopupIcon={false}
            getOptionSelected={(option) => gotoProfile(option)}
            options={options}
            onChange={(event, value) => console.log(value)}
            getOptionLabel={(option) => option}
            renderOption={option => {
              //console.log("option.Fname: ",option.Fname);
              var dp = `https://res.cloudinary.com/${CloudName}/image/upload/v1617627637/${pic}.jpg`;
              console.log("pic : ", pic);
              return(
                <Fragment>
                  {pic[0]===""? 
                  <Avatar
                  name={option[0]}
                  size="50"
                  font-size="35"
                  round={true}
                  color="Slateblue"
                  style={{marginRight:"20px"}}
                /> :
                  <Avatar 
                    src={dp}
                    round={true}
                    size="50"
                    style={{marginRight:"20px"}}
                  />
                  }
                  {option}
                  </Fragment>

              );
            }}
           
            loading={loading}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              console.log("newInputValue : ",newInputValue);
              
            }}
           
            renderInput={(params) => (
              <TextField className={classes.place}
                {...params}
                SelectProps={{classes: {dropdown: classes.dropdown}}}
                size="small"
                variant="outlined"
                placeholder="Search Author's Profile"

                InputProps={{ 
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {/* {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null} */}
                      {params.InputProps.endAdornment}
                      <InputAdornment position="end" style={{paddingRight:"7px"}}>
                        <SearchIcon />
                      </InputAdornment>
                    </React.Fragment>
                    
                      
                  )
                }}
              />
            )}
        />


          <div style={{marginLeft:"auto",marginRight:"15px", float:"left"}}>
          <DarkModeSwitch
            style={{height:"35px", paddingTop:"5px"}}
            checked={isDark}
            onChange={toggleDarkMode}
            size={35}
          />
            </div>

          <div style={{  marginRight: "20px", float:"left"}}>
          
          
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
                    disabled={false} //disabled={renderProps.disabled}
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
