import { useState } from "react";
import "./Register.css";
import axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const registrationInfo = {
      username: username,
      password: passwordValue,
      first_name: firstName,
      last_name: lastName,
    };

    axios
      .post("/register", registrationInfo)
      .then((response) => {
        console.log("Succesful Registration!", response.data);
      })
      .catch((error) => {
        console.error("Error Registering! Try again.", error);
      });
  };

  const handleFirstNameInputChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameInputChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUsernameInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div>
      <h1>Registration</h1>
      <form className="registerForm" onSubmit={handleRegisterSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameInputChange}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordValue}
          onChange={handlePasswordInputChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
