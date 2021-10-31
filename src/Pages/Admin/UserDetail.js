import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useFirestore } from "react-redux-firebase";
import { useEffect } from "react";
import Loading from "../../components/navbar/Loading";

function UserDetail() {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const firestore = useFirestore();
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            setLoading(true);
            const docRef = firestore.collection("users").doc(id);

            const result = await docRef.get();

            if (result.exists) {
                setUser(result.data());
                setTimeout(() => {
                    setLoading(false);
                }, 500);
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
    if (loading)
        return (
            <main>
                <Loading />
            </main>
        );
    return (
        <div className="">
            <h1>User Detail</h1>
            <h4>User Name : {user.name}</h4>
            <LazyLoadImage
                src={user.image}
                height="200"
                width="100"
                alt=""
                loading="lazy"
                effect="blur"
            />
            <h4>Email : {user.email}</h4>
            <h4>Address : {user.location}</h4>
            <h4>Phone : {user.contact}</h4>
            <h4>website : {user.website}</h4>

            <Link to={`/userForm/${id}`}>edit profile</Link>
        </div>
    );
}

export default UserDetail;
