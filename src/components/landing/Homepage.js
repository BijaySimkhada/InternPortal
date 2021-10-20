import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { db } from "../../firebase";

function Homepage() {
  const [data, setData] = useState([]);

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

      {data &&
        data.slice(0, 3).map((users) => {
          return (
            <div>
              {users.post101.map((post) => (
                <div>
                  <img src={users.image} height="100" width="100" alt="" />
                  <h1>{post.title}</h1>
                  <p>{users.name}</p>
                  <p>{users.location}</p>
                  <p>{post.apply_before}</p>
                  <button>Apply</button>
                </div>
              ))}
            </div>
          );
        })}
         
             
                
           
    
                 
                   
               
    </>
  );
}

export default Homepage;
