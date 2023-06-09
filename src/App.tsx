/*Algunas importaciones de estilos que trae Ionic por defecto*/
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

import { useEffect, useState } from 'react'; //Importa el hook useEffect y useState de React
//Importa componentes Ionic
import { IonApp, IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Route } from 'react-router-dom'; //Importa la clase Route del paquete react-router-dom
import { IonReactRouter } from '@ionic/react-router'; //Importa el enrutador de React para Ionic
import { home, heart, search, cart, person } from 'ionicons/icons'; //Importa iconos utilizados
import { getAuth, onAuthStateChanged } from '@firebase/auth'; //Importa las funciones getAuth y onAuthStateChanged de auth
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'; //Importa las funciones getFirestore, doc y onSnapshot de firestore
import './App.css'; //Importa archivo de estilos

/*Importación de todos los componentes y páginas y de la app*/
import Registro from './pages/Identificacion/Registro';
import InicioSesion from './pages/Identificacion/InicioSesion';
import Favoritos from './pages/PaginasPrincipales/Favoritos';
import Perfil from './pages/PaginasPrincipales/Perfil';
import Buscador from './pages/PaginasPrincipales/Buscador';
import Lista from './pages/PaginasPrincipales/Lista';
import Inicio from './pages/PaginasPrincipales/Inicio';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
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
import SplashScreen from './components/SplashScreen/SplashScreen';

setupIonicReact(); //Usa la función para inicializar la integración de Ionic con React

const App: React.FC = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); //Estado para controlar si el usuario está autenticado
  const [username, setUsername] = useState(''); //Estado para almacenar el nombre de usuario
  const [avatar, setAvatar] = useState(''); //Estado para almacenar la URL del avatar del usuario
  const auth = getAuth(firebaseConfig.app); //Obtiene la instancia del objeto de autenticación de Firebase
  const user = auth.currentUser; //Obtiene el usuario actualmente autenticado
  const [loading, setLoading] = useState(true); //Estado para controlar la carga inicial

  //Efecto de carga inicial
  useEffect(() => {
    // Simula un tiempo de carga de 4 segundos
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    const auth = getAuth(firebaseConfig.app); //Obtiene la instancia del objeto de autenticación de Firebase
    const db = getFirestore(firebaseConfig.app); //Obtiene la instancia del objeto de Firestore de Firebase
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        //Si el usuario está autenticado
        setIsAuthenticated(true);
        setUsername(user.displayName || ''); //Actualiza el nombre de usuario
        setAvatar(user.photoURL || ''); //Actualiza el avatar del usuario

        const userDocRef = doc(db, 'users', user.uid); //Obtiene una referencia al documento del usuario en Firestore
        const unsubscribeUser = onSnapshot(userDocRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUsername(userData.username || ''); //Actualiza el nombre de usuario con el valor almacenado en el documento de Firestore
            setAvatar(userData.avatar || ''); //Actualiza el avatar con el valor almacenado en el documento de Firestore
          }
        });

        return () => {
          unsubscribeUser(); //Cancela la suscripción al documento de usuario cuando el componente se desmonta
        };
      } else {
        //Si el usuario no está autenticado
        setIsAuthenticated(false);
        setUsername('');
        setAvatar('');
      }
    });

    return () => {
      unsubscribeAuth(); //Cancela la suscripción al estado de autenticación cuando el componente se desmonta
    };
  }, []);

  return (
    <IonApp>
      {loading ? (
        <SplashScreen/> //Pantalla de carga mientras la aplicación se está cargando
      ) : (
      <IonReactRouter>
        <IonSplitPane contentId="main">
        {isAuthenticated && (
          <IonMenu contentId="main" menuId="sidebar-menu" side="start" className='menu'>
            <IonContent>
              <IonList className='menu-list'>
              {/* Elementos del menú */}
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
            {/* Rutas y componentes */}
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