import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import "./Styles.css"


const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '3px',
    },
    header: {
        textAlign: 'center',
    },
    img: {
        width: 150,
        height: 'auto',
        borderRadius: '5px'
    },
    media: {
        textAlign: 'center'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(1)',
    },
    like: {
        textAlign: 'right',
    },
    Heart: {
        transform: 'scale(1)'
    }

}));


const Postcard = (props) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>➥</span>;
    const heart = <span className={classes.Heart}>❤</span>;

    const Genre = props.data.genres

    return (
        <div className="book">
            <img src={props.data.imageUrl} />


            <div className="book-over">
                < Card className={classes.root} variant="outlined">
                    <CardHeader className={classes.header}
                        title={props.data.title}
                        subheader={props.data.author.Fname + " " + props.data.author.Lname}
                    />
                    <CardContent>
                        <Typography variant="subtitle2" color="textSecondary" component="p" >
                            {bull} {Genre.map((genre) => {
                                return ("|" + genre + "|" + " ");
                            })}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {props.data.description}
                        </Typography>
                        <Typography className={classes.like} variant="subtitle2" color="textSecondary" component="p">
                            {heart} {props.data.likes.count}
                        </Typography>
                    </CardContent>

                </Card>
            </div>

        </div >


    );
}

export default Postcard;