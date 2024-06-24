import React, { useState, useEffect } from 'react'
import './Edit.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../../config';

const Edit = () => {
    const {id} = useParams();
    const [user, setUser] = useState({
        fname:"",
        lname:"",
        email:"",
        password:""
    })


    const navigate = useNavigate();
    
    const inputHandle = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    useEffect(() => {
        axios.get(`${SERVER_URL}/getusers/${id}`)
        .then((res) => {
            setUser(res.data);
        }).catch(err => {
            console.log("ERROR", err);
        })
    },[id]);

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.put(`${SERVER_URL}/updateuser/${id}`, user)
        .then((response)=>{
            toast.success("User updated successfuly!!!", {position:'top-right'});
            navigate("/");
        }).catch(error => console.log(error));
    }

  return (
    <div className='add-user'>
        <Link to='/'><i class="fa-solid fa-arrow-left"></i></Link>

        <h2>Update User</h2>

        <form className='add-user-form' onSubmit={submitForm}>
            <div className='input-group'>
                <label htmlFor="fname">First Name</label>
                <input onChange={inputHandle} value={user.fname} type='text' id='fname' name='fname' placeholder='First Name'/>
            </div>

            <div className='input-group'>
                <label htmlFor="lname">Last Name</label>
                <input onChange={inputHandle} value={user.lname} type='text' id='lname' name='lname' placeholder='Last Name'/>
            </div>

            <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input onChange={inputHandle} value={user.email} type='email' id='email' name='email' placeholder='Email'/>
            </div>

            <div className='input-group'>
                <label htmlFor="password">Password</label>
                <input onChange={inputHandle} type='password' id='password' name='password' placeholder='Password'/>
            </div>

            <div className='input-group'>
                <button>UPDATE USER</button>
            </div>
        </form>
    </div>
  )
}

export default Edit