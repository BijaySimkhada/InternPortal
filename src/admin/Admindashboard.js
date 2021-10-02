import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./Userdashboard.css";
import { auth, db, logout } from "../firebase";
const Admindashboard = ({ name, user, image }) => {

  
   return (
      
      <>
      <header className="page-header">
  <nav>
    <a href="/dashboard" aria-label="forecastr logo" className="logo">
      <svg width="140" height="49">
       
      </svg>
    </a>
    <button className="toggle-mob-menu" aria-expanded="false" aria-label="open menu">
      <svg width="20" height="20" aria-hidden="true">
        <use href="#down"></use>
      </svg>
    </button>
    <ul className="admin-menu">
      <li className="menu-heading">
        <h3>Admin Dashboard 
          User:{name}</h3>
          <img src={image} height="200" width="100" alt=""/>
       <button className="login__btn" onClick={logout}> Admmin Logout </button>
      </li>
   
      <li>
        <a href="/login">
          <svg>
            <use href="/login"></use>
          </svg>
          <span>Users</span>
        </a>
      </li>
      <li>
        <a href="#0">
          <svg>
            <use href="#trends"></use>
          </svg>
          <span>Trends</span>
        </a>
      </li>
      <li>
        <a href="/reset">
          <svg>
            <use htmlhref="#reset"></use>
          </svg>
          <span>Reset Password</span>
        </a>
      </li>
   
     
    </ul>
  </nav>
</header>
<section className="page-content">
  <section className="search-and-user">
    
    <div className="admin-profile">
      <span className="greeting">Hello admin</span>
      
      <div className="notifications">
        <span className="badge">1</span>
        <svg>
          <use href="#users"></use>
        </svg>
      </div>
    </div>
  </section>
 
  <footer className="page-footer">
 
    <a href="https://georgemartsoukos.com/" target="_blank">
    
    </a>
  </footer>
</section>
      </>
   )


}

export default Admindashboard;
