import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import Loading from "../navbar/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Homepage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [count, setCount] = useState();

    const loadData = async () => {
        setLoading(true);
        db.collection("users")
            .where("isVerified", "==", "true")

            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                const size = querySnapshot.size;

                setData(data);
                setCount(size);
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setTimeout(() => {
                    setLoading(false);
                }, 300);
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
            <Navbar data={data} />

            <h1>Company registered:{count}</h1>
            <div className="container">
                {data.map((users) => {
                    return (
                        <div>
                            {users.post101.slice(0, 1).map((post, index) => (
                                <div key={index}>
                                    <LazyLoadImage
                                        src={users.image}
                                        effect="blur"
                                        height="200px"
                                        width="200px"
                                        alt=""
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
            </div>
        </>
    );
}

export default Homepage;
