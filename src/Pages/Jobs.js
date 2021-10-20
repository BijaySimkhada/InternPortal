import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Jobs() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  db.collection("users")
    .where("isVerified", "==", "true")

    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());

      setData(data);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

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
        name="job_level"
        id="job_level"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
      </select>
      {data &&
        data.map((users) => {
          return (
            <div>
              {users.post101
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.job_level
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((post) => (
                  <div>
                    <img src={users.image} height="100" width="100" alt="" />
                    <h1>{post.title}</h1>
                    <p>{users.name}</p>
                    <p>{users.location}</p>
                    <p>{post.apply_before}</p>
                    <h1>User ID: {users.uid}</h1>
                    <Link to={`/job/${users.uid}`}> View Details</Link>
                    <button> Apply</button>
                  </div>
                ))}
            </div>
          );
        })}
    </>
  );
}

export default Jobs;
