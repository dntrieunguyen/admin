import React from 'react';
import useValidation from '../../hooks/useValidation';
import { formatDate, setStringToDate } from '../../utils/helper';
import { apiCreateUser, apiUploadAvatar } from '../../api/app';
import Swal from 'sweetalert2';

const NewUser = () => {
   const [form, setForm, handleOnChange, errors, validate] = useValidation({
      fullName: '',
      avatar: '',
      gender: 'nam',
      birthDate: formatDate(new Date(), 'yyyy-mm-dd', '-'),
      email: '',
      password: '',
   });

   const handleSubmit = async e => {
      e.preventDefault();
      if (validate()) {
         const formData = new FormData();

         formData.append('avatar', form.avatar, form?.avatar?.name);

         const data = {
            ...form,
            birthDate: setStringToDate(form.birthDate, 'yyyy-mm-dd', '-'),
         };

         data.avatar = 'link';

         console.log(data);

         try {
            const avatar = await apiUploadAvatar(formData);
            data.avatar = avatar?.img_url;
            const response = await apiCreateUser(data);
            response.success
               ? Swal.fire('Success', response?.message, 'success')
               : Swal.fire('Oops!!!', response?.message, 'error');
         } catch (error) {
            console.log(error);
         }

         setForm({
            fullName: '',
            avatar: '',
            gender: '',
            birthDate: '',
            email: '',
            password: '',
         });
      }
   };
   return (
      <>
         <div className="section-header">
            <h1>New User</h1>
         </div>
         <div className="card">
            <div className="card-header">
               <h4>Create New User</h4>
            </div>
            {errors && (
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
                     <li className="m-2 text-sm text-danger">{errors.email}</li>
                  )}
                  {errors.password && (
                     <li className="m-2 text-sm text-danger">
                        {errors.password}
                     </li>
                  )}
               </ul>
            )}
            <div className="card-body">
               <div class=" form-group">
                  <label htmlFor="inputEmail4">Full Name</label>
                  <input
                     type="text"
                     name="fullName"
                     className="form-control"
                     placeholder="Full Name"
                     onChange={handleOnChange}
                     value={form.fullName}
                  />
               </div>
               <div className="form-row">
                  <div className="form-group col-md-6">
                     <label>File</label>
                     <input
                        name="avatar"
                        onChange={handleOnChange}
                        type="file"
                        class="form-control"
                     />
                  </div>
                  <div className="form-group col-md-2">
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
               <div className="form-row">
                  <div className="form-group col-md-6">
                     <label htmlFor="inputEmail4">Email</label>
                     <input
                        onChange={handleOnChange}
                        value={form.email}
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                     />
                  </div>
                  <div className="form-group col-md-6">
                     <label htmlFor="inputPassword4">Password</label>
                     <input
                        onChange={handleOnChange}
                        value={form.password}
                        type="password"
                        name="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Password"
                     />
                  </div>
               </div>
            </div>
            <div className="card-footer">
               <button onClick={handleSubmit} className="btn btn-primary">
                  Create
               </button>
            </div>
         </div>
      </>
   );
};

export default NewUser;
