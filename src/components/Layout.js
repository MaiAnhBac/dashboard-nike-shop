import React from 'react';
import './Layout.css';
import './Dark-mode.css';
import Navbar from './Navbar'
import Footer from './Footer';
export default function Layout({ children }) {
  const userLogin = JSON.parse(localStorage.getItem('user')) || null;
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
            <div className="used-left">
              <div className="used-left-icon">
                <i className="fa-regular fa-bell"></i>
                <div className="bell-2">0</div>
              </div>
              <div className="used-left-bell">
                <ul>
                  <li className='bell-brg'>
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
        {children}
        <Footer />
      </main>

    </>
  )
}
