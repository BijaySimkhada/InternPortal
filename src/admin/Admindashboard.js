import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Userdashboard.css";
import { auth, db, logout } from "../firebase";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

import { useFirebase } from "react-redux-firebase";

const Admindashboard = ({ name, user, image }) => {
  const firestore = useFirestore();

  const firebase = useFirebase();

  const users = useSelector((state) => state.firestore.ordered.users);
  console.log(users);

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

  return (
    <>
      <header className="page-header">
        <nav>
          <a href="/dashboard" aria-label="forecastr logo" className="logo">
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
          <ul className="admin-menu">
            <li className="menu-heading">
              <h3>Admin Dashboard User:{name}</h3>
              <img src={image} height="200" width="100" alt="" />
              <button className="login__btn" onClick={logout}>
                {" "}
                Admmin Logout{" "}
              </button>
            </li>

            <li>
              <a href="/login">
                <svg>
                  <use href="/login"></use>
                </svg>
                <span>Users</span>
              </a>
            </li>
            <li>
              <a href="#0">
                <svg>
                  <use href="#trends"></use>
                </svg>
                <span>Trends</span>
              </a>
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
          <p>users:</p>
          <div className="">
            <h1>This is index Page</h1>
            <a className="" href="!#" onClick={() => firebase.logout()}>
              Logout
            </a>
            {users.map((user) => {
              return (
                <div className="app" key={user.id}>
                  <h4>Name : {user.name}</h4>
                  <p>Email: {user.email}</p>
                  <b>id: {user.id}</b>

                  <Link to={`/user/${user.id}`}> View Details</Link>
                  <button onClick={() => deleteUser(user.id)}>
                    Delete User
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <footer className="page-footer">
          {/* <a href="https://georgemartsoukos.com/" target="_blank"></a> */}
        </footer>
      </section>
    </>
  );
};

export default Admindashboard;
