import React, {Fragment} from 'react';
import styles from './home.module.css'
import ControlledCarousel from './Carousel/Carousel'
import ContactForm from './ContactForm/ContactForm'
import Profiles from './Profiles/Profiles'

const Home = () => {
    return ( 
        <Fragment>
            <div className={`${styles.home}`}>
    
                <section className={`${styles.carouselContainer}`}>
                    <ControlledCarousel/>
                </section>

                <section className={`${styles.filosofiaContainer}`}>
                    <div className={`d-flex flex-column mt-5 ${styles.filosofia}`}>
                        <h2 className={`${styles.titles}`}>Filosofia</h2>
                        <p className={`${styles.filosofiaP}`}>Vender productos producidos de manera sustentable bajo la ideología de cuidar el medioambiente sin dejar de lado la calidad que el público espera de las mejores marcas!</p>
                    </div>
                </section>

                <section>
                    <Profiles />
                </section>
                
                <section className={`${styles.contactformContainer}`}>
                    <ContactForm />
                </section>

            </div>
        </Fragment>
     );
}
 
export default Home;
