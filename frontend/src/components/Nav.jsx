import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../redux/auth/auth.thunk';

const Nav = () => {
   const { isLoggedIn } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogOut = () => {
      console.log(isLoggedIn);
      dispatch(logOut({ isLoggedIn: false }));
      navigate('/login');
   };
   return (
      <>
         <div className="navbar-bg"></div>
         <nav className="navbar navbar-expand-lg main-navbar">
            <form className="mr-auto form-inline">
               <ul className="mr-3 navbar-nav">
                  <li>
                     <Link
                        to="#"
                        data-toggle="sidebar"
                        className="nav-link nav-link-lg"
                     >
                        <i className="fas fa-bars"></i>
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="#"
                        data-toggle="search"
                        className="nav-link nav-link-lg d-sm-none"
                     >
                        <i className="fas fa-search"></i>
                     </Link>
                  </li>
               </ul>
               <div className="search-element">
                  <input
                     className="form-control"
                     type="search"
                     placeholder="Search"
                     aria-label="Search"
                     data-width="250"
                  />
                  <button className="btn" type="submit">
                     <i className="fas fa-search"></i>
                  </button>
                  <div className="search-backdrop"></div>
                  <div className="search-result">
                     <div className="search-header">Histories</div>
                     <div className="search-item">
                        <Link to="#">How to hack NASA using CSS</Link>
                        <Link to="#" className="search-close">
                           <i className="fas fa-times"></i>
                        </Link>
                     </div>

                     <div className="search-header">Result</div>
                     <div className="search-item">
                        <Link to="#">
                           <img
                              className="mr-3 rounded"
                              width="30"
                              src="assets/img/products/product-3-50.png"
                              alt="product"
                           />
                           oPhone S9 Limited Edition
                        </Link>
                     </div>

                     <div className="search-header">Projects</div>
                     <div className="search-item">
                        <Link to="#">
                           <div className="mr-3 text-white search-icon bg-danger">
                              <i className="fas fa-code"></i>
                           </div>
                           Admin Template
                        </Link>
                     </div>
                  </div>
               </div>
            </form>
            <ul className="navbar-nav navbar-right">
               <li className="dropdown dropdown-list-toggle">
                  <Link
                     to="#"
                     data-toggle="dropdown"
                     className="nav-link nav-link-lg message-toggle beep"
                  >
                     <i className="far fa-envelope"></i>
                  </Link>
                  <div className="dropdown-menu dropdown-list dropdown-menu-right">
                     <div className="dropdown-header">
                        Messages
                        <div className="float-right">
                           <Link to="#">Mark All As Read</Link>
                        </div>
                     </div>
                     <div className="dropdown-list-content dropdown-list-message">
                        <p href="#" className="dropdown-item">
                           <div className="dropdown-item-avatar">
                              <img
                                 alt="image"
                                 src="./assets/img/avatar/avatar-5.png"
                                 className="rounded-circle"
                              />
                           </div>
                           <div className="dropdown-item-desc">
                              <b>Alfa Zulkarnain</b>
                              <p>
                                 Exercitation ullamco laboris nisi ut aliquip ex
                                 ea commodo
                              </p>
                              <div className="time">Yesterday</div>
                           </div>
                        </p>
                     </div>
                     <div className="text-center dropdown-footer">
                        <Link to="#">
                           View All <i className="fas fa-chevron-right"></i>
                        </Link>
                     </div>
                  </div>
               </li>
               <li className="dropdown dropdown-list-toggle">
                  <Link
                     to="#"
                     data-toggle="dropdown"
                     className="nav-link notification-toggle nav-link-lg beep"
                  >
                     <i className="far fa-bell"></i>
                  </Link>
                  <div className="dropdown-menu dropdown-list dropdown-menu-right">
                     <div className="dropdown-header">
                        Notifications
                        <div className="float-right">
                           <Link to="#">Mark All As Read</Link>
                        </div>
                     </div>
                     <div className="dropdown-list-content dropdown-list-icons">
                        <Link
                           to="#"
                           className="dropdown-item dropdown-item-unread"
                        >
                           <div className="text-white dropdown-item-icon bg-primary">
                              <i className="fas fa-code"></i>
                           </div>
                           <div className="dropdown-item-desc">
                              Template update is available now!
                              <div className="time text-primary">2 Min Ago</div>
                           </div>
                        </Link>
                     </div>
                     <div className="text-center dropdown-footer">
                        <Link to="#">
                           View All <i className="fas fa-chevron-right"></i>
                        </Link>
                     </div>
                  </div>
               </li>
               <li className="dropdown">
                  <Link
                     to="#"
                     data-toggle="dropdown"
                     className="nav-link dropdown-toggle nav-link-lg nav-link-user"
                  >
                     <img
                        alt="image"
                        src="assets/img/avatar/avatar-1.png"
                        className="mr-1 rounded-circle"
                     />
                     <div className="d-sm-none d-lg-inline-block">Hi, Name</div>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right">
                     <div className="dropdown-title">Logged in 5 min ago</div>
                     <Link
                        to="features-profile.html"
                        className="dropdown-item has-icon"
                     >
                        <i className="far fa-user"></i> Profile
                     </Link>
                     <Link
                        to="features-activities.html"
                        className="dropdown-item has-icon"
                     >
                        <i className="fas fa-bolt"></i> Activities
                     </Link>
                     <Link
                        to="features-settings.html"
                        className="dropdown-item has-icon"
                     >
                        <i className="fas fa-cog"></i> Settings
                     </Link>
                     <div className="dropdown-divider"></div>
                     <Link
                        onClick={handleLogOut}
                        className="dropdown-item has-icon text-danger"
                     >
                        <i className="fas fa-sign-out-alt"></i> Logout
                     </Link>
                  </div>
               </li>
            </ul>
         </nav>
      </>
   );
};

export default Nav;
