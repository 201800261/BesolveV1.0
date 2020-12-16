import React from 'react';
import { IonSlides, IonSlide, IonContent, IonPage, IonButton, IonIcon, IonCard } from '@ionic/react';
import { arrowForward } from "ionicons/icons";
import "../theme/slide.css";
import welcome from '../Images/welcome.svg';
import intro from '../Images/intro.svg';
import start from '../Images/start.svg';
import privacy from '../Images/privacy.svg';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 1,
  speed: 400
};

export const SlidesPage: React.FC = () => (
    <IonPage>
    <IonContent fullscreen class="ion-padding" scroll-y="false" color="primary">
      <IonSlides>
        
        <IonSlide>
        <IonCard class="card">
            <div className="slide">
                <img src={welcome} alt="welcome.svg" />
                <h2>Welcome to BeSolve!</h2>
                <p>Our mission is to be the bridge that connects people in order to grow.</p>
            </div>
            </IonCard>
        </IonSlide>

        <IonSlide>
            <IonCard class="card">
            <img src={intro} alt="intro.svg" />
            <h2>What is BeSolve?</h2>
            <p><b>BeSolve</b> is a forum app at its core whose main purpose is to facilitate discussions between members in each department.</p>
            </IonCard>
        </IonSlide>

        {/* <IonSlide>
          <img src="./slide-3.png"/>
          <h2>What is Ionic Appflow?</h2>
          <p><b>Ionic Appflow</b> is a powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.</p>
        </IonSlide> */}

        <IonSlide>
            <IonCard class="card">
            <img src={privacy} alt="privacy.svg" />
            <h2>Privacy Protection</h2>
            <p>Your privacy is of utmost importance and we assure you that all measures have been taken to protect your personal information.</p>
            </IonCard>
        </IonSlide>

        <IonSlide>
            <IonCard class="card">
            <img src={start} alt="start.svg" />
            <h2>Ready to Enter?</h2>
            <IonButton color="" fill="clear" routerLink="/register">Continue<IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
            </IonCard>
        </IonSlide>

      </IonSlides>
    </IonContent>
  </IonPage>
);
  
  export default SlidesPage;
  