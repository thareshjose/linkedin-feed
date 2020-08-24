import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import "./Authentication.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../../firebase";
import { useStateValue } from "./../../context/StateProvider";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Authentication() {
  const [{ user }, dispatch] = useStateValue();
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "LOGIN_USER", user: authUser });
      } else if (!authUser) {
        dispatch({ type: "LOGOUT_USER", user: null });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const logIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenLogIn(false);
  };

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpenSignUp(false);
  };

  const logout = (event) => {
    event.preventDefault();
    auth.signOut();
  };

  return (
    <div className="auth">
      {user ? (
        <button onClick={logout} className="auth__button">
          Logout
        </button>
      ) : (
        <>
          <button onClick={() => setOpenLogIn(true)} className="auth__button">
            Sign In
          </button>
          <button onClick={() => setOpenSignUp(true)} className="auth__button">
            Join
          </button>
        </>
      )}

      <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="auth__signup">
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openLogIn} onClose={() => setOpenLogIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="auth__signup">
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={logIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Authentication;
