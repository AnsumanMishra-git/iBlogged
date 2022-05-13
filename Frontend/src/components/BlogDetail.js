import { InputLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStyles } from "./utils";

import { useNavigate, useParams } from "react-router-dom";
import "../CSS/App.css";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
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

export default BlogDetail;
