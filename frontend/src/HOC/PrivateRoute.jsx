import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
   const navigate = useNavigate();
   const user = useSelector(state => state.auth.userData);

   useEffect(() => {
      if (!isLoggedIn) {
         // Nếu chưa đăng nhập, hiển thị thông báo và chuyển hướng đến trang đăng nhập
         Swal.fire('Oops!!!', 'Please Login!!!', 'error');
         navigate('/login');
      }

      if (!user?.role === 111111111) {
         Swal.fire('Oops!!!', 'Bạn không có quyền truy cập', 'error');
         navigate('/login');
      }
   }, [isLoggedIn]);

   return <>{user?.role === 111111111 && isLoggedIn && children}</>;
};

export default PrivateRoute;
