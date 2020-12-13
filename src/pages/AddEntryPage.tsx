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
  IonTextarea,
  IonDatetime,
  isPlatform

} from "@ionic/react";
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import React, { useContext, useEffect, useRef, useState } from "react";
import { firestore, storage } from "../firebase";
import { useAuth, UserContext } from "../auth";
import { useHistory, useRouteMatch } from "react-router-dom";


interface RouteParams {
  id: string;  
  departmentName : string;
}


const { Camera } = Plugins;

async function savePicture(blobUrl, userId){
  const pictureRef = storage.ref(`/forums/{id}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  return url;
  }



const AddEntryPage: React.FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { id, departmentName } = match.params;
  const { userId } = useAuth();
  const [title, setTitle] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>();
  const {username} = useContext(UserContext);
  useEffect(() => () => {
    if (pictureUrl.startsWith('blob:')){
      URL.revokeObjectURL(pictureUrl);
      console.log('revoked URL:', pictureUrl);
    }
  }, [pictureUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files.length > 0){
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      console.log('created URL:', pictureUrl);
      setPictureUrl(pictureUrl);
    }
  };

  const handlePictureClick = async () => {
    if (isPlatform('capacitor')){
      try { 
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          width: 600, 
        });
        setPictureUrl(photo.webPath);
      } catch (error){
        console.log('Camera error:', error);
      }
    } else {
      fileInputRef.current.click();
    }   
};

  const handleSave = async () => {
    const entriesRef = firestore.collection('departments').doc(id).collection('posts');
    const entryData = { date, title, pictureUrl, description, userId, username};
    if (!pictureUrl.startsWith('/assets'))
      entryData.pictureUrl = await savePicture(pictureUrl,userId);
    const entryRef = await entriesRef.add(entryData);
    console.log('saved:', entryRef.id);
    history.goBack();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput type="text"
            value={title} onIonChange={(event) => setTitle(event.detail.value)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonInput type="text"
            value={description} onIonChange={(event) => setDescription(event.detail.value)}/>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonDatetime
            value={date} onIonChange={(event) => setDate(event.detail.value)}/>
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">Picture</IonLabel><br/>
          <input type="file" accept="image/*" hidden ref={fileInputRef} 
            onChange={handleFileChange}
          />
          <img src={pictureUrl} alt="" style={{ cursor: 'pointer'}} 
            onClick={handlePictureClick}
            />
        </IonItem>

        <IonButton expand="block" onClick={handleSave} >Post</IonButton>
      </IonContent>
    </IonPage>
  );
};



export default AddEntryPage;