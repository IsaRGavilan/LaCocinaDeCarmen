import { IonContent, IonHeader, IonPage, IonInput, IonButton, IonCheckbox, IonToast, IonLabel } from '@ionic/react';
import './Registro.css';
import google from '../../assets/imagenesGenerales/google.png';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
const { app, firestore } = firebaseConfig;

type RegistroProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const Registro: React.FC<RegistroProps> = ({ setIsAuthenticated }) => {

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const logoGoogle = "https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/fondos%2FIdentificaci%C3%B3n%20y%20T%C3%A9rminos%2Fgoogle.png?alt=media&token=9c974a95-4ad4-48ac-9a8b-401a72f362fe&_gl=1*y3wrp4*_ga*NTE5ODQ3NjM2LjE2ODQ2NzkwMTU.*_ga_CW55HF8NVT*MTY4NTg5OTY4OC4zNS4xLjE2ODU5MDE1NzMuMC4wLjA.";
  
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; //Obtenemos el id del usuario generado automáticamente
      console.log(userId);
      setIsAuthenticated(true);
      setToastMessage('Registro correcto');
      history.push("/");

    // Crear el documento en la colección "users" con el ID del usuario
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
      const userCredential = await signInWithPopup(auth, provider);
      const userId = userCredential.user.uid;
      // Obtener el nombre de usuario del usuario de Google
      const username = userCredential.user.displayName;

      // Crear el documento en la colección "users" con el ID del usuario
      await setDoc(doc(firestore, 'users', userId), {
        email: userCredential.user.email,
        username: username,
        nombre: null,
        apellido: null,
        telefono: null,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/lacocinadecarmen-irg.appspot.com/o/avatares%2Favatardefecto.png?alt=media&token=bff9a490-bcf0-44cb-9f58-e0ed4b5b2eff',
        favoriteRecipes: [],
      });

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
          <IonLabel className='terms'>
          <Link to='/terminos' className='linkTerms'><span>Acepto los términos y condiciones de uso.</span></Link>
          <IonCheckbox
            id='checkbox'
            checked={termsAccepted}
            onIonChange={(e) => setTermsAccepted(e.detail.checked)}
            slot='end'
          />
        </IonLabel>
          <IonButton expand="full" className="boton" onClick={handleRegistro} disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrarse'}</IonButton>
          <h3 id='texto'>¿Ya tienes cuenta? ¡Inicia sesión!</h3>
          <IonButton expand="full" className="boton" onClick={handleInicioSesion}>Iniciar sesión</IonButton>
          <img src={logoGoogle} id="google" alt="Google" onClick={handleRegistroGoogle}></img>
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