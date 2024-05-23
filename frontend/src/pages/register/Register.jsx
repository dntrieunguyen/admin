import React from 'react';

const Register = () => {
   const handleUploadAvatar = e => {
      e.preventDefault();
      console.log('upload avatar');
   };
   const handleChangeAvatar = () => {
      console.log('Change avatar');
   };

   return (
      <section className="section">
         <div className="container mt-5">
            <div className="row">
               <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 cursor-pointer">
                  <div className="cursor-pointer login-brand">
                     ADMIN REGISTER
                  </div>

                  <div className="card card-primary">
                     <div className="card-header">
                        <h4>Register</h4>
                     </div>

                     <div className="card-body">
                        <form method="POST">
                           <div className="row">
                              <div className="form-group col-12">
                                 <label htmlFor="frist_name">Full Name</label>
                                 <input
                                    id="frist_name"
                                    type="text"
                                    className="form-control"
                                    name="frist_name"
                                    autoFocus
                                 />
                              </div>
                           </div>

                           <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                 id="email"
                                 type="email"
                                 className="form-control"
                                 name="email"
                              />
                              <div className="invalid-feedback"></div>
                           </div>

                           <div className="row">
                              <div className="form-group col-6">
                                 <label htmlFor="password" className="d-block">
                                    Password
                                 </label>
                                 <input
                                    id="password"
                                    type="password"
                                    className="form-control pwstrength"
                                    data-indicator="pwindicator"
                                    name="password"
                                 />
                                 <div id="pwindicator" className="pwindicator">
                                    <div className="bar"></div>
                                    <div className="label"></div>
                                 </div>
                              </div>
                              <div className="form-group col-6">
                                 <label htmlFor="password2" className="d-block">
                                    Password Confirmation
                                 </label>
                                 <input
                                    id="password2"
                                    type="password"
                                    className="form-control"
                                    name="password-confirm"
                                 />
                              </div>
                           </div>

                           <div className="form-divider">Ảnh đại diện</div>

                           <div className="d-flex flex-column">
                              <div
                                 className="my-4 bg-danger"
                                 style={{ width: '200px', height: '200px' }}
                              >
                                 <img
                                    style={{ width: '200px', height: '200px' }}
                                    src=""
                                    alt="Ảnh đại diện"
                                 />
                              </div>
                              <div className="form-group ">
                                 <button
                                    type="submit"
                                    className="btn btn-dropbox btn-lg btn-block w-50"
                                    onClick={e => handleUploadAvatar(e)}
                                 >
                                    Upload hình ảnh
                                 </button>
                              </div>
                           </div>

                           <div className="form-group">
                              <div className="custom-control custom-checkbox">
                                 <input
                                    type="checkbox"
                                    name="agree"
                                    className="custom-control-input"
                                    id="agree"
                                 />
                                 <label
                                    className="custom-control-label"
                                    htmlFor="agree"
                                 >
                                    I agree with the terms and conditions
                                 </label>
                              </div>
                           </div>

                           <div className="form-group">
                              <button
                                 type="submit"
                                 className="btn btn-primary btn-lg btn-block"
                              >
                                 Register
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Register;
