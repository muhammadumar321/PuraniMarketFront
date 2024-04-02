import header from './Header.css'
import { Link } from 'react-router-dom'
import Home from './Home';

function Header() {

    return (
        <div className="header">
            <Link to="/">Home</Link>

            <span className='mt-3'> Sell and Purchase Only</span>

            <Link to="/login">Login</Link>
        </div>
    )

}

export default Header;