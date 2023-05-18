import { Route } from 'react-router-dom';
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Registro from './pages/Identificacion/Registro';
import InicioSesion from './pages/Identificacion/InicioSesion';
import Favoritos from './pages/PaginasPrincipales/Favoritos';
import Perfil from './pages/PaginasPrincipales/Perfil';
import Buscador from './pages/PaginasPrincipales/Buscador';
import Lista from './pages/PaginasPrincipales/Lista';
import Inicio from './pages/PaginasPrincipales/Inicio';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useState } from 'react';
import { home, heart, search, cart, person } from 'ionicons/icons';

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
import './App.css';
import PlatosPrincipales from './pages/Categorias/PlatosPrincipales';
import Entrantes from './pages/Categorias/Entrantes';
import Caldos from './pages/Categorias/Caldos';
import Postres from './pages/Categorias/Postres';
import CocinaTipica from './pages/Categorias/CocinaTipica';

setupIonicReact();

const App: React.FC = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
        {isAuthenticated && (
          <IonMenu contentId="main" menuId="sidebar-menu" side="start" className='menu'>
            <IonContent>
              <IonList className='menu-list'>
              <IonMenuToggle defaultChecked={true}>
                  <IonItem className='menu-item' routerLink="/inicio" routerDirection="none">
                    <IonIcon icon={home} className='menu-icon'/>
                    <IonLabel className='menu-label'>Inicio</IonLabel>
                  </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle defaultChecked={true}>
                  <IonItem className='menu-item' routerLink="/favoritos" routerDirection="none">
                    <IonIcon icon={heart} className='menu-icon'/>
                    <IonLabel className='menu-label'>Favoritos</IonLabel>
                  </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle defaultChecked={true}>
                  <IonItem className='menu-item' routerLink="/buscador" routerDirection="none">
                    <IonIcon icon={search} className='menu-icon'/>
                    <IonLabel className='menu-label'>Buscador</IonLabel>
                  </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle defaultChecked={true}>
                  <IonItem className='menu-item' routerLink="/lista" routerDirection="none">
                    <IonIcon icon={cart} className='menu-icon'/>
                    <IonLabel className='menu-label'>Lista de la compra</IonLabel>
                  </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle defaultChecked={true}>
                  <IonItem className='menu-item' routerLink="/perfil" routerDirection="none">
                    <IonIcon icon={person} className='menu-icon'/>
                    <IonLabel className='menu-label'>Perfil</IonLabel>
                  </IonItem>
                  </IonMenuToggle>
              </IonList>
            </IonContent>
          </IonMenu>
          )}
          <IonRouterOutlet id="main">
            <Route path="/inicioSesion">
              <InicioSesion setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <Route path="/registro">
              <Registro setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <Route exact path="/">
              {isAuthenticated ? <Inicio /> : <InicioSesion setIsAuthenticated={setIsAuthenticated} />}
            </Route>
            <ProtectedRoute exact path="/inicio" component={Inicio} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/favoritos" component={Favoritos} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/buscador" component={Buscador} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/lista" component={Lista} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/perfil" component={Perfil} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/platosPrincipales" component={PlatosPrincipales} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/entrantes" component={Entrantes} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/caldos" component={Caldos} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/postres" component={Postres} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/cocinaTipica" component={CocinaTipica} isAuthenticated={isAuthenticated} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;