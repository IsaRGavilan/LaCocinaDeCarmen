import { useState } from 'react'; //Importa useState para manejar el estado local del componente
import { Link, useHistory } from 'react-router-dom'; //Link para crear enlaces a otras rutas dentro de la app e useHistory para acceder a historial navegación
import { IonContent, IonPage, IonInput, IonButton, IonCheckbox, IonToast, IonLabel } from '@ionic/react'; //Importa componentes Ionic
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; //Importa funciones de registro de Firebase
import firebaseConfig from '../../firebaseConfig'; //Importa la configuración de Firebase
import { doc, setDoc } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
const { app, firestore } = firebaseConfig; //Coge las propiedades app y firestore de la configuración de Firebase
import './Registro.css'; //Importa archivo de estilos

type RegistroProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const Registro: React.FC<RegistroProps> = ({ setIsAuthenticated }) => {

  const history = useHistory(); //Hook para redirigir a otras rutas
  const [email, setEmail] = useState(''); //Definir y almacenar email del usuario
  const [password, setPassword] = useState(''); //Definir y almacenar contraseña del usuario
  const [username, setUsername] = useState(''); //Definir y almacenar username del usuario
  const [confirmPassword, setConfirmPassword] = useState(''); //Definir y almacenar confirmación de contraseña del usuario
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false); //Definir y almacenar estado del checkbox
  const [showToast, setShowToast] = useState(false); //Mostrar mensajes de comprobación o errores
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); //Controlar estado de carga del componente mientras se realiza el registro
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Controlar que el email introducido sea válido
  //Logo para registrarse con Google
  const logoGoogle = "https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/fondos%2FIdentificaci%C3%B3n%20y%20T%C3%A9rminos%2Fgoogle.png?alt=media&token=9c974a95-4ad4-48ac-9a8b-401a72f362fe&_gl=1*y3wrp4*_ga*NTE5ODQ3NjM2LjE2ODQ2NzkwMTU.*_ga_CW55HF8NVT*MTY4NTg5OTY4OC4zNS4xLjE2ODU5MDE1NzMuMC4wLjA.";
  
  //Función para redirigir a la página de inicio sesión
  const handleInicioSesion = () => {
    history.push('/inicioSesion');
  }

  //Función para realizar el registro
  const handleRegistro = async () => {
    setIsLoading(true); //Habilitar el estado de carga

    //Validaciones de campos
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      setToastMessage('El correo electrónico no es válido. Asegúrese de ingresar un correo electrónico válido.');
      setShowToast(true);
      return;
    }else if(username == ''){
      setIsLoading(false);
      setToastMessage('El nombre de usuario no puede estar vacío.');
      setShowToast(true);
      return;
    }else if(password.length<9){
      setIsLoading(false);
      setToastMessage('La contraseña debe tener al menos 9 caracteres.');
      setShowToast(true);
      return;
    }else if(password !== confirmPassword){
      setIsLoading(false);
      setToastMessage('Las contraseñas no coinciden.');
      setShowToast(true);
      return;
    }else if(!termsAccepted){
      setIsLoading(false);
      setToastMessage('Debe aceptar los términos y condiciones de uso');
      setShowToast(true);
      return;
    }

    try {
      const auth = getAuth(app); //Obtiene instancia del objeto auth
      //Crear el usuario con correo electrónico y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; //Se extrae identificador del usuario (uid) para usarlo después
      setIsAuthenticated(true); //Actualizar el estado de autenticación
      setToastMessage('Registro correcto'); //Muestra mensaje de confirmación
      history.push("/"); //Redirige al componente principal

    //Crear el documento en la colección "users" con el ID del usuario
    await setDoc(doc(firestore, 'users', userId), {
      email: userCredential.user.email,
      username: username,
      nombre: null,
      apellido: null,
      telefono: null,
      avatar: 'https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/avatares%2Favatardefecto.png?alt=media&token=bff9a490-bcf0-44cb-9f58-e0ed4b5b2eff',
      favoriteRecipes: [],
      lista: [],
    });
    } catch (error) {
      setToastMessage('El correo electrónico ya está registrado.'); //Muestra mensaje de error
    }finally{
      setIsLoading(false); // Deshabilitar el estado de carga
      setShowToast(true); //Muestra el mensaje correspondiente
    }
  };
  
  //Función para registrar con Google
  const handleRegistroGoogle = async () => {
    setIsLoading(true); //Habilita estado de carga
    try {
      const auth = getAuth(app); //Obtiene instancia del objeto auth
      //Crea instancia del proveedor de autenticación de Google con la función GoogleAuthProvider de firebase
      const provider = new GoogleAuthProvider();
      //Utiliza la función signInWithPopup del objeto auth para mostrar ventana emergente de registro con Google
      const userCredential = await signInWithPopup(auth, provider);
      const userId = userCredential.user.uid;
      //Obtener el nombre de usuario del usuario de Google
      const username = userCredential.user.displayName;

      //Crear el documento en la colección "users" con el ID del usuario
      await setDoc(doc(firestore, 'users', userId), {
        email: userCredential.user.email,
        username: username,
        nombre: null,
        apellido: null,
        telefono: null,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/avatares%2Favatardefecto.png?alt=media&token=bff9a490-bcf0-44cb-9f58-e0ed4b5b2eff',
        favoriteRecipes: [],
      });

      setIsAuthenticated(true); //Establece estado de autenticación en true
      setToastMessage('Registro con Google exitoso.'); //Muestra mensaje de confirmación
      history.push("/"); //Redirige al componente principal
    } catch (error) {
      setToastMessage('Error al registrar con Google.'); //Muestra mensaje de error
    } finally {
      setIsLoading(false); //Desactiva el estado de carga
      setShowToast(true); //Muestra el mensaje correspondiente
    }
  };
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="registro-container"> {/*Contenedor principal*/}
          <h1 className='titulo'>Regístrate en la aplicación para disfrutar de todas las recetas que puedas imaginar...</h1>
          {/*Campo de entrar para correo electrónico*/}
          <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Inserte correo electrónico" id='inputs' value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}/>
          {/*Campo de entrara para nombre de usuario*/}
          <IonInput label="Nombre de usuario" labelPlacement="floating" fill="outline" placeholder="Inserte su nombre de usuario" id='inputs' value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}/>
          {/*Campo de entrada para contraseña*/}
          <IonInput label="Contraseña" labelPlacement="floating" fill="outline" placeholder="Inserte su contraseña" type='password' id='inputs' value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}/>
          {/*Campo de entrada para comprobación de contraseña*/}
          <IonInput label="Comprobación contraseña" labelPlacement="floating" fill="outline" placeholder="Inserte su contraseña nuevamente" type='password' id='inputs' onIonChange={(e) => setConfirmPassword(e.detail.value!)}></IonInput>
          {/*Checkbox para aceptar términos*/}
          <IonLabel className='terms'>
          <Link to='/terminos' className='linkTerms'><span>Acepto los términos y condiciones de uso.</span></Link>
          <IonCheckbox
            id='checkbox'
            checked={termsAccepted}
            onIonChange={(e) => setTermsAccepted(e.detail.checked)}
            slot='end'
          />
        </IonLabel>
          {/*Botón para iniciar sesión con texto que cambia según el estado de carga*/}
          <IonButton expand="full" className="boton" onClick={handleRegistro} disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrarse'}</IonButton>
          <h3 id='texto'>¿Ya tienes cuenta? ¡Inicia sesión!</h3>{/*Texto y botón para ir al inicio de sesión*/}
          <IonButton expand="full" className="boton" onClick={handleInicioSesion}>Iniciar sesión</IonButton>
          <img src={logoGoogle} id="google" alt="Google" onClick={handleRegistroGoogle}></img>
        </div>
      </IonContent>
      {/*Componente de notificación para mostrar los mensajes durante 3 segundos*/}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
      />
    </IonPage>
  );
};

export default Registro;