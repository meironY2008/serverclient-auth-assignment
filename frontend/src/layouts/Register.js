import React, { useState, useRef } from "react";
import { signIn, setToken, setUser, setAccessToken, loading } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { teal, red, blueGrey } from "@material-ui/core/colors";
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PublicIcon from "@material-ui/icons/Public";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import WorkIcon from "@material-ui/icons/Work";
import axios from "axios";
import { useSnackbar } from "notistack";
import Loader from "../components/Loader/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
    width: "25%",
  },
  widthHelperText: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
  submit: {
    background: teal["A400"],
    transition: 250,
    "&:hover": {
      background: blueGrey[900],
      color: teal["A400"],
    },
  },
  clear: {
    background: red["A400"],
    transition: 250,
    "&:hover": {
      background: blueGrey[900],
      color: red["A400"],
    },
  },
}));

function Register() {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const emailRef = useRef();
  const passwordRef = useRef();
  const checkPasswordRef = useRef();
  const countryRef = useRef();
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const cityRef = useRef();
  const postRef = useRef();
  const companyRef = useRef();

  const dispach = useDispatch();
  const isLoading = useSelector((state) => state.loadingReducer);
  const handleClickShowPassword = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClear = (e) => {
    e.preventDefault();
    emailRef.current.value = "";
    passwordRef.current.value = "";
    companyRef.current.value = "";
    postRef.current.value = "";
    cityRef.current.value = "";
    checkPasswordRef.current.value = "";
    usernameRef.current.value = "";
    lastNameRef.current.value = "";
    firstNameRef.current.value = "";
    countryRef.current.value = "";
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
    if (
      !passwordRef.current.value ||
      passwordRef.current.value != checkPasswordRef.current.value
    )
      return;
    dispach(loading());
    axios
      .post("/register", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        company: countryRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        city: cityRef.current.value,
        country: countryRef.current.value,
        username: usernameRef.current.value,
        post: postRef.current.value,
        about: "",
      })
      .then(function(response) {
        dispach(loading());
        enqueueSnackbar("register success", {
          variant: "success",
          autoHideDuration: 3000,
        });
        dispach(setUser(response.data.user));
        dispach(setToken(response.data.refresh_token.token));
        dispach(setAccessToken(response.data.accessToken));
        dispach(signIn());
      })
      .catch(function(error) {
        dispach(loading());
        enqueueSnackbar("faild to register!", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Container maxWidth="md">
      <form onSubmit={handleSignIn}>
        <Grid container direction="column" alignContent="center">
          <h3>Register</h3>
          <Divider />
          <Grid container direction="row" alignContent="space-between">
            <Grid container direction="row" alignContent="spwce-around">
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="login-email"
                    placeholder="Email"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    }
                    inputRef={emailRef}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputRef={passwordRef}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Verify Password"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputRef={checkPasswordRef}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" alignContent="center">
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="login-email"
                    placeholder="Username"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    }
                    inputRef={usernameRef}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="login-email"
                    placeholder="First name"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    }
                    inputRef={firstNameRef}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="login-email"
                    placeholder="Last name"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    }
                    inputRef={lastNameRef}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" alignContent="center">
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="login-email"
                    placeholder="Country"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <PublicIcon />
                      </InputAdornment>
                    }
                    inputRef={countryRef}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="login-email"
                    placeholder="City"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountBalanceIcon />
                      </InputAdornment>
                    }
                    inputRef={cityRef}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="login-email"
                    placeholder="Post"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <ContactMailIcon />
                      </InputAdornment>
                    }
                    inputRef={postRef}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <Input
                    id="login-email"
                    placeholder="Company"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <WorkIcon />
                      </InputAdornment>
                    }
                    inputRef={companyRef}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              className={clsx(classes.submit, classes.margin)}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
            <Button
              onClick={handleClear}
              className={clsx(classes.clear, classes.margin)}
              variant="contained"
            >
              Clear
            </Button>
            <div style={{ marginTop: 10, color: blueGrey[400] }}>
              Already Have an Account?{" "}
              <Link to="/login" style={{ color: blueGrey[800] }}>
                Login
              </Link>
            </div>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Register;
