import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/auth.thunk';
const Login = () => {
   const [form, setForm] = useState({
      email: '',
      password: '',
   });

   const { isLoggedIn } = useSelector(state => state.auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleOnChange = e => {
      const { value, name } = e.target;
      setForm(form => ({
         ...form,
         [name]: value,
      }));
   };

   const handdleLogin = e => {
      e.preventDefault();
      const user = { ...form };
      dispatch(login(user)).then(response => {
         if (response?.payload?.success) {
            response?.payload?.results?.isAdmin
               ? (window.location.href = process.env.REACT_APP_ADMIN_URL)
               : navigate('/');
            setForm({
               username: '',
               password: '',
            });
         }
      });
   };

   return (
      <div id="app">
         <section className="section">
            <div className="container mt-5">
               <div className="row">
                  {isLoggedIn ? (
                     'Đã đăng nhập'
                  ) : (
                     <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <div className="login-brand">ADMIN</div>

                        <div className="card card-primary">
                           <div className="card-header">
                              <h4>Login</h4>
                           </div>

                           <div className="card-body">
                              <form
                                 method="POST"
                                 action="#"
                                 className="needs-validation"
                              >
                                 <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                       id="email"
                                       type="email"
                                       className="form-control"
                                       name="email"
                                       required
                                       autoFocus={true}
                                       onChange={handleOnChange}
                                       value={form.email}
                                    />
                                    <div className="invalid-feedback">
                                       Please fill in your email
                                    </div>
                                 </div>

                                 <div className="form-group">
                                    <div className="d-block">
                                       <label
                                          htmlFor="password"
                                          className="control-label"
                                       >
                                          Password
                                       </label>
                                       <div className="float-right">
                                          <Link
                                             href="auth-forgot-password.html"
                                             className="text-small"
                                          >
                                             Forgot Password?
                                          </Link>
                                       </div>
                                    </div>
                                    <input
                                       id="password"
                                       type="password"
                                       className="form-control"
                                       name="password"
                                       required
                                       onChange={handleOnChange}
                                       value={form.password}
                                    />
                                    <div className="invalid-feedback">
                                       please fill in your password
                                    </div>
                                 </div>

                                 <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                       <input
                                          type="checkbox"
                                          name="remember"
                                          className="custom-control-input"
                                          id="remember-me"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="remember-me"
                                       >
                                          Remember Me
                                       </label>
                                    </div>
                                 </div>

                                 <div className="form-group">
                                    <button
                                       type="submit"
                                       className="btn btn-primary btn-lg btn-block"
                                       onClick={handdleLogin}
                                    >
                                       Login
                                    </button>
                                 </div>
                              </form>
                           </div>
                        </div>
                        <div className="mt-5 text-center text-muted">
                           Don't have an account?{' '}
                           <NavLink to={'/register'} href="auth-register.html">
                              Create One
                           </NavLink>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </section>
      </div>
   );
};

export default Login;
