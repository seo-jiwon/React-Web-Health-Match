import React from 'react';
import Navbar from './Navbar';
import homehealth from './img/health.jpg';
import Footer from './Footer';
import './Home.css';


export default function Home() {
  return (
    <body className="body">
      <div className="footer_fix">
        <Navbar />
        <div className="homeHealth">
          <img src= {homehealth} alt="home_img" style={{height:'600px'}} />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </body>
  );
}
