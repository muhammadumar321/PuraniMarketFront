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
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react';

function Header(props) {

    const [loc, setLoc] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);

    let locations = [
        {
            "lat": 31.511458573637935,
            "lng": 74.34366812923476,
            "placeName": "Lahore"
        },
        {
            "lat": 31.720499831393024,
            "lng": 73.99419933661753,
            "placeName": "Gujranwala"
        },
        {
            "lat": 31.567196635640496,
            "lng": 73.10977692965196,
            "placeName": "Faisalabad"
        },
        {
            "lat": 30.406112060157554,
            "lng": 71.48064380246015,
            "placeName": "Multan"
        },
        {
            "lat": 33.83230823040872,
            "lng": 72.54970377326468,
            "placeName": "Islamabad"
        },
        {
            "lat": 25.743348993212148,
            "lng": 67.11378068899772,
            "placeName": "Karachi"
        }

    ]

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userLoc');
        navigate('/login');
    }

    return (
        <div className='header-container d-flex justify-content-between'>
            <div className="header">

                <Link className='links' to="/">Purani Market</Link>
                <select value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value)
                    setLoc(e.target.value)
                }} className='m-3'>
                    {locations.map((item, index) => {
                        return (
                            <option value={`${item.lat},${item.lng}`}
                            >{item.placeName}</option>
                        )
                    })}
                </select>

                <input type='text' className='search' value={props && props.search}
                    onChange={(e) =>
                        props.handleSearch && props.handleSearch(e.target.value)}></input>

                <button className='search-btn'
                    onClick={() => props.handleSearchClick && props.handleSearchClick()}>
                    <FaSearch />
                </button>

            </div>

            <div>

                <div onClick={() => {
                    setShowOverlay(!showOverlay);
                }}
                    style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        background: '#002f43', width: '40px', height: '40px',
                        borderRadius: '50%', color: '#fff',
                    }}>
                    NO
                </div>
                {showOverlay && <div style={{
                    minHeight: '100px', width: '200PX', background: '#002f43',
                    position: 'absolute', top: '0', right: '0', marginTop: '50px',
                    marginRight: '50px', fontSize: '14px', borderRadius: '7px'

                }}>

                    <div>
                        {!!localStorage.getItem('token') && <Link to="/add-product">
                            <button className="logout-btn">ADD PRODUCTS</button>
                        </Link>}
                    </div>


                    <div>
                        {!!localStorage.getItem('token') && <Link to="/liked-product">
                            <button className="logout-btn">FAVORITES</button>
                        </Link>}
                    </div>
                    
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-adds"> :
                            <button className='logout-btn'>My Ads</button>
                            </Link>}
                        
                    </div>

                    <div>
                        {!localStorage.getItem('token') ?
                            <Link to="/login">LOGIN</Link> :
                            <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>
                        }
                    </div>

                </div>
                }
            </div>

        </div>
    )

}

export default Header;