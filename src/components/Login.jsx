import { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const url = "http://localhost:4000/login";
    const data = { username, password };

    const handleLogin = () => {
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
        <div>
            <Header />
            <div className="container">

                <h2 className="mt-3">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <br />
                    <button type="button" className="btn btn-primary" onClick={handleLogin}>
                        Login
                    </button>
                </form>
                <div className="mt-3">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    )

}

export default Login;