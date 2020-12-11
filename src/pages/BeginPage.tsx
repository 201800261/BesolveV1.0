import {
  IonPage,
  IonContent,
  IonButton,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardContent

} from '@ionic/react';
import React, { useState } from 'react';
import "../theme/begin.css";
import logo from '../Images/logo_transparent.png';

const BeginPage: React.FC = () => {
  const [status, setStatus] = useState({ loading: false, error: false });
  return (
    <IonPage>
      <IonContent className="ion-padding">
            <div className="vertical-center">
            <img src={logo} alt="logo_transparent.png" />
            </div>
            <IonButton color="dark" expand="block" routerLink="/login"> Login </IonButton>

            <IonButton color="dark" expand="block" routerLink="/register">
              Sign Up </IonButton>

        <IonLoading isOpen={status.loading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default BeginPage;
