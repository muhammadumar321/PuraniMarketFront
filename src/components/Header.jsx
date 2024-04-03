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

function Header(props) {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className='header-container d-flex justify-content-between'>
            <div className="header">

                <Link className='links' to="/">Purani Market</Link>

                <input type='text' className='search' value={props && props.search}
                    onChange={(e) =>
                        props.handleSearch && props.handleSearch(e.target.value)}></input>

                <button className='search-btn'
                    onClick={() => props.handleSearchClick && props.handleSearchClick()}>Search</button>

            </div>

            {!!localStorage.getItem('token') && <Link to="/add-product">
                <button className="logout-btn">Add Product</button>
            </Link>}

            {!!localStorage.getItem('token') && <Link to="/add-product">
                <button className="liked-products">Liked Product</button>
            </Link>}


            <div>
                {!localStorage.getItem('token') ?
                    <Link to="/login">Login</Link> :
                    <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>
                }
            </div>

        </div>
    )

}

export default Header;