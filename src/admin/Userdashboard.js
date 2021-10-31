import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Userdashboard.css";
import { logout } from "../firebase";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

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
                .then(() => alert("Post Created"))

                .catch((err) => console.log(err.message()));
        } catch (error) {}

        history.push("/dashboard");
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
                                        />
                                    </div>
                                    Job Type:{" "}
                                    <select name="job_type" id="job_type">
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
                                    />
                                </div>

                                <div>
                                    <div>
                                        City:{" "}
                                        <input placeholder="City" name="city" />
                                    </div>
                                </div>
                                <div className="form-row form-group">
                                    <div>
                                        Education Qualification:{" "}
                                        <input
                                            placeholder="Education Qualification"
                                            name="education"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Skills:{" "}
                                        <input
                                            placeholder="Skills Required"
                                            name="skills"
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
                                user.post101.map((post, index) => (
                                    <div className="" key={index}>
                                        <h1>Title: {post.title}</h1>
                                        <li>
                                            Created At:{" "}
                                            {post.created_at
                                                .toDate()
                                                .toDateString()}
                                        </li>
                                        <li>City: {post.city}</li>
                                        <li>Job type: {post.job_type}</li>
                                        <li>Job Level: {post.job_level}</li>
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

// import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import "./Userdashboard.css";
// import { db, logout } from "../firebase";

// import { useSelector } from "react-redux";
// import { isLoaded } from "react-redux-firebase";

// function AuthIsLoaded({ children }) {
//     const user = useSelector((state) => state.firebase.profile);
//     //   console.log(user.email);
//     //   console.log(user.password);

//     if (!isLoaded(user)) return <div>splash screen...</div>;
//     return children;
// }

// function Userdashboard() {
//     let history = useHistory();
//     const [data, setData] = useState([]);
//     const user = useSelector((state) => state.firebase.profile);
//     // console.log("POST ARRAY :" + user.post101[0]);
//     //Add post

//     //   const [userPost, setuser] = useState({
//     //     post101: {
//     //       postName: "",
//     //       email: "",
//     //       location: "",
//     //       website: "",
//     //       post: "",
//     //     },
//     //   });

//     const loadData = async () => {
//         db.collection("Posts")

//             .get()
//             .then((querySnapshot) => {
//                 const data = querySnapshot.docs.map((doc) => doc.data());

//                 setData(data);
//             })
//             .catch((error) => {
//                 console.log("Error getting documents: ", error);
//             });
//     };

//     const submitForm = async (e) => {
//         e.preventDefault();
//         const title = e.target.title.value;
//         const job_type = e.target.job_type.value;
//         const job_level = e.target.job_level.value;
//         const city = e.target.city.value;
//         const experience = e.target.experience.value;
//         const skills = e.target.skills.value;
//         const education = e.target.education.value;
//         const apply_before = e.target.apply_before.value;

//         // console.log("post name: " + postName);
//         // update user
//         try {
//             await db
//                 .collection("Posts")
//                 .doc()

//                 .set({
//                     id: Math.floor(Math.random() * 10000),
//                     uid: user.uid,
//                     uidRef: db.collection("users").doc(user.uid),
//                     title: title,
//                     job_type: job_type,
//                     job_level: job_level,
//                     city: city,
//                     education: education,
//                     experience: experience,
//                     skills: skills,
//                     apply_before: apply_before,

//                     // created_at: new Date(),
//                 })

//                 .catch((err) => console.log(err.message()));
//         } catch (error) {}

//         history.push("/dashboard");
//     };
//     useEffect(() => {
//         loadData();
//     }, [data]);

//     return (
//         <>
//             <AuthIsLoaded>
//                 <header className="page-header">
//                     <nav>
//                         <a
//                             href="/dashboard"
//                             aria-label="forecastr logo"
//                             className="logo"
//                         >
//                             <svg width="140" height="49"></svg>
//                         </a>
//                         <button
//                             className="toggle-mob-menu"
//                             aria-expanded="false"
//                             aria-label="open menu"
//                         >
//                             <svg width="20" height="20" aria-hidden="true">
//                                 <use href="#down"></use>
//                             </svg>
//                         </button>
//                         <ul className="admin-menu">
//                             <li className="">
//                                 <Link to="/">Go to Homepage</Link>
//                                 <h3>User Dashboard User:{user.name}</h3>
//                                 <img
//                                     src={user.image}
//                                     height="200"
//                                     width="100"
//                                     alt=""
//                                 />
//                                 <button className="" onClick={logout}>
//                                     LOGOUT
//                                 </button>
//                             </li>

//                             <li>
//                                 <a href="/reset">
//                                     <svg>
//                                         <use htmlhref="#rest"></use>
//                                     </svg>
//                                     <span>Reset Password</span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </nav>
//                 </header>
//                 <section className="page-content">
//                     <section className="search-and-user">
//                         <div className="admin-profile">
//                             <h1>Welcome {user.name}</h1>
//                             <h4>Email: {user.email}</h4>

//                             <h4>contact: {user.contact}</h4>
//                             <h4>website: {user.website}</h4>

//                             <Link to={`/userEdit/${user.uid}`}>
//                                 edit profile
//                             </Link>
//                         </div>
//                     </section>
//                     <section>
//                         <h1>CREATE a POST</h1>

//                         <div className="container">
//                             <form onSubmit={submitForm}>
//                                 <div>
//                                     <div>
//                                         Job title:
//                                         <input
//                                             placeholder="Enter Post Title"
//                                             name="title"
//                                         />
//                                     </div>
//                                     Job Type:{" "}
//                                     <select name="job_type" id="job_type">
//                                         <option value="frontend">
//                                             Frontend
//                                         </option>
//                                         <option value="backend">Backend</option>
//                                         <option value="fullstack">
//                                             Fullstack
//                                         </option>
//                                     </select>
//                                 </div>
//                                 Job Level:{" "}
//                                 <select name="job_level" id="job_level">
//                                     <option value="beginner">Beginner</option>
//                                     <option value="intermediate">
//                                         Intermediate
//                                     </option>
//                                     <option value="expert">Expert</option>
//                                 </select>
//                                 <div>
//                                     <div>
//                                         City:{" "}
//                                         <input placeholder="City" name="city" />
//                                     </div>
//                                 </div>
//                                 <div className="form-row form-group">
//                                     <div>
//                                         Education Qualification:{" "}
//                                         <input
//                                             placeholder="Education Qualification"
//                                             name="education"
//                                         />
//                                     </div>
//                                     <div>
//                                         Job Experience:{" "}
//                                         <input
//                                             placeholder="Experience Required"
//                                             name="experience"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div>
//                                         Skills:{" "}
//                                         <input
//                                             placeholder="Skills Required"
//                                             name="skills"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div>
//                                         Apply Before:{" "}
//                                         <input
//                                             type="date"
//                                             placeholder="Apply Before"
//                                             name="apply_before"
//                                         />
//                                     </div>
//                                 </div>
//                                 <button type="submit">POST</button>
//                             </form>
//                         </div>
//                     </section>

//                     <section>
//                         <h1>My Job POST</h1>

//                         {data &&
//                             data.map((post, index) => (
//                                 <div className="" key={index}>
//                                     <li>Title: {post.title}</li>
//                                     {/* <li>
//                                         Created At:{" "}
//                                         {post.created_at
//                                             .toDate()
//                                             .toDateString()}
//                                     </li> */}
//                                     <li>City: {post.city}</li>
//                                     <li>Job type: {post.job_type}</li>
//                                     <li>Job Level: {post.job_level}</li>
//                                     <li>
//                                         Education Qualification:{" "}
//                                         {post.education}
//                                     </li>
//                                     <li>
//                                         Experience Required: {post.experience}
//                                     </li>
//                                     <li>Skill Required: {post.skills}</li>
//                                     <li>Apply Before: {post.apply_before}</li>
//                                 </div>
//                             ))}
//                     </section>

//                     <footer className="page-footer">
//                         {/* <a href="https://georgemartsoukos.com/" target="_blank"></a> */}
//                     </footer>
//                 </section>
//             </AuthIsLoaded>
//         </>
//     );
// }

// export default Userdashboard;
