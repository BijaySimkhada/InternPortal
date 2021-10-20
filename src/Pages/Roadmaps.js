import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { db } from "../firebase";

function Roadmaps() {
    const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  db.collection("roadmaps")

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
        
        <input type="text" placeholder="Search..." onChange={(event) =>{
            setSearchTerm(event.target.value);
        }}/>

  
        {data && data.filter((val)=>{
            if(searchTerm == ""){
                return val
            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
            }
        }).map((val,key) => {
          return (
            
            <div>
              <h1>{val.title}</h1>
              <img src={val.image} height="500" width="700" alt="" />
            </div>
          );
        })}
    </>
  );
}

export default Roadmaps;
