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
                        <span className="title">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/product" className="title2">
                        <span className="icon"><i className="fa-solid fa-briefcase"></i></span>
                        <span className="title">Products</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/category" className="title2">
                        <span className="icon"><i className="fa-solid fa-clipboard"></i></span>
                        <span className="title">Category</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/order' className="title2">
                        <span className="icon"><i className="fa-solid fa-cart-plus"></i></span>
                        <span className="title">Orders</span>
                    </NavLink>
                </li>
                {userLogin && userLogin.role === 'admin' ? 
                <li>
                    <NavLink to={"/user"} className="title2">
                        <span className="icon"><i className="fa-solid fa-user"></i></span>
                        <span className="title">Users</span>
                    </NavLink>
                </li> : '' }
                <li>
                    <NavLink to='/error404' className="title2">
                        <span className="icon"><i className="fa-solid fa-gear"></i></span>
                        <span className="title">Settings</span>
                    </NavLink>
                </li>
                <li onClick={clickLogOut}>
                    <NavLink >
                        <span className="icon"><i className="fa-solid fa-right-from-bracket"></i></span>
                        <span className="title">Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
     );
}
export default Navbar;
