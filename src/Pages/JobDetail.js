import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useFirestore } from "react-redux-firebase";
import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Loading from "../components/navbar/Loading";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import Request from "./Request";

TimeAgo.addDefaultLocale(en);

function UserDetail() {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        setLoading(true);
        db.collection("users")
            .where("isVerified", "==", "true")

            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());

                setUser(data);

                setTimeout(() => {
                    setLoading(false);
                }, 300);
            })

            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };
    useEffect(() => {
        loadUser();
    }, []);
    if (loading)
        return (
            <main>
                <Loading />
            </main>
        );
    return (
        <div className="">
            <Navbar />

            <center>
                <section>
                    {user &&
                        user.map((users, index) => {
                            return (
                                <div key={index}>
                                    {users.post101
                                        .filter((val) => {
                                            if (val.id == id) {
                                                return val;
                                            }
                                        })

                                        .map((val) => (
                                            <div>
                                                <h1>
                                                    Title: {val.title}{" "}
                                                    <ReactTimeAgo
                                                        date={val.created_at.toDate()}
                                                        locale="en-US"
                                                    />
                                                </h1>
                                                <LazyLoadImage
                                                    src={users.image}
                                                    height="200px"
                                                    width="200px"
                                                    effect="blur"
                                                />
                                                <p>Company Name:{users.name}</p>

                                                <p>Location:{users.location}</p>

                                                <h3>City: {val.city}</h3>
                                                <h3>
                                                    Job type: {val.job_type}
                                                </h3>

                                                <h3>
                                                    Education Qualification:{" "}
                                                    {val.education}
                                                </h3>
                                                <h3>
                                                    Total Positions:
                                                    {val.total_positions}
                                                </h3>
                                                <h3>
                                                    Skill Required: {val.skills}
                                                </h3>
                                                <h3>
                                                    Website: {users.website}
                                                </h3>

                                                <h3>
                                                    Apply Before:{" "}
                                                    {val.apply_before}
                                                </h3>

                                                <Request
                                                    users={users}
                                                    post={val}
                                                />
                                            </div>
                                        ))}
                                </div>
                            );
                        })}
                </section>
            </center>
        </div>
    );
}

export default UserDetail;
