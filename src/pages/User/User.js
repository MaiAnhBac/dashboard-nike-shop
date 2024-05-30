import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getAllUser, deleteUser, postAddNewUser } from '../../data/API'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import './User.css'
export default function User() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null;
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [user, setUser] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [images, setImages] = useState()
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleted, setDeleted] = useState(null)
    const onAddUser = () => {
        setActive(!active)
    }
    const onClickRefresh = (e) => {
        e.preventDefault();
        getAllUser()
            .then((user) => {
                setUser(user);
                toast.success("User reloaded!")
            })
    }
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeRole = (e) => {
        setRole(e.target.value)
    }
    const onSubmitUser = async (e) => {
        setLoading(true)
        setTimeout(async () => {
            await postAddNewUser(name, email, images, password, role)
                .then(() => {
                    toast.success("User added successfully")
                    setActive(false)
                    setName("");
                    setEmail("");
                    setImages([]);
                    setPassword("");
                    setRole("role");
                })
                .catch((Error) => {
                    toast.error("Adding users failed")
                })
            setLoading(false)
        }, 2000)
    }
    const handleChangeAvatar = (e) => {
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
                        setImages(res?.data?.location)
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
    const onDeleteUser = (id) => {
        setConfirmDelete(true)
        setDeleted(id)
    }
    const onConfirmDelete = () => {
        if (deleted != null) {
            deleteUser(deleted)
                .then(() => {
                    toast.success("Delete user successfully");
                    getAllUser()
                        .then((user) => {
                            setUser(user);
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
    useEffect(() => {
        getAllUser()
            .then((user) => {
                setUser(user);
            })
            .catch((error) => {
                toast.error("Error getting list of users");
            });
    }, [])
    useEffect(() => {
        if (userLogin && userLogin.role === 'admin') {
            navigate('/user')
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
                    <h3>USER MANAGEMENT</h3>
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
                            <img src={userLogin?.avatar} alt="" className='img_user' />
                        </div>
                        <div className="used_right_name">
                            <span className="welcome" id="welcome">{userLogin?.name}</span>
                            <p className="role">{userLogin?.role}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottombar">
                <div className="product-item-1">
                    <h3 className="product-title">USER</h3>
                    <span className="path">
                        <a href="#" className="ecommerce">Ecommerce</a>
                        <i className="fa-solid fa-angle-right"></i>
                        <a href="#" className="product-a">User</a>
                    </span>
                </div>
                <div className="filter">
                    <div className="filter-brg">
                        <div className="filter-left">
                            <select name="selName">
                                <option hidden>Select User</option>
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
                                    <input className="input" type="search" placeholder="Search user" />
                                </div>
                            </div>
                            <div className="">
                                <button className='refresh' onClick={onClickRefresh}><i className="fa-solid fa-arrows-rotate"></i></button>
                            </div>
                            <div className="add">
                                <a className="add-sv" onClick={onAddUser}><i className="fa-solid fa-circle-plus"></i>Add User</a>
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
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Date created</th>
                                    <th>Published</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="list">
                                {user.map((users) => (
                                    <tr key={users.id}>
                                        <td className="stt">{users.id}</td>
                                        <td className="img">
                                            <img src={users.avatar} width={30} height={30} alt="" />
                                        </td>
                                        <td className="name">{users.name}</td>
                                        <td className="email">{users.email}</td>
                                        <td className="password">{users.password}</td>
                                        <td className="password">{users.role}</td>
                                        <td className="sex">{users.creationAt.split('T')[0]}</td>
                                        <td className="date">{users.updatedAt.split('T')[0]}</td>
                                        <td className="feature">
                                            <Link to={`/edit_uses/${users.id}`}>
                                                <button className="btn edit" title="Chỉnh sửa"><i className="fa-solid fa-pencil"></i></button>
                                            </Link>
                                            <button className="btn close" title="Xóa" onClick={() => onDeleteUser(users.id)}><i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                        <div className="bottom">
                            <div className="total">
                                <span className="total-page">Showing {user.length} of {user.length} Results</span>
                            </div>
                            <div className="pages">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={active ? "edit-modal js-modal open" : "edit-modal js-modal"}>
                <div className="modal-container">
                    <div className="modal-close js-modal-close" onClick={onAddUser}><i className="fa-solid fa-xmark"></i></div>
                    <header className="modal-header">Add User</header>
                    <div className="modal-body">
                        <form action="" onSubmit={handleSubmit(onSubmitUser)}>
                            <label htmlFor="name" className="modal-label">
                                Name
                            </label>
                            <input {...register('name', { required: true })} id="name" type="text" className="modal-input" placeholder="Name" value={name || ''} onChange={onChangeName} />
                            {errors.name && <p className='notification'>Name is required.</p>}
                            <label htmlFor="type" className="modal-label">
                                Email
                            </label>
                            <input {...register('email', { required: true })} id="type" type="email" className="modal-input" placeholder="Email" value={email || ''} onChange={onChangeEmail} />
                            {errors.email && <p className='notification'>Email is required.</p>}
                            <label htmlFor="status" className="modal-label">
                                Password
                            </label>
                            <input {...register('password', { required: true })} id="password" type="password" className="modal-input" placeholder="Password" value={password || ''} onChange={onChangePassword} />
                            {errors.password && <p className='notification'>Password is required.</p>}
                            <label htmlFor="status" className="modal-label">
                                Role
                            </label>
                            <select required className='modal-select' name="selName" value={role} onChange={onChangeRole} >
                                <option value="role" hidden>Role</option>
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                            <label htmlFor="status" className="modal-label">
                                Images
                            </label>
                            <input {...register('file', { required: true })} id="img-file" type="file" className="modal-input" placeholder="Images" onChange={handleChangeAvatar} />
                            {errors.file && <p className='notification'>File is required.</p>}
                            <div className='btn_add'>
                                <button type='button' className='btn_close' onClick={onAddUser}>Hủy</button>
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
                        <h3 className="delete-h3">Delete 1 item from all your users</h3>
                        <p className="delete-p">This item will be removed from your User Management</p>
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
