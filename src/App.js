import React from 'react';
import './App.css';
import Main from "./components/main";
import Spinner from "./components/spinner";

function App() {

    return (
        <div>
            <div id="spinnerContainer">
                <Spinner/>
            </div>
            <div id="mainContainer">
                <Main/>
            </div>
        </div>
    );

}

export default App;
