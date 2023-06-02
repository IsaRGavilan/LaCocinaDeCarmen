import { Route } from 'react-router-dom';
import { IonApp, IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Registro from './pages/Identificacion/Registro';
import InicioSesion from './pages/Identificacion/InicioSesion';
import Favoritos from './pages/PaginasPrincipales/Favoritos';
import Perfil from './pages/PaginasPrincipales/Perfil';
import Buscador from './pages/PaginasPrincipales/Buscador';
import Lista from './pages/PaginasPrincipales/Lista';
import Inicio from './pages/PaginasPrincipales/Inicio';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useEffect, useState } from 'react';
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
import Carnes from './pages/Categorias/PlatosPrincipales/Carnes';
import Legumbres from './pages/Categorias/PlatosPrincipales/Legumbres';
import Pastas from './pages/Categorias/PlatosPrincipales/Pastas';
import Pescados from './pages/Categorias/PlatosPrincipales/Pescados';
import Pures from './pages/Categorias/PlatosPrincipales/Pures';
import Sopas from './pages/Categorias/PlatosPrincipales/Sopas';
import Verduras from './pages/Categorias/PlatosPrincipales/Verduras';
import Andalucia from './pages/Categorias/CocinaTipica/Andalucia';
import Aragon from './pages/Categorias/CocinaTipica/Aragon';
import Asturias from './pages/Categorias/CocinaTipica/Asturias';
import Baleares from './pages/Categorias/CocinaTipica/Baleares';
import Canarias from './pages/Categorias/CocinaTipica/Canarias';
import CastillaLeon from './pages/Categorias/CocinaTipica/CastillaLeon';
import CastillaMancha from './pages/Categorias/CocinaTipica/CastillaMancha';
import Catalunya from './pages/Categorias/CocinaTipica/Catalunya';
import Cantabria from './pages/Categorias/CocinaTipica/Cantabria';
import Extremadura from './pages/Categorias/CocinaTipica/Extremadura';
import Galicia from './pages/Categorias/CocinaTipica/Galicia';
import Madrid from './pages/Categorias/CocinaTipica/Madrid';
import Murcia from './pages/Categorias/CocinaTipica/Murcia';
import Navarra from './pages/Categorias/CocinaTipica/Navarra';
import PaisVasco from './pages/Categorias/CocinaTipica/PaisVasco';
import Rioja from './pages/Categorias/CocinaTipica/Rioja';
import Valencia from './pages/Categorias/CocinaTipica/Valencia';
import Recipe from './components/Recipe/Recipe';
import Terminos from './pages/Identificacion/Terminos';
import firebaseConfig from './firebaseConfig'; 
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import SplashScreen from './components/SplashScreen/SplashScreen';

setupIonicReact();

const App: React.FC = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const auth = getAuth(firebaseConfig.app);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga de 4 segundos
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    const auth = getAuth(firebaseConfig.app);
    const db = getFirestore(firebaseConfig.app);
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUsername(user.displayName || '');
        setAvatar(user.photoURL || '');

        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeUser = onSnapshot(userDocRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUsername(userData.username || '');
            setAvatar(userData.avatar || '');
          }
        });

        return () => {
          unsubscribeUser();
        };
      } else {
        setIsAuthenticated(false);
        setUsername('');
        setAvatar('');
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <IonApp>
      {loading ? (
        <SplashScreen/>
      ) : (
<IonReactRouter>
        <IonSplitPane contentId="main">
        {isAuthenticated && (
          <IonMenu contentId="main" menuId="sidebar-menu" side="start" className='menu'>
            <IonContent>
              <IonList className='menu-list'>
              <IonItem className='itemHeader'>
                  <IonAvatar slot="start">
                    <IonImg src={avatar} id='avatarUser'/>
                  </IonAvatar>
                  <IonLabel id='username'>{username}</IonLabel>
                </IonItem>
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
            <ProtectedRoute exact path="/receta/:id" component={Recipe} isAuthenticated={isAuthenticated}/>
            <Route exact path="/terminos" component={Terminos}/>
            
            <ProtectedRoute exact path="/platosPrincipales" component={PlatosPrincipales} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/entrantes" component={Entrantes} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/caldos" component={Caldos} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/postres" component={Postres} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/cocinaTipica" component={CocinaTipica} isAuthenticated={isAuthenticated} />

            <ProtectedRoute exact path="/carnes" component={Carnes} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/legumbres" component={Legumbres} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/pastas" component={Pastas} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/pescados" component={Pescados} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/pures" component={Pures} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/sopas" component={Sopas} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/verduras" component={Verduras} isAuthenticated={isAuthenticated} />

            <ProtectedRoute exact path="/andalucia" component={Andalucia} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/aragon" component={Aragon} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/asturias" component={Asturias} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/baleares" component={Baleares} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/canarias" component={Canarias} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/castillaLeon" component={CastillaLeon} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/castillaMancha" component={CastillaMancha} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/catalunya" component={Catalunya} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/cantabria" component={Cantabria} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/extremadura" component={Extremadura} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/galicia" component={Galicia} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/madrid" component={Madrid} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/murcia" component={Murcia} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/navarra" component={Navarra} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/paisVasco" component={PaisVasco} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/rioja" component={Rioja} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/valencia" component={Valencia} isAuthenticated={isAuthenticated} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      )}
      
    </IonApp>
  );
};

export default App;