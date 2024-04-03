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
import CategoriesList from './CategoriesList'

function Categories(props) {

    return (
        <div className='cat-container'>

            <span className='pr-3'>All Categories</span>
            <div>
                {CategoriesList && CategoriesList.length > 0 && CategoriesList.map(
                    (item, index) => {
                        return (
                            <span onClick={() => {
                                 props.handleCategory && props.handleCategory(item) }} 
                                 key='index' className='categories'>{item}</span>
                        )
                    }
                )}
            </div>

        </div>
    )

}

export default Categories;