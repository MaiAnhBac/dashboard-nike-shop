import React from 'react';
import './Layout.css';
import Navbar from './Navbar'
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
        {/* <footer>
          <div class="footer-item">
            <div class="footer-item-row">
              <span class="item-row-left">2024 © Steex.</span>
              <span class="item-row-right">Design & Develop by Themesbrand</span>
            </div>
          </div>
        </footer> */}
      </main>
    </>
  )
}
