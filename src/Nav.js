import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                <div className="collapse navbar-collapse" id="navbarsExample09">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home page</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/coasters">List coasters</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/coasters/form">Create coaster</Link>
                        </li>
                        { isLoggedIn ? <li><a href="/logout" className="nav-link">Logout</a></li> : ''}
                    </ul>
                </div>
            </nav>
        )
    }
}