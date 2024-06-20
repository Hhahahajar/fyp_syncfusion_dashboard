/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import axios from 'axios';
import bgpic from '../data/avatar2.jpg';
import { Button } from '../components';
import { loginUser } from './redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    setLoader(true);

    // Example API call using Axios (replace with your actual API call)
    axios.get(`http://your-api-endpoint/${role.toLowerCase()}/${email}`)
      .then((response) => {
        const userData = response.data;
        if (!userData || userData.password !== password) {
          throw new Error('Invalid credentials');
        }
        const fields = { email, password };
        dispatch(loginUser(fields, role));
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoader(false);
        setMessage('Network Error');
        setShowPopup(true);
      });
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Farmer') {
        navigate('/Farmer/dashboard');
      } else if (currentRole === 'Manager') {
        navigate('/Manager/dashboard');
      }
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: '#2c2143' }}>
              {role} Login
            </Typography>
            <Typography variant="h7">
              Welcome back! Please enter your details
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError}
                helperText={emailError && 'Email is required'}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError && 'Password is required'}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                {loader
                  ? <CircularProgress size={24} color="inherit" />
                  : 'Login'}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2, mb: 3, color: '#7f56da', borderColor: '#7f56da' }}
              >
                Login as Guest
              </Button>
              {role === 'Admin' && (
              <Grid container>
                <Grid>
                  Do not have an account?
                </Grid>
                <Grid item sx={{ ml: 2 }}>
                  <Link to="/Adminregister">
                    Sign up
                  </Link>
                </Grid>
              </Grid>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgpic})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
};

export default LoginPage;
