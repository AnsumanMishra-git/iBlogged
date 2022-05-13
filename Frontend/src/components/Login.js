import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import "../CSS/auth.css";
const Login = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  };
  return (
    <div>
      <div className='container Signupouter'>
        <div className='row'>
          <div className='col-md-4 m-auto Signupinner'>
            <img
              class='center'
              src='https://i.ibb.co/gb1X9Qf/filename.png'
              alt='logo'
              width='62'
              height='62'
            />
            <h2 className='display-6 text-center'>
              {isSignup ? "Signup" : "Login"}
            </h2>
            <h1 className='lead text-center'>
              {isSignup ? "Register your account " : "Sign in to your account"}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                {isSignup && (
                  <input
                    className='form-control'
                    onChange={handleChange}
                    placeholder='Name'
                    name='name'
                    value={inputs.name}
                  />
                )}{" "}
                <input
                  type='email'
                  className='form-control'
                  onChange={handleChange}
                  placeholder='Email'
                  name='email'
                  value={inputs.email}
                />
                <input
                  type='password'
                  className='form-control'
                  onChange={handleChange}
                  placeholder='Password'
                  name='password'
                  value={inputs.password}
                />
                <button
                  class='btn btn-lg btn-primary btn-block btnInner'
                  type='submit'>
                  {isSignup ? "SignUp " : "Login "}
                </button>
              </div>

              <Button
                class='btn btn-block btnOuter'
                onClick={() => setIsSignup(!isSignup)}
                sx={{ borderRadius: 3, marginTop: 3 }}>
                {isSignup
                  ? "Existing User ? Click to Login "
                  : "New User ? Click to Register "}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
