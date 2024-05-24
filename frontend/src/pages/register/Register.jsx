import React from 'react';
import useValidation from '../../hooks/useValidation';
import { formatDate, setStringToDate } from '../../utils/helper';
import { apiCreateUser, apiUploadAvatar } from '../../api/app';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const Register = () => {
   const [form, setForm, handleOnChange, errors, validate] = useValidation({
      fullName: '',
      avatar: '',
      gender: 'nam',
      birthDate: formatDate(new Date(), 'yyyy-mm-dd', '-'),
      email: '',
      password: '',
      role: 22222222,
   });

   const handleSubmit = async e => {
      e.preventDefault();
      console.log({ errors, form });
      if (validate()) {
         const formData = new FormData();

         formData.append('avatar', form.avatar, form?.avatar?.name);

         const data = {
            ...form,
            birthDate: setStringToDate(form.birthDate, 'yyyy-mm-dd', '-'),
            role: +form.role,
         };

         try {
            const avatar = await apiUploadAvatar(formData);
            data.avatar = avatar?.img_url;
            const response = await apiCreateUser(data);

            if (response.success) {
               Swal.fire('Success', response?.message, 'success');
               setForm({
                  fullName: '',
                  avatar: '',
                  gender: '',
                  birthDate: '',
                  email: '',
                  password: '',
               });
            } else {
               Swal.fire('Oops!!!', response?.message, 'error');
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   return (
      <section className="section">
         <div className="container mt-5">
            <div className="row">
               <div className="cursor-pointer col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
                  <div className="cursor-pointer login-brand">
                     ADMIN REGISTER
                  </div>

                  <div className="card card-primary">
                     <div className="card-header">
                        <h4>Register</h4>
                     </div>
                     <ul>
                        {errors.fullName && (
                           <li className="m-2 text-sm text-danger">
                              {errors.fullName}
                           </li>
                        )}
                        {errors.avatar && (
                           <li className="m-2 text-sm text-danger">
                              {errors.avatar}
                           </li>
                        )}
                        {errors.gender && (
                           <li className="m-2 text-sm text-danger">
                              {errors.gender}
                           </li>
                        )}
                        {errors.birthDate && (
                           <li className="m-2 text-sm text-danger">
                              {errors.birthDate}
                           </li>
                        )}
                        {errors.email && (
                           <li className="m-2 text-sm text-danger">
                              {errors.email}
                           </li>
                        )}
                        {errors.password && (
                           <li className="m-2 text-sm text-danger">
                              {errors.password}
                           </li>
                        )}
                     </ul>
                     <div className="card-body">
                        <form method="POST">
                           <div className="row">
                              <div className="form-group col-12">
                                 <label htmlFor="frist_name">Full Name</label>
                                 <input
                                    id="frist_name"
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    onChange={handleOnChange}
                                    value={form.fullName}
                                    autoFocus
                                 />
                              </div>
                           </div>

                           <div className="row">
                              <div className="form-group col-6">
                                 <label htmlFor="email">Email</label>
                                 <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    onChange={handleOnChange}
                                    value={form.email}
                                 />
                                 <div className="invalid-feedback"></div>
                              </div>
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
                                    onChange={handleOnChange}
                                    value={form.password}
                                 />
                                 <div id="pwindicator" className="pwindicator">
                                    <div className="bar"></div>
                                    <div className="label"></div>
                                 </div>
                              </div>
                           </div>

                           <div className="row">
                              <div className="form-group col-4">
                                 <label htmlFor="inputState">Role</label>
                                 <select
                                    name="role"
                                    onChange={handleOnChange}
                                    value={form.role}
                                    id="inputState"
                                    className="form-control"
                                 >
                                    <option value={111111111}>Admin</option>
                                    <option value={22222222} selected>
                                       User
                                    </option>
                                 </select>
                              </div>
                              <div className="form-group col-4">
                                 <label htmlFor="inputState">Gender</label>
                                 <select
                                    name="gender"
                                    onChange={handleOnChange}
                                    value={form.gender}
                                    id="inputState"
                                    className="form-control"
                                 >
                                    <option value={'nam'} selected>
                                       Male
                                    </option>
                                    <option value={'nu'}>Female</option>
                                 </select>
                              </div>
                              <div className="form-group col-md-4">
                                 <label>Date</label>
                                 <input
                                    name="birthDate"
                                    onChange={handleOnChange}
                                    value={form.birthDate}
                                    type="date"
                                    class="form-control"
                                 />
                              </div>
                           </div>

                           <div className="form-divider">Ảnh đại diện</div>

                           <div className="d-flex flex-column">
                              <div className="form-group">
                                 <label>Avatar</label>
                                 <input
                                    name="avatar"
                                    onChange={handleOnChange}
                                    type="file"
                                    class="form-control"
                                 />
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
                                 onClick={handleSubmit}
                                 type="submit"
                                 className="btn btn-primary btn-lg btn-block"
                              >
                                 Register
                              </button>
                           </div>
                        </form>
                        <div className="mt-5 text-center text-muted">
                           You have an account?{' '}
                           <NavLink to={'/login'}>Login Now</NavLink>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Register;
