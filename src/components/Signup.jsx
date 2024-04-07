
import { useState } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {

    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const url = "http://localhost:4000/signup";
    const data = { username, password, mobile, email };

    const handleSignUp = () => {
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
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
          <h2 className="mt-3">Sign Up</h2>
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
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="button" className="btn btn-primary" onClick={handleSignUp}>
              Sign Up
            </button>
          </form>
          <div className="mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    )

}

export default Signup;