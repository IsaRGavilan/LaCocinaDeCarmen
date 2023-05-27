import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButton, IonToast, IonIcon, IonInput } from '@ionic/react';
import '../../css/cssGenerales/Perfil.css';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import firebaseConfig from '../../../src/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { pencilOutline } from 'ionicons/icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

type PerfilProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const Perfil: React.FC<PerfilProps> = ({ setIsAuthenticated }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [avatarUrl, setAvatarUrl] = useState('https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/avatares%2Favatardefecto.png?alt=media&token=bff9a490-bcf0-44cb-9f58-e0ed4b5b2eff');
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const {firestore} = firebaseConfig;

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

  const getProfileData = async (userId: string) => {
    const docRef = doc(firestore, 'users', userId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUsername(data.username || '');
      setNombre(data.nombre || '');
      setApellido(data.apellido || '');
      setTelefono(data.telefono || '');
    }
  };
  
  useEffect(() => {
    const auth = getAuth(firebaseConfig.app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email ?? '');
        getProfileData(user.uid);
      } else {
        history.push('/inicioSesion');
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [history]);
  
  const guardarCambios = async () => {
    const auth = getAuth(firebaseConfig.app);
    const user = auth.currentUser;
  
    if (user) {
      try {
        const docRef = doc(firestore, 'users', user.uid);
        await updateDoc(docRef, {
          username: username,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
        });
        setShowToast(true);
        setToastMessage('Cambios guardados correctamente.');
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
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
        <IonInput label="Email:" value= {email} disabled={false} onIonChange={(e) => setEmail(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Nombre de usuario:" value= {username} disabled={false} onIonChange={(e) => setUsername(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Nombre:" value= {nombre} disabled={false} onIonChange={(e) => setNombre(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Apellido:" value= {apellido} disabled={false} onIonChange={(e) => setApellido(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Teléfono:" value= {telefono} disabled={false} onIonChange={(e) => setTelefono(e.detail.value!)} className='texto' color='secondary'></IonInput>
        </div>
        <IonButton onClick={handleCerrarSesion} className='botonLogout'>Cerrar sesión</IonButton>
        <IonButton onClick={guardarCambios} className='botonGuardar'>Guardar cambios</IonButton>
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