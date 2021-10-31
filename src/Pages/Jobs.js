import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Loading from "../components/navbar/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Jobs() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        db.collection("users")
            .where("isVerified", "==", "true")

            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());

                setData(data);
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };
    useEffect(() => {
        loadData();
    }, []);
    if (loading)
        return (
            <main>
                <Loading />
            </main>
        );
    return (
        <>
            <Navbar />
            <input
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />
            Search by Level:
            <select
                name="job_type"
                id="job_type"
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            >
                <option value="all">All</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="FullStack">FullStack</option>
            </select>
            {data &&
                data.map((users, index) => {
                    return (
                        <div key={index}>
                            {users.post101
                                .filter((val) => {
                                    if (searchTerm == "") {
                                        return val;
                                    } else if (
                                        val.job_type
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                    ) {
                                        return val;
                                    } else if (
                                        val.title
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                })

                                .map((post) => (
                                    <div>
                                        <LazyLoadImage
                                            src={users.image}
                                            height="500px"
                                            width="400px"
                                            effect="blur"
                                        />
                                        <h1>{post.title}</h1>
                                        <p>{users.name}</p>
                                        <p>{users.location}</p>
                                        <p>{post.apply_before}</p>

                                        <Link to={`/job/${post.id}`}>
                                            View Details
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    );
                })}
        </>
    );
}

export default Jobs;
