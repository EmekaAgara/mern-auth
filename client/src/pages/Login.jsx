import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Enter your password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
