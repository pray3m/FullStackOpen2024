import { useState, useEffect } from "react";
import "./App.css";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) return;

    const user = JSON.parse(loggedUser);
    blogService.setToken(user.token);
    setUser(user);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with", username, password);
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (ex) {
      if (ex.response.data) setErrorMsg(ex.response.data.error);
      setErrorMsg("something went wrong");
      setTimeout(() => {
        setErrorMsg(null);
      }, 4000);
    }
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <div>
      <Notification errorMsg={errorMsg} successMsg={successMsg} />
      {user === null ? (
        <Login
          setUser={setUser}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <Blogs
          user={user}
          handleLogout={handleLogout}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
      )}
    </div>
  );
};

export default App;
