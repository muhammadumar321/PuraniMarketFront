import { useEffect, useState, React } from "react";
import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaHeart } from 'react-icons/fa'
import Home from './Home.css'
import AllCategories from "./AllCategories";

function MyProducts() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState();

    useEffect(() => {

        const url = "http://localhost:4000/my-products";
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data).then((res) => {
            if (res.data.products) {
                setProducts(res.data.products);
            }

        })
            .catch((err) => {
                alert(err.message);
            })
    }, [])

    const setHandleSearch = (value) => {
        setSearch(value);
    }

    const setHandleSearchClick = () => {

        let tempFilteredProducts = products.filter((item) => {
            if (
                item.pName.toLowerCase().includes(search.toLowerCase()) ||
                item.pDecs.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())
            ) {
                return item;
            }
            
        })

        setFilteredProducts(tempFilteredProducts);
    }

    const setHandleCategory = (value) => {

        let tempFilteredProducts = products.filter((item) => {
            if (item.category == value) {
                return item;
            }
        })

        setFilteredProducts(tempFilteredProducts);
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');

        const url = "http://localhost:4000/like-product";
        const data = { userId, productId }
        axios.post(url, data).then((res) => {
            if (res.data.message) {
                alert(res.data.message);
            }

        })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <div className="App">

            <Header search={search} handleSearch={setHandleSearch} handleSearchClick={setHandleSearchClick} />

            <AllCategories handleCategory={setHandleCategory} />

            <h5>Search Results:</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts && filteredProducts.length > 0 && filteredProducts.map((item, index) => {


                    return (
                        <div key={item._id} className="card m-3">
                            <img width='270px' height='200px' src={'http://localhost:4000/uploads/' + item.pImage} />
                            {localStorage.getItem('token') && <div onClick={() => { handleLike(item._id) }} className="like-icons-con">
                                <FaHeart className='like-icons' />
                            </div>}
                            <p className="m-2"> {item.pName} | {item.category}</p>
                            <h3 className="m-2 text-danger">{item.price}</h3>
                            <p className="m-2 text-success">{item.setPDecs}</p>
                        </div>
                    )
                })}

            </div>
            <h5>All Results:</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 && products.map((item, index) => {


                    return (
                        <div key={item._id} className="card m-3">
                            <img width='270px' height='200px' src={'http://localhost:4000/uploads/' + item.pImage} />
                            {localStorage.getItem('token') && <div onClick={() => { handleLike(item._id) }} className="like-icons-con">
                                <FaHeart className='like-icons' />
                            </div>}
                            <p className="m-2"> {item.pName} | {item.category}</p>
                            <h3 className="m-2 text-danger">{item.price}</h3>
                            <p className="m-2 text-success">{item.setPDecs}</p>
                        </div>
                    )
                })}

            </div>

        </div>
    )

}

export default MyProducts;