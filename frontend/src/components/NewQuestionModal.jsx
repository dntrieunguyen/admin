import React, { useState } from 'react';
import { apiUpdateQuestions } from '../api/app';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { getAllQuestions } from '../redux/app/app.thunk';

const NewQuestionModal = ({ handleCloseModal, updateData }) => {
   const [form, setForm] = useState({
      id: updateData[0]._id,
      content: updateData[0].content,
   });

   const dispatch = useDispatch();

   const handleOnChange = e => {
      const { value, name } = e.target;
      setForm(form => ({
         ...form,
         [name]: value,
      }));
   };

   const handleSave = async e => {
      try {
         const data = form;
         console.log(data.id);

         const response = await apiUpdateQuestions(data);
         response.success
            ? Swal.fire('Success', response?.message, 'success')
            : Swal.fire('Oops!!!', response?.message, 'error');
      } catch (error) {
         console.log(error);
      }
      dispatch(getAllQuestions());
      setForm({
         content: '',
      });
   };
   return (
      <>
         <div
            style={{ minHeight: '500px' }}
            className="modal-content position-absolute "
         >
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

                  <div className="card-body">
                     <div className=" form-group">
                        <label htmlFor="inputEmail4">Content</label>
                        <input
                           type="text"
                           className="form-control"
                           placeholder="Content"
                           name="content"
                           value={form.content}
                           onChange={handleOnChange}
                        />
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

export default NewQuestionModal;
