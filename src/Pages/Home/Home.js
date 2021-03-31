import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import SwitchUI from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MyAppBar from "../../components/MyAppBar";
import { CookiesProvider, Cookies, useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import Modal from "@material-ui/core/Modal";
import Postcard from "../../components/Postcard";
// import SecondaryBar from "../../components/SecondaryBar";
import axios from "axios";
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const obj = {
  title: "Stranger in a Strange Land",
  author: {
    Fname: "Robert",
    Lname: "Heinlein",
  },
  genres: ["Comedy", "Drama"],
  likes: {
    count: "150",
  },
  docID: "req.body.docID",
  imageUrl:
    "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/9/2/1441205095847/2eab3067-c0d9-44d7-abcd-d21af5b4b245-bestSizeAvailable.jpeg?width=300&quality=45&auto=format&fit=max&dpr=2&s=7e20b9ee90aaa1bbf1558190049a0335",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
};

export default function Home(props) {
  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");
  const [render, setRender] = useState(false);

  const client_id = process.env.REACT_APP_CLIENT_ID;
  const [cookie, setCookie] = useCookies([""]);
  const [user, setUser] = useState(false);

  console.log("Home-Rerender");
  const classes = useStyles();

  console.log(userCookie);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const responseGoogle = (response) => {
    console.log("Success");
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
    setUser(true);
    setRender(!render);
  };

  const fail = (res) => {
    console.log("Failed ", res);
  };

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

  const [modalStyle] = React.useState(getModalStyle);
  console.log(client_id);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Button variant="contained" color="primary" onClick={() => setUser(true)}>
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
    <div className={classes.root}>
      <MyAppBar render={render} setRender={setRender} />
      {/* <SecondaryBar /> */}
      <Modal
        open={!user}
        onClose={() => {
          setUser(false);
        }}
      >
        {body}
      </Modal>
      <main className={classes.content}>
        <Toolbar />
        <h1>
          {userCookie === undefined
            ? "Hello Guest"
            : "Hello " + userCookie.name}
        </h1>
        <Postcard data={obj} />
      </main>
    </div>
  );
}
