import React from 'react';
import { Router } from '@reach/router';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import AddProfile from './Pages/AddProfile/AddProfile';
import CreateNewBook from './Pages/CreateNewBook'


export default function Routes() {
    return (
        <Router>
        <Home path="/" />
        <Profile path="/profile" />
        <Profile path="/:username" />
        <AddProfile path="/addprofile" />
        <Home path="*" />
        <CreateNewBook path="/edit/:roomID"/>
      </Router>
    )
}
