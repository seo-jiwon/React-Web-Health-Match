import React, { useState } from "react";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useForm, useFormState } from "react-hook-form";
import './SignUp.css'
import axios from "axios";

export default function SignUp() {
    const { register, watch, handleSubmit, errors} = useForm();
    const navigate = useNavigate();


    const onValid = (data) => {
        const {email, pw} = data;
        axios.post("http://localhost:5000/login/signup", {email, pw})
        .then(response => {
            console.log(response.data, "onvalid");
            alert("회원가입을 성공하였습니다.");
            navigate('/login');
        })
        .catch(error => {
            console.log(error.data, "onInvalid");
            alert("회원가입을 실패하였습니다.");
        });
    };
    
    return (
        <div className="SignUp">
            <Navbar />
            <div className="container">
                <form className="signup-form" onSubmit={handleSubmit(onValid)}>
                    <h1 className="signup-h1">SignUp</h1>
                    {/* id */}
                    <input
                        {...register("email", { required: "email error" } )}
                        type = "email"
                        placeholder = "email"
                        />
                    {/* password */}
                    <input
                        {...register("pw", { required: "pw error",
                        minLength:{
                            value:8,
                            message:"비밀번호는 8자 이상이어야 합니다,"} })}
                        type = "password"
                        placeholder = "pw"
                        />
                    {/* check password */}
                    {/* <input
                        {...register("passwordCheck", { required: "password check error" })}
                        type = "password"
                        placeholder = "Password Check"
                        /> */}
                    <input className="signup-btn" type="submit" value="SignUp" />
                </form>
            </div>
        </div>
    );
}