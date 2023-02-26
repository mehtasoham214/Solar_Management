import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { postData } from "./common/utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let history = useHistory();

  function loginSubmit(e) {
    e.preventDefault();
    //Validate email
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      if (password) {
        return true;
      }
    }
  }
  return <div>Login</div>;
}

export default Login;
