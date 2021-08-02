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
    width: "43%",
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

function Login() {
  const classes = useStyles();
  const dispach = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
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
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispach(loading());
    console.log(emailRef.current.value, passwordRef.current.value);
    axios
      .post("/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then(function(response) {
        dispach(loading());
        enqueueSnackbar("success", {
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
        enqueueSnackbar("email or password not match!", {
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
          <h3>Login</h3>
          <Divider />
          <Grid item>
            <FormControl className={clsx(classes.margin, classes.textField)}>
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
            <FormControl className={clsx(classes.margin, classes.textField)}>
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
              Don't Have an Account?{" "}
              <Link to="/register" style={{ color: blueGrey[800] }}>
                Register
              </Link>
            </div>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;
