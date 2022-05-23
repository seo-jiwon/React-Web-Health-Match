import React, { useState } from "react";
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Login.css'


export default function Login() {
    const { register, watch, handleSubmit} = useForm();
    const onValid = (data) => console.log(data, "onvalid");
    const onInvalid = (data) => console.log(data, "onInvalid");
    
    return (
        <div className="Login">
            <Navbar />
            <div className="container">
                <form className="login-form" onSubmit={handleSubmit(onValid, onInvalid)}>
                    <h1 className="login-h1">Login</h1>
                    <input
                        {...register("id", { required: "id error", minLength: 5 } )}
                        type = "email"
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