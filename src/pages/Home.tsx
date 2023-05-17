import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import '../css/Home.css';
import { Redirect, Route } from 'react-router-dom';
import { homeOutline, settingsOutline, personOutline, chatbubbleOutline, globeOutline, bookOutline, gameControllerOutline, listCircleOutline } from 'ionicons/icons';
import Inicio from './Inicio';
import Favoritos from './Favoritos';
import Lista from './Lista';
import Buscador from './Buscador';
import Perfil from './Perfil';
import { IonReactRouter } from '@ionic/react-router';
import InicioSesion from './InicioSesion';
import Registro from './Registro';


const Home: React.FC = () => (
  <IonPage>
    <IonReactRouter>
          <IonTabs>
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
            <Route exact path="/home/inicio">
              <Inicio/>
            </Route>
            <Route exact path="/home/favoritos">
              <Favoritos/>
            </Route>
            <Route exact path="/home/buscador">
            <Buscador />
            </Route>
            <Route exact path="/home/lista">
              <Lista />
            </Route>
            <Route exact path="/home/perfil">
            <Perfil />
          </Route>
          </IonRouterOutlet>
            <IonTabBar slot="bottom" color="primary">
              <IonTabButton tab="inicio" href="/home/inicio">
                <IonIcon icon={homeOutline} />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="favoritos" href="/home/favoritos">
                <IonIcon icon={listCircleOutline} />
                <IonLabel>Favoritos</IonLabel>
              </IonTabButton>
              <IonTabButton tab="buscador" href="/home/buscador">
                <IonIcon icon={bookOutline} />
                <IonLabel>Buscador</IonLabel>
              </IonTabButton>
              <IonTabButton tab="lista" href="/home/lista">
                <IonIcon icon={gameControllerOutline} />
                <IonLabel>Lista</IonLabel>
              </IonTabButton>
              <IonTabButton tab="perfil" href="/home/perfil">
                <IonIcon icon={personOutline} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
  </IonPage>
);

export default Home;
