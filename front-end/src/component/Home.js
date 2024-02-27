import React from "react";
import Video from './e-comv.mp4';

const Home = ()=>{
    return(
        <div className="home-box">
            <video autoPlay muted loop className="back-vid">
        <source src={Video} type="video/mp4" />
      </video>
        </div>  
    )
}

export default Home;