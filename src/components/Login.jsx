import { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const url = "http://localhost:3000/login";
    const data = { userName, password };

    const handleLoginAPi = () => {
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('userId', res.data.userId)
                        navigate('/');
                    }
                }


            })
            .catch((err) => {
                alert(err)
            })
    }

    return (
        <div className="App">

            <Header />
            Welcome to Login
            <br />
            USERNAME
            <input type="text" value={userName}
                onChange={(e) => setUserName(e.target.value)} />
            <br />
            PASSWORD
            <input type="text" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={handleLoginAPi}>LOGIN</button>
            <br />
            <Link to='/signup'>SIGNUP</Link>
        </div>
    )

}

export default Login;