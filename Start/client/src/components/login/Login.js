import React, { useState } from "react";
import http from "../../utils/http";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // destructure data
      const { data } = await http.post("/auth", userDetails);
      localStorage.setItem("token", data);
      window.location = "/";
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      }
    }
  };
  return (
    <form className="signup_form" onSubmit={handleSubmit}>
      <label htmlFor="Email">Email</label>
      <input type="email" name="email" onChange={handleChange} />

      <label htmlFor="Password">Password</label>
      <input type="password" name="password" onChange={handleChange} />

      {error && (
        <div className="error_container">
          <p className="form_error">{error}</p>
        </div>
      )}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
