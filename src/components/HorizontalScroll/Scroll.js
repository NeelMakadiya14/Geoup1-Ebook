import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Box } from "@material-ui/core";
import axios from "axios";
import "./Scroll.css";
import Typography from "@material-ui/core/Typography";
import { CookiesProvider, Cookies, useCookies } from "react-cookie";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "3px",
  },
  header: {
    textAlign: "center",
  },

  media: {
    textAlign: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(1)",
  },
  like: {
    fontSize: 10,
    color: "#999999",
  },
  heart: {
    paddingLeft: "0.2rem",
  },
  button: {
    fontSize: 8,
    height: 22,
    width: 65,
  },
  wishlist: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    padding: "0.2rem",
    paddingTop: "0.3rem",
  },
  like_in_guest: {
    textAlign: "right",
    fontSize: "medium",
  },
  paper: {
    width: 200,
    height: 270,
  },
  title: {
    textAlign: "center",
    fontSize: 12,
    paddingTop: "1rem",
  },
  author: {
    textAlign: "center",
    fontSize: 10,
    paddingBottom: "0.8rem",
  },
  genre: {
    fontSize: 9,
    paddingBottom: "0.2rem",
  },
  des: {
    fontSize: 10,
    paddingBottom: "0.5rem",
    paddingLeft: "0.2rem",
  },
  info: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const MyPostCard = ({ data, key, isAdd, mylist, setMylist }) => {
  const ClickMe = () => {
    console.log("clicked");
    const obj = {
      email: userCookie.email,
      docID: data.docID,
    };
    console.log(obj);
    axios
      .post(`${API_URL}/addtomylist`, obj)
      .then((res) => {
        console.log(res);
        //  props.isAdd == true ? (setAdd(false)) : (setAdd(true));
        // console.log("Value : ", isAdd);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="box"
      onClick={() => {
        navigate(`/view/${data.docID}`);
      }}
    >
      <Paper className="image" elevation={3}>
        <img src={data.imageUrl} />
      </Paper>
      <Paper className="details">
        <Typography className={classes.title} color="textPrimary">
          {data.title}
        </Typography>
        <Typography className={classes.author} color="textSecondary">
          {"- "}
          {data.author.Fname + " " + data.author.Lname}
        </Typography>
        <Typography
          className={classes.genre}
          variant="subtitle2"
          color="textSecondary"
          component="p"
        >
          {bull}{" "}
          {data.genres.map((genre) => {
            return "|" + genre + "|" + " ";
          })}
        </Typography>
        <Typography className={classes.des} variant="body2" component="p">
          {data.description.length > 230
            ? props.data.description.slice(0, 230) + "..."
            : props.data.description}
        </Typography>
        <div className={classes.wishlist}>
          <span>
            {userCookie !== undefined ? (
              <Button
                onClick={ClickMe}
                className={classes.button}
                color="primary"
                variant="contained"
                disableElevation
              >
                {isAdd == true ? "Remove" : "My List"}
              </Button>
            ) : null}
          </span>
          <span className={classes.like}>
            {heart} {data.likes.count}
          </span>
        </div>
      </Paper>
    </div>
  );
};

const Scroll = (props) => {
  const classes = useStyles();

  const bull = <span className={classes.bullet}>➥</span>;
  const heart = <span className={classes.heart}>❤</span>;

  //const Genre = props.data.genres;

  const navigate = useNavigate();

  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  return (
    <div className="root">
      <Box
        fontWeight="fontWeightBold"
        fontSize="h5.fontSize"
        color="textSecondary"
        style={{ marginLeft: "80px" }}
      >
        {props.lable}
        {/* <Typography
          variant="h1"
          color="textSecondary"
          style={{ fontSize: 25, marginLeft: "80px", marginBottom: 0 }}
          gutterBottom={false}
        >
          {props.lable}
        </Typography> */}
      </Box>
      <div className="container">
        {props.data.map((x, i) => (
          <div className="item">
            <MyPostCard
              data={x}
              key={i}
              isAdd={props.isAdd}
              mylist={props.mylist}
              setMylist={props.setMylist}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scroll;
