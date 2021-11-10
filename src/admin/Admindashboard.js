import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Userdashboard.css";
import { db, app, logout } from "../firebase";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

import { useFirebase } from "react-redux-firebase";

const Admindashboard = ({ name, image }) => {
    const firestore = useFirestore();

    const users = useSelector((state) => state.firestore.ordered.users);

    const [fileUrl, setFileUrl] = useState(); //for roadmap image

    useFirestoreConnect([
        {
            collection: "users",
        },
    ]);

    if (!users) {
        return <h1>Loading</h1>;
    }

    const deleteUser = async (id) => {
        // alert("ID HERE : " + id);
        try {
            await firestore.collection("users").doc(id).delete();
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };
    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;

        if (!title || !fileUrl) {
            return;
        }
        await db.collection("roadmaps").doc().set({
            image: fileUrl,
            title: title,
        });
    };

    return (
        <>
            <header className="page-header">
                <nav>
                    <a
                        href="/dashboard"
                        aria-label="forecastr logo"
                        className="logo"
                    >
                        <svg width="140" height="49"></svg>
                    </a>
                    <button
                        className="toggle-mob-menu"
                        aria-expanded="false"
                        aria-label="open menu"
                    >
                        <svg width="20" height="20" aria-hidden="true">
                            <use href="#down"></use>
                        </svg>
                    </button>
                    <Link to="/">Go to Homepage</Link>
                    <ul className="admin-menu">
                        <li className="menu-heading">
                            <h3>Admin Dashboard User:{name}</h3>
                            <img src={image} height="200" width="100" alt="" />
                            <button className="login__btn" onClick={logout}>
                                {" "}
                                Admin Logout{" "}
                            </button>
                        </li>

                        <li>
                            <a href="/reset">
                                <svg>
                                    <use htmlhref="#reset"></use>
                                </svg>
                                <span>Reset Password</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            <section className="page-content">
                <section className="search-and-user">
                    <div className="admin-profile">
                        <span className="greeting">Hello admin</span>

                        <div className="notifications">
                            <span className="badge">1</span>
                            <svg>
                                <use href="#users"></use>
                            </svg>
                        </div>
                    </div>
                </section>
                <div className="">
                    <h1>ALL users</h1>

                    <div className="">
                        {users
                            .filter((val) => {
                                if (val.isAdmin == "false") {
                                    return val;
                                }
                            })
                            .map((user) => {
                                return (
                                    <div className="app" key={user.id}>
                                        <h4>Name : {user.name}</h4>
                                        <p>Email: {user.email}</p>
                                        <Link to={`/user/${user.id}`}>
                                            {" "}
                                            View Details
                                        </Link>
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete User
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <h1>Publish Roadmap</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="title"
                            />
                            <h5>Upload roadmap</h5>
                            <input type="file" onChange={onFileChange} />

                            <button>Publish</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Admindashboard;
