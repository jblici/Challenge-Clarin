import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src='https://www.clarin.com/static/CLAClarin/images/Clarin-sahreing-fbk.png' alt="" width="30" height="30" className="d-inline-block align-text-top"/>
                    PageSpeed Insights Clarin
                </a>
            </div>
        </nav>
    );
}

export default Navbar;