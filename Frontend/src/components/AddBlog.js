import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import "../CSS/App.css";
const labelStyles = { mb: 1, mt: 2, fontSize: "18px", fontWeight: "bold" };
const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <div classname='landing'>
      <div className='addBlog'>
        <div className='row'>
          <div className='col-md-4 m-auto Signupinner'>
            <img
              class='center'
              src='https://i.ibb.co/gb1X9Qf/filename.png'
              alt='logo'
              width='62'
              height='62'
            />
            <h2 className='display-6 text-center'>Post</h2>

            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <InputLabel className={classes.font} sx={labelStyles}>
                  Title
                </InputLabel>
                <input
                  className='form-control'
                  name='title'
                  onChange={handleChange}
                  value={inputs.title}
                />
                <InputLabel className={classes.font} sx={labelStyles}>
                  Description
                </InputLabel>
                <input
                  className='form-control'
                  onChange={handleChange}
                  name='description'
                  value={inputs.description}
                />
                <InputLabel className={classes.font} sx={labelStyles}>
                  ImageURL
                </InputLabel>
                <input
                  className='form-control'
                  onChange={handleChange}
                  name='imageURL'
                  value={inputs.imageURL}
                />
                <button
                  class='btn btn-lg btn-primary'
                  style={{ marginTop: "20px", marginLeft: "200px" }}
                  type='submit'>
                  Post It
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
