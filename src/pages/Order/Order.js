import React from 'react'
import Layout from '../../components/Layout'
import './Order.css'
import { toast } from 'react-toastify';
export default function Order() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null;
    const onClickAction = () => {
        toast.warn("Feature under development!")
    }
    return (
        <Layout>
            <div className="topbar">
                <div className="toggle">
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className="search">
                    <h3>ORDER MANAGEMENT</h3>
                </div>
                <div className="used">
                    <div className="selec-bar">
                        <select className="select-bar" id="language-select">
                            <option value="en">En</option>
                            <option value="vi">Vi</option>
                        </select>
                    </div>
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
                    <h3 className="product-title">ORDER</h3>
                    <span className="path">
                        <a href="#" className="ecommerce">Ecommerce</a>
                        <i className="fa-solid fa-angle-right"></i>
                        <a href="#" className="product-a">Order</a>
                    </span>
                </div>
                <div className="filter">
                    <div className="filter-brg">
                        <div className="filter-left">
                            <select name="selName">
                                <option hidden>Select Order</option>
                                <option hidden>--------</option>
                            </select>
                        </div>
                        <div className="filter-right">
                            <div className="search">
                                <div className="group">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                                        <g>
                                            <path
                                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                            ></path>
                                        </g>
                                    </svg>
                                    <input className="input" type="search" placeholder="Search order" />
                                </div>
                            </div>
                            <div className="">
                                <button className='refresh' ><i className="fa-solid fa-arrows-rotate"></i></button>
                            </div>
                            <div className="add">
                                <a className="add-sv" ><i className="fa-solid fa-circle-plus"></i>Add Order</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter-mid">
                    <div className="table">
                        <table className="content-table">
                            <thead className="td">
                                <tr>
                                    <th>Code orders</th>
                                    <th>Customer</th>
                                    <th>Order date</th>
                                    <th>Delivery date</th>
                                    <th>Place of delivery</th>
                                    <th>Payments</th>
                                    <th>Total money</th>
                                    <th>Payment status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="list">
                                <tr>
                                    <td className="stt">1</td>
                                    <td className="customer">Phan Tú Quốc </td>
                                    <td className="order_date">05/27/2024</td>
                                    <td className="delivery_date">06/02/2024</td>
                                    <td className="place_of_delivery">TP HCM</td>
                                    <td className="payments"><span className='payments_items'>Cash</span></td>
                                    <td className="total_money">$500</td>
                                    <td className="payments_status"><span className='status_delivered'>Delivered</span></td>
                                    <td className="feature">
                                        <button className="btn edit" title="Chỉnh sửa" onClick={onClickAction}><i className="fa-solid fa-pencil"></i></button>
                                        <button className="btn close" title="Xóa" onClick={onClickAction}><i className="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="stt">2</td>
                                    <td className="customer">Nguyễn Quang Mạnh</td>
                                    <td className="order_date">05/23/2024</td>
                                    <td className="delivery_date">06/01/2024</td>
                                    <td className="place_of_delivery">TP Hà Nội</td>
                                    <td className="payments"><span className='payments_items'>Cash</span></td>
                                    <td className="total_money">$1500</td>
                                    <td className="payments_status"><span className='status_delivered'>Delivered</span></td>
                                    <td className="feature">
                                        <button className="btn edit" title="Chỉnh sửa" onClick={onClickAction}><i className="fa-solid fa-pencil"></i></button>
                                        <button className="btn close" title="Xóa" onClick={onClickAction}><i className="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="stt">3</td>
                                    <td className="customer">Ngô Gia Bảo</td>
                                    <td className="order_date">05/21/2024</td>
                                    <td className="delivery_date">05/27/2024</td>
                                    <td className="place_of_delivery">TP HCM</td>
                                    <td className="payments"><span className='payments_items'>Ship COD</span></td>
                                    <td className="total_money">$700</td>
                                    <td className="payments_status"><span className='status_delivering'>Delivering</span></td>
                                    <td className="feature">
                                        <button className="btn edit" title="Chỉnh sửa" onClick={onClickAction}><i className="fa-solid fa-pencil"></i></button>
                                        <button className="btn close" title="Xóa" onClick={onClickAction}><i className="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="stt">4</td>
                                    <td className="customer">Vũ Gia Khiêm</td>
                                    <td className="order_date">05/21/2024</td>
                                    <td className="delivery_date">05/27/2024</td>
                                    <td className="place_of_delivery">TP HCM</td>
                                    <td className="payments"><span className='payments_items'>Transfer</span></td>
                                    <td className="total_money">$300</td>
                                    <td className="payments_status"><span className='status_no_process'>No process</span></td>
                                    <td className="feature">
                                        <button className="btn edit" title="Chỉnh sửa" onClick={onClickAction}><i className="fa-solid fa-pencil"></i></button>
                                        <button className="btn close" title="Xóa" onClick={onClickAction}><i className="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="bottom">
                            <div className="total">
                                <span className="total-page">Showing 4 of 4 Results</span>
                            </div>
                            <div className="pages">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
