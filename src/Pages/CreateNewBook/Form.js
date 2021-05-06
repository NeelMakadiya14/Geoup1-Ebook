import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { useState } from 'react'
import axios from 'axios';
import queryString from 'query-string';
import { CookiesProvider, Cookies, useCookies } from 'react-cookie';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { genres } from '../../utils/Constant';
import Box from '@material-ui/core/Box';

require('dotenv').config();

const CloudName = process.env.REACT_APP_CLOUD_NAME;
const UploadPreset = process.env.REACT_APP_CLOUD_PRESET;

const defaultProps = {
    border: 1,
    borderRadius: 5,
    style: { width: '396px', height: '57px' , marginTop: '20px' },
  };
  

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form() {
    const classes = useStyles();
    const [bookname, setBookName] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState({});
    const [options, setOptions] = useState();
    const submit = async () => {
        const cookies = new Cookies();
        const userCookie = cookies.get('userCookie');
        const email = userCookie.email;
        const API_URL = process.env.REACT_APP_BACKEND_URL;
        console.log(userCookie.GID);
        let id = window.location.pathname;
        id = id.substring(6);
        let secure;
        await fetch(`https://api.Cloudinary.com/v1_1/${CloudName}/image/upload`, options)
            .then(res => res.json())
            .then(res => {
                console.log(res.secure_url);
                secure = res.secure_url;
            })
            .catch(err => console.log(err));

        console.log(secure);
        const obj = {
            title: bookname,
            description: description,
            genres: genre,
            docID: id,
            imageUrl: secure
        }

        axios.post(`${API_URL}/startwriting?` + queryString.stringify({ email }), obj)
            .then((res) => {
                window.location.reload();
            })

    }

    const onClick = () => {
        if (formRef.current.reportValidity()) submit();
    }


    const handleUploadClick = (event) => {

        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        // replace this with your upload preset name
        formData.append('upload_preset', UploadPreset);
        setOptions({
            method: 'POST',
            body: formData,
        });

    }
    
  const formRef = React.useRef();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LibraryBooks />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Book
        </Typography>
        <form className={classes.form} ref={formRef}>
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            label="Book Name"
            onChange={(event) => setBookName(event.target.value)}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Description"
            margin="normal"
            onChange={(event) => setDescription(event.target.value)}
          />
          <Autocomplete
            multiple
            options={genres}
            style={{ marginTop: "15px" }}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                required={genre.length === undefined || genre.length === 0}
                variant="outlined"
                label="Genres of Book"
                placeholder="new genre"
              />
            )}
            onChange={(event, value) => setGenre(value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Create Book
          </Button>
        </form>
      </div>
    </Container>
  );
}
