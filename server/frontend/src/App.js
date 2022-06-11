import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./CSS/App.css";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

// importing the components
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch(); // to execute the redux actions

  const isLoggedIn = useSelector((state) => state.isLoggedIn); //selecting which state of the component to reduce

  // console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div className='App'>
      <header>
        <Header />
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/add' element={<AddBlog />} />
          <Route path='/myBlogs' element={<UserBlogs />} />
          <Route path='/myBlogs/:id' element={<BlogDetail />} />{" "}
        </Routes>
      </main>
    </div>
  );
}

export default App;
