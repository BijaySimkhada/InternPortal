import React, { useState, useEffect } from "react";
import Loading from "../components/navbar/Loading";
import Navbar from "../components/navbar/Navbar";
import { db } from "../firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Roadmaps() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const loadData = async () => {
        setLoading(true);
        db.collection("roadmaps")

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

            {data
                .filter((val) => {
                    if (searchTerm == "") {
                        return val;
                    } else if (
                        val.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    ) {
                        return val;
                    }
                })
                .map((val, key) => {
                    return (
                        <div key={key}>
                            <>
                                <h1>{val.title}</h1>
                                <LazyLoadImage
                                    height="700px"
                                    width="100%"
                                    effect="blur"
                                    src={val.image}
                                />
                            </>
                        </div>
                    );
                })}
        </>
    );
}

export default Roadmaps;
