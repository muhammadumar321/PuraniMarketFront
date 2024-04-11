import { React, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function MyProfile() {

    const [user, setUser] = useState();


    useEffect(() => {
        const url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                    //console.log(user.username);
                }

            })
            .catch((err) => {
                alert(err.message);
            })
    }, []);

    return (
        <div>
            <Header />
            <div className="m-3 p-3">
            <h3 className="text-center mt-2">User Profile</h3>

            {user && <table className="table table-bordered">
                <thead>
                    <tr >
                        <td>USERNAME</td>
                        <td>EMAIL ID</td>
                        <td>MOBILE</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                    </tr>
                </tbody>
            </table>}
            </div>
        </div>
    )

}

export default MyProfile;