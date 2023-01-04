import React, { useState } from "react";
import http from "../../utils/http";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  let navigate = useNavigate(); // Important

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
      const { data } = await http.post("/user", userDetails);
      localStorage.setItem("token", data);
      navigate("/"); // redirect to homepage
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      }
    }

    // here you can see the object with the Token Status etc.
    // const response = await http.post("/user", userDetails);
    // console.log(response);
  };
  return (
    <form className="signup_form" onSubmit={handleSubmit}>
      <label htmlFor="Name">Name</label>
      <input type="text" name="name" onChange={handleChange} />

      <label htmlFor="Email">Email</label>
      <input type="email" name="email" onChange={handleChange} />

      <label htmlFor="Password">Password</label>
      <input type="password" name="password" onChange={handleChange} />

      {error && (
        <div className="error_container">
          <p className="form_error">{error}</p>
        </div>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
