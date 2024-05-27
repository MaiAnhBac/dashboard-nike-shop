import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout'
import { useParams, Link } from 'react-router-dom';
import { getUsersById } from '../../../data/API'
export default function Edit_User() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null;
    const {id} = useParams()
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
                        <label className="theme">
                            <input type="checkbox" className="input-cb" id="checkbox" />
                            <svg className="ic icon-sun" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="5"></circle><line x1="12" x2="12" y1="1" y2="3"></line><line x1="12" x2="12" y1="21" y2="23"></line><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line><line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line><line x1="1" x2="3" y1="12" y2="12"></line><line x1="21" x2="23" y1="12" y2="12"></line><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line><line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line></svg>
                            <svg className="ic icon-moon" viewBox="0 0 24 24"><path d="m12.3 4.9c.4-.2.6-.7.5-1.1s-.6-.8-1.1-.8c-4.9.1-8.7 4.1-8.7 9 0 5 4 9 9 9 3.8 0 7.1-2.4 8.4-5.9.2-.4 0-.9-.4-1.2s-.9-.2-1.2.1c-1 .9-2.3 1.4-3.7 1.4-3.1 0-5.7-2.5-5.7-5.7 0-1.9 1.1-3.8 2.9-4.8zm2.8 12.5c.5 0 1 0 1.4-.1-1.2 1.1-2.8 1.7-4.5 1.7-3.9 0-7-3.1-7-7 0-2.5 1.4-4.8 3.5-6-.7 1.1-1 2.4-1 3.8-.1 4.2 3.4 7.6 7.6 7.6z"></path></svg>
                        </label>
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
