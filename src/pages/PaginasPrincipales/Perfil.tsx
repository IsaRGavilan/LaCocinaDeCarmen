import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButton, IonToast, IonIcon, IonInput, IonPopover, IonImg, IonCol, IonGrid, IonRow } from '@ionic/react';
import '../../css/cssGenerales/Perfil.css';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import firebaseConfig from '../../../src/firebaseConfig';
import { Link, useHistory } from 'react-router-dom';
import { pencilOutline } from 'ionicons/icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';

type PerfilProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const Perfil: React.FC<PerfilProps> = ({ setIsAuthenticated }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const {firestore} = firebaseConfig;

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

  const handleCerrarSesion = async () => {
    const auth = getAuth(firebaseConfig.app);
    await signOut(auth);
    setShowToast(true);
    setToastMessage('Sesión cerrada correctamente.');
    setIsAuthenticated(false);
    history.push('/inicioSesion');
  };

  const getProfileData = async (userId: string) => {
    const docRef = doc(firestore, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUsername(data.username || '');
      setNombre(data.nombre || '');
      setApellido(data.apellido || '');
      setTelefono(data.telefono || '');
      setSelectedAvatar(data.avatar || ''); // Actualizar el avatar seleccionado para el usuario
    } else {
      setSelectedAvatar('https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/avatares%2Favatardefecto.png?alt=media&token=bff9a490-bcf0-44cb-9f58-e0ed4b5b2eff'); // Establecer el avatar por defecto para el nuevo usuario
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
          avatar: selectedAvatar,
        });

        setShowToast(true);
        setToastMessage('Cambios guardados correctamente.');
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    }
  };

  const openPopover = (event: any) => {
    setShowPopover({ showPopover: true, event });
  };

  const closePopover = () => {
    setShowPopover({ showPopover: false, event: undefined });
  };

  const selectAvatar = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    closePopover();
  };

  useEffect(() => {
    const fetchAvatarOptions = async () => {
      try {
        const storage = getStorage(firebaseConfig.app);
        const storageRef = ref(storage, 'avatares');
        const listResult = await listAll(storageRef);
        const options = await Promise.all(
          listResult.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );
        setAvatarOptions(options);
      } catch (error) {
        console.log('Error al obtener las opciones de fotos de perfil:', error);
      }
    };
    fetchAvatarOptions();
  }, []);
  
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Perfil</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="custom-content">
        <h1 className='titulo-perfil'>¡Completa tu perfil!</h1>
        <div className='avatar-container'>
        <IonImg src={selectedAvatar} className="avatar" id='perfil-avatar'/>
        </div>
        <IonIcon icon={pencilOutline} className='iconoAvatar' color='secondary' onClick={openPopover}/>
        <IonPopover
          isOpen={popoverState.showPopover}
          event={popoverState.event}
          onDidDismiss={closePopover}
        >
          <IonGrid className='grid'>
            <IonRow>
              {avatarOptions.map((avatarUrl, index) => (
                <IonCol key={index}>
                  <IonImg
                    src={avatarUrl}
                    className={`avatar-option ${selectedAvatar === avatarUrl ? 'selected' : ''}`}
                    onClick={() => selectAvatar(avatarUrl)}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonPopover>
        <div className='campos'>
        <IonInput label="Email:" value= {email} disabled={false} onIonChange={(e) => setEmail(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Nombre de usuario:" value= {username} disabled={false} onIonChange={(e) => setUsername(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Nombre:" value= {nombre} disabled={false} onIonChange={(e) => setNombre(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Apellido:" value= {apellido} disabled={false} onIonChange={(e) => setApellido(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Teléfono:" value= {telefono} disabled={false} onIonChange={(e) => setTelefono(e.detail.value!)} className='texto' color='secondary'></IonInput>
        </div>
        <IonButton onClick={handleCerrarSesion} className='botonLogout'>Cerrar sesión</IonButton>
        <IonButton onClick={guardarCambios} className='botonGuardar'>Guardar cambios</IonButton>
        <Link to='/terminos' className='terminosPerfil'><span>Términos de privacidad y condiciones de uso.</span></Link>
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