import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "rgba(125, 46, 104, 0.01)" }}>
            <Link className="navbar-brand" to="/">
                <span className="d-inline-block align-top icon icon-warehouse"></span>
                {"  "}Waretodo
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon small" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/news">Latest news</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/sketchit">Sketch it</Link>
                    </li>
                </ul>
                <span className="navbar-text">
                </span>

            </div>
        </nav>
    );
}

export default Navbar;