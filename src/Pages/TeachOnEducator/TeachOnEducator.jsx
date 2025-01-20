import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress } from "@mui/material";
import Headlines from "./../Shared/Headlines/Headlines";
import { authContext } from "../../providers/AuthProvider";

const TeachOnEducator = () => {
  const { user } = useContext(authContext); 
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
  ];

  axios.defaults.baseURL = "http://localhost:5000";

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/users?email=${user.email}`)
        .then((response) => {
          setProfile(response.data.user);
          setLoading(false); 
        })
        .catch((error) => {
          setError("Failed to fetch user data.");
          setLoading(false); 
          console.error("Error fetching user data:", error);
        });
    } else {
      setLoading(false); 
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: (newRequest) => axios.post("/api/teacher-request", newRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-requests"] });
      setStatus("pending");
      toast.success("Request submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    },
    onError: () => {
      toast.error("Failed to submit request. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const requestData = Object.fromEntries(formData.entries());

    requestData.status = "pending";
    requestData.email = profile?.email || user?.email || ""; 
    requestData.image = profile?.photoURL || user?.photoURL || ""; 
    requestData.userId = user?.uid || ""; 

    mutation.mutate(requestData, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">User not logged in. Please log in to continue.</p>
      </div>
    );
  }

  if (profile?.role === "teacher") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-green-600 text-xl font-semibold">
          You are already a teacher. Thank you for being a part of our platform!
        </p>
        <p className="text-gray-600 mt-2">If you need assistance, feel free to reach out to support.</p>
      </div>
    );
  }

  return (
    <>
      <Headlines heading={"Become an Educator"} subHeading={"Turn Your Expertise into Impactful Teaching"} />

      <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-2xl">
        <ToastContainer />
        {status === "approved" ? (
          <p className="text-green-500">You are now a teacher. This form is no longer available.</p>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={profile?.photoURL || "/default-profile.png"} 
                alt={profile?.name || user?.displayName || "User"}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  label="Name"
                  name="name"
                  required
                  fullWidth
                  variant="outlined"
                  className="border p-2"
                  value={profile?.name || user?.displayName || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  fullWidth
                  variant="outlined"
                  className="border p-2 bg-gray-100"
                  value={profile?.email || user?.email || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="mb-4">
                <FormControl fullWidth required variant="outlined" className="border p-2">
                  <InputLabel>Experience Level</InputLabel>
                  <Select name="experience" label="Experience Level" defaultValue="beginner">
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="mid-level">Mid-Level</MenuItem>
                    <MenuItem value="experienced">Experienced</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="mb-4">
                <TextField
                  label="Title"
                  name="title"
                  required
                  fullWidth
                  variant="outlined"
                  className="border p-2"
                />
              </div>
              <div className="mb-4">
                <FormControl fullWidth required variant="outlined" className="border p-2">
                  <InputLabel>Category</InputLabel>
                  <Select name="category" label="Category" defaultValue={categories[0]}>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-full flex">
                <button
                  type="submit"
                  className="w-5/12 rounded-xl btn mx-auto bg-orange-500 text-white p-2"
                >
                  Submit for Review
                </button>
              </div>
            </form>
          </>
        )}
        {status === "rejected" && (
          <div className="w-full flex">
            <button
              onClick={() => setStatus("pending")}
              className="mt-4 w-5/12 bg-red-500 text-white p-2 rounded"
            >
              Request Another
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TeachOnEducator;
