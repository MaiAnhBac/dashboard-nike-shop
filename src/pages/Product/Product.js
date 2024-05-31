import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import './Product.css';
import '../style/Responsive.css'
import { getAllProducts, getAllCategory, getProductsByCate, getSearchProduct, deleteProduct, createNewProduct, getProductsByLimit } from '../../data/API'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function Product() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null;
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
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleted, setDeleted] = useState(null)
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
        getProductsByLimit(0, limit)
            .then((offset) => {
                setData(offset);
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
        setConfirmDelete(true)
        setDeleted(id)
    }
    const onConfirmDelete = () => {
        if (deleted != null) {
            deleteProduct(deleted)
                .then(() => {
                    toast.success("Product deletion successful")
                    getProductsByLimit(0, limit)
                        .then((offset) => {
                            setData(offset)
                            setPage(1)
                        })
                })
                .catch(error => {
                    if (error.message.includes('401')) {
                        toast.error("User deletion failed!");
                    } else {
                        toast.error("Another error has occurred");
                    }
                })
        }
        setConfirmDelete(false)
        setDeleted(null)

    }
    const onConfirmCancel = () => {
        setConfirmDelete(false)
        setDeleted(null)
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
        if (userLogin) {
            navigate('/product')
        } else {
            navigate('/')
        }
    }, [navigate]);
    return (
        <Layout>
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
                                    <th>Description</th>
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
                                        <td className="description">{item.description}</td>
                                        <td className="name">{item.category.name}</td>
                                        <td className="sex">30</td>
                                        <td className="date">{item.price}$</td>
                                        <td className="date">{item.updatedAt.split('T')[0]}</td>
                                        <td className="status">
                                            <span className="status-online">
                                                <i className="fa-solid fa-star"></i>
                                                4.9
                                            </span>
                                        </td>
                                        <td className="feature">
                                            <Link to={`/product_details/${item.id}`}>
                                                <button className="btn edit" title="Chỉnh sửa"><i className="fa-solid fa-pencil"></i></button>
                                            </Link>
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
                                <button type='submit' className="loader__btn mt" disabled={loading}>
                                    {loading ? <div className="loader"></div> : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={confirmDelete ? "confirm-delete delete-open" : "confirm-delete"}>
                <div className="delete-container ">
                    <div className="detete-icon">
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                    <div className="delete-title">
                        <h3 className="delete-h3">Delete 1 item from all your products</h3>
                        <p className="delete-p">This item will be removed from your Product Management</p>
                    </div>
                    <div className="delete-button">
                        <button type="button" className='delete-btn' onClick={onConfirmCancel}>Cancel</button>
                        <button type="button" className='delete-btn de-red' onClick={onConfirmDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
