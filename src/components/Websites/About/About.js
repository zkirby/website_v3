import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { Card, Popup } from 'semantic-ui-react';

// SVGs
import codefightssvg from './SVGs/codefights';
import facebooksvg   from './SVGs/facebook.js';
import githubsvg     from './SVGs/github.js';
import linkedinsvg   from './SVGs/linkedin.js';
import mediumsvg     from './SVGs/medium.js';


import './About.css';

class About extends Component {

    constructor(props) {
        super(props);
        props.setDisplayUrl("https://about.com");   
        this.state = {
            opacities: ['1', '0.6', '0.6', '0.6']
        }
    }

    setActive(url, index) {
        this.props.setDisplayUrl(url);
        let opacities = ['0.6', '0.6', '0.6', '0.6'];
        opacities[index] = '1';

        this.setState({ opacities });
    }

    render() {

        const { opacities } = this.state

        return (
                <MemoryRouter>
                    <div style={{height: "100%", width: "100%", background: "white", color:"#292F36"}}>
                        <div className="about-nav-spine">
                            <div className="about-nav-item" 
                                 onClick={ ()=> {this.setActive("https://about.com", 0)} }
                                 style={{opacity: opacities[0]}}>
                                <NavLink to="/">home</NavLink>
                            </div>
                            <div className="about-nav-item" 
                                 onClick={ ()=> {this.setActive("https://about.com/info/", 1)} }
                                 style={{opacity: opacities[1]}}>
                                <NavLink to="/info">about</NavLink>
                            </div>
                            <div className="about-nav-item" 
                                 onClick={ ()=> {this.setActive("https://about.com/tidbits/", 2)} }
                                 style={{opacity: opacities[2]}}>
                                <NavLink to="/tidbits">tid-bits</NavLink>
                            </div>
                            <div className="about-nav-item" 
                                 onClick={ ()=> {this.setActive("https://about.com/contact/", 3)} }
                                 style={{opacity: opacities[3]}}>
                                <NavLink to="/contact">contact</NavLink>
                            </div>
                        </div>
                        <Route exact path="/" component={HomeSub} />
                        <Route path="/info" component={AboutSub} />
                        <Route path="/tidbits" component={TidbitsSub} />
                        <Route path="/contact" component={ContactSub} />
                    </div>
                </MemoryRouter>
        )
    }
}

/* Sub-sites */
const HomeSub = () => (
        <div>
            <Particles 
                      params={{
                            particles: {
                                line_linked: {
                                    shadow: {
                                        enable: true,
                                        color: "#4ECDC4",
                                        blur: 5
                                    }
                                }
                            }
                        }}
                    />
            <div id="about-header-spine">
                <div className="about-header-large-text">Zachary Kirby</div>
                <div className="about-header-sub-text">
                    <div className="about-bullet-text bullet-1">developer</div> 
                    <div className="about-bullet"></div> 
                    <div className="about-bullet-text bullet-2">student</div> 
                    <div className="about-bullet"></div>
                    <div className="about-bullet-text bullet-3">film enthusiast</div>
                </div>
            </div>
        </div>
);

const AboutSub = () => (
    <div className="aboutsub-body">
        <div className="aboutsub-intro-text">Hi there! My name is Zach, I'm a student at <div className="aboutsub-highlight highlight-sub">UC Berkeley</div> studying Computer Science and Film</div>
        <div className="aboutsub-intro-text">I'm passionate about <div className="aboutsub-highlight highlight-sub-1">frontend</div> development, entrepreneurship, and educational technology</div>
        <div className="aboutsub-upto-header-text">What I'm up to:</div>
        <div className="aboutsub-upto-spine">
            <a href="https://calhacks.io/" target="_blank" rel="noopener noreferrer" ><div className="aboutsub-upto-item">Executive Director of Cal Hacks</div></a>
            <a href="http://wdd.io/" target="_blank" rel="noopener noreferrer"><div className="aboutsub-upto-item">Advisor & Lecturer for The Web Design DeCal</div></a>
            <a href="https://www.berkeleyanova.org/anovahacks/" target="_blank" rel="noopener noreferrer"><div className="aboutsub-upto-item">ANova Hacks Organizer</div></a>
            <a href="http://www.kairoshq.com/" target="_blank" rel="noopener noreferrer"><div className="aboutsub-upto-item">Karios Fellow</div></a>
            <a href="https://www.accel.com/" target="_blank" rel="noopener noreferrer"><div className="aboutsub-upto-item">Accel Scholar</div></a>
        </div>
    </div>
);

const TidbitsSub = () => {

    return (
        <div>
            <div id="tid-bits-header">Here are 7 tid-bits for you to get to know me a little better</div>
            <Card.Group className="tid-bits-group">
                <Card className="tid-bits-fade-1">
                  <Card.Content>
                    <Card.Header textAlign="left">Tid Bit 1</Card.Header>
                   <Card.Description textAlign="left">I was a competitive gymnast for 12 years. I competed in both Texas and California and was even the state champion of parallel bars in California. </Card.Description>
                  </Card.Content>
                </Card>

                <Card className="tid-bits-fade-1">
                  <Card.Content>
                    <Card.Header textAlign="left">Tid Bit 2</Card.Header>
                    <Card.Description textAlign="left">I’m a huge fan of rap music. Some of my favorite artists/groups include Anime, Kendrick Lamar, J Cole, Lil Skies, Golf Wang (especially Tyler and Earl), Mac Miller, and Eminem.</Card.Description>
                  </Card.Content>
                </Card>

                <Card className="tid-bits-fade-2">
                  <Card.Content>
                    <Card.Header textAlign="left">Tid Bit 3</Card.Header>
                    <Card.Description textAlign="left">Before I take any CS midterm or final, I watch <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=IlXwTxpC6u0" style={{display:"inline-block"}}>this</a> clip from the social network. The clip is my favorite example of well written dialog and I like to think the hard to follow fast-paced conversation helps me warm up before the test.</Card.Description>
                  </Card.Content>
                </Card>

                <Card className="tid-bits-fade-2">
                  <Card.Content>
                    <Card.Header textAlign="left">Tid Bit 4</Card.Header>
                    <Card.Description textAlign="left">I’ve lived in NorCal, SoCal, Texas, and Minnesota. My father is a Col. in the Air Force so i’ve moved consistently throughout my childhood. </Card.Description>
                  </Card.Content>
                </Card>

                <Card className="tid-bits-fade-3">
                  <Card.Content>
                    <Card.Header textAlign="left">Tid Bit 5</Card.Header>
                    <Card.Description textAlign="left">Although none of my favorite films are Wes Anderson films, my favorite director is Wes Anderson. I love his visual style and (relatively) light hearted plots and have never not liked a film from him (except maybe Life Aquatic).</Card.Description>
                  </Card.Content>
                </Card>

                <Card className="tid-bits-fade-3">
                  <Card.Content>
                    <Card.Header textAlign="left">Tid Bit 6</Card.Header>
                    <Card.Description textAlign="left">I’m a huge fan of podcasts and listen to them everyday. My favorite podcasts include: Planet Money, Ted Radio Hour, How I Built This, The Investors Podcast, Freakanomics, The Film Vault, and Ear Hustle.</Card.Description>
                  </Card.Content>
                </Card>

                <Card className="tid-bits-fade-4">
                  <Card.Content>
                    <Card.Header textAlign="left">Tid Bit 7</Card.Header>
                    <Card.Description textAlign="left">I haven’t always liked computer science. I wanted to be a chemist before coming to college and even had my own home lab where I mostly just put copper in sulfuric acid to make pretty blue crystals. </Card.Description>
                  </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
};

const ContactSub = () => (
    <div>
        <div className="contactsub-header">Feel free to reach out to me via email at <div className="aboutsub-highlight highlight-sub-2">zkirby@berkeley.edu</div>, I'm always happy to grab coffee and chat!</div>
        <div id="contactsub-items-spine">
            <div className="contactsub-item">
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/zkirby/" className="linkedinsvg">
                    { linkedinsvg }
                </a>
            </div>
            <div className="contactsub-item">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/zkirby" className="githubsvg">
                    { githubsvg }
                </a>
            </div>
            <div className="contactsub-item">
                <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@zkirby16" className="mediumsvg">
                    { mediumsvg }
                </a>
            </div>
            <div className="contactsub-item">
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/zachary.kirby.58" className="facebooksvg">
                    { facebooksvg }
                </a>
            </div>
            <div className="contactsub-item">
                <a target="_blank" rel="noopener noreferrer" href="https://codefights.com/profile/zkirby" className="cfsvg">
                    { codefightssvg }
                </a>
            </div>
        </div>
    </div>
);

/* Redux */
const mapDispatchToProps = (dispatch) => {
    return {
        setDisplayUrl: (url) => {
            dispatch({
                type:"SET-DISPLAY-URL",
                payload: url
            })
        }
    }
} 

export default connect(()=>({}), mapDispatchToProps)(About);



/* graveyard */
// <Popup
//     trigger={ 
//         <div className="contactsub-item">
//             <a target="_blank" rel="noopener noreferrer" href="" className="linkedinsvg">
//                 { linkedinsvg }
//             </a>
//         </div>
//     }
//     content="Linkedin"
//     basic
//     position="bottom center"
//     size="small"
//     style={{display:"none"}}
// />

// <Popup
//     trigger={ 
//         <div className="contactsub-item">
//             <a href="" className="githubsvg">
//                 { githubsvg }
//             </a>
//         </div>
//     }
//     content="Github"
//     basic
// />


// <Popup
//     trigger={ 
//         <div className="contactsub-item">
//             <a href="" className="mediumsvg">
//                 { mediumsvg }
//             </a>
//         </div>
//     }
//     content="Medium"
//     basic
// />

// <Popup
//     trigger={ 
//         <div className="contactsub-item">
//             <a href="" className="facebooksvg">
//                 { facebooksvg }
//             </a>
//         </div>
//     }
//     content="Facebook"
//     basic
// />

// <Popup
//     trigger={ 
//         <div className="contactsub-item">
//             <a href="" className="cfsvg">
//                 { codefightssvg }
//             </a>
//         </div>
//     }
//     content="Codefights"
//     basic
// />

