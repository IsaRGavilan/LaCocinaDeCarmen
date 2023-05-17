import { IonContent, IonHeader, IonPage, IonInput, IonButton, IonCheckbox, IonToast } from '@ionic/react';
import '../css/Registro.css';
import google from '../assets/google.png';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebaseConfig';

type RegistroProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const Registro: React.FC<RegistroProps> = ({ setIsAuthenticated }) => {

  const history = useHistory(); // Obtiene el objeto de historial de navegación

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const handleInicioSesion = () => {
    history.push('/inicioSesion'); // Utiliza la función push para navegar a la ruta '/inicioSesion'
};

  const handleRegistro = async () => {
    setIsLoading(true); // Habilitar el estado de carga

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
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setToastMessage('Registro correcto');
      history.push("/");
    } catch (error) {
      setToastMessage('El correo electrónico ya está registrado.');
    }finally{
      setIsLoading(false); // Deshabilitar el estado de carga
      setShowToast(true);
    }
  };
  
  const handleRegistroGoogle = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      setToastMessage('Registro con Google exitoso.');
      history.push("/");
    } catch (error) {
      setToastMessage('Error al registrar con Google.');
    } finally {
      setIsLoading(false);
      setShowToast(true);
    }
  };
  
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen>
        <div className="registro-container">
          <h1 className='titulo'>Regístrate en la aplicación para disfrutar de todas las recetas que puedas imaginar...</h1>
          <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Inserte correo electrónico" id='inputs' value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
          <IonInput label="Nombre de usuario" labelPlacement="floating" fill="outline" placeholder="Inserte su nombre de usuario" id='inputs' value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
          <IonInput label="Contraseña" labelPlacement="floating" fill="outline" placeholder="Inserte su contraseña" type='password' id='inputs' value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
          <IonInput label="Comprobación contraseña" labelPlacement="floating" fill="outline" placeholder="Inserte su contraseña nuevamente" type='password' id='inputs' onIonChange={(e) => setConfirmPassword(e.detail.value!)}></IonInput>
          <IonCheckbox id='checkbox' checked={termsAccepted} onIonChange={(e) => setTermsAccepted(e.detail.checked)}>Acepto los términos y condiciones de uso.</IonCheckbox>
          <IonButton expand="full" className="boton" onClick={handleRegistro} disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrarse'}</IonButton>
          <h3 id='texto'>¿Ya tienes cuenta? ¡Inicia sesión!</h3>
          <IonButton expand="full" className="boton" onClick={handleInicioSesion}>Iniciar sesión</IonButton>
          <img src={google} id="google" alt="Google" onClick={handleRegistroGoogle}></img>
        </div>
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

export default Registro;