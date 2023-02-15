import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Features/AuthSlice";
import { StyledForm } from "../../Features/StyledForm";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  useEffect(() => {
    if(auth._id){
        navigate("/cart")
    }
  },[auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit} >
        <h2 >Register</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button>
          {auth.registerStatus === "pending" ? "Submitting" : "Register"}
        </button>


      </StyledForm>
    </>
  );
};

export default Register;
