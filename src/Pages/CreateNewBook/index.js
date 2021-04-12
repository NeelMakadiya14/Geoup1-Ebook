import React, { useState, useEffect } from 'react'
import Form from './Form';
import Editor from './editor';
import axios from 'axios';
import queryString from 'query-string';
import { CookiesProvider, Cookies, useCookies } from 'react-cookie';
import { Redirect } from "@reach/router";
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { AirlineSeatLegroomExtra } from '@material-ui/icons';

require('dotenv').config();

export default function Room(props) {

    let docID = window.location.pathname;
    docID = docID.substring(6);
    const cookies = new Cookies();
    const userCookie = cookies.get('userCookie');
    const email = userCookie.email;
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const [showEditor, setShowEditor] = useState(false);
    const [access, setAccess] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/checkbook?` + queryString.stringify({ docID }))
            .then((res) => {
                console.log(res);
                if (res.data === true) setShowEditor(true);
                else setShowEditor(false);
            })

        axios.get(`${API_URL}/checkaccess?` + queryString.stringify({ docID }) + '&' + queryString.stringify({ email }))
            .then((res) => {
                console.log(res);
                if (res.data === true) setAccess(true);
                else setAccess(false);
            })

    }, [props.render]);

    return (
        <>
            {!showEditor && <Form />}
            {showEditor && access && <Editor />}
            {showEditor && !access && <h1> Sorry You don't have the editing access on this doc.</h1>}
        </>
    )
}
