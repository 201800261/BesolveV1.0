import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    IonItem,
    IonTextarea
  
  } from "@ionic/react";
  import React, { useContext, useState } from "react";
  import { firestore } from "../firebase";
  import { useAuth, UserContext } from "../auth";
  import { useHistory } from "react-router-dom";
  
  
  
  const AddCommentPage: React.FC = () => {
    const { userId } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const history = useHistory();
    const username = useContext(UserContext);
  
    function handlesave() {
      firestore.collection("forums")
        .add({
          description: description,
          title: title,
          date: date
        })
      history.goBack();
    }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Add Comment</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonLabel position="stacked">{username} </IonLabel> 
          <IonItem>
            <IonLabel position="stacked">Comment: </IonLabel>
            <IonTextarea
              value={description} onIonChange={(event) => setDescription(event.detail.value)} />
          </IonItem>
  
          <IonItem>
            <IonLabel position="stacked">Time</IonLabel>
            <IonInput type="date"
              value={date} onIonChange={(event) => setDate(event.detail.value)}/>
          </IonItem>
  
          <IonButton expand="block" onClick={handlesave} >Comment</IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  
  
  export default AddCommentPage;