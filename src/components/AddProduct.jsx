import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function AddProduct() {


    const navigate = useNavigate();
    const [pName, setPname] = useState('');
    const [pDecs, setPDecs] = useState('');
    const [price, setPrice] = useState('');
    const [pImage, setImage] = useState('');
    const [category, setCategory] = useState('');


    useEffect(() => {

        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    })

    const handleAddProductAPi = () => {

        const url = "http://localhost:4000/add-product";
        const formData = new FormData();

        formData.append('pName', pName);
        formData.append('pDecs', pDecs);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('pImage', pImage);

        axios.post(url, formData)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/');
                }

            })
            .catch((err) => {
                alert(err.message);
            })

    }

    return (
        <div className="App">

            <Header />
            <div className="p-3">
                <h2>Add Product here</h2>

                <label>Product Name:</label>
                <input class="form-control" value={pName} onChange={(e) => { setPname(e.target.value) }}></input>
                <label>Product Description:</label>
                <input class="form-control" value={pDecs} onChange={(e) => { setPDecs(e.target.value) }}></input>
                <label>Product Price:</label>
                <input class="form-control" value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
                <label>Category:</label>
                <select className="form-control" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                    <option>Bike</option>
                    <option>Car</option>
                    <option>Home</option>
                </select>
                <label>Product Image:</label>
                <input type="file" className="form-control" onChange={(e) => { setImage(e.target.files[0]);console.log('img '+e.target.files[0]); }}></input>
                <button className="btn btn-primary mt-3" onClick={handleAddProductAPi}>SUBMIT</button>
            </div>
        </div>
    )

}

export default AddProduct;