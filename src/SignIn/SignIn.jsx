import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { authContext } from "../providers/AuthProvider";
import Headlines from "../Pages/Shared/Headlines/Headlines";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const SignIn = () => {
  const { handleGoogleLogin, handleLogin } = useContext(authContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    localStorage.setItem("lastTypedEmail", value); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(email, password)
      .then((res) => {
        toast.success("User Logged In Successfully.");

        setTimeout(() => {
          const redirectTo = location.state?.from || "/";
          navigate(redirectTo);
        }, 2000);
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
          setError("Invalid credentials. Please check your email and password.");
          toast.error("Invalid credentials. Please check your email and password.");
        } else {
          setError("Something went wrong. Please try again.");
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  const googleLoginHandler = () => {
    handleGoogleLogin().then((res) => {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    });
  };

  return (
    <div>
      <Helmet>
        <title>LogIn - Edukator</title>
      </Helmet>
      <Headlines heading={"Login now"} subHeading={"Access your account to explore personalized content and manage your classes"} />

      <div className="hero">
        <div className="hero-content flex-col w-11/12 sm:w-4/12">
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-lg">
            <form className="card-body gap-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="form-control">
 
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              {/* Password Input */}
              <div className="form-control">

                <TextField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <label className="label">
                  <Link
                    to="/forgetpassword"
                    className="label-text-alt link text-sm sm:text-md link-hover text-red-500"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>

              <div className="form-control">
                <button className="btn bg-orange-500 w-4/12 mx-auto text-xl font-bold text-white" type="submit">
                  Login
                </button>
              </div>
              <hr />
              <p className="text-sm sm:text-md">
                Don&apos;t have an account?{" "}
                <Link className="font-bold text-sm sm:text-md hover:underline" to="/signup">
                  Register Now!
                </Link>
              </p>
              <p className="text-sm sm:text-md">
                or, Sign in with
                <div className="font-bold hover:underline flex justify-around sm:w-8/12 mx-auto">
                  <button
                    type="button"
                    onClick={googleLoginHandler}
                    className="btn bg-transparent rounded-2xl mt-4 text-3xl"
                  >
                    <FcGoogle />
                  </button>
                  <button type="button" className="btn bg-transparent rounded-2xl mt-4 text-3xl text-blue-600">
                    <FaFacebook />
                  </button>
                  <button type="button" className="btn bg-transparent rounded-2xl mt-4 text-3xl">
                    <FaGithub />
                  </button>
                </div>
              </p>
            </form>
            {error && <p className="text-center text-red-500">{error}</p>}
          </div>
        </div>
      </div>

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

export default SignIn;
