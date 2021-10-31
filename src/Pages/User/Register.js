import React, { useState } from "react";

import { auth, db, app } from "../../firebase";
import Navbar from "../../components/navbar/Navbar";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";

function Register() {
    const [fileUrl, setFileUrl] = useState();
    const history = useHistory();

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const contact = e.target.contact.value;
        const location = e.target.location.value;
        const website = e.target.website.value;
        const password = e.target.password.value;

        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;

        if (!name || !fileUrl || !email || !password || !contact || !location) {
            return;
        }
        await db
            .collection("users")
            .doc(user.uid)
            .set({
                uid: user.uid,
                name: name,
                image: fileUrl,
                email: email,
                contact: contact,
                location: location,
                website: website,
                password: password,
                isAdmin: "false",
                isVerified: "false",
            })
            .then(() => alert("User Created"));

        return history.push("/login");
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="login">
                    <div className="login__container">
                        <Link to="/">X</Link>
                        <input
                            className="register__textBox"
                            type="text"
                            name="name"
                            placeholder="full name"
                        />
                        <h5>Upload logo</h5>
                        <input
                            className="register__textBox"
                            type="file"
                            onChange={onFileChange}
                        />
                        <input
                            className="register__textBox"
                            type="text"
                            name="email"
                            placeholder="email"
                        />
                        <input
                            className="register__textBox"
                            type="text"
                            name="contact"
                            placeholder="contact"
                        />
                        <input
                            className="register__textBox"
                            type="text"
                            name="location"
                            placeholder="location"
                        />
                        <input
                            className="register__textBox"
                            type="text"
                            name="website"
                            placeholder="website"
                        />
                        <input
                            className="register__textBox"
                            type="password"
                            name="password"
                            placeholder="password"
                        />
                        <button className="register__btn">Register</button>

                        <div>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link> now.
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Register;
