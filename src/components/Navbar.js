import './Navbar.css';
// import '../pages/style/Responsive.css'
import logo from '../images/logo-light.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Navbar() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null;
    const navigate = useNavigate();
    const clickLogOut = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        navigate('/')
        toast.success("Signed out successfully");
    }
    return ( 
      <div className="container">
        <div className="navigation">
            <ul>
                <li>
                    <a href="index.html" className="logo">
                       <img src={logo} alt="" />
                    </a>
                </li>
                <li>
                    <NavLink to="/home" className="title2 active">
                        <span className="icon"><i className="fa-solid fa-chart-pie"></i></span>
                        <span className="title">Tổng quan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/product" className="title2">
                        <span className="icon"><i className="fa-solid fa-briefcase"></i></span>
                        <span className="title">Quản lý sản phẩm</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/category" className="title2">
                        <span className="icon"><i className="fa-solid fa-clipboard"></i></span>
                        <span className="title">Quản lý thể loại</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="title2">
                        <span className="icon"><i className="fa-solid fa-cart-plus"></i></span>
                        <span className="title">Quản lý đơn hàng</span>
                    </NavLink>
                </li>
                {userLogin.role === 'admin' ? 
                <li>
                    <NavLink to="/user" className="title2">
                        <span className="icon"><i className="fa-solid fa-user"></i></span>
                        <span className="title">Quản lý người dùng</span>
                    </NavLink>
                </li> : '' }
                <li>
                    <NavLink className="title2">
                        <span className="icon"><i className="fa-solid fa-gear"></i></span>
                        <span className="title">Cài đặt</span>
                    </NavLink>
                </li>
                <li onClick={clickLogOut}>
                    <NavLink >
                        <span className="icon"><i className="fa-solid fa-right-from-bracket"></i></span>
                        <span className="title">Đăng xuất</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
     );
}
export default Navbar;
