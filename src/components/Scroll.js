import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel, { consts } from 'react-elastic-carousel';
import { Paper } from "@material-ui/core";
import Postcard from "./Postcard";
import axios from "axios";
import queryString from "query-string";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "./Styles.css";


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
}));
const Scroll = (props) => {

    const classes = useStyles();

    const API_URL = process.env.REACT_APP_BACKEND_URL;


    return (

        <div className={classes.content}>
            <Carousel itemPosition={consts.START} breakPoints={breakPoints} showEmptySlots>
                {
                    props.data.map((x, i) => (

                        <Postcard data={x} key={i} />


                    ))
                }
            </Carousel>
        </div>
    );




};

export default Scroll;