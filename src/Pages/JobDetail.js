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
      <h1>JOB DETAILSSSS</h1>

      <section>
        {user.post101 &&
          user.post101.map((link, index) => (
            <div className="" key={index}>
              <li>Title: {link.title}</li>
              <li>City: {link.city}</li>
              <li>Job type: {link.job_type}</li>
              <li>Job Level: {link.job_level}</li>
              <li>Education Qualification: {link.education}</li>
              <li>Experience Required: {link.experience}</li>
              <li>Skill Required: {link.skills}</li>
              <li>Apply Before: {link.apply_before}</li>
            </div>
          ))}
      </section>

      {/* <Link to={`/userForm/${id}`}>edit profile</Link> */}
    </div>
  );
}

export default UserDetail;
