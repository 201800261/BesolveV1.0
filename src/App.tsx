import {
  IonApp, IonLoading
} from '@ionic/react';
import { Redirect, Route, Switch} from 'react-router-dom';
import React from 'react';
import {IonReactRouter} from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';
import {AuthContext, useAuthInit} from './auth'; 
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import BeginPage from './pages/BeginPage'
import SlidesPage from './pages/SlidesPage';




const App: React.FC = () => {
  const { loading, auth} = useAuthInit();
  if (loading){
  return <IonLoading isOpen />;
}  
console.log(`Rendering app with auth:`, auth);
return (
    <IonApp>
      <AuthContext.Provider value={auth}>
      <IonReactRouter>
        <Switch>
          <Route exact path="/besolve">
              <BeginPage/>
          </Route>

          <Route exact path="/slides">
              <SlidesPage/>
          </Route>
                    
          <Route exact path="/login">
              <LoginPage/>
          </Route>

          <Route exact path="/register">
              <RegisterPage/>
          </Route>

          <Route path="/my">
            <AppTabs/>
          </Route>

          <Route>
              <BeginPage/>
          </Route>

          <Redirect exact path="/" to="/my/entries"/>
            <Route>
                <NotFoundPage/>
            </Route>
          </Switch>
         </IonReactRouter>
        </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
