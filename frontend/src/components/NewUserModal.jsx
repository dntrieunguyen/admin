import React from 'react';
import { formatDate, setStringToDate } from '../utils/helper';
import { apiUpDateUser, apiUploadAvatar } from '../api/app';
import useValidation from '../hooks/useValidation';
import Swal from 'sweetalert2';

const NewUserModal = ({ handleCloseModal, updateUser }) => {
   const [form, setForm, handleOnChange, errors, validate] = useValidation({
      _id: updateUser[0]?._id,
      fullName: updateUser[0]?.fullName || '',
      avatar: updateUser[0]?.avatar || '',
      gender: updateUser[0]?.gender || '',
      birthDate:
         formatDate(new Date(updateUser[0]?.birthDate), 'yyyy-mm-dd', '-') ||
         '',
      email: updateUser[0]?.email || '',
      password: '',
   });

   const handleSave = async e => {
      e.preventDefault();
      if (validate()) {
         const formData = new FormData();

         formData.append('avatar', form.avatar, form?.avatar?.name);

         const data = {
            ...form,
            birthDate: setStringToDate(form.birthDate, 'yyyy-mm-dd', '-'),
         };

         try {
            const avatar = await apiUploadAvatar(formData);
            data.avatar = avatar.img_url;

            const response = await apiUpDateUser(data);
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
         <div className="modal-content position-absolute ">
            <div className="modal-header">
               <h5 className="modal-title">Detail User</h5>
               <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
               >
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div className="modal-body">
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
                  )}
                  <div className="card-body">
                     <div className=" form-group">
                        <label htmlFor="inputEmail4">Full Name</label>
                        <input
                           type="text"
                           className="form-control"
                           placeholder="Full Name"
                           name="fullName"
                           value={form.fullName}
                           onChange={handleOnChange}
                        />
                     </div>
                     {/* file */}
                     <div className="form-row">
                        <div className="form-group col-md-6">
                           <label>File</label>
                           <input
                              name="avatar"
                              onChange={handleOnChange}
                              type="file"
                              className="form-control"
                           />
                        </div>
                        {/* gender */}
                        <div className="form-group col-md-2">
                           <label htmlFor="inputState">Gender</label>
                           <select
                              value={form?.gender}
                              onChange={handleOnChange}
                              id="inputState"
                              className="form-control"
                              name="gender"
                           >
                              <option name="gender" value={'nam'} selected>
                                 Male
                              </option>
                              <option name="gender" value={'nu'}>
                                 Female
                              </option>
                           </select>
                        </div>
                        {/* birth date */}
                        <div className="form-group col-md-4">
                           <label>Date</label>
                           <input
                              value={form.birthDate}
                              onChange={handleOnChange}
                              name="birthDate"
                              type="date"
                              className="form-control"
                           />
                        </div>
                     </div>
                     {/* Email */}
                     <div className="form-row">
                        <div className="form-group col-md-6">
                           <label htmlFor="inputEmail4">Email</label>
                           <input
                              onChange={handleOnChange}
                              value={form?.email}
                              type="email"
                              name="email"
                              className="form-control"
                              id="inputEmail4"
                              placeholder="Email"
                           />
                        </div>
                        {/* Password */}
                        <div className="form-group col-md-6">
                           <label htmlFor="inputPassword4">Password</label>
                           <input
                              onChange={handleOnChange}
                              value={form?.password}
                              type="password"
                              name="password"
                              className="form-control"
                              id="inputPassword4"
                              placeholder="Password"
                              defaultValue=""
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="modal-footer bg-whitesmoke br">
               <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={handleCloseModal}
               >
                  Close
               </button>
               <button
                  onClick={e => handleSave(e)}
                  type="button"
                  className="btn btn-primary"
               >
                  Save changes
               </button>
            </div>
         </div>
      </>
   );
};

export default NewUserModal;
