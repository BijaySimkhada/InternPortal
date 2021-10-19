import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";

function EditForm() {
  const firestore = useFirestore();

  let history = useHistory();
  const { id } = useParams();
  const docRef = id ? firestore.collection("users").doc(id) : null;

  const [user, setuser] = useState({
    name: "",
    email: "",
    location: "",
    website: "",
    post: "",
    isAdmin: false,
    
    isVerified:false,
  });

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      const result = await docRef.get();
      if (result.exists) {
        setuser(result.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  const oninputChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (id) {
      // update user
      try {
        await docRef.update({
          ...user,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      // add new user
      firestore
        .collection("users")
        .add({ ...user, createdAt: firestore.FieldValue.serverTimestamp() });
    }
    history.push("/dashboard");
  };
  return (
      
    <div className="container">
 
      <form onSubmit={submitForm}>
        <div>
          <div>
            <input
              placeholder="Enter user Name"
              name="name"
              value={user.name}
              onChange={oninputChange}
            />
          </div>
          <div>
            <input
              placeholder="Enter user E-mail"
              name="email"
              value={user.email}
              onChange={oninputChange}
            />
          </div>
        </div>
        <div>
          <div>
            <input
              placeholder="Enter Location"
              name="location"
              value={user.location}
              onChange={oninputChange}
            />
          </div>
        </div>
        <div className="form-row form-group">
          <div>
            <input
              placeholder="Enter website"
              name="website"
              value={user.website}
              onChange={oninputChange}
            />
          </div>
          <div>
            <input
              placeholder="Enter post"
              name="post"
              value={user.post}
              onChange={oninputChange}
            />
          </div>
       
        </div>

        <button type="submit">{id ? "Update user" : "Add user"}</button>
      </form>
    </div>
  );
}

export default EditForm;
