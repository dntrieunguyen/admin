import React, { useState } from 'react';
import { apiCreateQuestion } from '../../api/app';
import Swal from 'sweetalert2';

const NewQuestion = () => {
   const [form, setForm] = useState({
      content: '',
   });

   const handleOnChange = e => {
      const { value, name, files } = e.target;
      setForm(form => ({
         ...form,
         [name]: value,
      }));

      if (name === 'avatar')
         setForm(form => ({
            ...form,
            [name]: files[0],
         }));
   };

   const handleSubmit = async e => {
      e.preventDefault();

      try {
         const data = form;
         const response = await apiCreateQuestion(data);
         response.success
            ? Swal.fire('Success', response?.message, 'success')
            : Swal.fire('Oops!!!', response?.message, 'error');
      } catch (error) {
         console.log(error);
      }

      setForm({
         content: '',
      });
   };
   return (
      <>
         <div className="section-header">
            <h1>New Question</h1>
         </div>
         <div className="row">
            <div className="modal-content position-absolute ">
               <div className="modal-header">
                  <h5 className="modal-title">New Question</h5>
                  <button
                     type="button"
                     className="close"
                     data-dismiss="modal"
                     aria-label="Close"
                  >
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div className="modal-body">
                  <div className="card">
                     <div className="card-header">
                        <h4>Create New Question</h4>
                     </div>

                     <div className="card-body">
                        <div className=" form-group">
                           <label htmlFor="inputEmail4">Content</label>
                           <input
                              className="form-control"
                              placeholder="Content"
                              name="content"
                              value={form.content}
                              onChange={e => handleOnChange(e)}
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="modal-footer bg-whitesmoke br">
                  <button
                     onClick={e => handleSubmit(e)}
                     type="button"
                     className="btn btn-primary"
                  >
                     Create Question
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default NewQuestion;
