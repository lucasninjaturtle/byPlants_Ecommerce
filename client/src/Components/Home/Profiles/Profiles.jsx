import React from 'react';
import styles from '../home.module.css'

export default function Profiles() {
  
    return (
        <div className="container w-80 mb-0">
            <div className="row">
            <h2 className={`${styles.titles} mt-5`}>Nuestro Equipo</h2>
                <div className="row pt-md d-flex justify-content-around">
                    <div className= {`${styles.profile}`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/franciscosabategarrido/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128645/ecom1_h6fycs.jpg" />
                            </a>
                        </div>
                        <h4 className= {`mb-0`}>Francisco</h4>
                        <h4>Sabaté</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                    <div className= {`${styles.profile}`}>
                        <div className="mb-3">   
                            <a href="#">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128737/ecom3_xhqdym.jpg" />
                            </a>
                        </div>
                        <h4 className= {`mb-0`}>Homero</h4>
                        <h4>Herrero</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                    <div className= {`${styles.profile}`}>
                        <div className="mb-3">    
                            <a href="https://www.linkedin.com/in/laguero/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128824/ecom2_ymzm8y.jpg" />
                            </a>
                        </div>
                        <h4 className= {`mb-0`}>Lucas</h4>
                        <h4>Agüero</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                    <div className= {`${styles.profile}`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/lucasafernandezmorales/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128882/ecom4_ytw1j2.jpg" />
                            </a>
                        </div>
                        <h4 className= {`mb-0`}>Lucas</h4>
                        <h4>Fernandez</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                    <div className= {`${styles.profile}`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/marcosvillabasa/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128936/ecom4_1_taunal.jpg" />
                            </a>
                        </div>
                        <h4 className= {`mb-0`}>Marcos</h4>
                        <h4>Villabasa</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                </div>
            </div>
        </div>
    );
  }
