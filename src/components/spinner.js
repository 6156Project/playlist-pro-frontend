import spinner from '../assets/spinner.gif';
import React from "react";

function Spinner() {
    return (
        <div>
            <img src={ spinner } alt="Waiting for response" />
        </div>
    );

}

export default Spinner;
