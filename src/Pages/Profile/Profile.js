//import './App.css';
import React, { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import Avatar from "react-avatar";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import HomeIcon from "@material-ui/icons/Home";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import RoomIcon from "@material-ui/icons/Room";
import { black } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import "./styles.css";

import axios from "axios";

class App extends React.Component {
  state = {
    details: ""
  };

  componentDidMount = () => {
    this.getUserData();
  };

  getUserData = () => {
    axios
      .get("/profile?email=nmakadiya1@gmail.com")
      .then((response) => {
        const data = response.data;
        this.setState({ details: data });
        console.log("Data received");
      })
      .catch(() => {
        console.log("Error!");
      });
  };

  render() {
    return (
      <div className="page">
        <div className="profile">
          <div className="profilepic">
            {this.state.details.picUrl ? (
              this.state.details.picUrl
            ) : (
              <Avatar
                name={this.state.details.Fname}
                size="140"
                font-size="3em"
                round={true}
                color="Slateblue"
              />
            )}
          </div>

          <div className="name">
            <p className="name1">
              {this.state.details.Fname + " " + this.state.details.Lname}
            </p>
          </div>

          <div className="author">
            <p className="author1">Author & Story-Writer</p>
          </div>

          <div className="contact">
            <p className="contact1">CONTACT-info</p>

            <div className="email">
              <p className="email1">
                <SocialIcon
                  network="email"
                  url=""
                  style={{ height: 28, width: 28 }}
                />
                {"  "}
                {this.state.details.email}
              </p>
            </div>

            {this.state.details.Twitter ? (
              <div className="Twitter">
                <p className="Twitter1">
                  <SocialIcon
                    network="twitter"
                    url=""
                    style={{ height: 28, width: 28 }}
                  />
                  {"   "}
                  {this.state.details.Twitter}
                </p>
              </div>
            ) : null}

            {this.state.details.linkedInUrl ? (
              <div className="linkedInUrl">
                <p className="linkedInUrl1">
                  <SocialIcon
                    network="linkedin"
                    url=""
                    style={{ height: 28, width: 28 }}
                  />
                  {"  "}
                  {this.state.details.linkedInUrl}
                </p>
              </div>
            ) : null}

            {this.state.details.Mnumber ? (
              <div className="Mnumber">
                <p className="Mnumber1">
                  <SocialIcon
                    network="whatsapp"
                    url=""
                    style={{ height: 28, width: 28 }}
                  />
                  {"  "}
                  {this.state.details.Mnumber}
                </p>
              </div>
            ) : null}
          </div>

          <div className="Company">
            <p className="Company1">WORK-details</p>
            <p className="Company2">
              <HomeWorkIcon
                style={{ color: "brown" }}
                fontSize="large"
              ></HomeWorkIcon>{" "}
              {this.state.details.Company}
              <br></br>
              <RoomIcon style={{ color: "black" }} fontSize="large"></RoomIcon>
              {this.state.details.Clocation}
            </p>
          </div>

          <div className="Location">
            <p className="Location1">LOCATION</p>
            <p className="Location2">
              <HomeIcon color="primary" fontSize="large" />{" "}
              {this.state.details.City ? this.state.details.City : null},
              {this.state.details.State ? this.state.details.State : null},
              {this.state.details.Country}
            </p>
          </div>
        </div>

        <div className="bio">
          <p className="bio2">BIO:</p>
          <p className="bio1">{this.state.details.Bio}</p>
        </div>

        <div className="posts">
          <p className="posts1">UPLOADS:</p>
        </div>
      </div>
    );
  }
}

export default App;
/*
export default function Profile(props) {
  const profile = {
    email: "tirthpatel2710@gmail.com",
    GID: 12345,
    Fname: "Tirth",
    Lname: "Patel",
    Mnumber: "987654321",
    Twitter: "tirth2710",
    City: "Gandhinagar",
    State: "Gujarat",
    Country: "India",
    Company: "DAIICT",
    Clocation: "Gandhinagar",
    Bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //Website : "",
    //picUrl:
    linkedInUrl: "www.linkedin.com/in/tirthpatel2710"
  };

  return (
    // <div>
    //   <h1>{"Profile of " + props.GID}</h1>
    // </div>

    <div className="page">
      <div className="profile">
        <div className="profilepic">
          {profile.picUrl ? (
            profile.picUrl
          ) : (
            <Avatar
              name={profile.Fname}
              size="140"
              font-size="3em"
              round={true}
              color="Slateblue"
            />
          )}
        </div>

        <div className="name">
          <p className="name1">{profile.Fname + " " + profile.Lname}</p>
        </div>

        <div className="author">
          <p className="author1">Author & Story-Writer</p>
        </div>

        <div className="contact">
          <p className="contact1">CONTACT-info</p>

          <div className="email">
            <p className="email1">
              <SocialIcon
                network="email"
                url=""
                style={{ height: 28, width: 28 }}
              />
              {"  "}
              {profile.email}
            </p>
          </div>

          {profile.Twitter ? (
            <div className="Twitter">
              <p className="Twitter1">
                <SocialIcon
                  network="twitter"
                  url=""
                  style={{ height: 28, width: 28 }}
                />
                {"   "}
                {profile.Twitter}
              </p>
            </div>
          ) : null}

          {profile.linkedInUrl ? (
            <div className="linkedInUrl">
              <p className="linkedInUrl1">
                <SocialIcon
                  network="linkedin"
                  url=""
                  style={{ height: 28, width: 28 }}
                />
                {"  "}
                {profile.linkedInUrl}
              </p>
            </div>
          ) : null}

          {profile.Mnumber ? (
            <div className="Mnumber">
              <p className="Mnumber1">
                <SocialIcon
                  network="whatsapp"
                  url=""
                  style={{ height: 28, width: 28 }}
                />
                {"  "}
                {profile.Mnumber}
              </p>
            </div>
          ) : null}
        </div>

        <div className="Company">
          <p className="Company1">WORK-details</p>
          <p className="Company2">
            <HomeWorkIcon
              style={{ color: "brown" }}
              fontSize="large"
            ></HomeWorkIcon>{" "}
            {profile.Company}
            <br></br>
            <RoomIcon style={{ color: "black" }} fontSize="large"></RoomIcon>
            {profile.Clocation}
          </p>
        </div>

        <div className="Location">
          <p className="Location1">LOCATION</p>
          <p className="Location2">
            <HomeIcon color="primary" fontSize="large" />{" "}
            {profile.City ? profile.City : null},
            {profile.State ? profile.State : null},{profile.Country}
          </p>
        </div>
      </div>

      <div className="bio">
        <p className="bio2">BIO:</p>
        <p className="bio1">{profile.Bio}</p>
      </div>

      <div className="posts">
        <p className="posts1">UPLOADS:</p>
      </div>
    </div>
  );
}*/
