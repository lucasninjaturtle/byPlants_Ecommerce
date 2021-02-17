import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import styles from './carousel.module.css'
import {Link} from 'react-router-dom'

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
};
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
            <div className={`${styles.carouselSlide1}`}>
                <div className={`${styles.containerByPlantasCarousel}`}>
                    <h2 class="animate__animated animate__fadeInDown">Las mejores ofertas!</h2>
                    <p class="animate__animated animate__fadeInUp">Todas las semanas tenemos los mejores descuentos en nuestros catálogo de productos!</p>
                    <div className={`${styles.buttonContainer}`}>
                        <Link to="/products" className={`btn btnByPlantas`}>
                            Catálogo
                        </Link>
                    </div>
                </div>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div className={`${styles.carouselSlide2}`}>
                <div className={`${styles.containerByPlantasCarousel}`}>
                    <h2 class="animate__animated animate__fadeInDown">Unete a nuestra Comunidad</h2>
                    <p class="animate__animated animate__fadeInUp">Registrate y recibe las mejores promociones directo a tu correo electronico!</p>
                    <div className={`${styles.buttonContainer}`}>
                        <Link to="/register" className={`btn btnByPlantas`}>
                            Únete!
                        </Link>
                    </div>
                </div> 
            </div>
        </Carousel.Item>
      </Carousel>
    );
  }
