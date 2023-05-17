import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Registro from './pages/Registro';
import InicioSesion from './pages/InicioSesion';
import Favoritos from './pages/Favoritos';
import Perfil from './pages/Perfil';
import Buscador from './pages/Buscador';
import Lista from './pages/Lista';
import Inicio from './pages/Inicio';

setupIonicReact();

const App: React.FC = () => (
  <IonPage>
  <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/registro">
            <Registro />
          </Route>
          <Route exact path="/">
            <Redirect to="/registro" />
          </Route>
          <Route exact path="/inicioSesion">
            <InicioSesion/>
          </Route>
          <Route exact path="/inicio">
            <Inicio/>
          </Route>
          <Route exact path="/favoritos">
            <Favoritos/>
          </Route>
          <Route exact path="/buscador">
          <Buscador />
          </Route>
          <Route exact path="/lista">
            <Lista />
          </Route>
          <Route exact path="/perfil">
          <Perfil />
        </Route>
        </IonRouterOutlet>
      </IonReactRouter>
</IonPage>
  );

export default App;