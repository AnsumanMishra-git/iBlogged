import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import "../CSS/App.css";
import { Link } from "react-router-dom";
const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const [len, setLen] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get(`/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
    });
  }, []);

  useEffect(() => {
    sendRequest().then((data) => {
      if (data.user && data.user.blogs) {
        setLen(user.blogs.length);
      } else {
        setLen(0);
      }
    });
  });

  console.log(len);
  return len === 0 ? (
    <div className='landing'>
      <div className='dark-overlay landing-inner text-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <div class='outer'>
                <div class='inner'>
                  <h1>You have not added any blogs.</h1>
                  <h1>Click here to add.</h1>
                  <Link
                    to='/blogs/add'
                    className='btn btn-lg btn-info mr-2'
                    styles={{ margin: "5%", color: "#000000" }}>
                    Add Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='landing '>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
