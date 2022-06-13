import React, { useRef, useState } from "react";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useForm, useFormState } from "react-hook-form";
import './SignUp.css'
import axios from "axios";
import { Password } from "@mui/icons-material";
import Footer from './Footer';

export default function SignUp() {
    const { register, watch, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onValid = (data) => {
      const { email, pw, nickname, type } = data;
      axios
        .post("http://localhost:5000/users/signup", { email, pw, nickname, type, })
        .then((response) => {
          console.log(response.data, "onvalid");
          navigate("/login");
        })
        .catch((error) => {
          console.log(error.data, "onInvalid");
        });
    };
    
    return (
      <body className="body">
        <div className="footer_fix">
          <div className="SignUp">
            <Navbar />
            <main className="main">
              <div className="container">
                <form className="signup-form" onSubmit={handleSubmit(onValid)}>
                  <h1 className="signup-h1">SignUp</h1>
                  <label className="signup-label">id</label>
                  <input
                    className="signup-input"
                    {...register("email", {
                      required: "이메일을 입력해 주세요.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "유효하지 않은 이메일 형식입니다.",
                      },
                    })}
                    type="email"
                    placeholder="email"
                  />
                  {errors.email && errors.email.message && (
                    <div className="error">{errors.email.message}</div>
                  )}
                  <label className="signup-label">password</label>
                  <input
                    className="signup-input"
                    {...register("pw", {
                      required: "비밀번호를 입력해 주세요.",
                      minLength: {
                        value: 8,
                        message: "비밀번호는 8자 이상이어야 합니다.",
                      },
                    })}
                    type="password"
                    placeholder="Password"
                  />
                  {errors.pw && errors.pw.message && (
                    <div className="error">{errors.pw.message}</div>
                  )}
                  {/* <label className="signup-label">check password</label>
                    <input
                        {...register("pwCheck", { required: "비밀번호를 다시 입력해 주세요.",
                        validate: (value) =>
                            value === pw.current,
                            message:"비밀번호가 일치하지 않습니다." })}
                        type = "password"
                        placeholder = "Password Check"
                        /> */}
                  {/* {errors.pwCheck && errors.pwCheck.value === "validate" && <div className="error">{errors.pwCheck.message}</div>} */}
                  <label className="signup-label">nickname</label>
                  <input
                    className="signup-input"
                    {...register("nickname", {
                      required: "닉네임을 입력해 주세요.",
                      minLength: {
                        value: 2,
                        message: "닉네임은 2글자 이상이어야 합니다.",
                      },
                    })}
                    type="text"
                    placeholder="nickname"
                  />
                  {errors.nickname && errors.nickname.message && (
                    <div className="error">{errors.nickname.message}</div>
                  )}
                  <label className="signup-label">회원 유형</label>
                  <div className="memberType">
                    <div className="type-check">
                      <label htmlFor="public">
                        <input
                          {...register("type", { required: true })}
                          type="radio"
                          name="type"
                          value="public"
                          className="type-check-input"
                          id="public"
                        />{" "}
                        일반 회원
                      </label>
                    </div>
                    <div className="type-check">
                      <label htmlFor="teacher">
                        <input
                          {...register("type", { required: true })}
                          type="radio"
                          name="type"
                          value="teacher"
                          className="type-check-input"
                          id="teacher"
                        />{" "}
                        강사
                      </label>
                    </div>
                  </div>
                  <input className="signup-btn" type="submit" value="SignUp" />
                </form>
              </div>
            </main>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </div>
      </body>
    );
}