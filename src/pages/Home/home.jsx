import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const handleUsernameInputChange = (e) => {
    setUsernameValue(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleLoginSubmission = (e) => {
    e.preventDefault();

    const loginInfo = {
      username: usernameValue.trim(),
      password: passwordValue.trim(),
    };

    axios
      .post("/login", loginInfo)
      .then((response) => {
        console.log("Succesful Login!", response.data);

        const userId = response.data.id;
        console.log("User ID:", userId);

        axios
          .get(`/user/tasks/${userId}`)
          .then((tasksResponse) => {
            //console.log("Fetched Tasks:", tasksResponse.data);
            navigate("/tasks", { state: { tasks: tasksResponse.data || [] } });
          })
          .catch((error) => {
            console.error("Error fetching tasks.");
            navigate("/tasks", { state: { tasks: [] } });
          });
      })
      .catch((error) => {
        console.error("Error Logging In! Try again.", error);
      });
  };

  return (
    <div className="loginPage">
      <h1>Sign In</h1>
      <form className="loginForm" onSubmit={handleLoginSubmission}>
        <input
          type="text"
          value={usernameValue}
          onChange={handleUsernameInputChange}
          placeholder="Enter Username Here"
        />
        <input
          type="password"
          value={passwordValue}
          onChange={handlePasswordInputChange}
          placeholder="Enter Password Here"
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">No Account? Create One!</Link>
    </div>
  );
}
