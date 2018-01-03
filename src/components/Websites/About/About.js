import React from 'react';
import { Image } from 'semantic-ui-react'
import picture from '../assets/images/profile.jpg';

import './About.css';

const About = () => (
  <div style={{height: "100%", width: "100%", background:"#FFFFFF"}}>
    <div id="text-container">
      <div className="name-header-text">Zachary Kirby</div>
      <div className="name-divider"></div>
      <div className="name-lower-text">Film and Computer Science Major at UC Berkeley</div>
      <Image src={ picture } size='medium' circular id="profile-image"/>
    </div>
  </div>
)	


/* 
  Style-kit
  -- the styles to be sent
  to the window content
*/

const styleKit = {
  rootBG: "",
  contentBG: "white",
  tabStyle: {
    fontColor: "",
    BG: "",
    exitColor: ""
  },
  searchStyle: {
    BG: "",
    fontColor: "",
    searchBG: ""
  }
}

export default About;
