import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useFirestore } from "react-redux-firebase";
import { useEffect } from "react";

function UserDetail() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const firestore = useFirestore();

  const loadUser = async () => {
    try {
      const docRef = firestore.collection("users").doc(id);

      const result = await docRef.get();

      if (result.exists) {
        setUser(result.data());
      } else {
        console.log("NO such User");
      }
    } catch (error) {
      console.log("Ërror: ", error.message());
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  if (!user) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="">
      
      <h1>User Detail</h1>
      <h4>User Name : {user.name}</h4>
      <img src={user.image} height="200" width="100" alt="" />
      <h4>Email : {user.email}</h4>
      <h4>Address : {user.location}</h4>
      <h4>Phone : {user.contact}</h4>
      <h4>website : {user.website}</h4>
      

  
      <Link to={`/userForm/${id}`}>edit profile</Link>
    </div>
  );
}

export default UserDetail;
