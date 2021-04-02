import React, { useState, useEffect } from 'react'
import Form from './Form';
import Editor from './editor';
import axios from 'axios';
import queryString from 'query-string';
import { CookiesProvider, Cookies, useCookies } from 'react-cookie';
import { Redirect } from "@reach/router";

require('dotenv').config();

export default function Room(props) {

    console.log();
    let id = window.location.pathname;
    id = id.substring(6);
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const [showEditor, setShowEditor] = useState(false);

    const cookies = new Cookies();
    const userCookie = cookies.get('userCookie');
    const email =  userCookie.email;

    axios.get(`${API_URL}/checkauthor?` + queryString.stringify({ email }))
    .then((res) => {
        if (typeof (res.data.length) === 'undefined') {
            <Redirect to = "/addprofile" />
        }
    })

    axios.get(`${API_URL}/checkbook?` + queryString.stringify({ id }))
    .then((res) => {
        if (res.data === true) setShowEditor(true);
        else setShowEditor(false);
    })

    return (
        <>
            {!showEditor && <Form />}
            {showEditor && <Editor />}
        </>
    )
}
