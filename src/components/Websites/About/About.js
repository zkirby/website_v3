import React from 'react';
import { Image } from 'semantic-ui-react'
import picture from '../assets/images/profile.jpg';

import './About.css';

const About = () => (
  <div style={{height: "100%", width: "100%", background:"#FFFFFF"}}>
    <div id="about-header-container">
	    <div id="text-container">
	      <div className="name-header-text">Zachary Kirby</div>
	      <div className="name-divider"></div>
	      <div className="name-lower-text">Film and Computer Science Major at UC Berkeley</div>
	      <Image src={ picture } size='medium' circular id="profile-image"/>
	    </div>
    </div>
    <div id="about-link-container">
    	<div className="link-container">
    		<div className="link">about</div>
    		<div className="link">info</div>
    		<div className="link">link3</div>
    		<div className="link">link4</div>
    		<div className="link">link5</div>
    	</div>
    </div>
  </div>
)	

export default About;
