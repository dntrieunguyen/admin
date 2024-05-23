import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../redux/app/app.thunk';
import { getDateTime } from '../../utils/helper';
import { apiBlockUser } from '../../api/app';
import Swal from 'sweetalert2';
import NewUserModal from '../../components/NewUserModal';

const User = () => {
   const [openModal, setOpenModal] = useState(false);
   const [updateUser, setUpdateUser] = useState(null);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector(state => state.app.data.user);

   useEffect(() => {
      dispatch(getAllUser());
   }, []);

   const handleOpenModal = (e, id) => {
      e.preventDefault();
      const filterUser = user.filter(u => u._id === id);
      setUpdateUser(filterUser);
      setOpenModal(true);
   };
   const handleCloseModal = e => {
      e.preventDefault(false);
      setOpenModal(false);
   };

   const handleBlock = async (e, id) => {
      e.preventDefault();

      const data = { id };
      try {
         const response = await apiBlockUser(data);
         response.success
            ? Swal.fire('Success', response?.message, 'success')
            : Swal.fire('Oops!!!', response?.message, 'error');
         dispatch(getAllUser());
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className="section-header">
            <h1>User</h1>
         </div>
         <div className="row">
            <div className="col-12">
               <div className="card">
                  <div className="card-header">
                     <h4>User</h4>
                  </div>
                  <div className="p-0 card-body">
                     <div className="table-responsive">
                        <table className="table table-striped table-md">
                           <tr>
                              <th>ID</th>
                              <th>Full Name</th>
                              <th>Gender</th>
                              <th>Email</th>
                              <th>Password</th>
                              <th>Birth Date</th>
                              <th>Created At</th>
                              <th>Deleted At</th>

                              <th>Action</th>
                           </tr>
                           {user?.map(user => (
                              <tr key={user?._id}>
                                 <td>{user._id}</td>
                                 <td>{user.fullName}</td>
                                 <td>{user.gender}</td>
                                 <td>{user.email}</td>
                                 <td style={{ maxWidth: '200px' }}>
                                    {user.password}
                                 </td>
                                 <td>
                                    {getDateTime(new Date(user.birthDate))}
                                 </td>
                                 <td>
                                    {getDateTime(new Date(user.createdAt))}
                                 </td>
                                 <td>
                                    {user.deletedAt ? (
                                       <div className="badge badge-danger">
                                          {getDateTime(
                                             new Date(user.deletedAt),
                                          )}
                                       </div>
                                    ) : (
                                       <div className="badge badge-success">
                                          Active
                                       </div>
                                    )}
                                 </td>

                                 <td>
                                    {user.deletedAt ? (
                                       <Link
                                          onClick={e =>
                                             handleBlock(e, user._id)
                                          }
                                          to="#"
                                          className="btn btn-success"
                                       >
                                          Active
                                       </Link>
                                    ) : (
                                       <Link
                                          onClick={e =>
                                             handleBlock(e, user._id)
                                          }
                                          to="#"
                                          className="btn btn-danger"
                                       >
                                          Block
                                       </Link>
                                    )}
                                 </td>
                                 <td>
                                    <Link
                                       onClick={e =>
                                          handleOpenModal(e, user._id)
                                       }
                                       to="#"
                                       className="btn btn-secondary"
                                    >
                                       Detail
                                    </Link>
                                 </td>
                              </tr>
                           ))}
                        </table>
                     </div>
                  </div>
                  {openModal && (
                     <NewUserModal
                        handleCloseModal={handleCloseModal}
                        updateUser={updateUser}
                     ></NewUserModal>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default User;
