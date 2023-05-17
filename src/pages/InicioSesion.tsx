import { IonContent, IonHeader, IonPage, IonInput, IonButton, IonToast } from '@ionic/react';
import '../css/InicioSesion.css';
import google from '../assets/google.png';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../firebaseConfig';

type InicioSesionProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const InicioSesion: React.FC<InicioSesionProps> = ({ setIsAuthenticated }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistro = () => {
    history.push('/registro');
  };

  const handleInicioSesion = async () => {
    setIsLoading(true); // Habilitar el estado de carga
    try {
      const auth = getAuth(app);
      console.log('Before signInWithEmailAndPassword');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('After signInWithEmailAndPassword');
      const userId = userCredential.user.uid;
      setIsAuthenticated(true); // Actualizar el estado de autenticación
      setToastMessage('Inicio de sesión correcto');
      history.push("/inicio");
    } catch (error) {
      setToastMessage('Credenciales incorrectas');
    } finally {
      setIsLoading(false); // Deshabilitar el estado de carga
      setShowToast(true);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      setToastMessage('Se ha enviado un correo de restablecimiento de contraseña.');
    } catch (error) {
      setToastMessage('No se pudo enviar el correo de restablecimiento de contraseña. Verifique el correo electrónico.');
    } finally {
      setIsLoading(false);
      setShowToast(true);
    }
  };

  const handleInicioSesionGoogle = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      setToastMessage('Inicio de sesión con Google exitoso');
      history.push("/inicio");
    } catch (error) {
      setToastMessage('Error al iniciar sesión con Google');
    } finally {
      setIsLoading(false);
      setShowToast(true);
    }
  };
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <div className="inicio-container">
          <h1 className="titulo">¡Bienvenid@ de nuevo! Inicia sesión para continuar</h1>
          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            placeholder="Inserte correo electrónico"
            id="inputs"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            fill="outline"
            placeholder="Inserte su contraseña"
            type="password"
            id="inputs"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
          <IonButton expand="full" className="boton" onClick={handleInicioSesion} disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </IonButton>
          <h3 id="texto">¿Aún no tienes cuenta? ¡Regístrate!</h3>
          <IonButton expand="full" className="boton" onClick={handleRegistro}>
            Registro
          </IonButton>
          <img src={google} id="google" alt="Google" onClick={handleInicioSesionGoogle}></img>
          <IonButton expand="full" className="boton" onClick={handleResetPassword}>
            He olvidado la contraseña
          </IonButton>
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

export default InicioSesion;