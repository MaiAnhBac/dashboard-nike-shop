import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { useParams } from 'react-router-dom';
import { getProductsByDetails } from '../../../data/API'
import '../ProductDetails/ProductDetails.css';
import '../../style/Responsive.css'
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../images/430982849_1506914163186871_1734766106111702841_n.jpg'
export default function ProductDetails() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null;
    const { id } = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState([])
    const [button, setButton] = useState(false)
    const onclickButton = () => {
        setButton(!button)
    }
    useEffect(() => {
        getProductsByDetails(id)
            .then((details) => {
                setDetails(details);
            })
    }, [])
    useEffect(() => {
        if (!userLogin) {
            navigate('/')
        }
    }, [navigate]);
    return (
        <Layout>
            <div className="topbar">
                <div className="toggle">
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className="search">
                    <h3>EDIT PRODUCTS</h3>
                </div>
                <div className="used">
                    <div className="used-left">
                        <div className="used-left-icon">
                            <i className="fa-regular fa-bell"></i>
                            <div className="bell-2">0</div>
                        </div>
                        <div className="used-left-bell">
                            <ul>
                                <li className='bell-brg'>
                                    <span className='bell-top'>Notification</span>
                                    <a href="" className='bell-view-all'>View All</a>
                                </li>
                                <li><a href="" className='bell-notification'>Không có thông báo</a></li>
                                <li><a href=""></a></li>
                                <li><a href=""></a></li>
                                <li><a href=""></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="used-vertical"></div>
                    <div className="used-right">
                        <div className='used_right_img'>
                            <img src={userLogin.avatar} alt="" className='img_user' />
                        </div>
                        <div className="used_right_name">
                            <span className="welcome" id="welcome">{userLogin?.name}</span>
                            <p className="role">{userLogin.role}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottombar">
                <div className="product-item-1">
                    <h3 className="product-title">EDIT PRODUCTS</h3>
                    <span className="path">
                        <Link to="/product" className="ecommerce">Product</Link>
                        <i className="fa-solid fa-angle-right"></i>
                        <a href="#" className="product-a">Edit Products</a>
                    </span>
                </div>
                <div className="product_details">
                    <div className="details_item">
                        <div className="item_img_edit">
                            <img src={img} alt="" className='img_details' />
                        </div>
                        <div className="item_input">
                            <div className="item_input_edit">
                                <label htmlFor="id" className='edit_label'>Id:</label>
                                <input type="text" id='id' placeholder='Id' value={details.id} disabled className='edit_input' />
                            </div>
                            <div className="item_input_edit">
                                <label htmlFor="title" className='edit_label'>Title:</label>
                                <input type="text" id='title' placeholder='Title' value={details.title} disabled className='edit_input' />
                            </div>
                        </div>
                        <div className="item_input">
                            <div className="item_input_edit">
                                <label htmlFor="category" className='edit_label'>Category:</label>
                                <input type="text" id='category' placeholder='Category' value={details.category?.name} disabled className='edit_input' />
                            </div>
                            <div className="item_input_edit">
                                <label htmlFor="price" className='edit_label'>Price:</label>
                                <input type="text" id='price' placeholder='Price' value={details.price} disabled className='edit_input' />
                            </div>
                        </div>
                        <div className="item_input">
                            <div className="item_input_edit">
                                <label htmlFor="description" className='edit_label'>Description:</label>
                                <textarea id="description" rows="4" cols="50" placeholder='Description' value={details.description} disabled className='edit_textarea'></textarea>
                            </div>
                        </div>
                        <div className="item_button">
                            {button ? <>
                                <button type="button" className="btn_close_edit" onClick={onclickButton}>Hủy</button>
                                <button type="submit" className="btn_save_edit">Save</button> </> :
                                <button type="submit" className="btn_save_edit" onClick={onclickButton}>Edit</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
