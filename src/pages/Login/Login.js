import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { login, authorization } from '../../data/API'
import { toast } from 'react-toastify';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onChangeRemember = (e) => {
    setRemember(e.target.checked);
  }
  async function api(email, password) {
    let accessToken;
    await login(email, password).then(token => {
      accessToken = token.access_token;
    });
    if (accessToken) {
      await authorization(accessToken)
      toast.success("Logged in successfully");
      navigate('/home')
      if (remember) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      }
      else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
      }
    }
    else {
      toast.error("Login failed");
    }
  }
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(async() => {
      await api(email, password)
      setLoading(false)
    }, 2000)
  }
  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
    const emailValue = localStorage.getItem('email') || '';
    const passValue = localStorage.getItem('password') || '';
    setEmail(emailValue);
    setPassword(passValue)
    setRemember(rememberMeValue);
  }, [])
  function changTypePass() {
    let password = document.getElementById('password');
    password.type = password.type == 'text' ? 'password' : 'text';
  }
  return (
    <div className="login">
      <div className="login-content">
        <div className="content-box">
          <div className="title">
            <h2 className="welcome">Welcome Back</h2>
            <p className="continue">Sign in to continue to Steex.</p>
          </div>
          <form action="" onSubmit={onSubmitLogin}>
            <div className="user">
              <label htmlFor="email">Email <span className="red">*</span></label>
              <div className="form-input">
                <input type="email" placeholder="Email của bạn" id="email" className="input" required value={email} onChange={onChangeEmail} />
              </div>
            </div>
            <div className="pass">
              <label htmlFor="password">Password <span className="red">*</span></label>
              <div className="form-input">
                <input type="password" placeholder="Password của bạn" id="password" className="input" required value={password} onChange={onChangePassword} />
                <i className="fa-regular fa-eye" onClick={changTypePass}></i>
                <i className="fa-regular fa-eye-slash" onClick={changTypePass}></i>
              </div>
            </div>
            <div className="remember">
              <div className="remember-left">
                <input type="checkbox" checked={remember} id="checkbox" onChange={onChangeRemember} />
                <label className="me" htmlFor="checkbox" onChange={onChangeRemember}>Remember me</label>
              </div>
              <a href="#" className="forgot">Forgot Password?</a>
            </div>
            <div className="btn">
              <button type='submit' className="loader__btn" disabled={loading} >
                  {loading ? <div className="loader"></div> : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="with">
            <div className="with-top">
              <div className="horizontal"></div>
              <span className="signin-with">Sign In with</span>
              <div className="horizontal"></div>
            </div>
            <div className="with-icon">
              <a href="" className="fb"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="" className="gg" id="google"><i className="fa-brands fa-google"></i></a>
              <a href="" className="git"><i className="fa-brands fa-github"></i></a>
              <a href="" className="twi"><i className="fa-brands fa-twitter"></i></a>
            </div>
            <div className="with-account">
              <p className="account">Don't have an account ?
                <NavLink to='/register' className="sign-up">Sign Up</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
