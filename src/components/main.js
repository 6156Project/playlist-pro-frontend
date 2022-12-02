import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './home'
// Commented out Login for npm build to work
// import Login from './login'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
function Main() {
    return (
        <main>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                {/*<Route exact path="/login" element={<Login/>}/>*/}
            </Routes>
        </main>
    );
}

export default Main
