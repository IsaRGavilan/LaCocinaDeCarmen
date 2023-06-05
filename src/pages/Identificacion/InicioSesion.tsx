import { useState } from 'react'; //Importa useState para manejar el estado local del componente
import { useHistory } from 'react-router-dom'; //Importa useHistory para acceder al historial de navegación
import { IonContent, IonPage, IonInput, IonButton, IonToast } from '@ionic/react'; //Importa componentes Ionic
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; //Importa funciones de la autenticación de Firebase
import firebaseConfig from '../../firebaseConfig'; //Importa la configuración de Firebase
import './InicioSesion.css'; //Importa archivo de estilos
const { app } = firebaseConfig; //Coge la propiedad "app" de la configuración de Firebase

//InicioSesionProps para controlar si está autenticado o no el usuario
type InicioSesionProps = {
  setIsAuthenticated: (value: boolean) => void;
};

//Componente InicioSesion con la propiedad setIsAuthenticated
const InicioSesion: React.FC<InicioSesionProps> = ({ setIsAuthenticated }) => {
  const history = useHistory(); //Hook para redirigir a otras rutas
  const [email, setEmail] = useState(''); //Definir y almacenar email del usuario
  const [password, setPassword] = useState(''); //Definir y almacenar contraseña del usuario
  const [showToast, setShowToast] = useState(false); //Mostrar mensajes de comprobación o errores
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); //Controlar estado de carga del componente mientras se inicia sesión
  //Logo para iniciar sesión con Google
  const logoGoogle = "https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/fondos%2FIdentificaci%C3%B3n%20y%20T%C3%A9rminos%2Fgoogle.png?alt=media&token=9c974a95-4ad4-48ac-9a8b-401a72f362fe&_gl=1*y3wrp4*_ga*NTE5ODQ3NjM2LjE2ODQ2NzkwMTU.*_ga_CW55HF8NVT*MTY4NTg5OTY4OC4zNS4xLjE2ODU5MDE1NzMuMC4wLjA.";

  //Función para redirigir a la página de registro
  const handleRegistro = () => {
    history.push('/registro');
  };

  const handleInicioSesion = async () => {
    setIsLoading(true); //Mostrar indicador de carga mientras se inicia sesión
    try {
      const auth = getAuth(app); //Obtiene instancia del objeto auth
      //Uso de la función signInWithEmailAndPassword para iniciar sesión con firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; //Se extrae identificador del usuario (uid) para usarlo después
      setIsAuthenticated(true); //Actualizar el estado de autenticación
      setToastMessage('Inicio de sesión correcto'); //Muestra mensaje de confirmación
      history.push("/"); //Redirige al componente principal
    } catch (error) {
      setToastMessage('Credenciales incorrectas'); //Muestra mensaje de error
    } finally {
      setIsLoading(false); //Deshabilitar estado de carga
      setShowToast(true); //Muestra el mensaje correspondiente
    }
  };

  //Función para cambiar contraseña
  const handleResetPassword = async () => {
    setIsLoading(true); //Habilitar estado de carga
    try {
      const auth = getAuth(app); //Obtiene instancia del objeto auth
      await sendPasswordResetEmail(auth, email); //Uso de la función sendPasswordResetEmail de firebase
      setToastMessage('Se ha enviado un correo de restablecimiento de contraseña.'); //Mensaje de confirmación
    } catch (error) {
      //Mensaje de error
      setToastMessage('No se pudo enviar el correo de restablecimiento de contraseña. Verifique el correo electrónico.');
    } finally {
      setIsLoading(false); //Desactiva el estado de carga
      setShowToast(true); //Muestra el mensaje correspondiente
    }
  };

  //Función para iniciar sesión con Google
  const handleInicioSesionGoogle = async () => {
    setIsLoading(true); //Habilita estado de carga
    try {
      const auth = getAuth(app); //Obtiene instancia del objeto auth
      //Crea instancia del proveedor de autenticación de Google con la función GoogleAuthProvider de firebase
      const provider = new GoogleAuthProvider();
      //Utiliza la función signInWithPopup del objeto auth para mostrar ventana emergente de inicio de sesión con Google
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true); //Establece estado de autenticación en true
      setToastMessage('Inicio de sesión con Google exitoso'); //Muestra mensaje de confirmación
      history.push("/"); //Redirige al componente principal
    } catch (error) {
      setToastMessage('Error al iniciar sesión con Google'); //Muestra mensaje de error
    } finally {
      setIsLoading(false); //Desactiva el estado de carga
      setShowToast(true); //Muestra el mensaje correspondiente
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="inicio-container">{/*Contenedor principal*/}
          <h1 className="titulo">¡Bienvenid@ de nuevo! Inicia sesión para continuar</h1>{/*Título de bienvenida*/}
          {/*Campo de entrada para el correo electrónico*/}
          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            placeholder="Inserte correo electrónico"
            id="inputs"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
          {/*Cmapo de entrada para la contraseña*/}
          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            fill="outline"
            placeholder="Inserte su contraseña"
            type="password"
            id="inputs"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
          {/*Botón para iniciar sesión*/}
          <IonButton expand="full" className="boton" onClick={handleInicioSesion} disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}{/*Texto que cambia según el estado de carga*/}
          </IonButton>
          <h3 id="texto">¿Aún no tienes cuenta? ¡Regístrate!</h3>{/*Texto y botón para ir al registro*/}
          <IonButton expand="full" className="boton" onClick={handleRegistro}>
            Registro
          </IonButton>
          <img src={logoGoogle} id="google" alt="Google" onClick={handleInicioSesionGoogle}/>{/*Imagen clicable para iniciar sesión con Google*/}
          <IonButton expand="full" className="boton" onClick={handleResetPassword}>{/*Botón para restablecer contraseña*/}
            He olvidado la contraseña
          </IonButton>
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

export default InicioSesion;