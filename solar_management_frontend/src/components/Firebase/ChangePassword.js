import React from "react";

const ChangePassword = (props) => {
  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={props.handleSubmit}>
        <input type="password" name="passwordOld" placeholder="Old Password" onChange={props.handleChange} value={props.password} />
        <br />
        <br />
        <input type="password" name="passwordOne" placeholder="New Password" onChange={props.handleChange} value={props.passwordOne} />
        <br />
        <br />
        <input type="password" name="passwordTwo" placeholder="Repeat New Password" onChange={props.handleChange} value={props.passwordTwo} />
        <br />
        <br />
        <input type="submit" value="Change Password" />
      </form>
    </div>
  );
};

export default ChangePassword;
