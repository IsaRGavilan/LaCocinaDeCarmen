import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButton, IonToast, IonModal, IonIcon, IonInput, IonDatetime } from '@ionic/react';
import '../../css/cssGenerales/Perfil.css';
import { useEffect, useState } from 'react';
import { deleteUser, getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import firebaseConfig from '../../../src/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { pencilOutline } from 'ionicons/icons';

type PerfilProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const Perfil: React.FC<PerfilProps> = ({ setIsAuthenticated }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [avatarUrl, setAvatarUrl] = useState('https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/avatares%2Favatardefecto.png?alt=media&token=bff9a490-bcf0-44cb-9f58-e0ed4b5b2eff');

  const handleCerrarSesion = async () => {
    const auth = getAuth(firebaseConfig.app);
    await signOut(auth);
    setShowToast(true);
    setToastMessage('Sesión cerrada correctamente.');
    setIsAuthenticated(false);
    history.push('/inicioSesion');
  };

  useEffect(() => {
    const auth = getAuth(firebaseConfig.app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email ?? '');
      } else {
        history.push('/inicioSesion');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [history]);

  const eliminarCuenta = async () => {
    const auth = getAuth(firebaseConfig.app);
    const user = auth.currentUser;

    if (user) {
      try {
        await deleteUser(user);
        setShowToast(true);
        setToastMessage('Cuenta eliminada correctamente.');
        history.push('/registro');
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
      }
    }
  };
  
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Perfil</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="custom-content">
        <h1 className='titulo'>¡Completa tu perfil!</h1>
        <img src={avatarUrl} className='avatar'/>
        <IonIcon icon={pencilOutline} className='icon' color='secondary'/>
        <div className='campos'>
        <IonInput label="Email:" value= {email} disabled={false} className='texto' color='secondary'></IonInput>
        <IonInput label="Nombre de usuario:" value= '' disabled={false} className='texto' color='secondary'></IonInput>
        <IonInput label="Nombre:" value= '' disabled={false} className='texto' color='secondary'></IonInput>
        <IonInput label="Apellido:" value= '' disabled={false} className='texto' color='secondary'></IonInput>
        <IonInput label="Teléfono:" value= '' disabled={false} className='texto' color='secondary'></IonInput>
        </div>
        <IonButton onClick={handleCerrarSesion} className='botonLogout'>Cerrar sesión</IonButton>
        <IonButton className='botonEliminar' onClick={eliminarCuenta}>Eliminar cuenta</IonButton>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
      />
    </IonPage>
  );
};

export default Perfil;