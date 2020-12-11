import {
  IonPage,
  IonContent,
  IonCardTitle,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonText,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonToast

} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import logo from '../Images/logo_transparent.png';
import "../theme/login.css";

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false, errormessage: "" });
  const [showToast, setShowToast] = useState(false);

  const handleLogin = async () => {

    try {
      setStatus({ loading: true, error: false, errormessage: ""  });
      const credential = await auth.signInWithEmailAndPassword(email, password)
      console.log('credendtial', credential);

    } catch (error) { 
     
      switch(error.message){
        case "The email address is badly formatted.": 
            setStatus({loading: false, error: true,errormessage: "Enter a Valid Email"}); 
            break;
        case "The password is invalid or the user does not have a password.": 
             setStatus({loading: false, error: true,errormessage: "Incorrect Password"}); 
            break;
        case "There is no user record corresponding to this identifier. The user may have been deleted.": 
             setStatus({loading: false, error: true,errormessage: "User is not Registered"}); 
            break;
      } setShowToast(true);
        console.log('error: ', error);
    }
  }

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonContent className="ion-padding">
      <img src={logo} alt="logo_transparent.png"/>
          <h1><b>Login</b></h1>

          <IonList>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" value={email} onIonChange={(event) => setEmail(event.detail.value)} />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput type="password" value={password} onIonChange={(event) => setPassword(event.detail.value)} />
            </IonItem>
          </IonList>

          <IonButton color="dark" expand="block" onClick={handleLogin}> Login </IonButton>

          <IonButton color="dark" expand="block" fill="clear" routerLink="/register">
              Don't have an account? Create </IonButton>

        <IonLoading isOpen={status.loading}></IonLoading>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={status.errormessage}
          duration={1000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
