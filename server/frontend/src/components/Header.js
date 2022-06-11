import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";
const Header = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log("its" + isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar
      position='sticky'
      sx={{
        background: "#000",
      }}>
      <Toolbar>
        <Typography className={classes.font} variant='h4'>
          BlogsApp
        </Typography>
        <Box display='flex' marginLeft={"auto"} marginRight='auto'>
          <Tabs
            textColor='Primary'
            value={value}
            onChange={(e, val) => setValue(val)}>
            <Tab
              className={classes.font}
              LinkComponent={Link}
              to='/'
              label='Home'
            />
            <Tab
              className={classes.font}
              LinkComponent={Link}
              to={isLoggedIn ? "/blogs" : "/login"}
              label='All Blogs'
            />
            <Tab
              className={classes.font}
              LinkComponent={Link}
              to={isLoggedIn ? "/myBlogs" : "/login"}
              label='My Blogs'
            />
            <Tab
              className={classes.font}
              LinkComponent={Link}
              to={isLoggedIn ? "/blogs/add" : "/login"}
              label='Add Blog'
            />
          </Tabs>
        </Box>

        <Box display='flex' marginLeft='auto'>
          {!isLoggedIn && (
            <>
              {" "}
              <Button
                LinkComponent={Link}
                to='/login'
                variant='contained'
                sx={{ margin: 1, borderRadius: 10 }}
                backgroundColor='#112B3C'>
                Login/Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispath(authActions.logout())}
              LinkComponent={Link}
              to='/login'
              variant='contained'
              sx={{ margin: 1, borderRadius: 10 }}
              backgroundColor='#112B3C'>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
