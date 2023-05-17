import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react';
import { personCircle } from 'ionicons/icons';

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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/inicioSesion">
              <InicioSesion setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <Route path="/registro">
              <Registro setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <ProtectedRoute exact path="/home" component={Home} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/inicio" component={Inicio} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/perfil" component={Perfil} isAuthenticated={isAuthenticated} />
            <Route exact path="/favoritos">
              <Favoritos />
            </Route>
            <Route exact path="/buscador">
              <Buscador />
            </Route>
            <Route exact path="/lista">
              <Lista />
            </Route>
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;