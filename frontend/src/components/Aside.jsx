import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Aside = () => {
   return (
      <>
         <div className="main-sidebar sidebar-style-2">
            <aside id="sidebar-wrapper">
               <div className="sidebar-brand">
                  <Link to="/">admin</Link>
               </div>
               <div className="sidebar-brand sidebar-brand-sm">
                  <Link to="index.html">St</Link>
               </div>
               <ul className="sidebar-menu">
                  <li className="menu-header">Dashboard</li>
                  <li className="dropdown active">
                     <NavLink to="/" className="nav-link has-dropdown">
                        <i className="fas fa-fire"></i>
                        <span>Dashboard</span>
                     </NavLink>
                  </li>
                  <li className="menu-header">User</li>
                  <li>
                     <NavLink className="nav-link" to="/user">
                        <i className="fas fa-fire"></i> <span>User</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink className="nav-link" to="/new-user">
                        <i className="fas fa-fire"></i> <span>New User</span>
                     </NavLink>
                  </li>
                  <li className="menu-header">Quetions</li>
                  <li>
                     <NavLink className="nav-link" to="question">
                        <i className="fas fa-fire"></i> <span>Quetions</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink className="nav-link" to="new-question">
                        <i className="fas fa-fire"></i>{' '}
                        <span>New Quetions</span>
                     </NavLink>
                  </li>
               </ul>
            </aside>
         </div>
      </>
   );
};

export default Aside;
