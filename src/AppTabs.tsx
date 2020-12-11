import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  IonTabButton,
  IonTabBar,
} from '@ionic/react';
import HomePage from './pages/HomePage';
import EntryPage from './pages/EntryPage';
import { Redirect, Route} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { home as homeIcon, settings as settingsIcon } from "ionicons/icons";
import SettingsPage from './pages/SettingsPage';
import AddEntryPage from './pages/AddEntryPage';
import AddCommentPage from './pages/AddCommentPage';
import { useAuth, UserContext } from './auth';
import CommentPage from './pages/CommentPage';
import { firestore } from './firebase';
import { tousername, userdetails } from './model';


const AppTabs: React.FC = () => {
  const {loggedIn, userId} = useAuth();

  const [username, setUsername] = useState<userdetails>();
  useEffect(() => {
    const entryRef = firestore.collection("users").doc(userId).get().then((doc)=>{
      setUsername(tousername(doc));
    })
    }, [userId]);
  
  if (!loggedIn){
    return <Redirect to="/login" />
  }
  
  return (
    <UserContext.Provider value={`${username?.username}`}>
       <IonTabs> 
        <IonRouterOutlet>

          <Route exact path="/my/entries">
            <HomePage/>
          </Route>

          <Route exact path="/my/settingspage">
            <SettingsPage/>
          </Route>

          <Route exact path="/my/entries/view/:departmentName/:id">
            <EntryPage/>
          </Route>

          <Route exact path="/my/entries/post/:id/:postid">
            <CommentPage/>
          </Route>

          <Route exact path="/my/entries/add/:id">
            <AddEntryPage/>
          </Route>

          <Route exact path="/my/entries/comment">
            <AddCommentPage/>
          </Route>

          <Redirect exact path="/" to="/besolve"/>
          </IonRouterOutlet>
            <IonTabBar slot = "bottom">
              <IonTabButton tab="home" href="/my/entries">
                <IonIcon icon={homeIcon} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="settings" href="/my/SettingsPage">
                <IonIcon icon={settingsIcon} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
              </IonTabBar>
          </IonTabs>
          </UserContext.Provider>
  );
};

export default AppTabs;
