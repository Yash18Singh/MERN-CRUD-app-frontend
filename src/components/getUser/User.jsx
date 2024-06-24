import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './User.css'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../../config';

const User = () => {
    const [users, setUsers] = useState();

    const fetchData = async() => {
        const response = await axios.get(`${SERVER_URL}/getusers`);
        setUsers(response.data);
    }

    useEffect(() => {
        fetchData();
    },[users]);


    const deleteUser = async(id) => {
        await axios.delete(`${SERVER_URL}/deleteuser/${id}`)
        .then((response)=>{
            toast.success("User deleted successfuly!!!", {position:'top-right'});
        }).catch(error => console.log(error));
    }



  return (
    <div className='user-table'>
        <Link className='add-btn' to="/add">ADD USER</Link>

        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>USER NAME</th>
                    <th>USER EMAIL</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>

            <tbody>
                {
                    users && users.map((user, index) => {
                        return(
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.fname} {user.lname}</td>
                                <td>{user.email}</td>
                                <td className='table-btn'>
                                    <button onClick={() => deleteUser(user._id)} className='add-btn'><i className="fa-solid fa-trash"></i></button>
                                    <Link className='add-btn' to={`/edit/${user._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                                </td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default User