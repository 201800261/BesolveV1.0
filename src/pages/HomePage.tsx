import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonThumbnail,
  IonImg,
  IonCard
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import {firestore} from '../firebase';
import { departmentlist, Entry, todepartmentlist, toEntry } from '../model';
import {add as addIcon} from 'ionicons/icons';
import {formatDate} from './FormatDate';
import home from "../Images/home.svg";


const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<departmentlist[]>([]);

  useEffect(() => {
    const entriesRef = firestore.collection('departments');
    return entriesRef.onSnapshot(({ docs }) => 
    setEntries(docs.map(todepartmentlist)));
  }, [userId]);    
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BeSolve</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
      <img src={home} alt="home.svg" height="35%" width="100%"/>
        { entries.map((entry) =>
              <IonItem
              button
              key={entry.id}
              routerLink={`/my/entries/view/${entry.name}/${entry.id}`}
            >    
                {entry.name}
              </IonItem>
            )}
           
          
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
