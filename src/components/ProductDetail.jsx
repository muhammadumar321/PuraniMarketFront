import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";


function ProductDetail() {

    const [product, setProduct] = useState();
    const [user, setUser] = useState();
    const paramProduct = useParams();

    useEffect(() => {

        const url = 'http://localhost:4000/get-product/' + paramProduct.pId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                }

            })
            .catch((err) => {
                alert(err.message);
            })
    }, [])

    const handleContact = (addedBy) => {
        const url = 'http://localhost:4000/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }

            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h2>Product Details</h2>
                {product ? (
                    <div className="row">
                        <div className="col-md-6">
                            <div className="product-images">
                                {product && product.pImage && <img height={250} width={450} src={`http://localhost:4000/uploads/${product.pImage}`} alt="Product Image 1" />
                                }
                                <br /><br />
                                {product && product.pImage2 && <img height={250} width={450} src={`http://localhost:4000/uploads/${product.pImage2}`} alt="Product Image 2" />
                                }
                            </div>
                            <div className="product-description">
                                <h4>Product Details:</h4>
                                <p>{product.pDecs}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="product-info">
                                <h3 className="price-text">Rs. {product.price} /-</h3>
                                <p className="product-name">{product.pName}</p>
                                <p className="product-category">{product.category}</p>
                                {product.addedBy && (
                                    <button className="btn btn-primary" onClick={() => handleContact(product.addedBy)}>
                                        Show Contact Details
                                    </button>
                                )}
                                <br />
                                <br />
                                {user && user.username && <h2>{user.username}</h2>}
                                {user && user.email && <h5>{user.email}</h5>}
                                {user && user.mobile && <h5>{user.mobile}</h5>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No product details available.</p>
                )}
            </div>
        </>

    )
}

export default ProductDetail;