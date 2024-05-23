import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import './Product.css';
import '../style/Responsive.css'
import { getAllProducts, getAllCategory, getProductsByCate, getSearchProduct, deleteProduct, createNewProduct, getProductsByLimit } from '../../data/API'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { color } from 'chart.js/helpers';
import { pink } from '@mui/material/colors';
export default function Product() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [data, setData] = useState([])
    const [all, setAll] = useState()
    const [category, setCategory] = useState([])
    const [select, setSelect] = useState('');
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [selected, setSelected] = useState(0)
    const [imageProduct, setImageProduct] = useState('')
    const [page, setPage] = useState(1)
    const limit = 10;
    const [count, setCount] = useState(5)
    const [lowHight, setLowHight] = useState('default')
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false)
    const onAddProduct = (e) => {
        setActive(!active)
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const onChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangeSelected = (e) => {
        setSelected(e.target.value)
    }
    const handleChangeImage = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        async function uploadAvatar() {
            try {
                await axios
                    .post("https://api.escuelajs.co/api/v1/files/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        setImageProduct([res?.data?.location])
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
            catch (error) {
                console.log(error);
            }
        }
        uploadAvatar();
    }
    const onSubmitProduct = async () => {
        setLoading(true)
        setTimeout(async () => {
            await createNewProduct(title, price, description, selected, imageProduct)
                .then(() => {
                    toast.success("Added product successfully")
                    setActive(false)
                    setTitle('')
                    setDescription('')
                    setPrice('')
                    setSelected(0)
                })
                .catch((error) => {
                    toast.error("Adding failed products")
                })
            setLoading(false)
        }, 2000)

    }
    const onClickRefresh = (e) => {
        e.preventDefault();
        getAllProducts()
            .then((data) => {
                setData(data);
                toast.success("Product reloaded!")
            })
    }
    const handleOffset = (event, page) => {
        const offset = limit * (page - 1)
        setPage(page)
        getProductsByLimit(offset, limit)
            .then((offset) => {
                setData(offset)
            })
    }
    const onDeleteProduct = (id) => {
        deleteProduct(id)
            .then(() => {
                toast.success("Product deletion successful")
                getAllProducts()
                    .then((data) => {
                        setData(data);
                    })
            })
            .catch(() => {
                toast.error("Delete failed product")
            })
    }
    const onChangeLowHight = (e) => {
        setLowHight(e.target.value);
        sortData(e.target.value)
    }
    const sortData = (option) => {
        const sortedData = data.sort((a, b) => {
            if (option === 'low-to-high') {
                return a.price - b.price;
            }
            else if (option === 'high-to-low') {
                return b.price - a.price;
            }
            else {
                return getAllProducts()
                    .then((data) => {
                        setData(data);
                    })
            }
        });
    }
    const onChangeSearchProduct = (e) => {
        setSearch(e.target.value)
        getSearchProduct(e.target.value)
            .then((search) => {
                setData(search);
            })
    }
    const onChangeSelect = (e) => {
        setSelect(e.target.value);
        getProductsByCate(e.target.value)
            .then((cate) => {
                setData(cate);
            })
    }
    useEffect(() => {
        getAllProducts()
            .then((data) => {
                const datas = Math.ceil(data.length / limit)
                setCount(datas);
                setAll(data.length)
            })
        getProductsByLimit(0, limit)
            .then((offset) => {
                setData(offset)
            })
        getAllCategory()
            .then((category) => {
                setCategory(category)
            })
    }, [])
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('user')) || null;
        if (userLogin) {
            navigate('/product')
        } else {
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
                    <h3>PRODUCT MANAGEMENT</h3>
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
                    <div className="used-right">
                        <label htmlFor="" data-en="Hi" data-vi="Chào">Hi: </label>
                        <span className="welcome">Admin</span>
                    </div>
                </div>
            </div>
            <div className="bottombar">
                <div className="product-item-1">
                    <h3 className="product-title">PRODUCTS</h3>
                    <span className="path">
                        <a href="#" className="ecommerce">Ecommerce</a>
                        <i className="fa-solid fa-angle-right"></i>
                        <a href="#" className="product-a">Products</a>
                    </span>
                </div>
                <div className="filter">
                    <div className="filter-brg">
                        <div className="filter-left">
                            <select name="selName" value={select} onChange={onChangeSelect}>
                                <option hidden>Select Category</option>
                                {category.map((cate) => (
                                    <option key={cate.id} value={cate.id}>{cate.name}</option>
                                ))}
                            </select>
                            <select className='select-low-high' name="selName" value={lowHight} onChange={onChangeLowHight}>
                                <option value="default">Default</option>
                                <option value="low-to-high">Low to High</option>
                                <option value="high-to-low">High to Low</option>
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
                                    <input className="input" type="search" placeholder="Search product" value={search} onChange={onChangeSearchProduct} />
                                </div>
                            </div>
                            <div >
                                <button className="refresh" onClick={onClickRefresh}><i className="fa-solid fa-arrows-rotate"></i></button>
                            </div>
                            <div className="add">
                                <a className="add-sv" onClick={onAddProduct}><i className="fa-solid fa-circle-plus"></i>Add Product</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter-mid">
                    <div className="table">
                        <table className="content-table">
                            <thead className="td">
                                <tr>
                                    <th>Code</th>
                                    <th>Images</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Price</th>
                                    <th>Published</th>
                                    <th>Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="list">
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td className="stt">{item.id}</td>
                                        <td className='images'>
                                            <img src={item.images[0]} alt="" className='img-pro' />
                                        </td>
                                        <td className="student-code">{item.title}</td>
                                        <td className="name">{item.category.name}</td>
                                        <td className="sex">30</td>
                                        <td className="date">{item.price}$</td>
                                        <td className="date">{item.updatedAt}</td>
                                        <td className="status">
                                            <span className="status-online">
                                                <i className="fa-solid fa-star"></i>
                                                4.9
                                            </span>
                                        </td>
                                        <td className="feature">
                                            <button className="btn edit" title="Chỉnh sửa"><i className="fa-solid fa-pencil"></i></button>
                                            <button className="btn close" title="Xóa" onClick={() => onDeleteProduct(item.id)}><i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <div className="bottom">
                            <div className="total">
                                <span className="total-page">Showing {data.length} of {all} Results</span>
                            </div>
                            <div className="pages">
                                <Stack spacing={2}>
                                    <Pagination count={count} page={page} onChange={handleOffset} variant="outlined" shape="rounded" />
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={active ? "edit-modal js-modal open" : "edit-modal js-modal"}>
                <div className="modal-container">
                    <div className="modal-close js-modal-close" onClick={onAddProduct}><i className="fa-solid fa-xmark"></i></div>
                    <header className="modal-header">Add Product</header>
                    <div className="modal-body">
                        <form action="" onSubmit={handleSubmit(onSubmitProduct)}>
                            <label htmlFor="name" className="modal-label">
                                Title
                            </label>
                            <input {...register('title', { required: true })} id="name" type="text" className="modal-input" placeholder="Title" value={title || ''} onChange={onChangeTitle} />
                            {errors.title && <p className='notification'>Name is required.</p>}
                            <label htmlFor="type" className="modal-label">
                                Description
                            </label>
                            <input {...register('description', { required: true })} id="type" type="text" className="modal-input" placeholder="Description" value={description || ''} onChange={onChangeDescription} />
                            {errors.description && <p className='notification'>Description is required.</p>}
                            <label htmlFor="status" className="modal-label">
                                Category
                            </label>
                            <select name="select" className='modal-select' value={selected} onChange={onChangeSelected}>
                                <option hidden value={0} >Select Category</option>
                                {category.map((cates) => (
                                    <option key={cates.id} value={cates.id}>{cates.name}</option>
                                ))}
                            </select>

                            <label htmlFor="status" className="modal-label">
                                Price
                            </label>
                            <input {...register('price', { required: true })} id="price" type="text" className="modal-input" placeholder="Price" value={price || ''} onChange={onChangePrice} />
                            {errors.price && <p className='notification'>Price is required.</p>}
                            <label htmlFor="status" className="modal-label">
                                Images
                            </label>
                            <input {...register('file', { required: true })} id="img-file" type="file" className="modal-input" placeholder="Images" onChange={handleChangeImage} />
                            {errors.file && <p className='notification'>File is required.</p>}
                            <div className='btn_add'>
                                <button type='button' className='btn_close' onClick={onAddProduct}>Hủy</button>
                                <button type='submit' className="loader__btn mt">
                                    {loading ? <div className="loader"></div> : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
