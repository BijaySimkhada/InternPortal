import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Userdashboard.css";
import { logout } from "../firebase";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

function AuthIsLoaded({ children }) {
    const user = useSelector((state) => state.firebase.profile);
    //   console.log(user.email);
    //   console.log(user.password);

    if (!isLoaded(user)) return <div>splash screen...</div>;
    return children;
}

function Userdashboard() {
    let history = useHistory();

    const user = useSelector((state) => state.firebase.profile);
    // console.log("POST ARRAY :" + user.post101[0]);
    //Add post
    const firestore = useFirestore();

    //   const [userPost, setuser] = useState({
    //     post101: {
    //       postName: "",
    //       email: "",
    //       location: "",
    //       website: "",
    //       post: "",
    //     },
    //   });

    function alertTimeout(mymsg, mymsecs) {
        var myelement = document.createElement("div");
        myelement.setAttribute(
            "style",
            "background-color: whitesmoke; width: 100px;height: 30px;position: absolute;top:0;bottom:0;left:0;right:0;margin:auto; solid black;font-family:arial;font-size:18px;font-weight:bold;display: flex; align-items: center; justify-content:center; text-align: center;"
        );
        myelement.innerHTML = mymsg;
        setTimeout(function () {
            myelement.parentNode.removeChild(myelement);
        }, mymsecs);
        document.body.appendChild(myelement);
    }

    useEffect(() => {
        if (!user) return history.replace("/");
        else return history.push("/dashboard");
    }, [user]);

    const submitForm = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const job_type = e.target.job_type.value;
        const total_positions = e.target.total_positions.value;
        const city = e.target.city.value;

        const skills = e.target.skills.value;
        const education = e.target.education.value;
        const apply_before = e.target.apply_before.value;

        try {
            await firestore
                .collection("users")
                .doc(user.uid)
                .set(
                    {
                        post101: firestore.FieldValue.arrayUnion({
                            id: Math.floor(Math.random() * 10000),
                            title: title,
                            job_type: job_type,
                            total_positions: total_positions,
                            city: city,
                            education: education,

                            skills: skills,
                            apply_before: apply_before,
                            created_at: new Date(),
                        }),
                    },
                    { merge: true }
                )
                .then(() => alertTimeout("<br>POST CREATED", 1000))

                .catch((err) => console.log(err.message()));
        } catch (error) {}

        history.push("/dashboard");
    };
    const deletePost = (post) => {
        try {
            firestore
                .collection("users")
                .doc(user.uid)
                .update({
                    post101: firestore.FieldValue.arrayRemove(post),
                })
                .then(() => {
                    alertTimeout("<br>POST Deleted", 1000);
                })

                .catch((err) => console.log(err.message()));
        } catch (error) {}
    };
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    return (
        <>
            <AuthIsLoaded>
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
                        <ul className="admin-menu">
                            <li className="">
                                <Link to="/">Go to Homepage</Link>
                                <h3>User Dashboard User:{user.name}</h3>
                                <img
                                    src={user.image}
                                    height="200"
                                    width="100"
                                    alt=""
                                />
                                <button className="" onClick={logout}>
                                    LOGOUT
                                </button>
                            </li>

                            <li>
                                <a href="/reset">
                                    <svg>
                                        <use htmlhref="#rest"></use>
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
                            <h1>Welcome {user.name}</h1>
                            <h4>Email: {user.email}</h4>

                            <h4>contact: {user.contact}</h4>
                            <h4>website: {user.website}</h4>

                            <Link to={`/userEdit/${user.uid}`}>
                                edit profile
                            </Link>
                        </div>
                    </section>
                    <section>
                        <h1>CREATE a POST</h1>

                        <div className="container">
                            <form onSubmit={submitForm}>
                                <div>
                                    <div>
                                        Job title:
                                        <input
                                            placeholder="Enter Post Title"
                                            name="title"
                                            required
                                        />
                                    </div>
                                    Job Type:{" "}
                                    <select
                                        name="job_type"
                                        id="job_type"
                                        required
                                    >
                                        <option value="frontend">
                                            Frontend
                                        </option>
                                        <option value="backend">Backend</option>
                                        <option value="fullstack">
                                            Fullstack
                                        </option>
                                    </select>
                                    Total Positions:
                                    <input
                                        placeholder="Total Needed Interns"
                                        name="total_positions"
                                        required
                                    />
                                </div>

                                <div>
                                    <div>
                                        City:{" "}
                                        <input
                                            placeholder="City"
                                            name="city"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row form-group">
                                    <div>
                                        Education Qualification:{" "}
                                        <input
                                            placeholder="Education Qualification"
                                            name="education"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Skills:{" "}
                                        <input
                                            placeholder="Skills Required"
                                            name="skills"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Apply Before:{" "}
                                        <input
                                            type="date"
                                            placeholder="Apply Before"
                                            name="apply_before"
                                            min={disablePastDate()}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit">POST</button>
                            </form>
                        </div>
                    </section>

                    <section>
                        <h1>My Job POST</h1>
                        <div>
                            {user.post101 &&
                                user.post101.map((post) => (
                                    <div className="" key={post.id}>
                                        <h1>Title: {post.title}</h1>
                                        <li>
                                            Created :{" "}
                                            <ReactTimeAgo
                                                date={post.created_at.toDate()}
                                                locale="en-US"
                                            />
                                        </li>
                                        <li>City: {post.city}</li>
                                        <li>Job type: {post.job_type}</li>
                                        <li>
                                            Total Positions:{" "}
                                            {post.total_positions}
                                        </li>
                                        <li>
                                            Education Qualification:{" "}
                                            {post.education}
                                        </li>
                                        <li>
                                            Experience Required:{" "}
                                            {post.experience}
                                        </li>
                                        <li>Skill Required: {post.skills}</li>
                                        <li>
                                            Apply Before: {post.apply_before}
                                        </li>

                                        <button
                                            onClick={() => deletePost(post)}
                                        >
                                            Delete Post
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </section>

                    <footer className="page-footer">
                        {/* <a href="https://georgemartsoukos.com/" target="_blank"></a> */}
                    </footer>
                </section>
            </AuthIsLoaded>
        </>
    );
}

export default Userdashboard;
