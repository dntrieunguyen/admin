import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllQuestions } from '../../redux/app/app.thunk';
import { getDateTime } from '../../utils/helper';
import NewQuestionModal from '../../components/NewQuestionModal';
import { apiDeletedQuestions } from '../../api/app';
import Swal from 'sweetalert2';

const Question = () => {
   const [openModal, setOpenModal] = useState(false);
   const [updateData, setUpdateData] = useState(null);
   const dispatch = useDispatch();

   const question = useSelector(state => state.app.data.question);

   useEffect(() => {
      dispatch(getAllQuestions());
   }, []);

   const handleCloseModal = e => {
      e.preventDefault(false);
      setOpenModal(false);
   };
   const handleOpenModal = (e, id) => {
      e.preventDefault();
      const filterUser = question.filter(q => q._id === id);
      setUpdateData(filterUser);
      setOpenModal(true);
   };

   const handleDeleteQuestion = async (e, id) => {
      Swal.fire({
         title: 'Bạn có muốn xóa câu hỏi này không?',
         showDenyButton: true,
         confirmButtonText: 'Có',
         denyButtonText: 'Không',
         customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
         },
      }).then(async result => {
         if (result.isConfirmed) {
            try {
               const response = await apiDeletedQuestions(id);
               response.success
                  ? Swal.fire('Thành công', response?.message, 'success')
                  : Swal.fire('Oops!!!', response?.message, 'error');
            } catch (error) {
               console.log(error);
            }
         }
         dispatch(getAllQuestions());
      });
   };
   return (
      <>
         <div className="section-header">
            <h1>Question</h1>
         </div>
         <div className="row">
            <div className="col-12">
               <div className="card">
                  <div className="card-header">
                     <h4>Full Width</h4>
                  </div>
                  <div className="p-0 card-body">
                     <div className="table-responsive">
                        <table className="table table-striped table-md">
                           <tr>
                              <th>ID</th>
                              <th>Content</th>
                              <th>Created At</th>
                              <th>Action</th>
                           </tr>
                           {question &&
                              question.map(question => (
                                 <tr>
                                    <td>{question?._id}</td>
                                    <td style={{ maxWidth: '300px' }}>
                                       {question?.content}
                                    </td>
                                    <td>
                                       {getDateTime(
                                          new Date(question?.updatedAt),
                                       )}
                                    </td>

                                    <td>
                                       <Link
                                          to="#"
                                          className="btn btn-secondary"
                                          onClick={e =>
                                             handleOpenModal(e, question._id)
                                          }
                                       >
                                          Detail
                                       </Link>
                                    </td>
                                    <td>
                                       <Link
                                          onClick={e =>
                                             handleDeleteQuestion(
                                                e,
                                                question._id,
                                             )
                                          }
                                          to="#"
                                          className="btn btn-danger"
                                       >
                                          Delete
                                       </Link>
                                    </td>
                                 </tr>
                              ))}
                        </table>
                     </div>
                  </div>
                  {openModal && (
                     <NewQuestionModal
                        handleCloseModal={handleCloseModal}
                        updateData={updateData}
                     ></NewQuestionModal>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default Question;
