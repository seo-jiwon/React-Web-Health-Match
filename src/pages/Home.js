import * as React from 'react';
import Navbar from './Navbar';
import homehealth from './img/health.jpg';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:'2px'}}>
      <img src= {homehealth} alt="home_img" style={{height:'600px'}} />
      </div>
    </div>
  );
}
