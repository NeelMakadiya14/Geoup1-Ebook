import React, { useState, useEffect } from 'react'
import Form from './Form';
import Editor from './editor';
import axios from 'axios';
import queryString from 'query-string';
require('dotenv').config();

export default function Room(props) {

    console.log();
    let id = window.location.pathname;
    id = id.substring(6);
    const API_URL = process.env.REACT_APP_BACKEND_URL;
    const [showEditor, setShowEditor] = useState(false);
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
