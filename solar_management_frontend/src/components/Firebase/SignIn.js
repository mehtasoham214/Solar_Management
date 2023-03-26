import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import firebaseApp from "./../firebase/Firebase";
import { login } from "./../../store/features/auth/authSlice";
import { Button, Typography, TextField } from "@mui/material";
import validator from "validator";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [resetEmail, setResetEmail] = React.useState("");
  const [resetPasswordError, setResetPasswordError] = React.useState(false);

  const handlePasswordReset = (event) => {
    event.preventDefault();
    if (!resetEmail) {
      setResetPasswordError("Please enter an email to reset password.");
      return;
    }
    if (!validator.isEmail(resetEmail)) {
      setResetPasswordError("Please enter a valid email address to reset password.");
      return;
    }

    firebaseApp
      .auth()
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        console.log(`Password reset email sent to ${resetEmail}`);
        setResetPasswordError(``);
        alert("Password reset email sent to " + resetEmail);
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/user-not-found") {
          setResetPasswordError("No user found with that email address.");
        } else {
          setResetPasswordError("Error sending password reset email.");
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate input
    if (!email) {
      setEmailError("Please enter a valid email and password.");
      return;
    }
    if (!password) {
      setPasswordError("Please enter a valid email and password.");
      return;
    }

    if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      // Signed in
      dispatch(
        login({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          username: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        })
      );
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        setEmailError("Check your email and password combination and try again.");
        setPasswordError("Check your email and password combination and try again.");
      } else if (error.code === "auth/wrong-password") {
        setEmailError("Check your email and password combination and try again.");
        setPasswordError("Check your email and password combination and try again.");
      } else {
        setError(error.message);
      }

      console.log("Sign in failed");
    }
  };

  if (auth && auth.user) {
    return <Navigate to={`/`} />;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <br /> <br />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
        <br />
        {error ? (
          <Typography variant="body2" className="error">
            <br />
            {error}
          </Typography>
        ) : null}
        <br />
        <Button type="submit" variant="contained" color="primary" error={Boolean(passwordError)} helperText={passwordError}>
          Sign In
        </Button>
      </form>
      <br />
      {passwordError ? (
        <form onSubmit={handlePasswordReset}>
          <TextField
            id="resetemail"
            name="resetemail"
            label="Email to reset password"
            onChange={(e) => setResetEmail(e.target.value)}
            value={resetEmail}
            error={Boolean(resetPasswordError)}
            helperText={resetPasswordError}
          />
          <Button variant="outlined" type="submit">
            Forgot Password
          </Button>
        </form>
      ) : null}
      <br /> <br />
    </div>
  );
};

export default SignIn;
