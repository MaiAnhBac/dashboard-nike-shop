import React, { useEffect, useState } from 'react'
import './Category.css';
import Layout from '../../components/Layout'
import '../style/Responsive.css'
import { getAllCategory, getCatesByCate, deleteCategory } from '../../data/API'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Category() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [selectCate, setSelectCate] = useState()
    const onClickAction = () => {
        toast.warn("Feature under development!")
    }
    const onChangeSelect = (e) => {
        setSelectCate(e.target.value)
    }
    const onDeleteCategory = (id) => {
        deleteCategory(id)
            .then(() => {
                toast.success("Delete category successfully!")
                getAllCategory()
                    .then(category => setCategories(category))
            })
            .catch(error => {
                if (error.message.includes('400')) {
                    toast.error("Category deletion failed!");
                } else {
                    toast.error("Another error has occurred!");
                }
            });
    }
    const onClickRefresh = (e) => {
        e.preventDefault();
        getAllCategory()
            .then(category => {
                setCategories(category)
                toast.success("Catalog reloaded!")
            })
    }
    useEffect(() => {
        getAllCategory()
            .then(category => setCategories(category))
    }, [])
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('user')) || null;
        if (userLogin) {
            navigate('/category')
        } else {
            navigate('/')
        }
    }, [navigate]);
    return (
        <Layout>
            <div className="bottombar">
                <div className="product-item-1">
                    <h3 className="product-title">CATEGORY</h3>
                    <span className="path">
                        <a href="#" className="ecommerce">Ecommerce</a>
                        <i className="fa-solid fa-angle-right"></i>
                        <a href="#" className="product-a">Category</a>
                    </span>
                </div>
                <div className="filter">
                    <div className="filter-brg">
                        <div className="filter-left">
                            <select name="selName" value={selectCate} onChange={onChangeSelect}>
                                <option hidden>Select Category</option>
                                {categories.map(cate => (
                                    <option key={cate.id} value={cate.id}>{cate.name}</option>
                                ))}
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
                                    <input className="input" type="search" placeholder="Search category" />
                                </div>
                            </div>
                            <div className="">
                                <button className='refresh' onClick={onClickRefresh}><i className="fa-solid fa-arrows-rotate"></i></button>
                            </div>
                            <div className="add">
                                <a href="" className="add-sv"><i className="fa-solid fa-plus"></i>New Category</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter-mid">
                    <div className="table">
                        <table className="content-table">
                            <thead className="td">
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Date created</th>
                                    <th>Published</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="list">
                                {categories.map(cate => (
                                    <tr key={cate.id}>
                                        <td className="stt">{cate.id}</td>
                                        <td className="name">{cate.name}</td>
                                        <td className="img">
                                            <img src={cate.image} width={30} height={30} alt="" />
                                        </td>
                                        <td className="sex">{cate.creationAt.split('T')[0]}</td>
                                        <td className="date">{cate.updatedAt.split('T')[0]}</td>
                                        <td className="feature">
                                            <button className="btn edit" title="Chỉnh sửa" onClick={onClickAction}><i className="fa-solid fa-pencil"></i></button>
                                            <button className="btn close" title="Xóa" onClick={() => onDeleteCategory(cate.id)}><i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <div className="bottom">
                            <div className="total">
                                <span className="total-page">Showing {categories.length} of {categories.length} Results</span>
                            </div>
                            <div className="pages">
                                <a href="" className="pages-1">1</a>
                                <a href="" className="pages-1">2</a>
                                <a href="" className="pages-1">3</a>
                                <a href="" className="pages-1">4</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
