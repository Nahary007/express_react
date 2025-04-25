import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

function Home() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true)
                setName(res.data.name)
            } else {
                setAuth(false)
                setMessage(res.data.Error)
            }
        })
        .then(err=> console.log(err));
    }, [])

    const handleLogout = () => {
        axios.get("/http://localhost:8081/logout")
        .then(res => {
            location.reload(true);
        }).catch(err => console.log(err));
    }
    return (
        <div className="container mt-4">
            {
                auth ?
                <div>
                    <h3>You are authorized --- {name}</h3>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Login now</h3>
                    <Link to="/login" className='btn btn-primary'>Login</Link>
                </div>
            }
        </div>
    )
}

export default Home