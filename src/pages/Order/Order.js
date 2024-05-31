import React, {useEffect} from 'react'
import Layout from '../../components/Layout'
import './Order.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Order() {
    const navigate = useNavigate();
    const onClickAction = () => {
        toast.warn("Feature under development!")
    }
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('user')) || null;
        if (userLogin && userLogin.role === 'admin') {
            navigate('/order')
        } else {
            navigate('/')
        }
    }, [navigate]);
    return (
        <Layout>
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
                                <a className="add-sv" ><i className="fa-solid fa-plus"></i>New Order</a>
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
