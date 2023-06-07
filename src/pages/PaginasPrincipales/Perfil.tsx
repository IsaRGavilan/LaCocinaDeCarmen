import { useEffect, useState } from 'react'; //Importa el hook useEffect y useState de React
//Importa componentes Ionic
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButton, IonToast, IonIcon, IonInput, IonPopover, IonImg, IonCol, IonGrid, IonRow } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom'; //Link para crear enlaces a otras rutas dentro de la app e useHistory para acceder a historial navegación
import firebaseConfig from '../../../src/firebaseConfig'; //Importa la configuración de Firebase
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth'; //Importa funciones de autenticación de Firebase
import { doc, getDoc, updateDoc } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'; //Importa funciones para mostrar archivos del Storage de firebase
import { pencilOutline } from 'ionicons/icons'; //Importa icono utilizado
import '../../css/cssGenerales/Perfil.css'; //Importa archivo de estilos

type PerfilProps = {
  setIsAuthenticated: (value: boolean) => void;
};

//Componente de Perfil que recibe la función setIsAuthenticated como prop
const Perfil: React.FC<PerfilProps> = ({ setIsAuthenticated }) => {
  const [showToast, setShowToast] = useState(false); //Estado para mostrar u ocultar el Toast
  const [toastMessage, setToastMessage] = useState(''); //Mensaje del Toast
  const history = useHistory(); //Historial de navegación
  const [email, setEmail] = useState(''); //Estado del campo de correo electrónico
  const [username, setUsername] = useState(''); //Estado del campo de nombre de usuario
  const [nombre, setNombre] = useState(''); //Estado del campo de nombre
  const [apellido, setApellido] = useState(''); //Estado del campo de apellido
  const [telefono, setTelefono] = useState(''); //Estado del campo de teléfono
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined }); //Estado para mostrar u ocultar el Popover de avatares
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]); //Opciones de avatares disponibles
  const [selectedAvatar, setSelectedAvatar] = useState<string>(''); //Avatar seleccionado por el usuario
  const {firestore} = firebaseConfig; //Configuración de Firebase

  //Efecto que se ejecuta al cargar el componente y al cambiar el historial de navegación
  useEffect(() => {
    const auth = getAuth(firebaseConfig.app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email ?? ''); //Obtener el correo electrónico del usuario autenticado
        getProfileData(user.uid); //Obtener los datos del perfil del usuario autenticado
      } else {
        history.push('/inicioSesion');
      }
    });
    return () => { //Función de limpieza del efecto
      unsubscribe(); //Desuscribirse del cambio de estado de autenticación
    };
  }, [history]);

  //Función para obtener los datos del perfil del usuario
  const getProfileData = async (userId: string) => {
    const docRef = doc(firestore, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUsername(data.username || ''); //Obtener el nombre de usuario del documento
      setNombre(data.nombre || ''); //Obtener el nombre del documento
      setApellido(data.apellido || ''); //Obtener el apellido del documento
      setTelefono(data.telefono || ''); //Obtener el teléfono del documento
      setSelectedAvatar(data.avatar || ''); //Actualizar el avatar seleccionado para el usuario
    } else {
      //Avatar por defecto
      setSelectedAvatar('https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/avatares%2Favatardefecto.png?alt=media&token=bff9a490-bcf0-44cb-9f58-e0ed4b5b2eff'); // Establecer el avatar por defecto para el nuevo usuario
    }
  };
  
  //Efecto que se ejecuta al cargar el componente y al cambiar el historial de navegación
  useEffect(() => {
    const auth = getAuth(firebaseConfig.app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email ?? ''); //Obtener el correo electrónico del usuario autenticado
        getProfileData(user.uid); //Obtener los datos del perfil del usuario autenticado
      } else {
        history.push('/inicioSesion'); //Redireccionar al inicio de sesión si no hay usuario autenticado
      }
    });
    return () => { //Función de limpieza del efecto
      unsubscribe(); //Desuscribirse del cambio de estado de autenticación
    };
  }, [history]);

  //Función para guardar los cambios en el perfil del usuario  
  const guardarCambios = async () => {
    const auth = getAuth(firebaseConfig.app); //Obtiene la instancia de autenticación de Firebase
    const user = auth.currentUser; //Obtiene el usuario autenticado actualmente

    if (user) {
      try {
        const docRef = doc(firestore, 'users', user.uid); //Obtiene la referencia del documento del usuario actual
        await updateDoc(docRef, { //Actualiza el documento del usuario
          username: username,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          avatar: selectedAvatar,
        });
        setShowToast(true); //Mostrar el Toast
        setToastMessage('Cambios guardados correctamente.');
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    }
  };

  //Función para abrir el Popover de avatares
  const openPopover = (event: any) => {
    setShowPopover({ showPopover: true, event });
  };

  //Función para cerrar el Popover de avatares
  const closePopover = () => {
    setShowPopover({ showPopover: false, event: undefined });
  };

  //Función para seleccionar un avatar
  const selectAvatar = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl); //Establecer el avatar seleccionado
    closePopover(); //Cerrar el Popover de avatares
  };

  //Efecto que se ejecuta al cargar el componente para obtener las opciones de avatares disponibles
  useEffect(() => {
    const fetchAvatarOptions = async () => {
      try {
        const storage = getStorage(firebaseConfig.app); //Obtiene la instancia del servicio de almacenamiento de Firebase
        const storageRef = ref(storage, 'avatares'); //Obtiene una referencia al directorio 'avatares' en el almacenamiento
        const listResult = await listAll(storageRef); //Obtiene la lista de archivos en el directorio 'avatares'
        const options = await Promise.all(
          listResult.items.map(async (item) => {
            const url = await getDownloadURL(item); //Obtiene la URL de descarga de cada archivo en el directorio
            return url;
          })
        );
        setAvatarOptions(options); //Establecer las opciones de avatares disponibles
      } catch (error) {
        console.log('Error al obtener las opciones de fotos de perfil:', error);
      }
    };
    fetchAvatarOptions(); //Llama a la función fetchAvatarOptions para obtener las opciones de avatares disponibles
  }, []);

    //Función para cerrar sesión
    const handleCerrarSesion = async () => {
      const auth = getAuth(firebaseConfig.app);
      await signOut(auth); //Cerrar sesión en Firebase
      setShowToast(true); //Mostrar el Toast
      setToastMessage('Sesión cerrada correctamente.'); //Establecer el mensaje del Toast
      setIsAuthenticated(false); //Cambiar el estado de autenticación en el componente padre
      history.push('/inicioSesion'); //Redireccionar al inicio de sesión
    };
  
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header"> {/*Header del componente que incluye el menú desplegable*/}
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Perfil</IonTitle> {/*Título del componente*/}
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="custom-content"> {/*Contenido del componente*/}
        <h1 className='titulo-perfil'>¡Completa tu perfil!</h1>
        <div className='avatar-container'>{/*Contenedor del avatar e icono*/}
        <IonImg src={selectedAvatar} className="avatar" id='perfil-avatar'/>{/*Avatar del usuario*/}
        </div>
        {/*Icono para cambiar el avatar*/}
        <IonIcon icon={pencilOutline} className='iconoAvatar' color='secondary' onClick={openPopover}/>
        {/*Desplegable que muestra los avatares*/}
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
        <div className='campos'>{/*Contenedor de los campos editables*/}
        <IonInput label="Email:" value= {email} disabled={false} onIonChange={(e) => setEmail(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Nombre de usuario:" value= {username} disabled={false} onIonChange={(e) => setUsername(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Nombre:" value= {nombre} disabled={false} onIonChange={(e) => setNombre(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Apellido:" value= {apellido} disabled={false} onIonChange={(e) => setApellido(e.detail.value!)} className='texto' color='secondary'></IonInput>
        <IonInput label="Teléfono:" value= {telefono} disabled={false} onIonChange={(e) => setTelefono(e.detail.value!)} className='texto' color='secondary'></IonInput>
        </div>
        {/*Botón para cerrar sesión*/}
        <IonButton onClick={handleCerrarSesion} className='botonLogout'>Cerrar sesión</IonButton>
        {/*Botón para guardar cambios*/}
        <IonButton onClick={guardarCambios} className='botonGuardar'>Guardar cambios</IonButton>
        <Link to='/terminos' className='terminosPerfil'><span>Términos de privacidad y condiciones de uso.</span></Link>
      </IonContent>
      {/*Para mostrar los Toasts*/}
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