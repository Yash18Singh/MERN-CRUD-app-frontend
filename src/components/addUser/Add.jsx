import React, { useState } from 'react'
import "./Add.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SERVER_URL } from '../../config';

const Add = () => {

    const [user, setUser] = useState({
        fname:"",
        lname:"",
        email:"",
        password:""
    });

    const navigate = useNavigate();
    
    const inputHandle = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }


    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post(`${SERVER_URL}/createuser`, user)
        .then((response)=>{
            toast.success("User created successfuly!!!", {position:'top-right'});
            navigate("/");
        }).catch(error => console.log(error));
    }


  return (
    <div className='add-user'>
        <Link to='/'><i class="fa-solid fa-arrow-left"></i></Link>

        <h2>Add New User</h2>

        <form className='add-user-form' onSubmit={submitForm}>
            <div className='input-group'>
                <label htmlFor="fname">First Name</label>
                <input type='text' onChange={inputHandle} id='fname' name='fname' placeholder='First Name'/>
            </div>

            <div className='input-group'>
                <label htmlFor="lname">Last Name</label>
                <input type='text' onChange={inputHandle} id='lname' name='lname' placeholder='Last Name'/>
            </div>

            <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input type='email' onChange={inputHandle} id='email' name='email' placeholder='Email'/>
            </div>

            <div className='input-group'>
                <label htmlFor="password">Password</label>
                <input type='password' onChange={inputHandle} id='password' name='password' placeholder='Password'/>
            </div>

            <div className='input-group'>
                <button>ADD USER</button>
            </div>
        </form>
    </div>
  )
}

export default Add