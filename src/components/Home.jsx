import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { React, useState } from "react";

function Home() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const url = "http://localhost:3000/get-products";
        axios.get(url).then((res) => {
            if (res.data.products) {
                setProducts(res.data.products);
            }

        })
            .catch((err) => {
                alert(err.message);
            })
    }, [])

    return (
        <div className="App">

            <Header />

            {!!localStorage.getItem('token') && <Link to="/add-product"> Add Product </Link>}

            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 && products.map((item, index) => {


                    return (
                        <div className="card m-3">
                            <img width='270px' height='200px' src={'http://localhost:3000/uploads/' + item.pImage} />
                            <p className="m-2"> {item.pname} | {item.category}</p>
                            <h3 className="m-2 text-danger">{item.price}</h3>
                            <p className="m-2 text-success">{item.setPDecs}</p>
                        </div>
                    )
                })}

            </div>

        </div>
    )

}

export default Home;