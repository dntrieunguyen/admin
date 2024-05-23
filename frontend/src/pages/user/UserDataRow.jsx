import React from 'react';
import { Link } from 'react-router-dom';

const UserDataRow = ({ handleOpenModal }) => {
   return (
      <tr>
         <td>1</td>
         <td>Irwansyah Saputra</td>
         <td>Nữ</td>
         <td>example@gmail.com</td>
         <td>123123</td>
         <td>2017-01-09</td>
         <td>2017-01-09</td>
         <td>2017-01-09</td>
         <td>
            <div className="badge badge-success">Active</div>
         </td>
         <td>
            <Link
               onClick={handleOpenModal}
               to="#"
               className="btn btn-secondary"
            >
               Detail
            </Link>
         </td>
      </tr>
   );
};

export default UserDataRow;
