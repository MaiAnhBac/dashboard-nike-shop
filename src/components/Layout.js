import React from 'react';
import './Layout.css';
import Navbar from './Navbar'
import Footer from './Footer';
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
        <Footer />
      </main>
      
    </>
  )
}
