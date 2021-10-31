import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import Loading from "../../components/navbar/Loading";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, loading] = useAuthState(auth);

    const history = useHistory();

    useEffect(() => {
        if (loading) {
            <Loading />;
        }
    }, [user, loading]);
    const signInWithEmailAndPassword = async (email, password) => {
        await auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                // this works fine because response.message is a string
            });

        return history.replace("/dashboard");
    };

    return (
        <>
            <div className="login">
                <div className="login__container">
                    <Link to="/">X</Link>
                    <input
                        type="text"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        className="login__btn"
                        onClick={() =>
                            signInWithEmailAndPassword(email, password)
                        }
                    >
                        Login
                    </button>

                    <div>
                        <Link to="/reset">Forgot Password</Link>
                    </div>
                    <div>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link> now.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
