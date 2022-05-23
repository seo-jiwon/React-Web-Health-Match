import React, { useState } from "react";
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import './SignUp.css'

export default function SignUp() {
  const { register, watch, handleSubmit} = useForm();
    const onValid = (data) => console.log(data, "onvalid");
    const onInvalid = (data) => console.log(data, "onInvalid");
    
    return (
        <div className="SignUp">
            <Navbar />
            <div className="container">
                <form className="signup-form" onSubmit={handleSubmit(onValid, onInvalid)}>
                    <h1 className="signup-h1">SignUp</h1>
                    id
                    <input
                        {...register("id", { required: "id error", minLength: 5 } )}
                        type = "email"
                        placeholder = "ID"
                        />
                    password
                    <input
                        {...register("password", { required: "password error", minLength: 5 })}
                        type = "password"
                        placeholder = "Password"
                        />
                    check password
                    <input
                        {...register("passwordCheck", { required: "password check error" })}
                        type = "passwordcheck"
                        placeholder = "Password Check"
                        />
                    <input className="signup-btn" type="submit" value="SignUp" />
                </form>
            </div>
        </div>
    );
}