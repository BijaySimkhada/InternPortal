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

  const submitForm = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const job_type = e.target.job_type.value;
    const job_level = e.target.job_level.value;
    const city = e.target.city.value;
    const experience = e.target.experience.value;
    const skills = e.target.skills.value;
    const education = e.target.education.value;
    const apply_before = e.target.apply_before.value;
    var index = 0;
    
    // console.log("post name: " + postName);
    // update user
    try {
      await firestore
        .collection("users")
        .doc(user.uid)
        .set({
          post101: [
            {
              id: index,
              title: title,
              job_type: job_type,
              job_level:job_level,
              city: city,
              education:education,
              experience: experience,
              skills: skills,
              apply_before: apply_before,
             
            },
          ],
        },{ merge : true })
        .then(() => console.log("Document successfully written!"), index++)

        .catch((err) => console.log(err.message()));
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    history.push("/dashboard");
  };

  return (
    <>
      <AuthIsLoaded>
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
              <li className="">
                <h3>User Dashboard User:{user.name}</h3>
                <img src={user.image} height="200" width="100" alt="" />
                <button className="" onClick={logout}>
                  LOGOUT
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
              <h1>Welcome {user.name}</h1>
              <h4>Email: {user.email}</h4>
             
              <h4>contact: {user.contact}</h4>
              <h4>website: {user.website}</h4>
             
         
              <Link to={`/userEdit/${user.uid}`}>edit profile</Link>
            </div>
          </section>
          <section>
            <h1>CREATE a POST</h1>

            <div className="container">
              <form onSubmit={submitForm}>
                <div>
                  <div>
                    Job title:<input placeholder="Enter Post Title" name="title" />
                  </div>
                 Job Type: <select name="job_type" id="job_type">
            <option value="frontend">frontend</option>
              <option value="backend">backend</option>
              <option value="fullstack">fullstack</option>
    
                    </select>
                   
                </div>
                Job Level: <select name="job_level" id="job_level">
            <option value="beginner">beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="senior">senior</option>
    
                    </select>
                <div>
                  <div>
                  City:  <input placeholder="City" name="city" />
                  </div>
                </div>
                <div className="form-row form-group">
                  <div>
                   Education Qualification: <input placeholder="Education Qualification" name="education" />
                  </div>
                  <div>
                  Job Experience: <input placeholder="Experience Required" name="experience" />
                  </div>
                </div>
                <div>
                  <div>
                   Skills: <input placeholder="Skills Required" name="skills" />
                  </div>
                </div>
                <div>
                  <div>
                   Apply Before: <input type="date" placeholder="Apply Before" name="apply_before" />
                  </div>
                </div>
                <button type="submit">POST</button>
              </form>
            </div>
          </section>

          <section>
            <h1>My Job POST</h1>
          
            {user.post101 &&
              user.post101.map((link, index) => (
                <div className="" key={index}>
                  <li>Title: {link.title}</li>
                  <li>City: {link.city}</li>
                  <li>Job type: {link.job_type}</li>
                  <li>Job Level: {link.job_level}</li>
                  <li>Education Qualification: {link.education}</li>
                  <li>Experience Required: {link.experience}</li>
                  <li>Skill Required: {link.skills}</li>
                  <li>Apply Before: {link.apply_before}</li>
                  

                </div>
              ))}
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

// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useFirestore } from "react-redux-firebase";
// import { useEffect } from "react";

// function  {
//   const [user, setUser] = useState(null);
//   const { id } = useParams();
//   const firestore = useFirestore();

//   const loadUser = async () => {
//     try {
//       const docRef = firestore.collection("users").doc(id);

//       const result = await docRef.get();

//       if (result.exists) {
//         setUser(result.data());
//       } else {
//         console.log("NO such User");
//       }
//     } catch (error) {
//       console.log("Ërror: ", error.message());
//     }
//   };
//   useEffect(() => {
//     loadUser();
//   }, []);
//   if (!user) {
//     return <h1>Loading</h1>;
//   }
//   return (
//     <div className="">
//       <h1>User Detail</h1>
//       <h4>User Name : {user.name}</h4>
//       <h4>Email : {user.email}</h4>
//       <p>id: {user.uid}</p>
//       <Link to={`/userForm/${id}`}>edit profile</Link>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { useFirestore } from "react-redux-firebase";

// function EditForm() {
//   const firestore = useFirestore();

//   let history = useHistory();
//   const { id } = useParams();
//   const docRef = id ? firestore.collection("users").doc(id) : null;

//   const [user, setuser] = useState({
//     name: "",
//     email: "",
//     location: "",
//     website: "",
//     post: "",
//     is_admin: false,
//   });

//   useEffect(() => {
//     if (id) {
//       loadUser();
//     }
//   }, [id]);

//   const loadUser = async () => {
//     try {
//       const result = await docRef.get();
//       if (result.exists) {
//         setuser(result.data());
//       } else {
//         console.log("No such document!");
//       }
//     } catch (error) {
//       console.log("Error getting document:", error);
//     }
//   };

//   const oninputChange = (e) => {
//     setuser({ ...user, [e.target.name]: e.target.value });
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();
//     if (id) {
//       // update user
//       try {
//         await docRef.update({
//           ...user,
//           updatedAt: firestore.FieldValue.serverTimestamp(),
//         });
//         console.log("Document successfully updated!");
//       } catch (error) {
//         console.error("Error updating document: ", error);
//       }
//     } else {
//       // add new user
//       firestore
//         .collection("users")
//         .add({ ...user, createdAt: firestore.FieldValue.serverTimestamp() });
//     }
//     history.push("/");
//   };
//   return (
//     <div className="container">
//       <form onSubmit={submitForm}>
//         <div>
//           <div>
//             <input
//               placeholder="Enter user Name"
//               name="name"
//                  .name}
//
//             />
//           </div>
//           <div>
//             <input
//               placeholder="Enter user E-mail"
//               name="email"
//                  .email}
//
//             />
//           </div>
//         </div>
//         <div>
//           <div>
//             <input
//               placeholder="Enter Location"
//               name="location"
//                  .location}
//
//             />
//           </div>
//         </div>
//         <div className="form-row form-group">
//           <div>
//             <input
//               placeholder="Enter website"
//               name="website"
//                  .website}
//
//             />
//           </div>
//           <div>
//             <input
//               placeholder="Enter post"
//               name="post"
//                  .post}
//
//             />
//           </div>
//         </div>

//         <button type="submit">{id ? "Update user" : "Add user"}</button>
//       </form>
//     </div>
//   );
// }
