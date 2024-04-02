
import { useState } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const url = "http://localhost:3000/signup";
    const data = { userName, password };

    const handleSignUpAPi = () => {
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
            <button onClick={handleSignUpAPi}>SIGNUP</button>
            <br />
            <Link to='/login'>LOGIN</Link>
        </div>
    )

}

export default Signup;