import React, { useState, useEffect } from 'react'
import { v1 as uuid } from "uuid";
import { CookiesProvider, Cookies, useCookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors';
import MyAppBar from '../../components/MyAppBar';
import { MoneyOffRounded } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Form from './Form';

export default function Room(props) {
    // const roomID = props.roomID;

    // Quill.register('modules/cursors', QuillCursors)

    // const ydoc = new Y.Doc()

    // const cookies = new Cookies();
    // const userCookie = cookies.get('userCookie');

    // const username = useCookies.name;
    // const email = useCookies.email;

    // const provider = new WebsocketProvider('wss://demos.yjs.dev', `${roomID}`, ydoc)
    // const type = ydoc.getText(`${roomID}`);

    // useEffect(() => {
    //     const EditorContainer = document.getElementById("editor");

    //     var toolbarOptions = [
    //         [{ 'font': [] }],
    //         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

    //         ['blockquote', 'link', 'image', 'video', 'code-block'],
    //         ['formula'],

    //         [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //         [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    //         [{ 'direction': 'rtl' }],                         // text direction
    //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //         [{ 'align': [] }],
    //         [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    //         ['clean']
    //     ];

    //     var editor = new Quill(EditorContainer, {
    //         modules: {
    //             cursors: true,
    //             toolbar: toolbarOptions,
    //             history: {
    //                 userOnly: true
    //             }
    //         },
    //         placeholder: 'Start Writing...',
    //         theme: 'snow' // or 'bubble'
    //     })

    //     //   editor.enable(false);

    //     const binding = new QuillBinding(type, editor, provider.awareness)
    //     //console.log(provider.awareness);
    //     if (!username) username = 'Anonymous';
    //     provider.awareness.setLocalStateField('user', {
    //         name: `${username}`,
    //         color: 'blue'
    //     });

    //     // @ts-ignore
    //     window.example = { provider, ydoc, type, binding, Y }
    // });





    return (
        <div style={{ display: "flex" }}>
            <Form />
            {/* <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
                style={{ height: 100 + '%', display: "flex" }}
            >
                <Grid item xs={12}>

                </Grid>
                <Grid item xs={10} style={{ height: 100 + '%' }}>
                    <Card>
                        <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)" }} id="editor"></div>
                    </Card>
                </Grid>
            </Grid> */}
        </div>
    )
}