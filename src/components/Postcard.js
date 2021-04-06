import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import "./Styles.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import queryString from "query-string";
import { CookiesProvider, Cookies, useCookies } from "react-cookie";
import { Paper } from "@material-ui/core";

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
    fontSize: "medium",
    color: "#999999",
  },
  Heart: {
    transform: "scale(1)",
  },
  button: {
    fontSize: "small",
    height: 25,
  },
  wishlist: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    padding: "0.5rem",
  },
  like_in_guest: {
    textAlign: "right",
    fontSize: "medium",
  },
  paper: {
    width: 270,
    height: 350,
  }
}));

const Postcard = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>➥</span>;
  const heart = <span className={classes.Heart}>❤</span>;

  //const Genre = props.data.genres;

  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  console.log("URL : ", API_URL);

  const ClickMe = () => {
    console.log("clicked");
    const obj = {
      email: userCookie.email,
      docID: props.data.docID,
    };
    console.log(obj);
    axios
      .post(`${API_URL}/addtomylist`, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="book">
      <Paper className={classes.paper} >
        <img src={props.data.imageUrl} />

        <div className="book-over">
          <Card className={classes.root} variant="outlined">
            <CardHeader
              className={classes.header}
              title={props.data.title}
              subheader={props.data.author.Fname + " " + props.data.author.Lname}
            />
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                {bull}{" "}
                {props.data.genres.map((genre) => {
                  return "|" + genre + "|" + " ";
                })}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data.description}
              </Typography>

              {userCookie == undefined ? (
                <Typography
                  className={classes.like_in_guest}
                  variant="subtitle2"
                  color="textSecondary"
                  component="p"
                >
                  {heart} {props.data.likes.count}
                </Typography>
              ) : (
                <div className={classes.wishlist}>
                  <Button
                    onClick={ClickMe}
                    className={classes.button}
                    variant="outlined"
                  >
                    Add to My List
                </Button>
                  <span className={classes.like}>
                    {" "}
                    {heart} {props.data.likes.count}
                  </span>{" "}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Paper>



    </div>
  );
};

export default Postcard;
