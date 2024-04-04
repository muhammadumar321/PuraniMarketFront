import Header from "./Header";
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, React, useState,  } from "react";
import Categories from "./AllCategories.jsx";
import { FaHeart } from 'react-icons/fa'
import Home from './Home.css'

function CategoryPage() {

    const navigate = useNavigate();

    const param = useParams();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState();
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {

        const url = 'http://localhost:4000/get-products?catName=' + param.catName;
        axios.get(url).then((res) => {
            if (res.data.products) {
                setProducts(res.data.products);
            }

        })
            .catch((err) => {
                alert(err.message);
            })
    }, [param])

    const setHandleSearch = (value) => {
        setSearch(value);
    }

    const setHandleSearchClick = () => {
        const url = "http://localhost:4000/search?search=" + search;
        axios.get(url).then((res) => {
            if (res.data.products) {
                setIsSearch(true);
                setFilteredProducts(res.data.products);
            }
        })
            .catch((err) => {
                alert(err.message);
            })


        // let tempFilteredProducts = products.filter((item) => {
        //     if (item.pName.toLowerCase.includes(search.toLowerCase) ||
        //         item.pDecs.toLowerCase.includes(search.toLowerCase) ||
        //         item.category.toLowerCase.includes(search.toLowerCase)) {
        //         return item;
        //     }
        // })

        //setFilteredProducts(tempFilteredProducts);
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

    const handleProductClick = (id) => {
        navigate('/product/' + id)
    }

    return (
        <div className="App">

            <Header search={search} handleSearch={setHandleSearch} handleSearchClick={setHandleSearchClick} />

            <Categories handleCategory={setHandleCategory} />
            {isSearch && filteredProducts && <h5>Search Results :
                <button className="clear-btn" onClick={() => setIsSearch(false)}> CLEAR </button>
            </h5>}
            {isSearch && filteredProducts && filteredProducts.length == 0 && <h5>No Results Found :</h5>}

            {isSearch && <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts && filteredProducts.length > 0 && filteredProducts.map((item, index) => {


                    return (
                        <div onClick={() => handleProductClick(item._id)}
                            key={item._id} className="card m-3">
                            <img width='250px' height='150px' src={'http://localhost:4000/uploads/' + item.pImage} />
                            {localStorage.getItem('token') && <div onClick={() => { handleLike(item._id) }} className="like-icons-con">
                                <FaHeart className='like-icons' />
                            </div>}
                            <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                            <p className="m-2"> {item.pName} | {item.category}</p>
                            <p className="m-2 text-success">{item.setPDecs}</p>
                        </div>
                    )
                })}

            </div>}

            {!isSearch && <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 && products.map((item, index) => {


                    return (
                        <div onClick={() => handleProductClick(item._id)}
                            key={item._id} className="card m-3">
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

            </div>}

        </div>
    )

}

export default CategoryPage;