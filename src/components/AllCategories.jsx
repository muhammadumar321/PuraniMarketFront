import header from './Header.css'
import {
    createRoot,
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import Home from './Home';

import CategoriesList from './CategoriesList'


function AllCategories(props) {


    const navigate = useNavigate();

    return (
        <div className='cat-container'>

            <span className='pr-3'>All Categories</span>
            <div>
                {CategoriesList && CategoriesList.length > 0 && CategoriesList.map(
                    (item, index) => {
                        return (
                            <span onClick={() =>
                                navigate('/category/'+item)}
                                key='index' className='categories'>{item}</span>
                        )
                    }
                )}
            </div>

        </div>
    )

}

export default AllCategories;