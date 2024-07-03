import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom';

const Navbaar = () => {

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Admin</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">               
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbaar
