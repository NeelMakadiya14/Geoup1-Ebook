import React, { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import Avatar from "react-avatar";
import HomeIcon from "@material-ui/icons/Home";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import RoomIcon from "@material-ui/icons/Room";
import MyAppBar from "../../components/MyAppBar";
import Toolbar from "@material-ui/core/Toolbar";

import "./profile.css";

import axios from "axios";

require("dotenv").config();

export default function Profile(props) {
  const [profile, setProfile] = useState();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/profile?email=${props.email}`)
      .then((response) => {
        //  console.log(response);
        console.log(response.data[0]);
        const data = response.data[0];
        setProfile(data);
        console.log(profile);
      })
      .catch(() => {
        console.log("Error!");
      });
  }, []);

  return (
    // <div>
    //   <h1>{"Profile of " + props.GID}</h1>
    // </div>

    <div>
      <MyAppBar />
      <Toolbar />
      {profile ? (
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
                <RoomIcon
                  style={{ color: "black" }}
                  fontSize="large"
                ></RoomIcon>
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
      ) : null}
    </div>
  );
}
