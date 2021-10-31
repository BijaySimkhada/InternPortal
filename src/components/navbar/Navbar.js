import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../../firebase";
import { Link } from "react-router-dom";
import "../../CSS/navbar.css";
import { useSelector } from "react-redux";

function Navbar() {
    const users = useSelector((state) => state.firebase.profile);
    const [user] = useAuthState(auth);
    return (
        <>
            {user ? (
                <>
                    <header className="navbar">
                        <Link to="/" className="abs">
                            InternPortal
                        </Link>

                        <Link to="/" className="abs">
                            Home
                        </Link>
                        <Link to="/jobs" className="abs">
                            Jobs
                        </Link>
                        <Link to="/roadmap" className="abs">
                            Roadmap
                        </Link>
                        <p className="abs">Hello, {users.name}</p>
                        <button className="abs" onClick={logout}>
                            Logout
                        </button>
                        <Link to="/dashboard" className="abs">
                            Go to dashboard
                        </Link>
                    </header>
                </>
            ) : (
                <div className="navbar">
                    <Link to="/" className="abs">
                        InternPortal
                    </Link>
                    <Link to="/" className="abs">
                        Home
                    </Link>
                    <Link to="/jobs" className="abs">
                        Jobs
                    </Link>
                    <Link to="/roadmap" className="abs">
                        Roadmap
                    </Link>
                    <Link to="/login" className="abs">
                        Login
                    </Link>
                    <Link to="/register" className="abs">
                        Register
                    </Link>
                </div>
            )}
        </>
    );
}

export default Navbar;
