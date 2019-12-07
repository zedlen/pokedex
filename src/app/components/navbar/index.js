import React from 'react'
import { NavLink } from "react-router-dom";
import './style.css'
export function NavBar(props){
    return(
        <nav>
            <NavLink to="/" activeClassName='active'>Home</NavLink>                         
        </nav> 
    )
}