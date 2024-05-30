import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout'
import { useParams, Link } from 'react-router-dom';
import { getUsersById } from '../../../data/API'
export default function Edit_User() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null;
    const { id } = useParams()
    const [users, setUsers] = useState([])
    const [button, setButton] = useState(false)
    const onclickButton = () => {
        setButton(!button)
    }
    useEffect(() => {
        getUsersById(id)
            .then((user) => {
                setUsers(user);
            })
    }, [])
    return (
        <Layout>
            <div className="topbar">
                <div className="toggle">
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className="search">
                    <h3>EDIT USERS</h3>
                </div>
                <div className="used">
                    <div className="used-left">
                        <div className="used-left-icon">
                            <i className="fa-regular fa-bell"></i>
                            <div className="bell-2">0</div>
                        </div>
                        <div className="used-left-bell">
                            <ul>
                                <li>
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
                    <h3 className="product-title">EDIT USERS</h3>
                    <span className="path">
                        <Link to="/user" className="ecommerce">User</Link>
                        <i className="fa-solid fa-angle-right"></i>
                        <a href="#" className="product-a">Edit Users</a>
                    </span>
                </div>
                <div className="product_details">
                    <div className="details_item">
                        <div className="item_img_edit">
                            <img src={users.avatar} alt="" className='img_details' />
                        </div>
                        <div className="item_input">
                            <div className="item_input_edit">
                                <label htmlFor="id" className='edit_label'>Id:</label>
                                <input type="text" id='id' placeholder='Id' value={users.id} disabled className='edit_input' />
                            </div>
                            <div className="item_input_edit">
                                <label htmlFor="name" className='edit_label'>Name:</label>
                                <input type="text" id='name' placeholder='Name' value={users.name} disabled className='edit_input' />
                            </div>
                        </div>
                        <div className="item_input">
                            <div className="item_input_edit">
                                <label htmlFor="category" className='edit_label'>Email:</label>
                                <input type="text" id='category' placeholder='Category' value={users.email} disabled className='edit_input' />
                            </div>
                            <div className="item_input_edit">
                                <label htmlFor="price" className='edit_label'>Password:</label>
                                <input type="password" id='price' placeholder='Price' value={users.password} disabled className='edit_input' />
                            </div>
                        </div>
                        <div className="item_input">
                            <div className="item_input_edit">
                                <label htmlFor="price" className='edit_label'>Role:</label>
                                <input type="text" id='price' placeholder='Price' value={users.role} disabled className='edit_input' />
                            </div>
                            <div className="item_input_edit">
                                <label htmlFor="img-file" className='edit_label'>Images:</label>
                                <input id="img-file" type="file" className="modal-input edit_input" placeholder="Images" />
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
