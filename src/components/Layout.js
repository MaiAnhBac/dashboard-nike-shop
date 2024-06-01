import React, { useState } from 'react';
import './Layout.css';
import './Dark-mode.css';
import Navbar from './Navbar'
import Footer from './Footer';
const notification = [
  {
    id: 1,
    notification: "Mới cập nhật trang Product!",
    address: '/product',
    updateAt: 'about 4 hours ago'
  },
  {
    id: 2,
    notification: "Mới cập nhật trang Dashboard!",
    address: '/home',
    updateAt: '1 day ago'
  },
  {
    id: 3,
    notification: "Mới cập nhật images của trang User!",
    address: '/user',
    updateAt: 'about 1 hours ago'
  },
  {
    id: 4,
    notification: "Mới cập nhật images của trang User!",
    address: '/user',
    updateAt: 'about 2 hours ago'
  },
  {
    id: 5,
    notification: "Mới cập nhật thêm hộp thư thoại xác nhận Delete trang Product!",
    address: '/product',
    updateAt: 'about 7 hours ago'
  },
  {
    id: 6,
    notification: "Mới cập nhật thêm hộp thư thoại xác nhận Delete trang User!",
    address: '/user',
    updateAt: '1 day ago'
  },
  {
    id: 7,
    notification: "Mới cập nhật biểu đồ Pie của trang Product!",
    address: '/product',
    updateAt: '1 day ago'
  },
]
export default function Layout({ children }) {
  const userLogin = JSON.parse(localStorage.getItem('user')) || null;
  const [bell, setBell] = useState(false);
  const onClickActiveBell = () => {
    setBell(!bell)
  }
  return (
    <>
      <Navbar />
      <main>
        <div className="topbar">
          <div className="toggle">
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="search">
            {/* <h3 data-en="OVERVIEW" data-vi="TỔNG QUAN"></h3> */}
          </div>
          <div className="used">
            <div className="used-left" onClick={onClickActiveBell}>
              <div className="used-left-icon">
                <i className="fa-regular fa-bell"></i>
                <div className="bell-2">{notification.length}</div>
              </div>
              <div className={bell ? "used-left-bell bell-active" : "used-left-bell"}>
                <ul>
                  <li className='bell-brg'>
                    <span className='bell-top'>Notification</span>
                    <a href="" className='bell-view-all'>View All</a>
                  </li>
                  {notification.map((item) => (
                    <li className='bell-item' key={item.id}>
                      <a href={item.address} className='bell-notification'>{item.notification}</a>
                      <p className='bell-updateAt'><i className="fa-regular fa-clock"></i>{item.updateAt}</p>
                    </li>
                  ))}

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
        {children}
        <Footer />
      </main>

    </>
  )
}
