import React, { Component } from 'react';
import { connect } from 'react-redux';
import anime from 'animejs';

import './Projects.css';

window.human = false;

class Projects extends Component {

	constructor(props) {
		super(props);

		props.setDisplayUrl();

		this.state = {
						pointerX: 0,
						pointerY: 0,
						numberOfParticules: 30,
						colors: ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'],
						tap: null,
						ctx: null,
						render: null
					 };
	}

	componentDidMount() {

		const { canvas } = this.refs;

		const ctx = canvas.getContext('2d');
		const tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';

		// maybe set canvas size?

		const render = anime({
		  duration: Infinity,
		  update: function() {
		    ctx.clearRect(0, 0, canvas.width, canvas.height);
		  }
		});

		this.setState({ tap, ctx, render }); 

		canvas.width = 1500;
		canvas.height = 1500;
		canvas.style.width = 1500 + 'px';
		canvas.style.height = 1500 + 'px';
	}

	updateCoords(e) {
  		let pointerX = (e.clientX || e.touches[0].clientX)-300;
  		let pointerY = (e.clientY || e.touches[0].clientY)-130;
  		this.setState({ pointerY, pointerX });
  	}

	setParticuleDirection(p) {
	  const angle = anime.random(0, 360) * Math.PI / 180;
	  const value = anime.random(50, 180);
	  const radius = [-1, 1][anime.random(0, 1)] * value;
	  return {
	    x: p.x + radius * Math.cos(angle),
	    y: p.y + radius * Math.sin(angle)
	  }
	}	
	
	createParticule(x,y) {
	  let p = {};
	  const { colors } = this.state;
	  p.x = x;
	  p.y = y;
	  p.color = colors[anime.random(0, colors.length - 1)];
	  p.radius = anime.random(16, 32);
	  p.endPos = this.setParticuleDirection(p);

	  const { ctx } = this.state;

	  p.draw = function() {
	    ctx.beginPath();
	    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
	    ctx.fillStyle = p.color;
	    ctx.fill();
	  }
	  return p;
	}

	createCircle(x,y) {
	  let p = {};
	  p.x = x;
	  p.y = y;
	  p.color = '#FFF';
	  p.radius = 0.1;
	  p.alpha = .5;
	  p.lineWidth = 6;

	  const { ctx } = this.state;

	  p.draw = function() {
	    ctx.globalAlpha = p.alpha;
	    ctx.beginPath();
	    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
	    ctx.lineWidth = p.lineWidth;
	    ctx.strokeStyle = p.color;
	    ctx.stroke();
	    ctx.globalAlpha = 1;
	  }
	  return p;
	}

	renderParticule(anim) {
	  for (var i = 0; i < anim.animatables.length; i++) {
	    anim.animatables[i].target.draw();
	  }
	}

	animateParticules(x, y) {
	  const circle = this.createCircle(x, y);
	  let particules = [];

	  const { numberOfParticules } = this.state;

	  for (var i = 0; i < numberOfParticules; i++) {
	    particules.push(this.createParticule(x, y));
	  }

	  anime.timeline().add({
	    targets: particules,
	    x: function(p) { return p.endPos.x; },
	    y: function(p) { return p.endPos.y; },
	    radius: 0.1,
	    duration: anime.random(1200, 1800),
	    easing: 'easeOutExpo',
	    update: this.renderParticule
	  })
	    .add({
	    targets: circle,
	    radius: anime.random(80, 160),
	    lineWidth: 0,
	    alpha: {
	      value: 0,
	      easing: 'linear',
	      duration: anime.random(600, 800),  
	    },
	    duration: anime.random(1200, 1800),
	    easing: 'easeOutExpo',
	    update: this.renderParticule,
	    offset: 0
	  });
	}

	playAnimation(e) {

		const { render, pointerX, pointerY } = this.state;

		window.human = true;
  		render.play();
  		this.animateParticules(pointerX, pointerY);
	}

	render() {

		return (
	  		<div style={{height: "100%", width: "100%"}} onMouseMove={(e)=>{this.updateCoords(e)}}>
	  			

	  			<div className="projects-button-spine" onClick={(e)=>{this.playAnimation(e)}}>
					<div className="projects-button pb1">
						<div className="projects-button-inner">code</div>
					</div>
					<div className="projects-button pb2">
						<div className="projects-button-inner">web</div>
					</div>
					<div className="projects-button pb3">
						<div className="projects-button-inner">other</div>
					</div>
				</div>

				<canvas width="100%" height="100%" style={{height: "100%", width: "100%"}}
	  					className="fireworks"
	  					ref="canvas"
	  					onClick={(e)=>{this.playAnimation(e)}}>
	  			</canvas>
	  		</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setDisplayUrl: () => {
			dispatch({
				type:"SET-DISPLAY-URL",
				payload: "https://projects.com"
			})
		}
	}
} 

export default connect(()=>({}), mapDispatchToProps)(Projects);
