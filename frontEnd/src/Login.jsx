import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
            } 
            else {
                alert(res.data.Error);
            }
        })
        .then(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter email' name='email' 
                        onChange={e=> setValues({...values, email: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter password' name='password' 
                        onChange={e=> setValues({...values, password: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Sign In</button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-00 text-decoration-none">Create account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login