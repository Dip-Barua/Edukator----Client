import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const { user } = useContext(authContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`https://edukator-server.vercel.app/api/users?email=${user.email}`)
        .then((response) => {
          const userData = response.data.user;
          setName(userData.name || "");
          setEmail(userData.email || "");
          setPhotoURL(userData.photoURL || "");
          setPhone(userData.phone || "");
          setRole(userData.role || ""); 
        })
        .catch((error) => {
          setError("Failed to fetch user data.");
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const updateUserProfile = (name, photoURL, phone, role) => {
    return axios
      .put(`https://edukator-server.vercel.app/api/users?email=${user.email}`, { name, photoURL, phone, role }) 
      .then((response) => {
        console.log("Profile updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        throw new Error(error?.response?.data?.message || "Error updating profile");
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await updateUserProfile(name, photoURL, phone, role);
      setIsLoading(false);
      toast.success("Profile updated successfully!");
      navigate("");
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "Failed to update profile.");
      toast.error(error.message || "Failed to update profile."); 
    }
  };

  return (
    <div className="container mx-autos">
      <Helmet>
        <title>My Profile</title>
      </Helmet>


      <div className="max-w-2xl mx-auto p-4 rounded-2xl shadow-xl bg-white">
        <div className="flex justify-center mb-2">
          <img
            src={photoURL || "/default-profile.png"} 
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover"
          />
        </div>

        <div className="mb-2">
          <h2 className="text-xl font-bold">{name || "No name provided"}</h2>
        </div>

        <div className="mb-2">
          <p className="text-sm"><span className="font-bold">Role:</span> {role || "No role assigned"}</p>
        </div>

        <div className="mb-2">
          <p className="text-sm"><span className="font-bold">Email:</span> {email || "No email provided"}</p>
        </div>

        <div className="mb-2">
          <p className="text-sm"><span className="font-bold">Phone:</span> {phone || "No phone number provided"}</p>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="form-control mb-2">
            <label className="label" htmlFor="name">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mb-2">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control mb-2">
            <label className="label" htmlFor="photoURL">
              <span className="label-text">Profile Photo URL</span>
            </label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter your profile photo URL"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-2">
            <label className="label" htmlFor="phone">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="input input-bordered w-full"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-orange-400 text-white w-6/12 mx-auto text-xl"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </div>
  );
};

export default MyProfile;
