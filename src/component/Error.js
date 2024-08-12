import React from "react";
import svg from "../assets/404.svg";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
            <div className="cont-404">
                <img src={svg} alt="svg-error" />
                <Link to='/'>
                    <button>Back to Home</button>
                </Link>
            </div>
        </>
    );
};

export default Error;