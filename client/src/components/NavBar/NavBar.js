import React from 'react';
import './style.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">Phocus</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/pictures">Pictures</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/forum">Forum</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;