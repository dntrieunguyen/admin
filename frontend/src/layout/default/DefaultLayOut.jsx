import React from 'react';
import Nav from '../../components/Nav';
import Aside from '../../components/Aside';
import { Outlet } from 'react-router-dom';

const DefaultLayOut = () => {
   return (
      <div className="main-wrapper main-wrapper-1">
         <Nav></Nav>
         <Aside></Aside>
         {/* <!-- Main Content --> */}
         <div className="main-content">
            <section className="section">
               <Outlet></Outlet>
            </section>
         </div>
      </div>
   );
};

export default DefaultLayOut;
