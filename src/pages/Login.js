import React, { useState } from "react";
import Navbar from './Navbar';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Login.css'
import axios from "axios";


export default function Login() {
    const { register, watch, handleSubmit, errors} = useForm();
    const navigate = useNavigate();
    
    const onValid = (data) => {
        const {email, pw} = data;
        axios.post("http://localhost:5000/login/signin", {email, pw})
        .then(response => {
            console.log(response.data, "onvalid");
            alert("로그인을 성공하였습니다.");
            navigate('/');
        })
        .catch(error => {
            console.log(error.data, "onInvalid");
            alert("로그인을 실패하였습니다.");
        });
    };
        

    
    
    return (
        <div className="Login">
            <Navbar />
            <div className="container">
                <form className="login-form" onSubmit={handleSubmit(onValid)}>
                    <h1 className="login-h1">Login</h1>
                    <input
                        {...register("email", { required: "email error", minLength: 5 } )}
                        type = "text"
                        placeholder = "ID"
                        />
                    <input
                        {...register("password", { required: "password error" })}
                        type = "password"
                        placeholder = "Password"
                        />
                    <input className="login-btn" type="submit" value="Login" />
                    <Link to="/signup">sign up?</Link>
                </form>
            </div>
        </div>
  );
}