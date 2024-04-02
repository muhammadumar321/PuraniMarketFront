import header from './Header.css'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from './Home';

function Header() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="header">
            <Link to="/">Home</Link>

            <input type='text' className='search'></input>
            <button className='search-btn'>Search</button>

            <span className='mt-3'> Sell and Purchase Only</span>
            {!localStorage.getItem('token') ?
                <Link to="/login">Login</Link> :
                <button onClick={handleLogout}>LOGOUT</button>
                }

        </div>
    )

}

export default Header;