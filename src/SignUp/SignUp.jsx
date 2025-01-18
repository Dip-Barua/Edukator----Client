import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { authContext } from "../providers/AuthProvider";
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import Headlines from "../Pages/Shared/Headlines/Headlines";

const SignUp = () => {
  const { handleRegister, handleGoogleLogin } = useContext(authContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 6 characters long, contain at least one uppercase letter and one lowercase letter."
      );
    } else {
      setPasswordError("");
    }
  };

  const googleLoginHandler = () => {
    handleGoogleLogin()
      .then((res) => {
        const redirectTo = location.state?.from || '/';
        navigate(redirectTo);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.url.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (passwordError) {
      return;
    }

    setIsLoading(true);

    handleRegister(email, password, name, image)
      .then(() => {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error registering:", error);
        toast.error("Registration failed.");
      });
  };

  return (
    <div>
      <Helmet>
        <title>SignUp - Edukator</title>
      </Helmet>
      <Headlines heading={"Signup now"} subHeading={"Create your account to join the community and start learning"} />

      {isLoading ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold">Creating Profile...</h1>
        </div>
      ) : (
        <div className="hero -mt-8">
          <div className="hero-content flex-col w-11/12 sm:w-6/12">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-lg">
              <form className="card-body gap-4" onSubmit={handleSubmit}>
                <div className="form-control">
                  <TextField
                    fullWidth
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    required
                  />
                </div>

                <div className="form-control">
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    label="email"
                    placeholder="email@example.com"
                    variant="outlined"
                    required
                  />
                </div>

                <div className="form-control">
                  <TextField
                    fullWidth
                    type="url"
                    name="url"
                    placeholder="https://example.com/photo.jpg"
                    label="Photo URL"
                    variant="outlined"
                    required
                  />
                </div>

                <div className="form-control">
                  <div className="relative">
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      value={password}
                      name="password"
                      onChange={handlePasswordChange}
                      label="Password"
                      variant="outlined"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                  </div>
                </div>

                <div className="form-control flex justify-center">
                  <button
                    type="submit"
                    className="btn bg-orange-500 w-4/12 mx-auto text-xl font-bold text-white"
                    disabled={!!passwordError}
                  >
                    Register
                  </button>
                </div>

                <hr />

                <p className="text-sm sm:text-md">
                  Already have an account?{" "}
                  <Link className="font-bold text-sm sm:text-md hover:underline" to="/signin">
                    Login!
                  </Link>
                </p>

                <p className="text-sm sm:text-md">
                  or, Continue with
                  <div className="font-bold hover:underline">
                    <div className="font-bold hover:underline flex justify-around w-8/12 mx-auto">
                      <button type="button" onClick={googleLoginHandler} className="btn bg-transparent rounded-2xl mt-4 text-3xl"><FcGoogle /></button>
                      <button type="button" className="btn bg-transparent rounded-2xl mt-4 text-3xl text-blue-600"><FaFacebook /></button>
                      <button type="button" className="btn bg-transparent rounded-2xl mt-4 text-3xl"><FaGithub /></button>
                    </div>
                  </div>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SignUp;
