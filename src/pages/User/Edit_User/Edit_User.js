import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUsersById } from '../../../data/API'
export default function Edit_User() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null;
    const { id } = useParams()
    const navigate = useNavigate();
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
    useEffect(() => {
        if (!userLogin) {
            navigate('/')
        }
    }, [navigate]);
    return (
        <Layout>
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
