import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";


function ProductDetail() {

    const [product, setProduct] = useState();
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

    return (
        <>
            <Header />
            PRODUCT DETAILS :
            <div>
                {product && <div className="d-flex justify-content-between flex-wrap">

                    <div>
                        <img width='650px' height='500px' src={'http://localhost:4000/uploads/' + product.pImage} />
                        <h6>Product Details : </h6>
                        {product.pDecs}
                    </div>

                    <div>
                        <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                        <p className="m-2"> {product.pName} </p>
                        <p className="m-2 text-success">{product.category}</p>
                    </div>
                </div>
                }
            </div >
        </>
    )
}

export default ProductDetail;