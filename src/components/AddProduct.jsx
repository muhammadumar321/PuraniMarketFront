import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import categoriesList from "./CategoriesList";

function AddProduct() {


    const navigate = useNavigate();
    const [pName, setPname] = useState('');
    const [pDecs, setPDecs] = useState('');
    const [price, setPrice] = useState('');
    const [pImage, setImage] = useState('');
    const [pImage2, setImage2] = useState('');
    const [category, setCategory] = useState('');


    useEffect(() => {

        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    })

    const handleAddProductAPi = () => {

        const url = "http://localhost:4000/add-product";
        
        navigator.geolocation.getCurrentPosition((position) => {
  
        const formData = new FormData();
        formData.append('pName', pName);
        formData.append('pLat', position.coords.latitude);
        formData.append('pLong', position.coords.longitude);
        formData.append('pDecs', pDecs);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('pImage', pImage);
        formData.append('pImage2', pImage2);
        formData.append('userId', localStorage.getItem('userId'));

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
                    {
                        categoriesList && categoriesList.length > 0 &&
                        categoriesList.map((item, index) => {
                            return (
                                <option key={'option' + index}>{item}</option>
                            )
                        })
                    }
                </select>
                <label>Product Image:</label>
                <input type="file" className="form-control" onChange={(e) => { setImage(e.target.files[0]); console.log('img ' + e.target.files[0]); }}></input>
               
                <label>Product Second Image:</label>
                <input type="file" className="form-control" onChange={(e) => { setImage2(e.target.files[0]); console.log('img ' + e.target.files[0]); }}></input>
               
               
                <button className="btn btn-primary mt-3" onClick={handleAddProductAPi}>SUBMIT</button>
            </div>
        </div>
    )

}

export default AddProduct;