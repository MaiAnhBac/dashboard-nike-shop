import React from 'react'
import { NavLink } from 'react-router-dom';
import './Login.css';
export default function Register() {
    function changTypeConPass() {
        let password = document.getElementById('password');
        let confirm_password = document.getElementById('confirm-password');
        password.type = password.type == 'text' ? 'password' : 'text';
        confirm_password.type = confirm_password.type == 'text' ? 'password' : 'text';
    }
  return (
    <div className="login">
        <div className="login-content">
            <div className="content-box">
                <div className="title register">
                    <h2 className="welcome">Create your free account</h2>
                    <p className="continue">Get your free Steex account now</p>
                </div>
                <form action="">
                    <div className="email">
                        <label for="">Email <span className="red">*</span></label>
                        <div className="form-input">
                            <input type="text" className="input-login" placeholder="Email của bạn" />
                        </div>
                    </div>
                    <div className="user">
                        <label for="">Username <span className="red">*</span></label>
                        <div className="form-input">
                            <input type="text" className="input-login" placeholder="Username của bạn" />
                        </div>
                    </div>
                    <div className="pass">
                        <label for="">Password <span className="red">*</span></label>
                        <div className="form-input">
                            <input type="password" id="password" className="input-login" placeholder="Password của bạn" />
                            <i className="fa-regular fa-eye" onClick={changTypeConPass}></i>
                            <i className="fa-regular fa-eye-slash" onClick={changTypeConPass}></i>
                        </div>
                    </div>
                    <div className="pass">
                        <label for="">Confirm password<span className="red">*</span></label>
                        <div className="form-input">
                            <input type="password" id="confirm-password" className="input-login" placeholder="Confirm password của bạn" />
                            <i className="fa-regular fa-eye" onClick={changTypeConPass}></i>
                            <i className="fa-regular fa-eye-slash" onClick={changTypeConPass}></i>
                        </div>
                    </div>
                    <div className="btn">
                        <button className="btn-sign" id="sign-up">Sign Up</button>
                    </div>
                </form>
                <div className="with">
                    <div className="with-account register-mt">
                        <p className="account">Do you already have an account?
                            <NavLink to="/" className="sign-up">Sign In</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
