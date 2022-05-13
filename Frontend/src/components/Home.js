import React from "react";
import { Link } from "react-router-dom";

import "../CSS/Home.css";
import "../CSS/App.css";
const Home = () => {
  return (
    <div className='landing'>
      <div className='dark-overlay landing-inner text-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h2 className='display-3 mb-4'>A simple Blogging App </h2>
              <h5 className='display-5'>Write , Read and Edit your posts</h5>
              <div class='outer'>
                <div class='inner'>
                  New User ? Sign Up Now &nbsp;&nbsp;
                  <Link
                    to='/signup'
                    className='btn btn-lg btn-info mr-2'
                    styles={{ margin: "5%", color: "#000000" }}>
                    Sign Up
                  </Link>
                </div>
                <div class='inner'>
                  Existing User ? Login Now &nbsp;&nbsp;
                  <Link to='/login' className='btn btn-lg btn-light'>
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
