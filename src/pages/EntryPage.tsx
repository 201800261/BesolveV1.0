import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonBackButton,
  IonCard,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCardSubtitle
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { firestore } from "../firebase";
import { postlist, topostlist } from "../model";
import { useAuth } from "../auth";
import { add } from "ionicons/icons";
import empty from '../Images/empty.svg';



interface RouteParams {
  id: string;
  
  departmentName : string;
}



const EntryPage: React.FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { id, departmentName } = match.params;
  const [entry, setEntry] = useState<postlist[]>([]);
  const { userId } = useAuth();
  const [showNoData, setShow] = useState(false);

  useEffect(() => {
  const entryRef = firestore.collection("departments").doc(id).collection('posts');
    entryRef.orderBy("date","desc").onSnapshot(({docs}) => {setEntry(docs.map(topostlist));
    });
  }, [userId, id]);

  useEffect(() => {
    const entryRef = firestore.collection("departments").doc(id).collection('posts');
      entryRef.onSnapshot((snapshot) => {
        if (snapshot.size) {
          setShow(false);
        } else {
          setShow(true);
        }
      });
    }, [userId, id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>{departmentName} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true} className="ion-padding"> <br></br>
      {showNoData && (
            <div className="ion-text-center centerImg">
              <img src={empty} alt="empty.svg" height="50%" width="70%" />
              <br />
              <br />
              <p>There are no posts in this department yet!</p>
            </div>
          )}
        
        { entry.map((entry) =>          
          <IonCard color="tertiary" key={entry.id}>
            <IonCardHeader> 
              <IonCardSubtitle><b>{entry.username}</b></IonCardSubtitle>
              <h5> Title: {entry.title}</h5>
            </IonCardHeader>
            <IonCardContent>
                <div className="ion-text-end">
              <IonButton slot="end" routerLink={`/my/entries/post/${id}/${entry.id}`}> Read More </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
         )} 

      </IonContent>
      <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink={`/my/entries/add/${id}`}>
            <IonIcon icon={add}/>
          </IonFabButton>
          </IonFab>
    </IonPage>
  );
};

export default EntryPage;
